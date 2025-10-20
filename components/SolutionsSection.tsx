import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { RobotIcon } from './icons/RobotIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { ReactIcon } from './icons/ReactIcon';
import { PythonIcon } from './icons/PythonIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { DjangoIcon } from './icons/DjangoIcon';
import { PostgresIcon } from './icons/PostgresIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface Solution {
  icon: React.ElementType;
  title: string;
  description: string;
  prompt: string;
  stack: React.ElementType[];
}

const solutions: Solution[] = [
  {
    icon: RobotIcon,
    title: 'AI Chatbot with RAG',
    description: 'A Q&A bot that answers questions based on your own documents using Retrieval-Augmented Generation.',
    prompt: 'Build a full-stack AI chatbot using Python, FastAPI, and React. Implement a RAG pipeline that can ingest PDF documents and answer user questions based on the document content. Use the Gemini API for the language model.',
    stack: [PythonIcon, GeminiIcon, ReactIcon],
  },
  {
    icon: SparklesIcon,
    title: 'Image Generation Service',
    description: 'A web service that generates images from text prompts using an advanced AI model.',
    prompt: 'Create a web application that allows users to generate images from text prompts. Use Node.js for the backend and React for the frontend. Integrate with an image generation AI model API.',
    stack: [ReactIcon, GeminiIcon],
  },
  {
    icon: ChartPieIcon,
    title: 'Data Analysis Dashboard',
    description: 'An interactive dashboard that ingests CSV data and generates visualizations and insights automatically.',
    prompt: 'Build a data analysis and visualization dashboard with Python (using Pandas and Plotly) and a Django frontend. The app should allow users to upload a CSV file and then automatically generate various charts and a summary of insights.',
    stack: [PythonIcon, DjangoIcon, PostgresIcon],
  },
  {
    icon: ChartBarIcon,
    title: 'Sales Data Dashboard',
    description: 'A Django dashboard to upload sales data via CSV and visualize key metrics with Pandas and Plotly.',
    prompt: 'Build a data analysis dashboard for sales data. It should use Python with Pandas and Plotly for the backend, and Django for the web app. Users must be able to upload CSV files of sales records. The dashboard should show total revenue, monthly sales trends, and top-selling products.',
    stack: [PythonIcon, DjangoIcon, PostgresIcon],
  },
];

interface SolutionCardProps extends Solution {
  onSelect: (prompt: string) => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon: Icon, title, description, prompt, stack, onSelect }) => (
  <div className="card-3d-container h-full">
    <div className="bg-card-bg p-6 rounded-xl border border-border-color flex flex-col card-3d h-full">
      <div className="flex items-center gap-4 mb-4">
          <div className="bg-border-color rounded-lg w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary-blue" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">{title}</h3>
      </div>
       <p className="text-slate-400 text-sm flex-grow">{description}</p>
       <div className="mt-4 mb-6">
          <p className="text-xs font-semibold text-slate-500 mb-2">TECH STACK</p>
          <div className="flex items-center gap-3">
            {stack.map((StackIcon, index) => <StackIcon key={index} className="w-6 h-6 text-slate-400" />)}
          </div>
       </div>
      <button
        onClick={() => onSelect(prompt)}
        className="mt-auto bg-border-color hover:bg-primary-blue text-slate-300 hover:text-dark-bg font-bold py-2 px-4 rounded-lg transition-colors w-full"
      >
        Deploy Solution
      </button>
    </div>
  </div>
);

interface SolutionsSectionProps {
    onSolutionSelect: (prompt: string) => void;
}

const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onSolutionSelect }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <section id="solutions" className="py-20 bg-dark-bg" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4l font-extrabold text-white font-heading">Solutions Marketplace</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Kickstart your project with a ready-to-deploy, enterprise-grade solution. Just one click and our AI engineer will handle the rest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
             <div key={solution.title} style={{ transitionDelay: `${index * 100}ms`}} className={`section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <SolutionCard {...solution} onSelect={onSolutionSelect} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;