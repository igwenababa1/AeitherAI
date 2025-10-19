
import React from 'react';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { UsersIcon } from './icons/UsersIcon';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: CodeBracketIcon,
    title: 'Unlimited Apps',
    description: 'Create an infinite number of applications, microservices, and functions without restriction.',
  },
  {
    icon: UsersIcon,
    title: 'Unlimited Collaborators',
    description: 'Invite your entire team, agency, or organization. No per-seat fees for editors.',
  },
  {
    icon: ServerStackIcon,
    title: '5x More Storage',
    description: 'Baseline storage that is five times the industry standard for similar tiers.',
  },
  {
    icon: CpuChipIcon,
    title: '10x More Power',
    description: 'Guaranteed computational power (CPU/RAM) an order of magnitude greater than the competition.',
  },
  {
    icon: SparklesIcon,
    title: 'Dual AI Engine Access',
    description: 'Direct, unlimited API access to both Claude Sonnet 3.5 and GPT-4o integrated into the IDE.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Advanced Collaboration',
    description: 'Seamless Projects, Company Profiles, and granular Role-Based Access Control for MVPs.',
  },
];

const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
    <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">An Unparalleled Feature Set</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            We've bundled everything you need to build, collaborate, and scale, so you can focus on what matters most: your product.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;