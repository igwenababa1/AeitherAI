
import React from 'react';
import { GlobeEuropeAfricaIcon } from './icons/GlobeEuropeAfricaIcon';
import { CubeTransparentIcon } from './icons/CubeTransparentIcon';
import { ChartBarSquareIcon } from './icons/ChartBarSquareIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';

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
    icon: CubeTransparentIcon,
    title: 'Serverless GPUs & AI',
    description: 'Tap into on-demand GPU resources for intensive AI/ML workloads, model training, and inference without managing infrastructure.',
  },
  {
    icon: ChartBarSquareIcon,
    title: 'Real-time Observability',
    description: 'Get a unified view of your applications with integrated logging, metrics, and distributed tracing out of the box.',
  },
  {
    icon: LockClosedIcon,
    title: 'Automated Security',
    description: 'Integrate automated security scanning for vulnerabilities, secrets, and dependencies directly into your CI/CD pipeline.',
  },
];

const AdvancedFeatureCard: React.FC<AdvancedFeature> = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-violet-400 hover:-translate-y-1 transition-all duration-300">
    <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-violet-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const AdvancedFeaturesSection: React.FC = () => {
  return (
    <section id="advanced" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Advanced Capabilities for Modern Teams</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Go beyond the basics with enterprise-grade features designed for performance, scale, and security.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advancedFeatures.map((feature) => (
            <AdvancedFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeaturesSection;