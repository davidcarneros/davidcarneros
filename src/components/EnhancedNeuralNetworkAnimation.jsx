import React, { useEffect, useRef } from 'react';

const EnhancedNeuralNetworkAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Main animation effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Get container size
    const container = canvas.parentElement;
    const { width, height } = container.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Network configuration with updated colors
    const layerConfig = [
      { count: 4, label: 'Input Layer', color: '#3b82f6' },  // Más vibrante
      { count: 8, label: 'Hidden Layer 1', color: '#6366f1' },
      { count: 12, label: 'Hidden Layer 2', color: '#8b5cf6' },
      { count: 8, label: 'Hidden Layer 3', color: '#a855f7' },
      { count: 3, label: 'Output Layer', color: '#d946ef' }
    ];
    
    const layerSpacing = width / (layerConfig.length + 1);
    
    // Create nodes
    const nodes = [];
    
    layerConfig.forEach((layer, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing;
      const verticalSpacing = height / (layer.count + 1);
      
      for (let i = 0; i < layer.count; i++) {
        nodes.push({
          x,
          y: (i + 1) * verticalSpacing,
          layer: layerIndex,
          index: i,
          active: false,
          activation: 0,
          color: layer.color,
          connections: []
        });
      }
    });
    
    // Create connections
    nodes.forEach(node => {
      if (node.layer < layerConfig.length - 1) {
        const nextLayerNodes = nodes.filter(n => n.layer === node.layer + 1);
        
        // Crear menos conexiones - mayor selectividad
        nextLayerNodes.forEach(nextNode => {
          // Solo crear conexión con probabilidad del 70%
          if (Math.random() < 0.7) {
            node.connections.push({
              target: nextNode,
              weight: Math.random() * 2 - 1, // -1 to 1
              active: false,
              controlPoint: {
                x: (node.x + nextNode.x) / 2,
                y: (node.y + nextNode.y) / 2 + (Math.random() * 20 - 10)
              }
            });
          }
        });
      }
    });
    
    // Animation state
    let frame = 0;
    let currentCycleId = 0;
    let activeSignalLayer = 0;
    let waitingForNewCycle = false;
    let cycleCompleted = false;
    let cycleTimeoutId = null;
    
    // Start a new cycle with new input pattern
    function startNewCycle() {
      // Reset all nodes and connections
      nodes.forEach(node => {
        node.active = false;
        node.activation = 0;
        node.connections.forEach(conn => {
          conn.active = false;
        });
      });
      
      // Reset state
      activeSignalLayer = 0;
      cycleCompleted = false;
      waitingForNewCycle = false;
      currentCycleId++;
      
      // Activate random input nodes
      const inputNodes = nodes.filter(n => n.layer === 0);
      const patternType = currentCycleId % 5;
      
      switch(patternType) {
        case 0: // First two
          activateNode(inputNodes[0], 0.9);
          activateNode(inputNodes[1], 0.8);
          break;
        case 1: // Last two
          activateNode(inputNodes[inputNodes.length - 1], 0.9);
          activateNode(inputNodes[inputNodes.length - 2], 0.8);
          break;
        case 2: // Middle one
          activateNode(inputNodes[Math.floor(inputNodes.length / 2)], 1.0);
          break;
        case 3: // Alternating
          for (let i = 0; i < inputNodes.length; i += 2) {
            activateNode(inputNodes[i], 0.8 + Math.random() * 0.2);
          }
          break;
        case 4: // Random
          const count = 1 + Math.floor(Math.random() * 2);
          const usedIndices = new Set();
          
          for (let i = 0; i < count; i++) {
            let idx;
            do {
              idx = Math.floor(Math.random() * inputNodes.length);
            } while (usedIndices.has(idx));
            
            usedIndices.add(idx);
            activateNode(inputNodes[idx], 0.8 + Math.random() * 0.2);
          }
          break;
      }
    }
    
    function activateNode(node, strength) {
      node.active = true;
      node.activation = strength;
    }
    
    // Update network state
    function updateNetwork() {
      // If cycle completed and waiting for timeout, don't update
      if (cycleCompleted || waitingForNewCycle) return;
      
      // Check if signal reached output
      const outputLayer = layerConfig.length - 1;
      const outputNodes = nodes.filter(n => n.layer === outputLayer);
      const signalReachedOutput = outputNodes.some(n => n.active);
      
      if (signalReachedOutput && !cycleCompleted) {
        cycleCompleted = true;
        waitingForNewCycle = true;
        
        // Schedule new cycle after delay
        cycleTimeoutId = setTimeout(() => {
          startNewCycle();
        }, 1500);
        
        return;
      }
      
      // Get nodes from current active layer
      const currentLayerNodes = nodes.filter(n => n.layer === activeSignalLayer);
      const nextLayerNodes = nodes.filter(n => n.layer === activeSignalLayer + 1);
      
      // Check if current layer has any active nodes
      const currentLayerActive = currentLayerNodes.some(n => n.active);
      
      // If current layer has active nodes and we're not at the output layer
      if (currentLayerActive && activeSignalLayer < outputLayer) {
        // Activate connections from active nodes to next layer
        currentLayerNodes.forEach(node => {
          if (node.active) {
            // Find connections to next layer
            node.connections.forEach(conn => {
              // Activate the connection
              conn.active = true;
              
              // Add weighted input to target node
              const targetNode = conn.target;
              const inputStrength = node.activation * conn.weight;
              
              // Ser MÁS SELECTIVO - Solo activar si el peso es positivo Y bastante fuerte
              // Aumentamos el umbral para reducir las conexiones activas
              if (conn.weight > 0.3 && inputStrength > 0.25) {
                targetNode.activation = Math.max(targetNode.activation, inputStrength);
                targetNode.active = targetNode.activation > 0.3; // Umbral más alto
              }
            });
          }
        });
        
        // Check if any nodes in next layer got activated
        const nextLayerActivated = nextLayerNodes.some(n => n.active);
        
        // If next layer got activated, move signal forward
        if (nextLayerActivated) {
          activeSignalLayer++;
        }
      }
    }
    
    // Draw a curved connection
    function drawConnection(node, conn) {
      const isActive = node.active && conn.active;
      
      // Reducir sombras para mayor claridad
      if (isActive) {
        ctx.shadowColor = conn.weight > 0 ? 'rgba(79, 70, 229, 0.3)' : 'rgba(236, 72, 153, 0.3)';
        ctx.shadowBlur = 3;
      }
      
      // Draw connection
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.quadraticCurveTo(
        conn.controlPoint.x,
        conn.controlPoint.y,
        conn.target.x,
        conn.target.y
      );
      
      // Style based on activity and weight
      if (isActive) {
        // Active connections - simplificar
        const color = conn.weight > 0 
          ? `rgba(59, 130, 246, ${0.7 + node.activation * 0.3})` // Azul más natural
          : `rgba(219, 39, 119, ${0.7 + node.activation * 0.3})`; // Rosa más natural
        
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.abs(conn.weight) * 3 + 1; // Un poco más fino
      } else {
        // Conexiones inactivas - más visibles
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)'; // Gris medio más visible
        ctx.lineWidth = Math.abs(conn.weight) * 1.2 + 0.7;
      }
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      // Draw pulse if connection is active
      if (isActive && conn.target.active) {
        const pulseSpeed = 0.005;
        const pulsePhase = (frame * pulseSpeed + node.layer * 0.2) % 1;
        
        // Position along the curve
        const t = pulsePhase;
        const pulseX = (1-t)*(1-t)*node.x + 2*(1-t)*t*conn.controlPoint.x + t*t*conn.target.x;
        const pulseY = (1-t)*(1-t)*node.y + 2*(1-t)*t*conn.controlPoint.y + t*t*conn.target.y;
        
        // Simplificar pulse
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3 + node.activation * 2, 0, Math.PI * 2); // Tamaño normal
        
        const pulseColor = conn.weight > 0 ? '#3b82f6' : '#db2777';
        ctx.fillStyle = pulseColor;
        ctx.fill();
      }
    }
    
    // Draw a node
    function drawNode(node) {
      const nodeSize = 8;
      
      // Simplificar el brillo para nodos activos
      if (node.active) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + node.activation * 0.2})`; // Brillo más sutil
        ctx.fill();
      }
      
      // Reducir sombras para mayor claridad
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
      
      // Simplificar relleno
      if (node.active) {
        ctx.fillStyle = node.color;
      } else {
        ctx.fillStyle = '#e2e8f0';
      }
      ctx.fill();
      
      // Quitar sombra para el borde
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw border
      ctx.lineWidth = node.active ? 2 : 1.5;
      ctx.strokeStyle = node.active ? node.color : '#94a3b8';
      ctx.stroke();
    }
    
    // Draw layer labels
    function drawLabels() {
      layerConfig.forEach((layer, index) => {
        const x = (index + 1) * layerSpacing;
        
        // Reducir sombra para mayor claridad
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 2;
        
        // Layer name
        ctx.font = 'bold 13px sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.textAlign = 'center';
        ctx.fillText(layer.label, x, height - 20);
        
        // Eliminar sombra
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      });
    }
    
    // Animation loop
    function animate() {
      frame++;
      
      // Clear canvas
      ctx.fillStyle = '#f8fafc'; // Fondo más claro y neutro
      ctx.fillRect(0, 0, width, height);
      
      // Update network state (propagate signals)
      updateNetwork();
      
      // Draw all inactive connections first
      nodes.forEach(node => {
        node.connections.forEach(conn => {
          if (!node.active || !conn.active) {
            drawConnection(node, conn);
          }
        });
      });
      
      // Then draw active connections on top for better visibility
      nodes.forEach(node => {
        node.connections.forEach(conn => {
          if (node.active && conn.active) {
            drawConnection(node, conn);
          }
        });
      });
      
      // Draw all nodes on top
      nodes.forEach(node => {
        drawNode(node);
      });
      
      // Draw layer labels
      drawLabels();
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Start initial cycle and animation
    startNewCycle();
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (cycleTimeoutId) {
        clearTimeout(cycleTimeoutId);
      }
    };
  }, []);

  return (
    <div className="relative h-96 w-full bg-slate-50 rounded-lg overflow-hidden shadow-md border border-slate-200">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
      {/* <div className="absolute bottom-3 left-3 text-xs text-slate-700 bg-white bg-opacity-90 p-2 rounded-md shadow-sm border border-slate-100">
        <div className="font-medium">Neural Network Visualization</div>
      </div> */}
    </div>
  );
};

export default EnhancedNeuralNetworkAnimation;