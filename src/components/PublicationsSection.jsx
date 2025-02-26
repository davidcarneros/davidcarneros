import React from 'react';
import { Book, Presentation, ExternalLink } from 'lucide-react';
import { academicData } from '../data/academicData';

const PublicationsSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Book className="w-6 h-6" />
          Journal Articles
        </h2>
        <div className="space-y-4">
          {academicData.publications.filter(pub => pub.type === 'journal').map((pub, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 card-hover"
            >
              <h3 className="font-medium text-gray-900">{pub.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{pub.authors}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-sm font-medium text-blue-600">{pub.journal}</span>
                <span className="text-sm text-gray-500">({pub.year})</span>
                <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{pub.quartile}</span>
                <span className="text-sm text-gray-500">{pub.publisher}</span>
              </div>
              {pub.doi && (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 mt-2 inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" /> 
                  {pub.doi}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Presentation className="w-6 h-6" />
          Conference Papers
        </h2>
        <div className="space-y-4">
          {academicData.conferences.map((conf, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 card-hover"
            >
              <h3 className="font-medium text-gray-900">{conf.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{conf.authors}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-sm font-medium text-blue-600">{conf.conference}</span>
                <span className="text-sm text-gray-500">({conf.year})</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {conf.location} • Pages: {conf.pages} • {conf.publisher}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicationsSection;