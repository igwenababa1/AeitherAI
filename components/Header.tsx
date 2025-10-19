import React, { useState } from 'react';
import { LayersIcon } from './icons/LayersIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#workflow', label: 'Workflow' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#team', label: 'Team' },
    { href: '#docs', label: 'Docs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-white text-xl font-bold">
          <LayersIcon className="w-6 h-6 text-cyan-400" />
          <span>AetherWorks</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-slate-300 hover:text-white">Log In</a>
          <a href="#" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Sign Up
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Log In</a>
            <a href="#" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
