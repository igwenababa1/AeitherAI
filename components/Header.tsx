
import React, { useState, useEffect } from 'react';
import { LayersIcon } from './icons/LayersIcon';
import { Bars3Icon } from './icons/Bars3Icon';
import { XMarkIcon } from './icons/XMarkIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
  onLaunchPlayground: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onLaunchPlayground, currentTheme, onThemeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#live-ide', label: 'Live IDE' },
    { href: '#studio', label: 'AI Studio' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#team', label: 'Team' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  }

  const handleLaunchClick = () => {
    onLaunchPlayground();
    setIsMenuOpen(false);
  }
  
  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    onThemeChange(newTheme);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-lg border-b border-border-color">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-2 text-white text-xl font-heading font-bold">
            <LayersIcon className="w-6 h-6 text-primary-blue" />
            <span>AetherWorks</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-slate-300 hover:text-primary-blue transition-colors font-semibold">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleThemeToggle}
              className="p-2 text-slate-300 hover:text-white rounded-md transition-colors"
              aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {currentTheme === 'dark' ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
            <button onClick={onLaunchPlayground} className="hidden md:block bg-gradient-to-r from-primary-blue to-blue-600 hover:from-blue-400 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105">
              Get Started
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-300 hover:text-white rounded-md transition-colors" aria-label="Open menu">
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-dark-bg/90 backdrop-blur-lg z-50 md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-border-color">
          <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-2 text-white text-xl font-heading font-bold">
            <LayersIcon className="w-6 h-6 text-primary-blue" />
            <span>AetherWorks</span>
          </a>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-300 hover:text-white rounded-md transition-colors" aria-label="Close menu">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[calc(100vh-81px)] -mt-4">
          <ul className="text-center space-y-8">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-2xl font-bold text-slate-300 hover:text-primary-blue transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
           <button onClick={handleLaunchClick} className="mt-12 bg-gradient-to-r from-primary-blue to-blue-600 hover:from-blue-400 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 text-xl">
              Get Started
            </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
