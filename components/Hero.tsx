import React from 'react';

interface HeroProps {
  onLaunchPlayground: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLaunchPlayground }) => {
  return (
    <section className="relative py-20 md:py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/50 to-slate-900 bg-[length:200%_200%] animate-aurora z-0"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The Unified Platform for <span className="text-cyan-400">Building with AI</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          AetherWorks combines an AI-powered IDE, collaborative tools, and one-click deployments to help you ship faster than ever. From idea to MVP in minutes, not months.
        </p>
        <button
          onClick={onLaunchPlayground}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          Launch AI Playground
        </button>
      </div>
    </section>
  );
};

export default Hero;