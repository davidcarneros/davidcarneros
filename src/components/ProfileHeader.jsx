import React, { useState, useEffect } from 'react';

import foto from "../assets/foto.jpeg";

const ProfileHeader = () => {
  const [text, setText] = useState('');
  const fullText = "PhD in Advanced Computing Technologies";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-8 relative z-10">
      <div className="relative inline-block group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-dark-surface overflow-hidden relative z-10 shadow-2xl">
          <img
            src={foto}
            alt="David Carneros-Prado"
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          />
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        David Carneros-Prado
      </h1>
      <p className="text-2xl text-primary-400 font-light tracking-wide mb-2 min-h-[2rem]">
        {text}
        <span className="animate-pulse">|</span>
      </p>
      <p className="text-lg text-gray-400 font-light">
        University of Castilla-La Mancha (UCLM)
      </p>
    </div>
  );
};

export default ProfileHeader;