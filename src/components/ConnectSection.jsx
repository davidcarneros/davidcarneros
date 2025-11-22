import React from 'react';
import { Users, Github, Mail } from 'lucide-react';

const ConnectSection = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <div className="p-3 bg-primary-500/10 rounded-xl">
          <Users className="w-8 h-8 text-primary-500" />
        </div>
        Connect with me
      </h2>
      <div className="flex gap-8">
        <a
          href="https://github.com/dcarneros"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="flex flex-col items-center gap-3">
            <Github className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-gray-400 group-hover:text-white font-medium">GitHub</span>
          </div>
        </a>
        <a
          href="mailto:davidcarneros4598@gmail.com"
          className="group p-6 rounded-2xl bg-dark-surface border border-dark-border hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="flex flex-col items-center gap-3">
            <Mail className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-gray-400 group-hover:text-white font-medium">Email</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ConnectSection;