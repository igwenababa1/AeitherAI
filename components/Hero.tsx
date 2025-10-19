import React from 'react';

interface HeroProps {
  onLaunchPlayground: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLaunchPlayground }) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-1"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          From Prompt to Product, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">Instantly</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
          Launch our AI Command Center and watch your ideas transform into full-stack applications in real-time. This is the future of building software.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={onLaunchPlayground} className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-cyan-500/20 active:scale-95">
            Launch AI Command Center
          </button>
          <a href="#features" className="bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
