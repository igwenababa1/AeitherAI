
import React from 'react';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';

interface HeroSectionProps {
  onLaunchPlayground: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchPlayground }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="hero-background z-0"></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark-bg/70 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up font-heading" style={{ animationDelay: '0.2s' }}>
          The Unified Platform for <span className="text-primary-blue">Building with AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          AetherWorks combines an AI-powered IDE, collaborative tools, and one-click deployments to help you ship faster than ever. From idea to MVP in minutes, not months.
        </p>
        <button
          onClick={onLaunchPlayground}
          className="btn-animated animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <RocketLaunchIcon className="w-6 h-6" />
          <span>Launch AI Playground</span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;