import React from 'react';
import { ReactIcon } from './icons/ReactIcon';
import { PythonIcon } from './icons/PythonIcon';
import { DjangoIcon } from './icons/DjangoIcon';
import { VueIcon } from './icons/VueIcon';
import { FlaskIcon } from './icons/FlaskIcon';
import { CodeBracketIcon } from './icons/CodeBracketIcon';

interface Template {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
}

const templates: Template[] = [
  {
    icon: ReactIcon,
    title: 'React + Vite SPA',
    description: 'A blazing fast single-page application boilerplate with React, Vite, and Tailwind CSS.',
    tags: ['Frontend', 'React', 'Vite'],
  },
  {
    icon: DjangoIcon,
    title: 'Django REST API',
    description: 'A powerful backend starter with Django REST Framework, JWT authentication, and PostgreSQL.',
    tags: ['Backend', 'Python', 'API'],
  },
  {
    icon: VueIcon,
    title: 'Vue + Nuxt Blog',
    description: 'A full-featured, SEO-friendly blog template built with Vue.js and Nuxt for static site generation.',
    tags: ['Frontend', 'Vue', 'Full-Stack'],
  },
  {
    icon: FlaskIcon,
    title: 'Flask Microservice',
    description: 'A lightweight microservice template using Flask, perfect for building scalable backend services.',
    tags: ['Backend', 'Python', 'Microservice'],
  },
   {
    icon: PythonIcon,
    title: 'AI/ML Model Server',
    description: 'Deploy a machine learning model with a simple API endpoint using FastAPI and PyTorch.',
    tags: ['AI/ML', 'Python', 'API'],
  },
  {
    icon: CodeBracketIcon,
    title: 'Node.js Express API',
    description: 'A classic Node.js backend with Express, TypeScript, and Prisma for robust and type-safe APIs.',
    tags: ['Backend', 'Node.js', 'API'],
  },
];

const TemplateCard: React.FC<Template> = ({ icon: Icon, title, description, tags }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-violet-400 hover:-translate-y-1 transition-all duration-300 flex flex-col">
    <div className="flex items-start justify-between mb-4">
        <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center">
            <Icon className="w-8 h-8 text-violet-400" />
        </div>
        <a href="#" className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/40 text-sm font-bold py-1 px-3 rounded-full transition-colors">
            Deploy
        </a>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 flex-grow mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
            <span key={tag} className="text-xs font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
        ))}
    </div>
  </div>
);

const TemplatesSection: React.FC = () => {
  return (
    <section id="templates" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Start from a Template</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Kickstart your next project with our curated collection of production-ready templates.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.title} {...template} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
