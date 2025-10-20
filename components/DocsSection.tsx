import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const DocsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <section id="docs" className="py-20 bg-dark-bg" ref={ref}>
      <div className={`container mx-auto px-6 text-center section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Dive Deeper Into the Details</h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4 mb-8">
          Our comprehensive documentation provides detailed guides, API references, and tutorials to help you get the most out of AetherWorks. Explore the full capabilities of our platform.
        </p>
        <a
          href="https://docs.aetherworks.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-blue to-blue-500 hover:from-blue-400 hover:to-blue-600 text-dark-bg font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-primary-blue/20"
        >
          <BookOpenIcon className="w-6 h-6" />
          <span>Read the Docs</span>
        </a>
      </div>
    </section>
  );
};

export default DocsSection;