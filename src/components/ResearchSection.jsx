import React from 'react';
import { BarChart, Atom } from 'lucide-react';
import { academicData } from '../data/academicData';
import ModernNeuralNetwork from './ModernNeuralNetwork';

const ResearchSection = () => {
  // Separar las áreas de investigación en tradicionales y nuevas
  const traditionalResearchAreas = academicData.researchAreas
    .filter(area => !['Quantum Computing', 'CUDA & GPU Computing'].includes(area.name));
  
  const newResearchAreas = academicData.researchAreas
    .filter(area => ['Quantum Computing', 'CUDA & GPU Computing'].includes(area.name));
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <BarChart className="w-6 h-6 text-blue-500" />
        Research Areas
      </h2>
      
      {/* Áreas de investigación tradicionales */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Current Research Lines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {traditionalResearchAreas.map((area, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3 hover:shadow-md transition-all duration-300 card-hover"
            >
              {area.createIcon()}
              <span className="text-gray-700 font-medium">{area.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Nuevas áreas de investigación */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Atom className="w-5 h-5 text-purple-500" />
          Emerging Research Lines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newResearchAreas.map((area, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-lg border border-purple-200 flex items-center gap-3 hover:shadow-md transition-all duration-300 card-hover bg-gradient-to-r from-white to-purple-50"
            >
              {area.createIcon()}
              <span className="text-gray-700 font-medium">{area.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Neural Network Animation siempre visible en la parte inferior con styling mejorado */}
      <div className="mt-8 bg-gradient-to-b from-white to-blue-50 p-5 rounded-xl shadow-lg overflow-hidden border border-blue-100">
        <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.5 14.5L3 11l6.5-3.5M9.5 14.5l6.5-3.5M9.5 14.5V21M9.5 14.5V8M16 11l6.5-3.5L16 4m0 7l-6.5-3.5M16 11v7m0-7V4" />
          </svg>
          Neural Network Visualization
        </h3>
        <ModernNeuralNetwork />
      </div>
    </div>
  );
};

export default ResearchSection;