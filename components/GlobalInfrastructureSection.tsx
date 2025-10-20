import React from 'react';
import { GlobeAmericasIcon } from './icons/GlobeAmericasIcon';
import { CloudArrowUpIcon } from './icons/CloudArrowUpIcon';
import { CircleStackIcon } from './icons/CircleStackIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { Globe } from './Globe';


interface InfraFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: InfraFeature[] = [
  {
    icon: GlobeAmericasIcon,
    title: 'Global Edge CDN',
    description: 'All static assets, from your application bundle to images, are cached and served from our global edge network, ensuring the fastest possible load times for your users.',
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Edge Functions',
    description: 'Run your backend logic closer to your users. Deploy serverless functions that execute at the edge, reducing latency for dynamic requests.',
  },
  {
    icon: CircleStackIcon,
    title: 'Distributed Databases',
    description: 'Optional read replicas for your databases can be distributed globally, providing fast data access for a worldwide user base.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Guaranteed High-Availability',
    description: 'With a multi-region architecture and automated failover, we provide a 99.99% uptime SLA for your critical applications.',
  },
];

const GlobalInfrastructureSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="global-infra" 
      className="relative py-20 bg-slate-900 overflow-hidden"
      ref={ref}
    >
      <Globe />
      <div className={`container mx-auto px-6 relative z-10 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Built for Global Scale</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            Our infrastructure is designed for high performance and reliability, no matter where your users are.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} 
                 className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 glow-on-hover section-fade-in ${isVisible ? 'is-visible' : ''}`}
                 style={{ transitionDelay: `${index * 100}ms`}}>
                <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalInfrastructureSection;