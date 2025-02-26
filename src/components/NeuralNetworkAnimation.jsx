import React, { useEffect, useRef } from 'react';

const NeuralNetworkAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Nodes and connections for a simple CNN visualization
      const nodes = [];
      const layerConfig = [4, 8, 16, 8, 4]; // CNN layers
      const layerSpacing = width / (layerConfig.length + 1);
      
      // Create node positions
      layerConfig.forEach((nodeCount, layerIndex) => {
        const x = (layerIndex + 1) * layerSpacing;
        const verticalSpacing = height / (nodeCount + 1);
        
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x,
            y: (i + 1) * verticalSpacing,
            layer: layerIndex,
            connections: [],
            active: Math.random() > 0.5,
            activation: Math.random()
          });
        }
      });
      
      // Create connections between layers
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.layer < layerConfig.length - 1) {
          const nextLayerNodes = nodes.filter(n => n.layer === node.layer + 1);
          nextLayerNodes.forEach(nextNode => {
            node.connections.push({
              target: nextNode,
              weight: Math.random()
            });
          });
        }
      }
      
      // Animation loop
      let frame = 0;
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        nodes.forEach(node => {
          node.connections.forEach(conn => {
            const pulsePhase = (frame * 0.01 + node.layer * 0.2) % 1;
            const pulseX = node.x + (conn.target.x - node.x) * pulsePhase;
            const pulseY = node.y + (conn.target.y - node.y) * pulsePhase;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(conn.target.x, conn.target.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${conn.weight * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Pulse effect
            if (node.active) {
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
              ctx.fillStyle = '#3b82f6';
              ctx.fill();
            }
          });
        });
        
        // Draw nodes
        nodes.forEach((node) => {
          // Periodically activate random nodes
          if (frame % 60 === 0) {
            node.active = Math.random() > 0.5;
          }
          
          ctx.beginPath();
          const radius = 6;
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          
          // Different colors for different layers
          const layerColors = ['#60a5fa', '#3b82f6', '#2563eb', '#3b82f6', '#60a5fa'];
          ctx.fillStyle = node.active ? layerColors[node.layer] : '#cbd5e1';
          ctx.fill();
        });
        
        frame++;
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, []);

  return (
    <div className="relative h-64 w-full bg-gray-50 rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={300} 
        className="w-full h-full"
      />
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white bg-opacity-70 p-1 rounded">
        Convolutional Neural Network Animation
      </div>
    </div>
  );
};

export default NeuralNetworkAnimation;