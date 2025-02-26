import React from 'react';

import foto from "../assets/foto.jpeg";

const ProfileHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 overflow-hidden relative">
          <img
            src={foto}
            alt="David Carneros-Prado"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-2 text-blue-600">
        David Carneros-Prado
      </h1>
      <p className="text-xl text-gray-600">
        PhD in Advanced Computing Technologies
      </p>
      <p className="text-md text-gray-500 mt-2">
        University of Castilla-La Mancha (UCLM)
      </p>
    </div>
  );
};

export default ProfileHeader;