import React, { useEffect, useRef } from 'react';

const ModernNeuralNetwork = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Get container size
    const container = canvas.parentElement;
    const { width, height } = container.getBoundingClientRect();
    
    // Set canvas size with high DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    
    // Polyfill for roundRect if not available
    if (!ctx.roundRect) {
      ctx.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
      };
    }

    // Network configuration
    const layers = [
      { count: 4, label: 'Entrada', color: '#06b6d4' },
      { count: 8, label: 'Extracción', color: '#3b82f6' },
      { count: 12, label: 'Procesamiento', color: '#8b5cf6' },
      { count: 6, label: 'Reconocimiento', color: '#ec4899' },
      { count: 3, label: 'Salida', color: '#f59e0b' }
    ];
    
    const layerSpacing = width / (layers.length + 1);
    const nodes = [];
    const connections = [];
    
    // Create nodes
    layers.forEach((layer, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing;
      const verticalSpacing = height / (layer.count + 1);
      
      for (let i = 0; i < layer.count; i++) {
        const y = (i + 1) * verticalSpacing;
        nodes.push({
          id: `${layerIndex}-${i}`,
          x, y,
          layer: layerIndex,
          color: layer.color,
          activation: 0,
          targetActivation: 0,
          size: 8,
          targetSize: 8,
          active: false
        });
      }
    });
    
    // Create connections between layers
    nodes.forEach(node => {
      if (node.layer < layers.length - 1) {
        const nextLayerNodes = nodes.filter(n => n.layer === node.layer + 1);
        
        nextLayerNodes.forEach(nextNode => {
          // Create fewer, stronger connections
          if (Math.random() < 0.7) {
            connections.push({
              from: node,
              to: nextNode,
              weight: 0.3 + Math.random() * 0.7, // Always positive, 0.3-1.0
              active: false,
              flow: 0,
              particles: []
            });
          }
        });
      }
    });
    
    // Animation state
    let frame = 0;
    let currentWave = 0;
    let waveStartTime = 0;
    let lastWaveTime = 0;
    
    // Start a new propagation wave
    function startWave() {
      console.log('Starting new wave:', currentWave);
      
      // Reset all activations
      nodes.forEach(node => {
        node.activation = 0;
        node.targetActivation = 0;
        node.active = false;
        node.targetSize = 8;
      });
      
      connections.forEach(conn => {
        conn.active = false;
        conn.flow = 0;
        conn.particles = [];
      });
      
      // Activate input layer with a pattern
      const inputNodes = nodes.filter(n => n.layer === 0);
      const pattern = currentWave % 4;
      
      switch(pattern) {
        case 0: // All inputs
          inputNodes.forEach(node => activateNode(node, 0.8 + Math.random() * 0.2));
          break;
        case 1: // First two
          activateNode(inputNodes[0], 0.9);
          activateNode(inputNodes[1], 0.8);
          break;
        case 2: // Last two  
          activateNode(inputNodes[inputNodes.length - 1], 0.9);
          activateNode(inputNodes[inputNodes.length - 2], 0.8);
          break;
        case 3: // Random selection
          const count = 2 + Math.floor(Math.random() * 2);
          for (let i = 0; i < count; i++) {
            const randomNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
            activateNode(randomNode, 0.7 + Math.random() * 0.3);
          }
          break;
      }
      
      waveStartTime = frame;
      currentWave++;
    }
    
    function activateNode(node, strength) {
      node.targetActivation = strength;
      node.activation = strength * 0.5; // Start at half strength
      node.active = true;
      node.targetSize = 8 + strength * 6;
    }
    
    // Update network propagation
    function updateNetwork() {
      const waveAge = frame - waveStartTime;
      
      // Smooth transitions for all nodes
      nodes.forEach(node => {
        node.activation += (node.targetActivation - node.activation) * 0.15;
        node.size += (node.targetSize - node.size) * 0.1;
        
        if (node.activation > 0.1) {
          node.active = true;
        }
      });
      
      // Propagate wave through layers based on time
      const currentLayer = Math.floor(waveAge / 60); // New layer every 60 frames (1 second)
      
      if (currentLayer < layers.length - 1) {
        const layerNodes = nodes.filter(n => n.layer === currentLayer);
        
        layerNodes.forEach(sourceNode => {
          if (sourceNode.activation > 0.1) {
            // Find and activate connections
            const nodeConnections = connections.filter(c => c.from === sourceNode);
            
            nodeConnections.forEach(conn => {
              conn.active = true;
              conn.flow = Math.min(1.0, sourceNode.activation * conn.weight);
              
              // Propagate to target with guaranteed strength
              const propagationStrength = sourceNode.activation * conn.weight * 0.9;
              if (propagationStrength > 0.1) {
                conn.to.targetActivation = Math.max(
                  conn.to.targetActivation, 
                  propagationStrength
                );
                conn.to.targetSize = 8 + conn.to.targetActivation * 4;
                
                // Add particle
                if (Math.random() < 0.2) {
                  conn.particles.push({
                    position: 0,
                    life: 1.0,
                    speed: 0.02 + Math.random() * 0.02
                  });
                }
              }
            });
          }
        });
      }
      
      // Update particles
      connections.forEach(conn => {
        conn.particles.forEach(particle => {
          particle.position += particle.speed;
          particle.life -= 0.015;
        });
        
        conn.particles = conn.particles.filter(p => p.life > 0 && p.position <= 1);
      });
      
      // Check if wave reached the end or should restart
      const outputNodes = nodes.filter(n => n.layer === layers.length - 1);
      const outputActive = outputNodes.some(n => n.activation > 0.15);
      
      if (outputActive) {
        console.log('Wave reached output!');
      }
      
      // Start new wave every 6 seconds
      if (frame - lastWaveTime > 360) {
        startWave();
        lastWaveTime = frame;
      }
    }
    
    // Drawing functions
    function drawConnection(conn) {
      const { from, to } = conn;
      
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      
      // Simple curved connection
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2 + Math.sin((from.x + to.x) * 0.01) * 20;
      ctx.quadraticCurveTo(midX, midY, to.x, to.y);
      
      if (conn.active && conn.flow > 0) {
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.6 + conn.flow * 0.4})`);
        gradient.addColorStop(1, `rgba(147, 197, 253, 0.4)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = conn.weight * 2.5 + 1;
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 6 * conn.flow;
      } else {
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 + conn.weight * 0.2})`;
        ctx.lineWidth = conn.weight * 1.5 + 0.5;
        ctx.shadowBlur = 0;
      }
      
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw particles
      conn.particles.forEach(particle => {
        const t = particle.position;
        const x = (1-t)*(1-t)*from.x + 2*(1-t)*t*midX + t*t*to.x;
        const y = (1-t)*(1-t)*from.y + 2*(1-t)*t*midY + t*t*to.y;
        
        ctx.beginPath();
        ctx.arc(x, y, 3 + particle.life * 2, 0, Math.PI * 2);
        
        const alpha = particle.life * 0.8;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(0.7, `rgba(59, 130, 246, ${alpha * 0.8})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = grad;
        ctx.fill();
      });
    }
    
    function drawNode(node) {
      // Glow effect for active nodes
      if (node.active && node.activation > 0.3) {
        const glowSize = node.size + 6;
        const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        glowGrad.addColorStop(0, `${node.color}40`);
        glowGrad.addColorStop(1, `${node.color}00`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }
      
      // Main node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      
      if (node.active && node.activation > 0.1) {
        const nodeGrad = ctx.createRadialGradient(
          node.x - node.size * 0.3, node.y - node.size * 0.3, 0,
          node.x, node.y, node.size
        );
        
        nodeGrad.addColorStop(0, `rgba(255, 255, 255, ${0.3 + node.activation * 0.4})`);
        nodeGrad.addColorStop(0.4, node.color);
        nodeGrad.addColorStop(1, node.color + 'CC');
        
        ctx.fillStyle = nodeGrad;
      } else {
        ctx.fillStyle = '#e2e8f0';
      }
      
      ctx.fill();
      
      // Border
      ctx.lineWidth = node.active ? 2.5 : 1.5;
      ctx.strokeStyle = node.active ? node.color : '#94a3b8';
      ctx.stroke();
      
      // Inner highlight
      if (node.active && node.activation > 0.5) {
        ctx.beginPath();
        ctx.arc(
          node.x - node.size * 0.3, 
          node.y - node.size * 0.3, 
          node.size * 0.3, 
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${node.activation * 0.5})`;
        ctx.fill();
      }
    }
    
    function drawLabels() {
      layers.forEach((layer, index) => {
        const x = (index + 1) * layerSpacing;
        const layerNodes = nodes.filter(n => n.layer === index);
        const layerActive = layerNodes.some(n => n.active);
        
        // Label background
        const labelWidth = ctx.measureText(layer.label).width + 16;
        const labelY = height - 30;
        
        ctx.beginPath();
        ctx.roundRect(x - labelWidth/2, labelY - 10, labelWidth, 20, 10);
        
        if (layerActive) {
          ctx.fillStyle = `${layer.color}20`;
          ctx.shadowColor = `${layer.color}40`;
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 2;
        }
        
        ctx.fill();
        ctx.strokeStyle = layerActive ? layer.color : '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Label text
        ctx.font = '600 11px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = layerActive ? layer.color : '#64748b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(layer.label, x, labelY);
      });
    }
    
    // Main animation loop
    function animate() {
      frame++;
      
      // Clear canvas with gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(0.5, '#f1f5f9');
      bgGrad.addColorStop(1, '#e2e8f0');
      
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);
      
      updateNetwork();
      
      // Draw connections first
      connections.forEach(conn => drawConnection(conn));
      
      // Draw nodes on top
      nodes.forEach(node => drawNode(node));
      
      // Draw labels
      drawLabels();
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Start the animation
    startWave();
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-96 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200/60">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
      
      <div className="absolute top-4 left-4 flex items-center space-x-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <span className="text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          Red Neuronal IA
        </span>
      </div>
      
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-slate-200/30 to-transparent rounded-tl-full"></div>
    </div>
  );
};

export default ModernNeuralNetwork;
