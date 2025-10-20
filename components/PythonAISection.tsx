import React from 'react';
import { PythonIcon } from './icons/PythonIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface PythonFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: PythonFeature[] = [
  {
    icon: PythonIcon,
    title: 'First-Class Python Support',
    description: 'Develop with any Python version in secure, containerized environments. Full support for pip and virtual environments.',
  },
  {
    icon: CodeBracketIcon,
    title: 'Full-Stack Frameworks',
    description: 'Use our AI to generate and deploy projects with popular frameworks like Django, Flask, and FastAPI in minutes.',
  },
  {
    icon: SparklesIcon,
    title: 'Integrated AI/ML Libraries',
    description: 'Access pre-installed libraries like PyTorch, TensorFlow, and scikit-learn for your machine learning projects.',
  },
  {
    icon: CpuChipIcon,
    title: 'Effortless Scalability',
    description: 'Deploy and scale your Python applications with our managed Kubernetes infrastructure and serverless functions.',
  },
];

const FeatureCard: React.FC<PythonFeature> = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 glow-on-hover h-full">
    <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const PythonAISection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <section id="python-ai" className="py-20 bg-slate-900/70 animated-grid-background" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">The Ultimate Environment for <span className="text-cyan-400">Python &amp; AI</span></h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            AetherWorks is optimized for Python developers, providing the tools and infrastructure to build, train, and deploy AI models and applications faster than ever.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
             <div key={feature.title} style={{ transitionDelay: `${index * 100}ms`}} className={`section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <FeatureCard {...feature} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PythonAISection;