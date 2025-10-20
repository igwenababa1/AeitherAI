import React from 'react';
import { ShareIcon } from './icons/ShareIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';


interface Agent {
  icon: React.ElementType;
  title: string;
  description: string;
}

const agents: Agent[] = [
  {
    icon: ShareIcon,
    title: 'AI Architect',
    description: 'Designs scalable system architectures, database schemas, and API contracts based on your high-level requirements.',
  },
  {
    icon: CodeBracketIcon,
    title: 'AI Code Companion',
    description: 'Provides real-time code completion, suggests optimizations, and writes entire functions directly within the IDE.',
  },
  {
    icon: RocketLaunchIcon,
    title: 'AI DevOps Specialist',
    description: 'Automates your CI/CD pipelines, manages infrastructure as code, and handles one-click deployments to the edge.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'AI Security Analyst',
    description: 'Proactively scans your codebase for vulnerabilities, exposed secrets, and dependency issues, suggesting fixes automatically.',
  },
];

const AgentCard: React.FC<Agent> = ({ icon: Icon, title, description }) => (
  <div className="card-3d-container h-full">
    <div className="bg-card-bg p-6 rounded-xl border border-border-color card-3d h-full">
      <div className="bg-border-color rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary-blue" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-heading">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  </div>
);

const AIAgentsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="ai-agents" className="py-20 bg-dark-bg/70 animated-grid-background" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Meet Your AI-Powered Development Team</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            AetherWorks provides a suite of specialized AI agents that work together to accelerate every phase of your development lifecycle.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, index) => (
             <div key={agent.title} style={{ transitionDelay: `${index * 100}ms`}} className={`section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <AgentCard {...agent} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;