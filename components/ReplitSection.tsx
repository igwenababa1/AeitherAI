
import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { FolderIcon } from './icons/FolderIcon';
import { FileIcon } from './icons/FileIcon';
import { PythonIcon } from './icons/PythonIcon';
import { ReactIcon } from './icons/ReactIcon';
import { PlayIcon } from './icons/PlayIcon';
import { WandMagicSparklesIcon } from './icons/WandMagicSparklesIcon';

const ReplitSection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
    const [code, setCode] = useState('');
    const [logs, setLogs] = useState<string[]>([]);

    const fullCode = `import numpy as np
import matplotlib.pyplot as plt

# Generate sample data
X = np.linspace(0, 10, 100)
y = X * 2.5 + np.random.normal(0, 2, 100)

# Perform linear regression
A = np.vstack([X, np.ones(len(X))]).T
m, c = np.linalg.lstsq(A, y, rcond=None)[0]

# Plot results
plt.plot(X, y, 'o', label='Original data')
plt.plot(X, m*X + c, 'r', label='Fitted line')
plt.legend()
plt.show()

print("Linear regression complete.")`;

    const fullLogs = [
        'aetherworks@cloud:~$ python main.py',
        'Executing script...',
        'Importing numpy...',
        'Importing matplotlib...',
        'Generating sample data...',
        'Performing linear regression...',
        'Plotting results...',
        'Linear regression complete.',
        'aetherworks@cloud:~$'
    ];

    useEffect(() => {
        // FIX: Changed types from `NodeJS.Timeout` to `number` as this code runs in a browser,
        // where `setInterval` returns a number, and Node.js types are not available.
        let codeTimeout: number;
        let logsInterval: number;

        if (isVisible) {
            let i = 0;
            codeTimeout = window.setInterval(() => {
                setCode(fullCode.substring(0, i));
                i++;
                if (i > fullCode.length) {
                    clearInterval(codeTimeout);
                }
            }, 20);

            let logIndex = 0;
            logsInterval = window.setInterval(() => {
                setLogs(prev => [...prev, fullLogs[logIndex]]);
                logIndex++;
                if (logIndex >= fullLogs.length) {
                    clearInterval(logsInterval);
                }
            }, 600);

        }

        return () => {
            clearInterval(codeTimeout);
            clearInterval(logsInterval);
        };
    }, [isVisible]);

    return (
        <section id="live-ide" className="py-20 bg-dark-bg" ref={ref}>
            <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Live Collaborative IDE</h2>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
                        Experience the power of a cloud-based IDE with real-time multiplayer, AI assistance, and one-click runs, inspired by Replit's best features.
                    </p>
                </div>

                <div className="bg-card-bg border border-border-color rounded-xl shadow-2xl shadow-primary-blue/10 max-w-6xl mx-auto overflow-hidden">
                    <header className="p-3 bg-dark-bg/50 border-b border-border-color flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            </div>
                            <button className="flex items-center gap-2 bg-green-500/80 hover:bg-green-500 text-white font-bold py-1.5 px-4 rounded-md text-sm">
                                <PlayIcon className="w-4 h-4" />
                                <span>Run</span>
                            </button>
                        </div>
                        <div className="flex items-center -space-x-3">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full border-2 border-dark-bg" alt="user 1" />
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full border-2 border-dark-bg" alt="user 2" />
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full border-2 border-dark-bg" alt="user 3" />
                        </div>
                    </header>

                    <div className="grid grid-cols-12 h-[500px]">
                        {/* File Explorer */}
                        <aside className="col-span-3 bg-dark-bg/30 p-4 border-r border-border-color overflow-y-auto">
                            <h4 className="font-bold text-sm mb-4 text-slate-300">File Explorer</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><FolderIcon className="w-5 h-5 text-sky-400" /> <span>components</span></li>
                                <li className="flex items-center gap-2 ml-4"><ReactIcon className="w-5 h-5 text-cyan-300" /> <span>Chart.jsx</span></li>
                                <li className="flex items-center gap-2"><PythonIcon className="w-5 h-5" /> <span className="text-white">main.py</span></li>
                                <li className="flex items-center gap-2"><FileIcon className="w-5 h-5 text-slate-400" /> <span>README.md</span></li>
                            </ul>
                        </aside>

                        {/* Code Editor */}
                        <main className="col-span-5 p-4 relative">
                             <pre className="text-sm font-mono h-full overflow-y-auto">
                                <code className="language-python">
                                    <span className="typing-cursor">{code}</span>
                                </code>
                             </pre>
                             <div className="absolute bottom-4 right-4 bg-accent-violet/20 border border-accent-violet rounded-lg p-2 text-xs flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: '3s' }}>
                                <WandMagicSparklesIcon className="w-4 h-4 text-accent-violet" />
                                <span className="text-slate-300">AI: Add docstrings to explain the functions.</span>
                             </div>
                        </main>

                        {/* Console */}
                        <aside className="col-span-4 bg-black/50 p-4 overflow-y-auto">
                             <h4 className="font-bold text-sm mb-2 text-slate-300">Console</h4>
                             <div className="font-mono text-xs text-slate-300 space-y-1">
                                {logs.filter(Boolean).map((log, index) => (
                                    <p key={index} className={log.includes('complete') ? 'text-green-400' : ''}>{log}</p>
                                ))}
                             </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReplitSection;
