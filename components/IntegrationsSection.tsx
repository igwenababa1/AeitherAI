import React from 'react';
import { GitHubIcon } from './icons/GitHubIcon';
import { SlackIcon } from './icons/SlackIcon';
import { PostgresIcon } from './icons/PostgresIcon';
import { RedisIcon } from './icons/RedisIcon';
import { MongoDBIcon } from './icons/MongoDBIcon';
import { DockerIcon } from './icons/DockerIcon';

interface Integration {
  name: string;
  icon: React.ElementType;
}

const integrations: Integration[] = [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'PostgreSQL', icon: PostgresIcon },
    { name: 'MongoDB', icon: MongoDBIcon },
    { name: 'Redis', icon: RedisIcon },
    { name: 'Docker', icon: DockerIcon },
    { name: 'Slack', icon: SlackIcon },
];

const IntegrationCard: React.FC<{ icon: React.ElementType }> = ({ icon: Icon }) => (
    <div className="aspect-square bg-slate-800/50 p-6 flex items-center justify-center rounded-xl border border-slate-700 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
      <Icon className="w-16 h-16 text-slate-400 transition-colors group-hover:text-white" />
    </div>
);


const IntegrationsSection: React.FC = () => {
  return (
    <section id="integrations" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">A Connected Ecosystem</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            AetherWorks integrates seamlessly with the tools you already use and love.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-8">
          {integrations.map((integration) => (
             <div key={integration.name} className="flex flex-col items-center justify-center group">
                <IntegrationCard icon={integration.icon} />
                <p className="mt-3 font-semibold text-slate-400 group-hover:text-white transition-colors">{integration.name}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;