import React, { useState, useEffect } from 'react';

const CnnVisualization = () => {
  const [activeNodes, setActiveNodes] = useState({});
  
  // Setup network layers
  const layers = [
    { type: 'input', nodes: 4, label: 'Input' },
    { type: 'conv', nodes: 8, label: 'Conv2D' },
    { type: 'pool', nodes: 8, label: 'MaxPool' },
    { type: 'conv', nodes: 16, label: 'Conv2D' },
    { type: 'pool', nodes: 16, label: 'MaxPool' },
    { type: 'dense', nodes: 8, label: 'Dense' },
    { type: 'output', nodes: 4, label: 'Output' }
  ];
  
  // Simulate network activity
  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveNodes = {};
      
      layers.forEach((layer, layerIndex) => {
        newActiveNodes[layerIndex] = [];
        
        // Randomly activate nodes in each layer
        for (let i = 0; i < layer.nodes; i++) {
          if (Math.random() > 0.7) {
            newActiveNodes[layerIndex].push(i);
          }
        }
      });
      
      setActiveNodes(newActiveNodes);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  // Constants for visualization
  const svgWidth = 800;
  const svgHeight = 300;
  const nodeRadius = 6;
  const layerSpacing = svgWidth / (layers.length + 1);
  
  return (
    <div className="w-full overflow-x-auto bg-gray-50 rounded-lg p-4">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Draw connections between layers */}
        {layers.map((layer, layerIndex) => {
          if (layerIndex < layers.length - 1) {
            const nextLayer = layers[layerIndex + 1];
            const x1 = (layerIndex + 1) * layerSpacing;
            const x2 = (layerIndex + 2) * layerSpacing;
            
            return (
              <g key={`connections-${layerIndex}`}>
                {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
                  const y1 = (nodeIndex + 1) * (svgHeight / (layer.nodes + 1));
                  
                  return nextLayer.nodes > 0 ? Array.from({ length: nextLayer.nodes }).map((_, nextNodeIndex) => {
                    const y2 = (nextNodeIndex + 1) * (svgHeight / (nextLayer.nodes + 1));
                    const isActive = activeNodes[layerIndex]?.includes(nodeIndex) && 
                                    activeNodes[layerIndex + 1]?.includes(nextNodeIndex);
                    
                    return (
                      <line 
                        key={`connection-${layerIndex}-${nodeIndex}-${nextNodeIndex}`}
                        x1={x1} 
                        y1={y1} 
                        x2={x2} 
                        y2={y2}
                        stroke={isActive ? "#3b82f6" : "#e5e7eb"}
                        strokeWidth={isActive ? 1.5 : 0.5}
                        strokeOpacity={isActive ? 0.8 : 0.3}
                      />
                    );
                  }) : null;
                })}
              </g>
            );
          }
          return null;
        })}
        
        {/* Draw nodes for each layer */}
        {layers.map((layer, layerIndex) => {
          const x = (layerIndex + 1) * layerSpacing;
          
          return (
            <g key={`layer-${layerIndex}`}>
              {/* Layer label */}
              <text 
                x={x} 
                y={svgHeight - 10} 
                textAnchor="middle" 
                fontSize="12" 
                fill="#4b5563"
              >
                {layer.label}
              </text>
              
              {/* Nodes */}
              {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
                const y = (nodeIndex + 1) * (svgHeight / (layer.nodes + 1));
                const isActive = activeNodes[layerIndex]?.includes(nodeIndex);
                
                let nodeColor;
                switch(layer.type) {
                  case 'input': nodeColor = isActive ? "#3b82f6" : "#93c5fd"; break;
                  case 'conv': nodeColor = isActive ? "#8b5cf6" : "#c4b5fd"; break;
                  case 'pool': nodeColor = isActive ? "#ec4899" : "#f9a8d4"; break;
                  case 'dense': nodeColor = isActive ? "#10b981" : "#a7f3d0"; break;
                  case 'output': nodeColor = isActive ? "#f59e0b" : "#fcd34d"; break;
                  default: nodeColor = isActive ? "#6b7280" : "#d1d5db";
                }
                
                return (
                  <circle 
                    key={`node-${layerIndex}-${nodeIndex}`}
                    cx={x} 
                    cy={y} 
                    r={nodeRadius}
                    fill={nodeColor}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CnnVisualization;