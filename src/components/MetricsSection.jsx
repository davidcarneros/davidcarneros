import React from 'react';
import { academicData } from '../data/academicData';

const MetricsSection = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
        <h3 className="text-xl font-bold text-blue-600">{academicData.publications.length + academicData.conferences.length}</h3>
        <p className="text-sm text-gray-600">Publications</p>
      </div>
      <div className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
        <h3 className="text-xl font-bold text-purple-600">{academicData.metrics.researchYears}+</h3>
        <p className="text-sm text-gray-600">Years Research</p>
      </div>
      <div className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
        <h3 className="text-xl font-bold text-green-600">{academicData.metrics.hIndex}</h3>
        <p className="text-sm text-gray-600">h-index</p>
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors">
        <h3 className="text-xl font-bold text-yellow-600">{academicData.metrics.citations}</h3>
        <p className="text-sm text-gray-600">Citations</p>
      </div>
    </div>
  );
};

export default MetricsSection;