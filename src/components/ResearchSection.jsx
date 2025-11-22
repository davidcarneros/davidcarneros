import React from 'react';
import { BarChart, Atom, Brain } from 'lucide-react';
import { academicData } from '../data/academicData';
import ViTAnimation from './ViTAnimation';

const ResearchSection = () => {
  // Separar las áreas de investigación en tradicionales y nuevas
  const traditionalResearchAreas = academicData.researchAreas
    .filter(area => !['Quantum Computing', 'CUDA & GPU Computing'].includes(area.name));

  const newResearchAreas = academicData.researchAreas
    .filter(area => ['Quantum Computing', 'CUDA & GPU Computing'].includes(area.name));

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-500/10 rounded-xl">
          <BarChart className="w-8 h-8 text-primary-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">
          Research Areas
        </h2>
      </div>

      {/* Áreas de investigación tradicionales */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-gray-300 border-l-4 border-primary-500 pl-4">Current Research Lines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traditionalResearchAreas.map((area, index) => (
            <div
              key={index}
              className="group p-6 bg-dark-surface rounded-xl border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-dark-bg rounded-lg group-hover:scale-110 transition-transform duration-300 text-primary-400">
                  {area.createIcon()}
                </div>
                <span className="text-lg text-gray-200 font-medium group-hover:text-primary-400 transition-colors">{area.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nuevas áreas de investigación */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-gray-300 border-l-4 border-purple-500 pl-4 flex items-center gap-2">
          Emerging Research Lines
          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">New</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newResearchAreas.map((area, index) => (
            <div
              key={index}
              className="group p-6 bg-dark-surface rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-dark-bg rounded-lg group-hover:scale-110 transition-transform duration-300 text-purple-400">
                  {area.createIcon()}
                </div>
                <span className="text-lg text-gray-200 font-medium group-hover:text-purple-400 transition-colors">{area.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neural Network Animation */}
      <div className="mt-12 bg-dark-surface rounded-2xl p-1 border border-dark-border overflow-hidden">
        <div className="bg-dark-bg/50 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-primary-400 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Vision Transformer Visualization
          </h3>
          <ViTAnimation />
        </div>
      </div>
    </div>
  );
};

export default ResearchSection;