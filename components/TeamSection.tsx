import React from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';


interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socials: {
    linkedin: string;
    twitter: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Jane Doe',
    role: 'Co-Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'John Smith',
    role: 'Co-Founder & CTO',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Alice Johnson',
    role: 'Lead AI Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Robert Brown',
    role: 'Head of Product',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

const TeamMemberCard: React.FC<TeamMember> = ({ name, role, imageUrl, socials }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center glow-on-hover">
    <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-slate-700 group-hover:border-cyan-400 transition-colors">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
    <p className="text-cyan-400 mb-4">{role}</p>
    <div className="flex justify-center gap-4">
      <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
        <LinkedInIcon className="w-6 h-6" />
      </a>
      <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
        <TwitterIcon className="w-6 h-6" />
      </a>
    </div>
  </div>
);

const TeamSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="team" className="py-20 bg-slate-900" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Meet the Innovators</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
            The passionate minds behind AetherWorks, dedicated to revolutionizing software development.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
             <div key={member.name} style={{ transitionDelay: `${index * 100}ms`}} className={`section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <TeamMemberCard {...member} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;