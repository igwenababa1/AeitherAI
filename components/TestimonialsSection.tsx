
import React from 'react';
import { GoogleIcon } from './icons/GoogleIcon';
import { OpenAIIcon } from './icons/OpenAIIcon';
import { DeepSeekIcon } from './icons/DeepSeekIcon';
import { VercelIcon } from './icons/VercelIcon';

const testimonials = [
  {
    quote: "AetherWorks has fundamentally changed how our team prototypes. We can go from a simple idea to a live, deployed MVP in a single afternoon. The AI integration is seamless and powerful.",
    author: "Sarah Johnson",
    title: "Head of Innovation, TechCorp",
    logo: <GoogleIcon className="h-8 w-8 text-slate-400" />
  },
  {
    quote: "The 'unlimited everything' model is a game-changer for agencies. We've consolidated all our client projects onto AetherWorks, saving thousands on per-seat licenses and infrastructure costs.",
    author: "Michael Chen",
    title: "CTO, Creative Solutions Agency",
    logo: <OpenAIIcon className="h-8 w-8 text-slate-400" />
  },
  {
    quote: "As an indie hacker, speed is everything. AetherWorks provides the enterprise-grade power I need without the complexity. I shipped three products in the time it used to take me to build one.",
    author: "Alex Rodriguez",
    title: "Founder, SaaS Pegasus",
    logo: <VercelIcon className="h-8 w-8 text-slate-400" />
  },
  {
    quote: "The collaboration features are top-notch. Being able to give stakeholders read-only access to a live deployment while developers have full control has streamlined our feedback loop immensely.",
    author: "Emily White",
    title: "Engineering Manager, ScaleUp Inc.",
    logo: <DeepSeekIcon className="h-8 w-8 text-slate-400" />
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-900/70">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Trusted by Builders at Top Companies</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Hear what our users have to say about building with AetherWorks.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col">
              <div className="mb-4 text-slate-400">
                {testimonial.logo}
              </div>
              <p className="text-slate-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-slate-400">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
