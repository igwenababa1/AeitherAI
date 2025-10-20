

import React from 'react';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { TerminalIcon } from './icons/TerminalIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { FolderPlusIcon } from './icons/FolderPlusIcon';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface Step {
    icon: React.ElementType;
    title: string;
    description: string;
}

const steps: Step[] = [
    { icon: UserPlusIcon, title: "Sign Up & Create", description: "A user signs up and creates a new 'Project' named 'E-Commerce MVP'." },
    { icon: FolderPlusIcon, title: "Invite Team", description: "They invite a co-founder (Admin), a developer (Developer), and an investor (Stakeholder)." },
    { icon: TerminalIcon, title: "Generate with AI", description: "Using the AI-powered IDE, they generate the core of a storefront app in minutes." },
    { icon: RocketLaunchIcon, title: "One-Click Deploy", description: "They deploy the app with a single click, creating a live, shareable 'Deployment'." },
    { icon: GlobeAltIcon, title: "Publish & Showcase", description: "They publish the Project to their public Company Profile to showcase progress." },
];

const WorkflowSection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="workflow" className="py-20 bg-dark-bg" ref={ref}>
            <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">The MVP Workflow, Simplified</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
                        From idea to a published showcase, see how AetherWorks streamlines development.
                    </p>
                </div>
                <div className="relative max-w-2xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border-color hidden md:block"></div>
                    {steps.map((step, index) => (
                        <div key={index} className="md:flex items-center mb-12 relative">
                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:ml-auto'}`}>
                                <div className="card-3d-container">
                                    <div className="p-6 bg-card-bg border border-border-color rounded-xl card-3d">
                                        <h3 className="text-xl font-bold font-heading text-white mb-2">{step.title}</h3>
                                        <p className="text-slate-400">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 bg-dark-bg p-1 hidden md:block">
                                <div className="w-12 h-12 rounded-full bg-border-color flex items-center justify-center border-2 border-primary-blue">
                                    <step.icon className="w-6 h-6 text-primary-blue" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;