import React from 'react';
import { ComputerDesktopIcon } from './icons/ComputerDesktopIcon';
import { DevicePhoneMobileIcon } from './icons/DevicePhoneMobileIcon';
import { PuzzlePieceIcon } from './icons/PuzzlePieceIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const BuildAISection: React.FC = () => {
    const steps = [
        {
            icon: ComputerDesktopIcon,
            title: "Describe Your Vision",
            description: "Start by describing what you want to build in plain English. For example, 'A blog platform with user authentication and a rich text editor'."
        },
        {
            icon: DevicePhoneMobileIcon,
            title: "AI Engineer Asks Clarifying Questions",
            description: "The AI agent analyzes your request and asks targeted questions to fill in the gaps, just like a senior engineer would."
        },
        {
            icon: PuzzlePieceIcon,
            title: "Iterate on the Plan",
            description: "Review the technical specification and architecture proposed by the AI. Provide feedback and refine the plan together."
        },
        {
            icon: CheckCircleIcon,
            title: "Generate & Deploy",
            description: "Once you approve the plan, the AI Engineer writes the code, sets up the infrastructure, and deploys your application."
        }
    ];

    return (
        <section id="build-ai" className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Build with an AI Engineer</h2>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
                        Go from a simple prompt to a fully deployed application. Our AI agent acts as your collaborative partner, handling the technical details so you can focus on the product.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-start gap-4 hover:border-cyan-400 transition-colors duration-300">
                            <div className="flex-shrink-0 bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center">
                                <step.icon className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-slate-400">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BuildAISection;