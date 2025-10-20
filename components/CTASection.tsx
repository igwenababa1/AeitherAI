import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';

interface CTASectionProps {
  onLaunchPlayground: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onLaunchPlayground }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="cta" className="py-20 bg-dark-bg" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="relative bg-gradient-to-r from-primary-blue/10 via-dark-bg/10 to-blue-500/10 rounded-2xl p-10 md:p-16 text-center overflow-hidden border border-border-color">
           <div className="absolute -inset-2 bg-dark-bg/50 -z-10 blur-xl"></div>
            <div className="relative z-10">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary-blue/10 p-3 rounded-full border border-primary-blue/20">
                         <RocketLaunchIcon className="w-8 h-8 text-primary-blue" />
                    </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Ready to Build the Future?</h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4 mb-8">
                    Stop wrestling with boilerplate and infrastructure. Start building with your personal AI engineer today. Launch the playground and bring your ideas to life in minutes.
                </p>
                <button
                    onClick={onLaunchPlayground}
                    className="bg-gradient-to-r from-primary-blue to-blue-600 hover:from-blue-400 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105"
                >
                    Start Your First Build
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;