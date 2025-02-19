import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowRight, Book, Code, Brain, Database, Award, Zap } from 'lucide-react';

const GithubProfile = () => {
  const [activeTab, setActiveTab] = useState('research');
  
  const publications = [
    {
      title: "Automation of observational gait analysis through an optical 3D motion system and transformers",
      url: "https://doi.org/10.1007/s10489-024-06163-w",
      year: 2024
    },
    {
      title: "A comparison between Multilayer Perceptrons and Kolmogorov-Arnold Networks for multi-task classification in sitting posture recognition",
      url: "https://doi.org/10.1109/ACCESS.2024.3510034",
      year: 2024
    },
    {
      title: "Synthetic 3D full-body skeletal motion from 2D paths using RNN with LSTM cells and linear networks",
      url: "https://doi.org/10.1016/j.compbiomed.2024.108943",
      year: 2024
    }
  ];

  const researchAreas = [
    { icon: <Brain className="w-6 h-6" />, name: "Machine Learning & AI" },
    { icon: <Database className="w-6 h-6" />, name: "Synthetic Data" },
    { icon: <Code className="w-6 h-6" />, name: "CUDA Programming" },
    { icon: <Zap className="w-6 h-6" />, name: "Quantum Computing" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="text-center mb-12">
        <img 
          src="/api/placeholder/150/150" 
          alt="Profile" 
          className="rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          David Carneros-Prado
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Predoctoral Researcher in Advanced Computing Technologies
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {['research', 'publications', 'connect'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === tab 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="transition-all duration-300">
        {activeTab === 'research' && (
          <div className="grid grid-cols-2 gap-4">
            {researchAreas.map((area, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-lg transition-all flex items-center space-x-3 bg-gray-50 dark:bg-gray-800">
                {area.icon}
                <span>{area.name}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'publications' && (
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <a 
                key={index}
                href={pub.url}
                className="block p-4 border rounded-lg hover:shadow-lg transition-all bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{pub.title}</h3>
                    <p className="text-sm text-gray-500">{pub.year}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-500" />
                </div>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'connect' && (
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/dcarneros" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/YOUR_LINKEDIN" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/YOUR_TWITTER" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="mailto:your.email@example.com" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">10+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Publications</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">5+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Years Research</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="text-xl font-bold text-green-600 dark:text-green-400">3+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Active Projects</p>
        </div>
      </div>
    </div>
  );
};

export default GithubProfile;