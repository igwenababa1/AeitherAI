
import React from 'react';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { GitHubIcon } from './icons/GitHubIcon';

const teamMembers = [
    {
        name: 'Jane Doe',
        role: 'Founder & CEO',
        bio: 'Visionary leader with 15+ years in cloud infrastructure and product development. Passionate about empowering developers.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
        socials: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        }
    },
    {
        name: 'John Smith',
        role: 'CTO & Lead Architect',
        bio: 'Expert in distributed systems and AI orchestration. The mastermind behind AetherWorks\' scalable architecture.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        socials: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        }
    },
    {
        name: 'Alice Johnson',
        role: 'Head of Product',
        bio: 'Dedicated to creating a seamless developer experience. Bridges the gap between user needs and engineering.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
        socials: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        }
    },
     {
        name: 'Robert Brown',
        role: 'Head of Developer Relations',
        bio: 'Community builder and advocate for developers. Ensures our platform meets the real-world needs of our users.',
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop',
        socials: {
            linkedin: '#',
            twitter: '#',
            github: '#',
        }
    }
];

const TeamSection: React.FC = () => {
    return (
        <section id="team" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Meet the Team</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
                        The passionate minds behind the AetherWorks platform.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
                            <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-400" />
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-cyan-400 font-semibold mb-2">{member.role}</p>
                            <p className="text-slate-400 text-sm mb-4">{member.bio}</p>
                            <div className="flex justify-center gap-4">
                                <a href={member.socials.linkedin} className="text-slate-400 hover:text-white"><LinkedInIcon className="w-5 h-5" /></a>
                                <a href={member.socials.twitter} className="text-slate-400 hover:text-white"><TwitterIcon className="w-5 h-5" /></a>
                                <a href={member.socials.github} className="text-slate-400 hover:text-white"><GitHubIcon className="w-5 h-5" /></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
