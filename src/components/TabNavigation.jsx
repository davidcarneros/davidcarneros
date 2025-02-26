import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['research', 'publications', 'teaching', 'connect'];
  
  return (
    <div className="flex justify-center mb-8 gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === tab
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;