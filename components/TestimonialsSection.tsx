import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);


  return (
    <section id="testimonials" className="py-20 bg-dark-bg/70" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Impressions from Industry Leaders</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            Hear what influential figures have to say about building with AetherWorks.
          </p>
        </div>
        <div className="max-w-3xl mx-auto relative">
            <div className="overflow-hidden relative h-[420px]">
                <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.author} className="min-w-full h-full flex-shrink-0 px-2 card-3d-container">
                             <div className="bg-card-bg p-8 rounded-xl border border-border-color flex flex-col items-center text-center h-full card-3d">
                                <img src={testimonial.imageUrl} alt={testimonial.author} className="w-24 h-24 rounded-full mb-4 border-2 border-primary-blue object-cover" />
                                <p className="text-slate-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-bold text-white text-lg">{testimonial.author}</p>
                                    <p className="text-sm text-primary-blue">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Left Arrow */}
            <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-[-40px] p-2 rounded-full bg-card-bg/50 hover:bg-card-bg text-white transition-colors hidden md:block">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            {/* Right Arrow */}
            <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-[-40px] p-2 rounded-full bg-card-bg/50 hover:bg-card-bg text-white transition-colors hidden md:block">
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-6">
                {testimonials.map((_, slideIndex) => (
                    <button key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`w-3 h-3 rounded-full mx-1.5 transition-all ${currentIndex === slideIndex ? 'bg-primary-blue' : 'bg-border-color hover:bg-slate-500'}`}></button>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;