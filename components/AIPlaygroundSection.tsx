import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { XMarkIcon } from './icons/XMarkIcon';
import { FolderIcon } from './icons/FolderIcon';
import { FileIcon } from './icons/FileIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { GeminiIcon } from './icons/GeminiIcon';
import { ClaudeIcon } from './icons/ClaudeIcon';
import { MistralIcon } from './icons/MistralIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';
import { TrashIcon } from './icons/TrashIcon';


// --- Highlight.js Declaration ---
declare const hljs: any;

// --- DATA STRUCTURES ---
interface SimulationData {
  architecturalPlan: string;
  fileSystem: { [key: string]: string[] };
  terminalOutput: string[];
  isBuildComplete: boolean;
}

interface SavedSimulation {
    name: string;
    architecturalPlan: string;
    fileSystem: { [key: string]: string[] };
}

type AIModel = 'gemini' | 'claude' | 'mistral';

const models: { id: AIModel, name: string, icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { id: 'gemini', name: 'Gemini', icon: GeminiIcon },
    { id: 'claude', name: 'Claude', icon: ClaudeIcon },
    { id: 'mistral', name: 'Mistral', icon: MistralIcon },
];

// --- PREVIEW COMPONENT ---
const TodoAppPreview: React.FC = () => {
    const [tasks, setTasks] = useState<{ id: number, text: string, completed: boolean }[]>([]);
    const [input, setInput] = useState('');

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
            setInput('');
        }
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="w-full h-full bg-white text-gray-800 p-4 font-sans rounded-b-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">My To-Do List</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    className="flex-grow p-2 border rounded-l-md"
                    placeholder="Add a new task..."
                />
                <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">Add</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center p-2 border-b">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`flex-grow transition-colors ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {task.text}
                        </span>
                        <button onClick={() => removeTask(task.id)} className="text-red-500 hover:text-red-700 ml-4 px-2 py-1 rounded">Remove</button>
                    </li>
                ))}
                 {tasks.length === 0 && <p className="text-gray-500 text-center mt-4">No tasks yet!</p>}
            </ul>
        </div>
    );
};


// --- TERMINAL LINE COMPONENT ---
const TerminalLine: React.FC<{ text: string }> = ({ text }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && typeof hljs !== 'undefined') {
      hljs.highlightElement(codeRef.current);
    }
  }, [text]);

  if (text.startsWith('$')) {
    const command = text.substring(1).trim();
    return (
      <div className="flex items-start">
        <span className="text-slate-500 mr-2 select-none">$</span>
        <code ref={codeRef} className="language-shell whitespace-pre-wrap flex-1">
          {command}
        </code>
      </div>
    );
  }
  if (text.startsWith('>')) {
    return <p className="whitespace-pre-wrap text-cyan-400">{text}</p>;
  }
  if (text.startsWith('✓')) {
    return <p className="whitespace-pre-wrap text-green-400">{text}</p>;
  }
  if (text.toLowerCase().startsWith('error:')) {
    return <p className="whitespace-pre-wrap text-red-400">{text}</p>;
  }
  
  // Default line
  return <p className="whitespace-pre-wrap">{text}</p>;
};


// --- MAIN COMPONENT ---
interface AIPlaygroundSectionProps {
  onClose: () => void;
  initialPrompt: string;
}

const AIPlaygroundSection: React.FC<AIPlaygroundSectionProps> = ({ onClose, initialPrompt }) => {
  const [simulationData, setSimulationData] = useState<SimulationData>({
    architecturalPlan: '',
    fileSystem: {},
    terminalOutput: ['Awaiting instructions...'],
    isBuildComplete: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(initialPrompt);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini');
  const [savedSimulations, setSavedSimulations] = useState<SavedSimulation[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveName, setSaveName] = useState('');

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
        const saved = localStorage.getItem('aetherworks-simulations');
        if (saved) {
            setSavedSimulations(JSON.parse(saved));
        }
    } catch (e) {
        console.error("Failed to load saved simulations from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('aetherworks-simulations', JSON.stringify(savedSimulations));
    } catch (e) {
        console.error("Failed to save simulations to localStorage", e);
    }
  }, [savedSimulations]);

  useEffect(() => {
    if (initialPrompt) {
      runBuildSimulation(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [simulationData.terminalOutput]);
  
  const updateSimulation = (updater: (prev: SimulationData) => SimulationData) => {
    setSimulationData(updater);
  };

  const runBuildSimulation = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setIsSaving(false);
    setCurrentPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.filter(p => p !== prompt)]);

    updateSimulation(prev => ({
      ...prev,
      architecturalPlan: '',
      fileSystem: {},
      terminalOutput: [`Initiating build for: "${prompt}"`],
      isBuildComplete: false,
    }));
    
    try {
        await new Promise(r => setTimeout(r, 500));
        
        const selectedModelName = models.find(m => m.id === selectedModel)?.name || 'AI';
        updateSimulation(prev => ({ ...prev, terminalOutput: [...prev.terminalOutput, `> Generating architectural plan using ${selectedModelName}...`] }));
        
        let plan = '';
        if (selectedModel === 'gemini') {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Based on the prompt "${prompt}", generate a brief, high-level architectural plan. List the key files and technologies. Format it as simple text, focusing on a Node.js/Express/MongoDB stack.`,
            });
            plan = response.text;
        } else if (selectedModel === 'claude') {
            await new Promise(r => setTimeout(r, 750)); // Simulate network latency
            plan = `Architectural Plan (Generated by Claude):\n- Frontend: React with Vite\n- Backend: Node.js with Express\n- Database: PostgreSQL\n- Key Files: server.js, user.model.js, routes.js`;
        } else if (selectedModel === 'mistral') {
            await new Promise(r => setTimeout(r, 600)); // Simulate network latency
            plan = `Architectural Plan (Generated by Mistral):\n- Service: Monolithic API\n- Language: Python with FastAPI\n- Database: SQLite for simplicity\n- Key Files: main.py, models.py, crud.py, database.py`;
        }

        updateSimulation(prev => ({ ...prev, architecturalPlan: plan, terminalOutput: [...prev.terminalOutput, '✓ Architectural plan generated successfully.'] }));
        await new Promise(r => setTimeout(r, 1000));

        // Step 2: Simulate Build Process
        const steps = [
            { line: '> Initializing Node.js project...', file: 'package.json', folder: 'todo-api', delay: 500 },
            { line: '$ npm init -y', delay: 1000 },
            { line: '> Installing dependencies...', delay: 500 },
            { line: '$ npm install express mongoose cors dotenv', delay: 2500 },
            { line: '✓ Dependencies installed.', delay: 500},
            { line: '> Creating server file...', file: 'server.js', folder: 'todo-api', delay: 500 },
            { line: '✓ Created server.js', delay: 1000 },
            { line: '> Creating database model...', file: 'Todo.js', folder: 'models', delay: 500 },
            { line: '✓ Created models/Todo.js', delay: 1000 },
            { line: '> Connecting to MongoDB Atlas...', delay: 1500 },
            { line: '✓ Successfully connected to database.', delay: 1000 },
            { line: '> Starting server...', delay: 500 },
            { line: '$ node server.js', delay: 1000 },
            { line: 'Server running on port 5000', delay: 500 },
            { line: '> Deploying to global edge network...', delay: 1500 },
            { line: '✓ Deployment successful! Rendering live preview...', delay: 500 },
        ];

        for (const step of steps) {
            updateSimulation(prev => {
                const newFileSystem = { ...prev.fileSystem };
                if (step.file && step.folder) {
                    if (!newFileSystem[step.folder]) {
                        newFileSystem[step.folder] = [];
                    }
                    if (!newFileSystem[step.folder].includes(step.file)) {
                       newFileSystem[step.folder].push(step.file);
                    }
                }
                return {
                    ...prev,
                    terminalOutput: [...prev.terminalOutput, step.line],
                    fileSystem: newFileSystem,
                }
            });
            await new Promise(r => setTimeout(r, step.delay));
        }

        updateSimulation(prev => ({ ...prev, isBuildComplete: true }));
        
    } catch (e: any) {
        const errorLine = selectedModel === 'gemini'
          ? `Error: Please provide a valid API key in your environment to run the Gemini simulation.`
          : `Error: Simulated API call failed for ${selectedModel}. This is a mock error.`;
        updateSimulation(prev => ({ ...prev, terminalOutput: [...prev.terminalOutput, errorLine] }));
    } finally {
        setIsLoading(false);
    }
  };

  const handleBuildFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runBuildSimulation(currentPrompt);
  };

  const handleSaveFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveName.trim()) return;

    const newSave: SavedSimulation = {
        name: saveName,
        architecturalPlan: simulationData.architecturalPlan,
        fileSystem: simulationData.fileSystem
    };

    setSavedSimulations(prev => [newSave, ...prev]);
    setSaveName('');
    setIsSaving(false);
  };

  const handleLoadSimulation = (sim: SavedSimulation) => {
    if (isLoading) return;
    setSimulationData({
        architecturalPlan: sim.architecturalPlan,
        fileSystem: sim.fileSystem,
        terminalOutput: [`✓ Loaded build: "${sim.name}"`, 'Live preview is now active.'],
        isBuildComplete: true,
    });
    setCurrentPrompt('');
  }

  const handleDeleteSimulation = (index: number) => {
    setSavedSimulations(prev => prev.filter((_, i) => i !== index));
  }


  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl shadow-cyan-500/10">
        <header className="flex items-center justify-between p-3 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3">
                <SparklesIcon className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Live Development Environment</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 transition-colors">
                <XMarkIcon className="w-6 h-6 text-slate-400" />
            </button>
        </header>

        <div className="flex-grow flex h-full overflow-hidden">
          {/* Left Pane: Explorer and History */}
          <div className="w-1/5 bg-slate-900/50 border-r border-slate-800 p-4 overflow-y-auto flex flex-col">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Explorer</h3>
              {Object.keys(simulationData.fileSystem).length > 0 ? (
                  Object.entries(simulationData.fileSystem).map(([folder, files]) => (
                      <div key={folder} className="mb-2">
                          <div className="flex items-center gap-2 text-white font-semibold">
                              <FolderIcon className="w-5 h-5" /> {folder}
                          </div>
                          <ul className="pl-6 mt-1 border-l border-slate-700">
                              {(files as string[]).map(file => (
                                  <li key={file} className="flex items-center gap-2 text-slate-300 py-0.5">
                                      <FileIcon className="w-4 h-4" /> {file}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))
              ) : <p className="text-slate-500 text-sm">No files yet...</p>}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">History</h3>
              {promptHistory.length > 0 ? (
                <ul className="space-y-2">
                  {promptHistory.slice(0, 5).map((prompt, i) => (
                    <li key={i}>
                      <button
                        onClick={() => runBuildSimulation(prompt)}
                        disabled={isLoading}
                        className="w-full text-left text-sm p-2 rounded-md bg-slate-800/50 hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title={prompt}
                      >
                        <p className="truncate text-slate-300">{prompt}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-slate-500 text-sm">No build history yet.</p>}
            </div>
             <div className="mt-6 pt-6 border-t border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Saved Builds</h3>
                 {savedSimulations.length > 0 ? (
                    <ul className="space-y-2">
                    {savedSimulations.map((sim, i) => (
                        <li key={i} className="flex items-center justify-between p-2 rounded-md bg-slate-800/50 hover:bg-slate-700/70 group">
                            <button
                                onClick={() => handleLoadSimulation(sim)}
                                disabled={isLoading}
                                className="flex-grow text-left text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                title={sim.name}
                            >
                                <p className="truncate text-slate-300">{sim.name}</p>
                            </button>
                            <button 
                                onClick={() => handleDeleteSimulation(i)} 
                                className="ml-2 p-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete build"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                    </ul>
                ) : <p className="text-slate-500 text-sm">No saved builds.</p>}
            </div>
          </div>

          {/* Right Pane: Prompt, Plan, Preview, Terminal */}
          <div className="w-4/5 flex flex-col">
            {/* Prompt Input Area */}
            <div className="p-4 border-b border-slate-800 flex-shrink-0">
              {isSaving ? (
                <form onSubmit={handleSaveFormSubmit}>
                    <label htmlFor="save-name-input" className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 block">Save Build As</label>
                    <div className="flex items-center gap-2">
                        <input
                        id="save-name-input"
                        type="text"
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        className="flex-grow bg-slate-800 border border-slate-700 rounded-md p-2 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                        placeholder="e.g., My To-Do App v1"
                        autoFocus
                        />
                        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg">Save</button>
                        <button type="button" onClick={() => setIsSaving(false)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                </form>
              ) : (
                <form onSubmit={handleBuildFormSubmit}>
                    <div className="mb-3">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 block">AI Model</label>
                        <div className="flex items-center gap-2">
                            {models.map(model => (
                                <button
                                    type="button"
                                    key={model.id}
                                    onClick={() => setSelectedModel(model.id)}
                                    disabled={isLoading}
                                    className={`flex items-center gap-2 py-2 px-3 rounded-lg border text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${selectedModel === model.id ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'}`}
                                >
                                    <model.icon className={`w-5 h-5 ${selectedModel === model.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                                    <span>{model.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <label htmlFor="prompt-input" className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 block">Prompt</label>
                    <textarea
                    id="prompt-input"
                    rows={2}
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    placeholder="Describe the application you want to build..."
                    />
                    <div className="flex items-center gap-4 mt-3">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <BeakerIcon className="w-5 h-5" />
                            <span>{isLoading ? 'Building...' : 'Build Application'}</span>
                        </button>
                        {simulationData.isBuildComplete && !isLoading && (
                             <button
                                type="button"
                                onClick={() => setIsSaving(true)}
                                className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                <span>Save Build</span>
                            </button>
                        )}
                    </div>
                </form>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex h-full overflow-hidden">
              {/* Architectural Plan & Preview */}
              <div className="w-1/2 border-r border-slate-800 flex flex-col">
                <div className="h-1/2 border-b border-slate-800 p-4 overflow-y-auto">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Architectural Plan</h3>
                  {simulationData.architecturalPlan ? (
                    <p className="text-slate-300 whitespace-pre-wrap text-sm">{simulationData.architecturalPlan}</p>
                  ) : <p className="text-slate-500 text-sm">Waiting for AI analysis...</p>}
                </div>
                <div className="h-1/2 flex flex-col">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider p-4 flex-shrink-0">Live Preview</h3>
                  <div className="flex-grow bg-slate-700/50 rounded-br-lg overflow-auto">
                    {simulationData.isBuildComplete ? <TodoAppPreview /> : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <div className="text-center">
                            <BeakerIcon className="w-12 h-12 mx-auto mb-2" />
                            <p>Preview will appear here once the build is complete.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div className="w-1/2 flex flex-col">
                 <div className="p-4 border-b border-slate-800 flex-shrink-0">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Terminal</h3>
                 </div>
                 <div ref={terminalRef} className="flex-grow p-4 bg-slate-900/70 overflow-y-auto font-mono text-sm leading-6 space-y-2">
                    {simulationData.terminalOutput.map((line, i) => (
                      <TerminalLine key={i} text={line} />
                    ))}
                    {isLoading && <div className="animate-blink">_</div>}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlaygroundSection;