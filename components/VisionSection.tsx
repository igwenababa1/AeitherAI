import React from 'react';
import { CpuChipIcon } from './icons/CpuChipIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';


interface VisionSectionProps {
  onLaunchPlayground: () => void;
}

const VisionSection: React.FC<VisionSectionProps> = ({ onLaunchPlayground }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section
            id="vision"
            ref={ref}
            className="relative py-20 md:py-32 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop')" }}
        >
            <div className="absolute inset-0 bg-dark-bg/70 backdrop-blur-sm"></div>
            <div className={`container mx-auto px-6 text-center relative z-10 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <div className="mb-4">
                    <CpuChipIcon className="w-12 h-12 mx-auto text-primary-blue" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight mb-4">
                    The Future of Development is Collaborative AI
                </h2>
                <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                    We believe that AI should be a partner, not just a tool. AetherWorks is built on the principle of a symbiotic relationship between human developers and AI agents, creating a workflow that is faster, smarter, and more creative than ever before.
                </p>
                <button
                    onClick={onLaunchPlayground}
                    className="bg-transparent border-2 border-primary-blue text-primary-blue font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 hover:bg-primary-blue hover:text-dark-bg"
                >
                    See It In Action
                </button>
            </div>
        </section>
    );
};

export default VisionSection;