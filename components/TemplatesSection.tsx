
import React from 'react';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { NewspaperIcon } from './icons/NewspaperIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { ClipboardDocumentCheckIcon } from './icons/ClipboardDocumentCheckIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';

interface Template {
  icon: React.ElementType;
  title: string;
  description: string;
  prompt: string;
}

const templates: Template[] = [
  {
    icon: ShoppingCartIcon,
    title: 'E-commerce API',
    description: 'Generate a complete Node.js backend for an online store with product, user, and order management.',
    prompt: 'Create a Node.js and Express API for an e-commerce platform with MongoDB. Include models for User, Product, and Order. The API should have endpoints for user authentication (register, login), product CRUD operations, and order creation/retrieval.',
  },
  {
    icon: NewspaperIcon,
    title: 'Blog Platform',
    description: 'A full-stack blog application with posts, comments, and user authentication using a modern stack.',
    prompt: 'Build a full-stack blog platform using the MERN stack (MongoDB, Express, React, Node.js). It should have user authentication, post creation with a rich-text editor, comments, and a public-facing blog list.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Real-time Chat App',
    description: 'A WebSocket-based chat application for real-time communication between multiple users.',
    prompt: 'Generate a real-time chat application using Node.js, Express, and Socket.IO. The frontend should be built with React. Users should be able to join chat rooms and send messages that appear instantly to others in the same room.',
  },
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'To-Do List API',
    description: 'A simple but complete REST API for managing tasks, perfect for a front-end application.',
    prompt: 'Create a simple REST API for a To-Do list application using Node.js and Express. It should support creating, reading, updating, and deleting tasks. Use an in-memory database for simplicity.',
  },
  {
    icon: VideoCameraIcon,
    title: 'Video Streaming Service',
    description: 'Backend for a video streaming service, including video upload and streaming endpoints.',
    prompt: 'Design a backend for a video streaming service using Node.js. It needs endpoints for uploading video files, processing them for streaming (e.g., HLS), and a secure endpoint to stream video content.',
  },
  {
    icon: UserGroupIcon,
    title: 'Social Media Backend',
    description: 'A scalable backend for a social media app with posts, follows, likes, and a user feed.',
    prompt: 'Build the backend for a social media application with Node.js, Express, and a PostgreSQL database. Features should include user profiles, the ability to create posts, follow other users, like posts, and a chronological feed of posts from followed users.',
  },
];

interface TemplateCardProps extends Template {
  onSelect: (prompt: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ icon: Icon, title, description, prompt, onSelect }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-start gap-4">
        <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex-shrink-0 flex items-center justify-center">
            <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm flex-grow">{description}</p>
        </div>
    </div>
    <button
      onClick={() => onSelect(prompt)}
      className="mt-6 bg-slate-700 hover:bg-cyan-500 text-slate-300 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors w-full"
    >
      Use Template
    </button>
  </div>
);

interface TemplatesSectionProps {
    onTemplateSelect: (prompt: string) => void;
}

const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onTemplateSelect }) => {
  return (
    <section id="templates" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Start Building Immediately</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Kickstart your project with one of our pre-built templates. Just one click and our AI engineer will handle the rest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.title} {...template} onSelect={onTemplateSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
