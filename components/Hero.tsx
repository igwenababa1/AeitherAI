
import React from 'react';

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
          className="bg-gradient-to-r from-primary-blue to-blue-600 hover:from-blue-400 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          Launch AI Playground
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
