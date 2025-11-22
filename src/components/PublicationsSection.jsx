import React from 'react';
import { Book, Presentation, ExternalLink } from 'lucide-react';
import { academicData } from '../data/academicData';

const PublicationsSection = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
          <div className="p-2 bg-primary-500/10 rounded-lg">
            <Book className="w-6 h-6 text-primary-500" />
          </div>
          Journal Articles
        </h2>
        <div className="space-y-6">
          {academicData.publications.filter(pub => pub.type === 'journal').map((pub, index) => (
            <div
              key={index}
              className="group p-6 bg-dark-surface rounded-xl border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)]"
            >
              <h3 className="font-medium text-xl text-gray-100 group-hover:text-primary-400 transition-colors">{pub.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{pub.authors}</p>
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className="text-sm font-medium text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full">{pub.journal}</span>
                <span className="text-sm text-gray-500">({pub.year})</span>
                <span className="text-sm font-medium bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">{pub.quartile}</span>
                <span className="text-sm text-gray-500">{pub.publisher}</span>
              </div>
              {pub.doi && (
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-primary-400 mt-4 inline-flex items-center gap-1 transition-colors"
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
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Presentation className="w-6 h-6 text-purple-500" />
          </div>
          Conference Papers
        </h2>
        <div className="space-y-6">
          {academicData.conferences.map((conf, index) => (
            <div
              key={index}
              className="group p-6 bg-dark-surface rounded-xl border border-dark-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
            >
              <h3 className="font-medium text-xl text-gray-100 group-hover:text-purple-400 transition-colors">{conf.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{conf.authors}</p>
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{conf.conference}</span>
                <span className="text-sm text-gray-500">({conf.year})</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
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