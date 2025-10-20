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
  href: string;
}

const integrations: Integration[] = [
    { name: 'GitHub', icon: GitHubIcon, href: 'https://github.com' },
    { name: 'PostgreSQL', icon: PostgresIcon, href: 'https://www.postgresql.org/' },
    { name: 'MongoDB', icon: MongoDBIcon, href: 'https://www.mongodb.com/' },
    { name: 'Redis', icon: RedisIcon, href: 'https://redis.io/' },
    { name: 'Docker', icon: DockerIcon, href: 'https://www.docker.com/' },
    { name: 'Slack', icon: SlackIcon, href: 'https://slack.com' },
];

const IntegrationCard: React.FC<{ icon: React.ElementType }> = ({ icon: Icon }) => (
    <div className="aspect-square bg-slate-800/50 p-6 flex items-center justify-center rounded-xl border border-slate-700 group-hover:border-cyan-400 transition-all duration-300">
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
             <a key={integration.name} href={integration.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center group glow-on-hover rounded-xl">
                <IntegrationCard icon={integration.icon} />
                <p className="mt-3 font-semibold text-slate-400 group-hover:text-white transition-colors">{integration.name}</p>
             </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;