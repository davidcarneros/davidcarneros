import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['research', 'publications', 'teaching', 'connect'];

  return (
    <div className="flex justify-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group ${activeTab === tab
              ? 'text-white shadow-[0_0_20px_rgba(14,165,233,0.5)]'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
          {activeTab === tab && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-100"></div>
          )}
          <span className="relative z-10 tracking-wide">
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;