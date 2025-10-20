


import React from 'react';
import { GlobeEuropeAfricaIcon } from './icons/GlobeEuropeAfricaIcon';
import { CubeIcon } from './icons/CubeIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { AtomIcon } from './icons/AtomIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface AdvancedFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const advancedFeatures: AdvancedFeature[] = [
  {
    icon: GlobeEuropeAfricaIcon,
    title: 'Global Edge Network',
    description: 'Deploy your applications to the edge, ensuring the lowest possible latency for your users, no matter where they are.',
  },
  {
    icon: CpuChipIcon,
    title: 'On-Demand GPU Cloud',
    description: 'Tap into serverless GPU resources for intensive AI/ML workloads, model training, and inference without managing infrastructure.',
  },
  {
    icon: CubeIcon,
    title: 'Managed Kubernetes Engine',
    description: 'Deploy complex, containerized apps with our fully managed K8s, offering auto-scaling, self-healing, and zero-downtime deployments.',
  },
  {
    icon: AtomIcon,
    title: 'Quantum-Ready Compute',
    description: 'Experiment with next-gen algorithms on our quantum simulation environments, preparing for the future of computing.',
  },
];

const AdvancedFeatureCard: React.FC<AdvancedFeature> = ({ icon: Icon, title, description }) => (
  <div className="card-3d-container h-full">
    <div className="bg-card-bg p-6 rounded-xl border border-border-color card-3d h-full">
      <div className="bg-border-color rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-accent-violet" />
      </div>
      <h3 className="text-xl font-bold text-white font-heading mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  </div>
);

const AdvancedFeaturesSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="advanced" className="py-20 bg-dark-bg" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Enterprise-Grade Infrastructure</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Go beyond the basics with features designed for performance, scale, and the future of computing.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advancedFeatures.map((feature, index) => (
            <div key={feature.title} style={{ transitionDelay: `${index * 100}ms`}} className={`section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <AdvancedFeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeaturesSection;