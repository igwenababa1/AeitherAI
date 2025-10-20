import React from 'react';
import { LayersIcon } from './icons/LayersIcon';

interface HeaderProps {
  onLaunchPlayground: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLaunchPlayground }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-white text-xl font-bold">
          <LayersIcon className="w-6 h-6 text-cyan-400" />
          <span>AetherWorks</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#templates" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Templates
          </a>
          <a href="#testimonials" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Testimonials
          </a>
           <a href="#team" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Team
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={onLaunchPlayground} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;