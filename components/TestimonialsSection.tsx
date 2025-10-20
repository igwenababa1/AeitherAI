import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const testimonials = [
  {
    quote: "AetherWorks has fundamentally changed how our team prototypes. We can go from a simple idea to a live, deployed MVP in a single afternoon. The AI integration is seamless and powerful.",
    author: "Sarah Johnson",
    title: "Head of Innovation, Innovate Inc.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "The 'unlimited everything' model is a game-changer for agencies. We've consolidated all our client projects onto AetherWorks, saving thousands on per-seat licenses and infrastructure costs.",
    author: "Michael Chen",
    title: "CTO, Creative Solutions Agency",
    imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "As an indie hacker, speed is everything. AetherWorks provides the enterprise-grade power I need without the complexity. I shipped three products in the time it used to take me to build one.",
    author: "Alex Rodriguez",
    title: "Founder, SaaS Pegasus",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
   {
    quote: "The collaboration features are top-notch. Being able to give stakeholders read-only access to a live deployment has streamlined our feedback loop immensely.",
    author: "Emily White",
    title: "Engineering Manager, ScaleUp Inc.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  }
];

const TestimonialsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <section id="testimonials" className="py-20 bg-slate-900/70" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Impressions from Industry Leaders</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Hear what influential figures have to say about building with AetherWorks.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex flex-col items-center text-center section-fade-in ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 100}ms`}}>
              <img src={testimonial.imageUrl} alt={testimonial.author} className="w-24 h-24 rounded-full mb-4 border-2 border-cyan-400 object-cover" />
              <p className="text-slate-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-white text-lg">{testimonial.author}</p>
                <p className="text-sm text-cyan-400">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;