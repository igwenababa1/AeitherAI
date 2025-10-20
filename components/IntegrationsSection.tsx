import React from 'react';
import { GitHubIcon } from './icons/GitHubIcon';
import { SlackIcon } from './icons/SlackIcon';
import { PostgresIcon } from './icons/PostgresIcon';
import { RedisIcon } from './icons/RedisIcon';
import { MongoDBIcon } from './icons/MongoDBIcon';
import { DockerIcon } from './icons/DockerIcon';
import { OpenAIIcon } from './icons/OpenAIIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { ClaudeIcon } from './icons/ClaudeIcon';
import { MistralIcon } from './icons/MistralIcon';
import { VercelIcon } from './icons/VercelIcon';
import { AWSIcon } from './icons/AWSIcon';
import { GoogleCloudIcon } from './icons/GoogleCloudIcon';
import { FigmaIcon } from './icons/FigmaIcon';


interface Integration {
  name: string;
  icon: React.ElementType;
  href: string;
}

const integrations: Integration[] = [
    { name: 'OpenAI', icon: OpenAIIcon, href: 'https://openai.com' },
    { name: 'Google Gemini', icon: GeminiIcon, href: 'https://gemini.google.com' },
    { name: 'Anthropic Claude', icon: ClaudeIcon, href: 'https://www.anthropic.com/claude' },
    { name: 'Mistral', icon: MistralIcon, href: 'https://mistral.ai/' },
    { name: 'GitHub', icon: GitHubIcon, href: 'https://github.com' },
    { name: 'Docker', icon: DockerIcon, href: 'https://www.docker.com/' },
    { name: 'PostgreSQL', icon: PostgresIcon, href: 'https://www.postgresql.org/' },
    { name: 'MongoDB', icon: MongoDBIcon, href: 'https://www.mongodb.com/' },
    { name: 'Redis', icon: RedisIcon, href: 'https://redis.io/' },
    { name: 'Google Cloud', icon: GoogleCloudIcon, href: 'https://cloud.google.com/' },
    { name: 'AWS', icon: AWSIcon, href: 'https://aws.amazon.com/' },
    { name: 'Vercel', icon: VercelIcon, href: 'https://vercel.com/' },
    { name: 'Figma', icon: FigmaIcon, href: 'https://www.figma.com/' },
    { name: 'Slack', icon: SlackIcon, href: 'https://slack.com' },
];

const IntegrationCard: React.FC<{ icon: React.ElementType }> = ({ icon: Icon }) => (
    <div className="aspect-square bg-card-bg p-6 flex items-center justify-center rounded-xl border border-border-color group-hover:border-primary-blue transition-all duration-300 card-3d">
      <Icon className="w-12 h-12 text-slate-400 transition-colors group-hover:text-white" />
    </div>
);


const IntegrationsSection: React.FC = () => {
  return (
    <section id="integrations" className="py-20 bg-dark-bg/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">A Connected Ecosystem</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            AetherWorks integrates seamlessly with the tools and AI models you already use and love.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6">
          {integrations.map((integration) => (
             <a key={integration.name} href={integration.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center group rounded-xl card-3d-container">
                <IntegrationCard icon={integration.icon} />
                <p className="mt-3 text-sm font-semibold text-slate-400 group-hover:text-white transition-colors text-center">{integration.name}</p>
             </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;