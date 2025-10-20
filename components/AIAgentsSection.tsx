import React from 'react';
import { ShareIcon } from './icons/ShareIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

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
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
    <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const AIAgentsSection: React.FC = () => {
  return (
    <section id="ai-agents" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Meet Your AI-Powered Development Team</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            AetherWorks provides a suite of specialized AI agents that work together to accelerate every phase of your development lifecycle.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.title} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;