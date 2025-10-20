import React from 'react';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { EyeIcon } from './icons/EyeIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';


const AboutSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2020&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      <div className={`container mx-auto px-6 relative z-10 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Story & Vision</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            The driving force behind our mission to redefine development.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-slate-800/60 p-8 rounded-xl border border-slate-700 mb-12 glow-on-hover">
            <div className="flex items-center gap-4 mb-4">
                <BuildingLibraryIcon className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Company History</h3>
            </div>
            <p className="text-slate-400">
              Founded in 2024 by a team of veteran developers and cloud architects, AetherWorks was born from a simple observation: the tools for building software had become too fragmented. We envisioned a single, unified platform where developers could move from idea to global scale without friction.
            </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 glow-on-hover">
            <div className="flex items-center gap-3 mb-3">
                <RocketLaunchIcon className="w-6 h-6 text-violet-400" />
                <h3 className="text-xl font-bold text-violet-400">Our Mission</h3>
            </div>
            <p className="text-slate-400">
              To empower builders by removing the complexities of modern development. We provide a seamless, powerful, and collaborative environment so that teams can focus on innovation, not infrastructure.
            </p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 glow-on-hover">
            <div className="flex items-center gap-3 mb-3">
                <EyeIcon className="w-6 h-6 text-violet-400" />
                <h3 className="text-xl font-bold text-violet-400">Our Vision</h3>
            </div>
            <p className="text-slate-400">
              We see a future where the best ideas can be brought to life instantly, regardless of team size or resources. AetherWorks aims to be the foundational layer for the next generation of digital products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;