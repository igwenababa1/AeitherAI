import React from 'react';

interface VideoHeroSectionProps {
  onLaunchPlayground: () => void;
}

const VideoHeroSection: React.FC<VideoHeroSectionProps> = ({ onLaunchPlayground }) => {
  const videos = [
    'https://videos.pexels.com/video-files/3209828/3209828-hd.mp4',
    'https://videos.pexels.com/video-files/853875/853875-hd.mp4',
    'https://videos.pexels.com/video-files/7578540/757540-hd.mp4',
  ];
  
  // Add the first video to the end to create a seamless loop
  const loopedVideos = [...videos, videos[0]];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
         <div className="w-[400%] h-full flex animate-slide-videos">
            {loopedVideos.map((videoSrc, index) => (
              <video
                key={index}
                className="w-1/4 h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={videoSrc}
              ></video>
            ))}
        </div>
      </div>
      
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

export default VideoHeroSection;