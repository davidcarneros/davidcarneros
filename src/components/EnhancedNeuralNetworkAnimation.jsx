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
    
    // Modern AI-inspired network configuration
    const layerConfig = [
      { 
        count: 5, 
        label: 'Input', 
        color: '#06b6d4', // Cyan
        gradient: ['#06b6d4', '#0891b2']
      },
      { 
        count: 12, 
        label: 'Feature Extraction', 
        color: '#3b82f6', // Blue
        gradient: ['#3b82f6', '#1d4ed8']
      },
      { 
        count: 16, 
        label: 'Hidden Processing', 
        color: '#8b5cf6', // Purple
        gradient: ['#8b5cf6', '#7c3aed']
      },
      { 
        count: 10, 
        label: 'Pattern Recognition', 
        color: '#ec4899', // Pink
        gradient: ['#ec4899', '#db2777']
      },
      { 
        count: 3, 
        label: 'Output', 
        color: '#f59e0b', // Amber
        gradient: ['#f59e0b', '#d97706']
      }
    ];
    
    const layerSpacing = width / (layerConfig.length + 1);
    
    // Create nodes with enhanced properties
    const nodes = [];
    const particles = []; // For flowing particles
    
    layerConfig.forEach((layer, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing;
      const verticalSpacing = height / (layer.count + 1);
      
      for (let i = 0; i < layer.count; i++) {
        const y = (i + 1) * verticalSpacing;
        nodes.push({
          x,
          y,
          layer: layerIndex,
          index: i,
          active: false,
          activation: 0,
          targetActivation: 0,
          color: layer.color,
          gradient: layer.gradient,
          size: 8,
          targetSize: 8,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
          // Visual enhancement properties
          glowIntensity: 0,
          targetGlow: 0
        });
      }
    });
    
    // Create elegant connections with better distribution
    nodes.forEach(node => {
      if (node.layer < layerConfig.length - 1) {
        const nextLayerNodes = nodes.filter(n => n.layer === node.layer + 1);
        
        // Create selective connections based on layer size differences
        const connectionProbability = Math.min(0.9, 8 / nextLayerNodes.length);
        
        nextLayerNodes.forEach(nextNode => {
          if (Math.random() < connectionProbability) {
            const dx = nextNode.x - node.x;
            const dy = nextNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            node.connections.push({
              target: nextNode,
              weight: Math.random() * 0.8 + 0.2, // Positive weights only, range 0.2-1.0 for better propagation
              active: false,
              activationFlow: 0,
              targetFlow: 0,
              distance: distance,
              // Elegant curve control points
              controlPoint1: {
                x: node.x + dx * 0.3 + (Math.random() * 30 - 15),
                y: node.y + dy * 0.3 + (Math.random() * 40 - 20)
              },
              controlPoint2: {
                x: node.x + dx * 0.7 + (Math.random() * 30 - 15),
                y: node.y + dy * 0.7 + (Math.random() * 40 - 20)
              },
              // Particle system for this connection
              particles: []
            });
          }
        });
      }
    });
    
    // Enhanced animation state
    let frame = 0;
    let time = 0;
    let currentCycleId = 0;
    let activeSignalLayer = 0;
    let waitingForNewCycle = false;
    let cycleCompleted = false;
    let cycleTimeoutId = null;
    let lastFrameTime = performance.now();
    
    // Start a new cycle with elegant input patterns
    function startNewCycle() {
      // Smooth reset of all nodes and connections
      nodes.forEach(node => {
        node.active = false;
        node.targetActivation = 0;
        node.activation = 0;
        node.targetSize = 8;
        node.targetGlow = 0;
        node.connections.forEach(conn => {
          conn.active = false;
          conn.targetFlow = 0;
          conn.particles = []; // Clear particles
        });
      });
      
      // Reset state
      activeSignalLayer = 0;
      cycleCompleted = false;
      waitingForNewCycle = false;
      currentCycleId++;
      
      console.log(`Starting new cycle ${currentCycleId}`); // Debug log
      
      // Create interesting input patterns
      const inputNodes = nodes.filter(n => n.layer === 0);
      const patternType = currentCycleId % 7;
      
      setTimeout(() => {
        switch(patternType) {
          case 0: // Sequential wave
            inputNodes.forEach((node, i) => {
              setTimeout(() => {
                activateNode(node, 0.8 + Math.random() * 0.2);
              }, i * 200);
            });
            break;
          case 1: // Center outward
            const center = Math.floor(inputNodes.length / 2);
            activateNode(inputNodes[center], 1.0);
            if (center > 0) setTimeout(() => activateNode(inputNodes[center - 1], 0.8), 150);
            if (center < inputNodes.length - 1) setTimeout(() => activateNode(inputNodes[center + 1], 0.8), 150);
            break;
          case 2: // Edges inward
            activateNode(inputNodes[0], 0.9);
            activateNode(inputNodes[inputNodes.length - 1], 0.9);
            setTimeout(() => {
              if (inputNodes.length > 2) {
                activateNode(inputNodes[1], 0.7);
                activateNode(inputNodes[inputNodes.length - 2], 0.7);
              }
            }, 200);
            break;
          case 3: // Random burst
            const burstCount = 2 + Math.floor(Math.random() * 2);
            const usedIndices = new Set();
            for (let i = 0; i < burstCount; i++) {
              let idx;
              do {
                idx = Math.floor(Math.random() * inputNodes.length);
              } while (usedIndices.has(idx));
              usedIndices.add(idx);
              setTimeout(() => {
                activateNode(inputNodes[idx], 0.7 + Math.random() * 0.3);
              }, Math.random() * 300);
            }
            break;
          case 4: // Alternating pattern
            inputNodes.forEach((node, i) => {
              if (i % 2 === 0) {
                setTimeout(() => {
                  activateNode(node, 0.8 + Math.random() * 0.2);
                }, i * 100);
              }
            });
            break;
          case 5: // Gradient activation
            inputNodes.forEach((node, i) => {
              const strength = 0.5 + (0.5 * i / (inputNodes.length - 1));
              setTimeout(() => {
                activateNode(node, strength);
              }, i * 100);
            });
            break;
          case 6: // Single strong signal
            const randomNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
            activateNode(randomNode, 1.0);
            break;
        }
      }, 300);
    }
    
    function activateNode(node, strength) {
      node.active = true;
      node.targetActivation = strength;
      node.targetSize = 8 + strength * 6;
      node.targetGlow = strength;
    }
    
    // Enhanced network state update with smooth transitions
    function updateNetwork(deltaTime) {
      // Smooth property transitions for all nodes
      nodes.forEach(node => {
        // Smooth activation transitions
        const activationSpeed = 0.1;
        node.activation += (node.targetActivation - node.activation) * activationSpeed;
        
        // Smooth size transitions
        const sizeSpeed = 0.08;
        node.size += (node.targetSize - node.size) * sizeSpeed;
        
        // Smooth glow transitions
        const glowSpeed = 0.15;
        node.glowIntensity += (node.targetGlow - node.glowIntensity) * glowSpeed;
      });
      
      // Update connection flows
      nodes.forEach(node => {
        node.connections.forEach(conn => {
          const flowSpeed = 0.12;
          conn.activationFlow += (conn.targetFlow - conn.activationFlow) * flowSpeed;
          
          // Update particles in active connections
          if (conn.active && conn.activationFlow > 0.1) {
            // Add new particles occasionally
            if (Math.random() < 0.15 * conn.activationFlow) {
              conn.particles.push({
                position: 0,
                life: 1.0,
                intensity: conn.activationFlow,
                speed: 0.01 + Math.random() * 0.02
              });
            }
            
            // Update existing particles
            conn.particles.forEach(particle => {
              particle.position += particle.speed;
              particle.life -= 0.02;
            });
            
            // Remove dead particles
            conn.particles = conn.particles.filter(p => p.life > 0 && p.position <= 1);
          }
        });
      });
      
      // If cycle completed and waiting for timeout, don't update network logic
      if (cycleCompleted || waitingForNewCycle) return;
      
      // Check if signal reached output
      const outputLayer = layerConfig.length - 1;
      const outputNodes = nodes.filter(n => n.layer === outputLayer);
      const signalReachedOutput = outputNodes.some(n => n.activation > 0.2);
      
      if (signalReachedOutput && !cycleCompleted) {
        console.log('Signal reached output! Completing cycle.'); // Debug log
        cycleCompleted = true;
        waitingForNewCycle = true;
        
        // Schedule new cycle after delay
        cycleTimeoutId = setTimeout(() => {
          startNewCycle();
        }, 3000);
        
        return;
      }
      
      // Enhanced propagation logic to ensure signals reach the output
      if (activeSignalLayer < outputLayer) {
        const currentLayerNodes = nodes.filter(n => n.layer === activeSignalLayer);
        const currentLayerActive = currentLayerNodes.some(n => n.activation > 0.15);
        
        if (currentLayerActive) {
          // Propagate from current layer to next layer
          currentLayerNodes.forEach(node => {
            if (node.activation > 0.15) {
              node.connections.forEach(conn => {
                conn.active = true;
                conn.targetFlow = Math.min(1.0, node.activation * Math.abs(conn.weight));
                
                const targetNode = conn.target;
                const inputStrength = node.activation * Math.abs(conn.weight);
                
                // More lenient activation - ensure signal propagates
                if (conn.weight > 0.05 && inputStrength > 0.1) {
                  targetNode.targetActivation = Math.max(
                    targetNode.targetActivation, 
                    Math.min(1.0, inputStrength * 1.1) // Amplify slightly to ensure propagation
                  );
                  targetNode.targetSize = 8 + targetNode.targetActivation * 4;
                  targetNode.targetGlow = targetNode.targetActivation;
                  targetNode.active = targetNode.targetActivation > 0.15;
                }
              });
            }
          });
          
          // Move to next layer after enough time has passed
          if (frame % 90 === 0) { // Move every 1.5 seconds
            const nextLayerNodes = nodes.filter(n => n.layer === activeSignalLayer + 1);
            const nextLayerHasSignal = nextLayerNodes.some(n => n.targetActivation > 0.1);
            
            if (nextLayerHasSignal || activeSignalLayer === 0) { // Always move from input layer
              activeSignalLayer++;
              console.log(`Moving to layer ${activeSignalLayer}`); // Debug log
            }
          }
        }
      }
      
      // Also propagate from all active layers simultaneously for better flow
      for (let layer = 0; layer < activeSignalLayer; layer++) {
        const layerNodes = nodes.filter(n => n.layer === layer);
        layerNodes.forEach(node => {
          if (node.activation > 0.1) {
            node.connections.forEach(conn => {
              const targetNode = conn.target;
              const inputStrength = node.activation * Math.abs(conn.weight);
              
              if (conn.weight > 0.05 && inputStrength > 0.08) {
                targetNode.targetActivation = Math.max(
                  targetNode.targetActivation, 
                  Math.min(1.0, inputStrength * 0.8)
                );
                targetNode.active = targetNode.targetActivation > 0.1;
              }
            });
          }
        });
      }
    }
    
    // Create elegant gradient
    function createGradient(x1, y1, x2, y2, colors) {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      return gradient;
    }

    // Draw beautiful curved connection with smooth bezier curves
    function drawConnection(node, conn) {
      const isActive = node.active && conn.active;
      const flowIntensity = conn.activationFlow;
      
      // Smooth connection line with bezier curves
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.bezierCurveTo(
        conn.controlPoint1.x, conn.controlPoint1.y,
        conn.controlPoint2.x, conn.controlPoint2.y,
        conn.target.x, conn.target.y
      );
      
      // Enhanced connection styling
      if (isActive && flowIntensity > 0) {
        // Active connections with gradient flow
        const gradient = createGradient(
          node.x, node.y, 
          conn.target.x, conn.target.y,
          ['rgba(59, 130, 246, 0.8)', 'rgba(147, 197, 253, 0.4)']
        );
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.abs(conn.weight) * 2.5 + 1.5;
        
        // Add glow effect for active connections
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 8 * flowIntensity;
      } else {
        // Subtle inactive connections
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.2 + Math.abs(conn.weight) * 0.15})`;
        ctx.lineWidth = Math.abs(conn.weight) * 1.2 + 0.5;
        ctx.shadowBlur = 0;
      }
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      // Draw flowing particles for active connections
      if (isActive && conn.particles.length > 0) {
        conn.particles.forEach(particle => {
          if (particle.life > 0) {
            const t = particle.position;
            
            // Calculate position on bezier curve
            const x = Math.pow(1-t, 3) * node.x + 
                     3 * Math.pow(1-t, 2) * t * conn.controlPoint1.x +
                     3 * (1-t) * Math.pow(t, 2) * conn.controlPoint2.x +
                     Math.pow(t, 3) * conn.target.x;
            
            const y = Math.pow(1-t, 3) * node.y + 
                     3 * Math.pow(1-t, 2) * t * conn.controlPoint1.y +
                     3 * (1-t) * Math.pow(t, 2) * conn.controlPoint2.y +
                     Math.pow(t, 3) * conn.target.y;
            
            // Draw particle with trail effect
            const alpha = particle.life * 0.8;
            const size = 3 + particle.intensity * 2;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            
            const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            particleGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            particleGradient.addColorStop(0.7, `rgba(59, 130, 246, ${alpha * 0.8})`);
            particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = particleGradient;
            ctx.fill();
          }
        });
      }
    }
    
    // Draw a beautiful modern node
    function drawNode(node) {
      const currentSize = node.size;
      const pulseValue = Math.sin(time * 0.003 + node.pulsePhase) * 0.5 + 0.5;
      
      // Outer glow effect for active nodes
      if (node.active && node.glowIntensity > 0) {
        const glowSize = currentSize + 8 + pulseValue * 4;
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        
        glowGradient.addColorStop(0, `${node.color}40`);
        glowGradient.addColorStop(0.5, `${node.color}20`);
        glowGradient.addColorStop(1, `${node.color}00`);
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }
      
      // Main node circle with gradient
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
      
      if (node.active) {
        // Active node with gradient fill
        const nodeGradient = ctx.createRadialGradient(
          node.x - currentSize * 0.3, node.y - currentSize * 0.3, 0,
          node.x, node.y, currentSize
        );
        
        const intensity = node.activation;
        nodeGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + intensity * 0.4})`);
        nodeGradient.addColorStop(0.4, node.gradient[0]);
        nodeGradient.addColorStop(1, node.gradient[1]);
        
        ctx.fillStyle = nodeGradient;
      } else {
        // Inactive node with subtle gradient
        const inactiveGradient = ctx.createRadialGradient(
          node.x - currentSize * 0.3, node.y - currentSize * 0.3, 0,
          node.x, node.y, currentSize
        );
        
        inactiveGradient.addColorStop(0, '#f1f5f9');
        inactiveGradient.addColorStop(1, '#cbd5e1');
        ctx.fillStyle = inactiveGradient;
      }
      
      ctx.fill();
      
      // Modern border with subtle shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetY = 1;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
      ctx.lineWidth = node.active ? 2.5 : 1.5;
      ctx.strokeStyle = node.active ? node.color : '#94a3b8';
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      
      // Inner highlight for active nodes
      if (node.active && node.activation > 0.5) {
        ctx.beginPath();
        ctx.arc(
          node.x - currentSize * 0.3, 
          node.y - currentSize * 0.3, 
          currentSize * 0.3, 
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${node.activation * 0.6})`;
        ctx.fill();
      }
    }
    
    // Draw elegant layer labels with modern styling
    function drawLabels() {
      layerConfig.forEach((layer, index) => {
        const x = (index + 1) * layerSpacing;
        const layerNodes = nodes.filter(n => n.layer === index);
        const layerActive = layerNodes.some(n => n.active);
        
        // Background pill for label
        const labelWidth = ctx.measureText(layer.label).width + 20;
        const labelHeight = 24;
        const labelY = height - 35;
        
        // Draw label background
        ctx.beginPath();
        ctx.roundRect(x - labelWidth/2, labelY - labelHeight/2, labelWidth, labelHeight, 12);
        
        if (layerActive) {
          // Active layer styling
          const activeGradient = ctx.createLinearGradient(
            x - labelWidth/2, labelY - labelHeight/2,
            x + labelWidth/2, labelY + labelHeight/2
          );
          activeGradient.addColorStop(0, `${layer.color}20`);
          activeGradient.addColorStop(1, `${layer.color}10`);
          ctx.fillStyle = activeGradient;
          
          ctx.shadowColor = `${layer.color}40`;
          ctx.shadowBlur = 8;
        } else {
          // Inactive layer styling
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
          ctx.shadowBlur = 4;
        }
        
        ctx.fill();
        
        // Label border
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = layerActive ? layer.color : '#cbd5e1';
        ctx.stroke();
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Layer name text
        ctx.font = '600 12px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = layerActive ? layer.color : '#64748b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(layer.label, x, labelY);
        
        // Node count indicator
        ctx.font = '400 10px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = layerActive ? `${layer.color}CC` : '#94a3b8';
        ctx.fillText(`${layer.count} nodes`, x, labelY + 15);
      });
    }
    
    // Enhanced animation loop with smooth timing
    function animate(currentTime) {
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      
      frame++;
      time = currentTime;
      
      // Create beautiful gradient background
      const backgroundGradient = ctx.createLinearGradient(0, 0, width, height);
      backgroundGradient.addColorStop(0, '#f8fafc');
      backgroundGradient.addColorStop(0.5, '#f1f5f9');
      backgroundGradient.addColorStop(1, '#e2e8f0');
      
      ctx.fillStyle = backgroundGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add subtle texture overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let i = 0; i < width; i += 20) {
        for (let j = 0; j < height; j += 20) {
          if (Math.random() > 0.7) {
            ctx.fillRect(i, j, 1, 1);
          }
        }
      }
      
      // Update network state with delta time
      updateNetwork(deltaTime);
      
      // Draw connections in order: inactive first, then active
      const allConnections = [];
      nodes.forEach(node => {
        node.connections.forEach(conn => {
          allConnections.push({ node, conn });
        });
      });
      
      // Sort connections by activity (inactive first)
      allConnections.sort((a, b) => {
        const aActive = a.node.active && a.conn.active;
        const bActive = b.node.active && b.conn.active;
        if (aActive === bActive) return 0;
        return aActive ? 1 : -1;
      });
      
      // Draw all connections
      allConnections.forEach(({ node, conn }) => {
        drawConnection(node, conn);
      });
      
      // Draw all nodes with depth sorting
      const sortedNodes = [...nodes].sort((a, b) => {
        if (a.active === b.active) return 0;
        return a.active ? 1 : -1;
      });
      
      sortedNodes.forEach(node => {
        drawNode(node);
      });
      
      // Draw elegant layer labels
      drawLabels();
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Start initial cycle and animation
    startNewCycle();
    animationRef.current = requestAnimationFrame(animate);
    
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
    <div className="relative h-96 w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200/60 backdrop-blur-sm">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* Modern info overlay */}
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
      
      {/* Subtle corner decoration */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-slate-200/30 to-transparent rounded-tl-full"></div>
    </div>
  );
};

export default EnhancedNeuralNetworkAnimation;