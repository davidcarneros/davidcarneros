import React from 'react';
import { academicData } from '../data/academicData';

const MetricsSection = () => {
  const metrics = [
    {
      value: academicData.publications.length + academicData.conferences.length,
      label: 'Publications',
      color: 'text-primary-400',
      bg: 'bg-primary-500/10',
      border: 'border-primary-500/20'
    },
    {
      value: academicData.metrics.researchYears + '+',
      label: 'Years Research',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      value: academicData.metrics.hIndex,
      label: 'h-index',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      value: academicData.metrics.citations,
      label: 'Citations',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className={`p-6 rounded-2xl text-center backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${metric.bg} ${metric.border}`}>
          <h3 className={`text-4xl font-bold mb-1 ${metric.color}`}>{metric.value}</h3>
          <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">{metric.label}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsSection;