import React, { useState } from 'react';
import foto from '../assets/foto.jpeg';
import { Github, Linkedin, Twitter, Mail, ArrowRight, Brain, Database, Code, Zap } from 'lucide-react';

const GithubProfile = () => {
  const [activeTab, setActiveTab] = useState('research');
  
  const publications = [
    {
      title: "Automation of observational gait analysis through an optical 3D motion system and transformers",
      url: "https://doi.org/10.1007/s10489-024-06163-w",
      year: 2025
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
    { icon: <Brain className="w-6 h-6 text-blue-500" />, name: "Machine Learning & AI" },
    { icon: <Database className="w-6 h-6 text-blue-500" />, name: "Synthetic Data" },
    { icon: <Code className="w-6 h-6 text-blue-500" />, name: "CUDA Programming" },
    { icon: <Zap className="w-6 h-6 text-blue-500" />, name: "Quantum Computing" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
            <img 
            src={foto} 
            alt="Profile" 
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <h1 className="text-4xl font-bold mb-2 text-blue-600">
            David Carneros-Prado
          </h1>
          <p className="text-xl text-gray-600">
            Predoctoral Researcher in Advanced Computing Technologies
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          {['research', 'publications', 'connect'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="mb-8">
          {activeTab === 'research' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {researchAreas.map((area, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3 hover:shadow-md transition-shadow">
                  {area.icon}
                  <span className="text-gray-700 font-medium">{area.name}</span>
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
                  className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{pub.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{pub.year}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="flex justify-center gap-6">
              <a href="https://github.com/dcarneros" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/YOUR_LINKEDIN" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/YOUR_TWITTER" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="mailto:your.email@example.com" className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">10+</h3>
            <p className="text-sm text-gray-600">Publications</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-purple-600">5+</h3>
            <p className="text-sm text-gray-600">Years Research</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-6">3+</h3>
            <p className="text-sm text-gray-600">Active Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubProfile;