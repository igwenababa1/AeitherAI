import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { SparklesIcon } from './icons/SparklesIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { CircleStackIcon } from './icons/CircleStackIcon'; // As DatabaseIcon
import { SourceControlIcon } from './icons/SourceControlIcon'; // As BranchIcon
import { ComputerDesktopIcon } from './icons/ComputerDesktopIcon'; // As WebAppIcon
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { CursorIcon } from './icons/CursorIcon';

interface AIStudioSectionProps {
  onLaunchPlayground: () => void;
}

interface Collaborator {
  id: number;
  name: string;
  color: string;
  textColor: string;
  x: number;
  y: number;
  typing: boolean;
  visible: boolean;
}

const SkeletonLoader: React.FC<{ lines: { width: string }[] }> = ({ lines }) => (
    <div className="space-y-2 animate-pulse p-2">
        {lines.map((line, i) => (
            <div key={i} className={`h-2 bg-slate-700 rounded ${line.width}`}></div>
        ))}
    </div>
);
const CodeSkeleton = () => <SkeletonLoader lines={[ {width: 'w-1/3'}, {width: 'w-full'}, {width: 'w-3/4'}, {width: 'w-1/2'}, {width: 'w-5/6'}, {width: 'w-full'}, {width: 'w-1/4'}]} />;
const LogSkeleton = () => <SkeletonLoader lines={[ {width: 'w-1/2'}, {width: 'w-5/6'}, {width: 'w-full'}, {width: 'w-2/3'}, {width: 'w-full'}, {width: 'w-1/2'}, {width: 'w-1/3'}]} />;


const AIStudioSection: React.FC<AIStudioSectionProps> = ({ onLaunchPlayground }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [step, setStep] = useState(0);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { id: 1, name: 'Alice', color: 'bg-pink-500', textColor: 'text-pink-500', x: 5, y: -10, typing: false, visible: false },
    { id: 2, name: 'Bob', color: 'bg-teal-500', textColor: 'text-teal-500', x: 40, y: -10, typing: false, visible: false },
  ]);


  useEffect(() => {
    if (isVisible) {
      const allTimeouts: number[] = [];
      
      // Step animations
      allTimeouts.push(setTimeout(() => setStep(1), 500)); // Prompt appears
      allTimeouts.push(setTimeout(() => setStep(2), 2500)); // Plan appears
      allTimeouts.push(setTimeout(() => setStep(3), 4500)); // Arch starts
      allTimeouts.push(setTimeout(() => setStep(4), 5000)); // Code starts
      allTimeouts.push(setTimeout(() => setStep(5), 8000)); // Deploy starts
      allTimeouts.push(setTimeout(() => setStep(6), 11000)); // Done

      // Collaborator animations
      // Alice appears and moves to chat
      allTimeouts.push(setTimeout(() => {
        setCollaborators(prev => prev.map(c => c.id === 1 ? { ...c, visible: true, x: 15, y: 25 } : c));
      }, 1000));
      
      // Alice starts "typing"
      allTimeouts.push(setTimeout(() => {
        setCollaborators(prev => prev.map(c => c.id === 1 ? { ...c, typing: true } : c));
      }, 2500));
      
      // Alice stops "typing"
      allTimeouts.push(setTimeout(() => {
        setCollaborators(prev => prev.map(c => c.id === 1 ? { ...c, typing: false } : c));
      }, 4500));

      // Bob appears and moves to architecture diagram
      allTimeouts.push(setTimeout(() => {
        setCollaborators(prev => prev.map(c => c.id === 2 ? { ...c, visible: true, x: 50, y: 30 } : c));
      }, 3000));
      
      // Bob moves around the architecture diagram
      allTimeouts.push(setTimeout(() => {
        setCollaborators(prev => prev.map(c => c.id === 2 ? { ...c, x: 65, y: 80 } : c));
      }, 5000));
      allTimeouts.push(setTimeout(() => {
        setCollaborators(prev => prev.map(c => c.id === 2 ? { ...c, x: 80, y: 50 } : c));
      }, 7000));

      return () => allTimeouts.forEach(clearTimeout);
    }
  }, [isVisible]);

  const archNodes = [
    { id: 'frontend', icon: ComputerDesktopIcon, label: 'Frontend (React)', x: '10%', y: '50%' },
    { id: 'backend', icon: SourceControlIcon, label: 'Backend (Node.js)', x: '45%', y: '25%' },
    { id: 'db', icon: CircleStackIcon, label: 'Real-time DB (Redis)', x: '45%', y: '75%' },
    { id: 'deploy', icon: RocketLaunchIcon, label: 'Deployment', x: '80%', y: '50%' },
  ];

  const codeSnippet = `
import React, { useState } from 'react';

const Whiteboard = () => {
  const [drawing, setDrawing] = useState(false);

  // ... component logic here

  return (
    <canvas 
      className="w-full h-full bg-white rounded-md"
    />
  );
};

export default Whiteboard;
  `.trim();

  const deployLogs = `
[INFO] Git repository initialized.
[INFO] Pushing code to AetherWorks remote...
[INFO] Build started. Installing dependencies...
[SUCCESS] Dependencies installed.
[INFO] Creating Docker image...
[SUCCESS] Docker image created: project-xyz:latest.
[INFO] Provisioning Kubernetes resources...
[INFO] Deploying to Global Edge Network...
[SUCCESS] Deployment complete.
[URL] https://whiteboard-app-xyz.aether.dev
  `.trim();

  return (
    <section id="studio" className="py-20 bg-dark-bg/70 animated-grid-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">AetherWorks Studio: The Visual AI Builder</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            Watch our AI engineer go from a single prompt to a fully deployed, architected application in real-time. This is the future of creation.
          </p>
        </div>

        <div className="relative grid lg:grid-cols-3 gap-4 max-w-7xl mx-auto h-[600px]">
          {/* Collaborator Cursors */}
          {collaborators.map(c => c.visible && (
            <div 
              key={c.id} 
              className="absolute z-10 transition-all duration-1000 ease-in-out" 
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <CursorIcon className={`w-6 h-6 transform -rotate-12 ${c.textColor}`} />
              <div className={`absolute top-5 left-4 whitespace-nowrap px-2 py-0.5 rounded-md text-white text-xs ${c.color}`}>
                {c.name}
                {c.typing && <span className="inline-block w-0.5 h-3 bg-white ml-1 animate-blink align-middle"></span>}
              </div>
            </div>
          ))}

          {/* Left Panel: Chat */}
          <div className="lg:col-span-1 studio-panel p-4 flex flex-col space-y-4 overflow-hidden">
            <h3 className="font-bold text-white text-lg border-b border-border-color pb-2">AI Engineer Chat</h3>
            {step >= 1 && (
              <div className="animate-fade-in-up">
                <div className="flex items-start gap-2">
                  <UserCircleIcon className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                  <div className="bg-border-color p-3 rounded-lg rounded-tl-none">
                    <p className="font-bold text-sm">You</p>
                    <p className="text-slate-300 text-sm">"Build a real-time collaborative whiteboard app."</p>
                  </div>
                </div>
              </div>
            )}
            {step === 1 && (
                <div className="animate-fade-in-up">
                    <div className="flex items-start gap-2">
                        <SparklesIcon className="w-6 h-6 text-primary-blue mt-1 flex-shrink-0" />
                        <div className="bg-border-color p-3 rounded-lg rounded-bl-none w-full">
                            <SkeletonLoader lines={[{width: 'w-3/4'}, {width: 'w-full'}, {width: 'w-1/2'}]} />
                        </div>
                    </div>
                </div>
            )}
            {step >= 2 && (
              <div className="animate-fade-in-up">
                <div className="flex items-start gap-2">
                  <SparklesIcon className="w-6 h-6 text-primary-blue mt-1 flex-shrink-0" />
                  <div className="bg-primary-blue/10 p-3 rounded-lg rounded-bl-none">
                    <p className="font-bold text-sm text-primary-blue">AetherWorks AI</p>
                    <p className="text-slate-300 text-sm">"Understood. I will architect a scalable solution with a React frontend, a Node.js backend for real-time communication, and a Redis database for session management. Here is the plan:"</p>
                    <ul className="list-disc list-inside text-xs mt-2 space-y-1">
                      <li className="flex items-center gap-1"><CheckCircleIcon className="w-4 h-4 text-green-400" /><span>Create System Architecture</span></li>
                      <li className="flex items-center gap-1"><CheckCircleIcon className="w-4 h-4 text-green-400" /><span>Generate Frontend & Backend Code</span></li>
                      <li className="flex items-center gap-1"><CheckCircleIcon className="w-4 h-4 text-green-400" /><span>Deploy to Global Edge Network</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Center & Right Panel */}
          <div className="lg:col-span-2 studio-panel p-4 flex flex-col overflow-hidden">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Architecture */}
              <div className="flex flex-col">
                 <h3 className="font-bold text-white text-lg border-b border-border-color pb-2 mb-4">Live Architecture</h3>
                 <div className="relative flex-grow">
                  {step === 2 && (
                      <div className="w-full h-full animate-fade-in">
                          <div className="absolute w-12 h-12 bg-slate-700 rounded-full animate-pulse" style={{ left: '10%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
                          <div className="absolute w-12 h-12 bg-slate-700 rounded-full animate-pulse" style={{ left: '45%', top: '25%', transform: 'translate(-50%, -50%)' }}></div>
                          <div className="absolute w-12 h-12 bg-slate-700 rounded-full animate-pulse" style={{ left: '45%', top: '75%', transform: 'translate(-50%, -50%)' }}></div>
                          <div className="absolute w-12 h-12 bg-slate-700 rounded-full animate-pulse" style={{ left: '80%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
                      </div>
                  )}
                  {step >= 3 && (
                    <svg className="absolute inset-0 w-full h-full">
                      {/* Lines */}
                      <line x1="15%" y1="50%" x2="48%" y2="28%" stroke="#38BDF8" strokeWidth="2" className="line-connector" style={{ animationDelay: '0.5s' }} />
                      <line x1="15%" y1="50%" x2="48%" y2="72%" stroke="#38BDF8" strokeWidth="2" className="line-connector" style={{ animationDelay: '0.8s' }} />
                      <line x1="50%" y1="28%" x2="83%" y2="50%" stroke="#38BDF8" strokeWidth="2" className="line-connector" style={{ animationDelay: '1.2s' }} />
                      <line x1="50%" y1="72%" x2="83%" y2="50%" stroke="#38BDF8" strokeWidth="2" className="line-connector" style={{ animationDelay: '1.5s' }} />
                    </svg>
                  )}
                  {archNodes.map((node, index) => (
                    step >= 3 && (
                      <div key={node.id} className="absolute animate-fade-in-up" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)', animationDelay: `${0.2 * index}s` }}>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-border-color rounded-full flex items-center justify-center border-2 border-primary-blue">
                            <node.icon className="w-6 h-6 text-primary-blue" />
                          </div>
                          <span className="text-xs mt-1 font-semibold">{node.label}</span>
                        </div>
                      </div>
                    )
                  ))}
                 </div>
              </div>
              {/* Code/Logs */}
              <div className="flex flex-col overflow-hidden">
                <h3 className="font-bold text-white text-lg border-b border-border-color pb-2 mb-4">
                  {step >= 5 ? 'Deployment Logs' : 'Code Generation'}
                </h3>
                <div className="bg-dark-bg rounded-md flex-grow overflow-auto text-xs font-mono p-2">
                   {step === 3 && <CodeSkeleton />}
                   {step === 4 && (
                     <pre className="text-cyan-400 whitespace-pre-wrap animate-fade-in"><code>{codeSnippet}</code></pre>
                   )}
                   {step === 5 && <LogSkeleton />}
                   {step >= 6 && (
                     <pre className="text-slate-300 whitespace-pre-wrap animate-fade-in">
                       {deployLogs.split('\n').map((line, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className={line.includes('SUCCESS') ? 'text-green-400' : line.includes('URL') ? 'text-yellow-400' : 'text-slate-400'}>
                              {line.includes('[URL]') ? '🚀' : '✓'}
                            </span>
                            <span>{line}</span>
                          </div>
                       ))}
                     </pre>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
            <button
                onClick={onLaunchPlayground}
                className="bg-gradient-to-r from-primary-blue to-blue-600 hover:from-blue-400 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105"
            >
                Build Your Own App
            </button>
        </div>

      </div>
    </section>
  );
};

export default AIStudioSection;