
import React, { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { SparklesIcon } from './icons/SparklesIcon';
import { CursorIcon } from './icons/CursorIcon';
import ReviewsModal from './ReviewsModal';
import { ChatBubbleOvalLeftEllipsisIcon } from './icons/ChatBubbleOvalLeftEllipsisIcon';
import { CodeBlock } from './CodeBlock';


interface AIStudioSectionProps {
  onLaunchPlayground: () => void;
}

interface Message {
  id: number;
  sender: 'user' | 'ai';
  type: 'text' | 'code' | 'thinking';
  content: string;
}

const AIStudioSection: React.FC<AIStudioSectionProps> = ({ onLaunchPlayground }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [architectureVisible, setArchitectureVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showSkeletons, setShowSkeletons] = useState(true);
  
  // Collaborator states
  const [aliceCursor, setAliceCursor] = useState({ x: '20%', y: '85%' });
  const [bobCursor, setBobCursor] = useState({ x: '50%', y: '50%' });
  const [bobInspecting, setBobInspecting] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const [showReviewsButton, setShowReviewsButton] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  // FIX: Changed type from `(number | NodeJS.Timeout)[]` to `number[]`.
  // `NodeJS.Timeout` is not available in a browser environment, causing a TypeScript error.
  // Both `setTimeout` and `setInterval` in the browser return a `number`.
  const timeouts = useRef<number[]>([]);

  const fullLogs = [
    'Cloning repository...',
    'Installing dependencies...',
    'SUCCESS: Frontend dependencies installed.',
    'SUCCESS: Backend dependencies installed.',
    'Setting up database schema...',
    'SUCCESS: Database migrated.',
    'Starting backend server...',
    'SUCCESS: Backend server running on port 8000.',
    'Starting frontend dev server...',
    'SUCCESS: Frontend available at http://localhost:3000.',
    'Running deployment checks...',
    'SUCCESS: All checks passed.',
    'Deploying to global edge network...',
    'SUCCESS: Deployment complete!',
  ];

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  useEffect(() => {
    if (isVisible) {
      clearTimeouts();
      // Reset states for re-triggering animation
      setStep(0);
      setMessages([]);
      setArchitectureVisible(false);
      setLogs([]);
      setShowSkeletons(true);
      setAliceCursor({ x: '20%', y: '85%' });
      setBobCursor({ x: '50%', y: '50%' });
      setBobInspecting(false);
      setActivePanel(null);
      setShowReviewsButton(false);
      setShowReviewsModal(false);

      const userMessageContent = "Build a full-stack AI chatbot using Python, FastAPI, and React. Implement a RAG pipeline that can ingest PDF documents and answer user questions based on the document content. Use the Gemini API for the language model.";
      const aiResponseText = "Of course. I'll start by scaffolding the backend with FastAPI. Here is the basic structure for the main application file.";
      const aiResponseCode = `from fastapi import FastAPI, UploadFile, File
from my_rag_pipeline import RAGPipeline

app = FastAPI()
pipeline = RAGPipeline(api_key="GEMINI_API_KEY")

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    content = await file.read()
    pipeline.ingest(content)
    return {"filename": file.filename, "status": "ingested"}

@app.get("/query")
async def query_pipeline(q: str):
    answer = pipeline.query(q)
    return {"answer": answer}`;
      const logsDuration = fullLogs.length * 200;


      const t = (fn: () => void, delay: number) => timeouts.current.push(setTimeout(fn, delay));

      // 0. Initial state with skeletons
      t(() => setShowSkeletons(true), 0);
      
      // 1. Chat sequence
      t(() => {
        setActivePanel('chat');
        setMessages([{ id: 1, sender: 'user', type: 'text', content: userMessageContent }]);
      }, 500);

      t(() => {
        setMessages(prev => [...prev, { id: 2, sender: 'ai', type: 'thinking', content: '' }]);
      }, 1500);

      t(() => {
        setMessages(prev => prev.filter(m => m.type !== 'thinking').concat({ id: 3, sender: 'ai', type: 'text', content: aiResponseText }));
      }, 3000);

      t(() => {
        setMessages(prev => [...prev, { id: 4, sender: 'ai', type: 'code', content: aiResponseCode }]);
        setBobInspecting(true);
        setBobCursor({ x: '65%', y: '20%' });
      }, 4500);

      const chatDuration = 4500;

      // 2. Architecture appears
      t(() => {
        setShowSkeletons(false);
        setArchitectureVisible(true);
        setActivePanel('architecture');
        setStep(2);
      }, chatDuration + 500);
      
      // 2.5 Bob moves around architecture
      t(() => setBobCursor({ x: '85%', y: '60%' }), chatDuration + 1000);


      // 3. Logs start appearing
      t(() => {
        setActivePanel('logs');
        let logIndex = 0;
        const logsInterval = setInterval(() => {
          setLogs(prev => [...prev, fullLogs[logIndex]]);
          logIndex++;
          if (logIndex >= fullLogs.length) {
            clearInterval(logsInterval);
            setStep(3);
          }
        }, 200);
        timeouts.current.push(logsInterval);
      }, chatDuration + 2500);
      
      // 4. Cursors move to final positions & show review button
      t(() => {
        setBobCursor({ x: '70%', y: '80%' });
        setAliceCursor({ x: '30%', y: '20%' });
        setBobInspecting(false);
        setActivePanel(null);
        setShowReviewsButton(true);
      }, chatDuration + 3000 + logsDuration);


    } else {
      clearTimeouts();
    }

    return clearTimeouts;
  }, [isVisible]);
  
  const getLogColor = (log: string) => {
    if (log.toLowerCase().includes('error')) return 'text-red-400';
    if (log.toLowerCase().includes('success')) return 'text-green-400';
    if (log.toLowerCase().includes('warning')) return 'text-yellow-400';
    return 'text-slate-400';
  };

  return (
    <section id="studio" className="py-20 bg-dark-bg/70 animated-grid-background" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">The AetherWorks AI Studio</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            Watch our AI architect, code, and deploy a full-stack application from a single prompt in real-time. This is the core of our "build with an AI engineer" experience.
          </p>
        </div>

        <div className="relative bg-card-bg border border-border-color rounded-xl shadow-2xl shadow-primary-blue/10 max-w-7xl mx-auto p-4 md:p-6 min-h-[600px]">
           {/* Collaborator Cursors */}
           <div 
              className="absolute transition-all duration-1000 ease-in-out"
              style={{ top: aliceCursor.y, left: aliceCursor.x, transform: 'translate(-50%, -50%)' }}
            >
                <CursorIcon className={`w-6 h-6 -rotate-90 transition-transform`} style={{ color: "#38bdf8" }} />
                <div className="absolute top-5 left-5 bg-card-bg px-2 py-1 rounded-md text-xs whitespace-nowrap" style={{ color: "#38bdf8" }}>
                    Alice
                </div>
            </div>
           <div 
              className="absolute transition-all duration-1000 ease-in-out"
              style={{ top: bobCursor.y, left: bobCursor.x, transform: 'translate(-50%, -50%)' }}
            >
              <CursorIcon className={`w-6 h-6 -rotate-90 text-violet-400 transition-transform ${bobInspecting ? 'animate-pulse-cursor' : ''}`} />
              <div className="absolute top-5 left-5 bg-card-bg px-2 py-1 rounded-md text-xs whitespace-nowrap text-violet-400">
                  Bob
              </div>
          </div>


          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Left Column: Chat & Prompt */}
            <div className={`col-span-12 md:col-span-5 flex flex-col gap-4 studio-panel ${activePanel === 'chat' ? 'panel-focus' : ''}`}>
              <div className="bg-dark-bg p-4 rounded-lg border border-border-color flex-grow flex flex-col min-h-[250px]">
                <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2 flex-shrink-0">
                    <SparklesIcon className="w-5 h-5 text-primary-blue" />
                    AI Chat
                </h4>
                <div className="flex-grow flex flex-col gap-4 overflow-y-auto mt-2 pr-2">
                    {showSkeletons && messages.length === 0 ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-4 bg-border-color rounded w-3/4"></div>
                            <div className="h-4 bg-border-color rounded w-full"></div>
                            <div className="h-4 bg-border-color rounded w-1/2"></div>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div style={{ animationDelay: `${index * 100}ms`}} className={`text-sm chat-bubble ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}>
                                    {msg.type === 'text' && <p>{msg.content}</p>}
                                    {msg.type === 'code' && <div className="chat-code-block"><CodeBlock language="python" code={msg.content} /></div>}
                                    {msg.type === 'thinking' && (
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <SparklesIcon className="w-4 h-4 animate-spin" />
                                            <span>Thinking...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
              </div>
            </div>
            {/* Right Column: Architecture & Logs */}
            <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
              <div className={`bg-dark-bg p-4 rounded-lg border border-border-color h-64 md:h-80 studio-panel ${activePanel === 'architecture' ? 'panel-focus' : ''}`}>
                 <h4 className="font-bold text-slate-300 mb-4">Live Architecture</h4>
                 {showSkeletons ? (
                    <div className="space-y-3 animate-pulse h-full">
                        <div className="flex justify-around items-center h-full">
                           <div className="h-16 w-16 bg-border-color rounded-lg"></div>
                           <div className="h-16 w-16 bg-border-color rounded-lg"></div>
                           <div className="h-16 w-16 bg-border-color rounded-lg"></div>
                        </div>
                    </div>
                 ) : (
                    <svg className={`w-full h-full transition-opacity duration-500 ${architectureVisible ? 'opacity-100' : 'opacity-0'}`}>
                        {/* Nodes */}
                        <g>
                            <rect x="5%" y="40%" width="20%" height="20%" rx="8" fill="#1E293B" stroke="#475569" />
                            <text x="15%" y="52%" textAnchor="middle" fill="#E2E8F0" fontSize="12">React Frontend</text>
                        </g>
                        <g>
                            <rect x="40%" y="40%" width="20%" height="20%" rx="8" fill="#1E293B" stroke="#475569" />
                            <text x="50%" y="52%" textAnchor="middle" fill="#E2E8F0" fontSize="12">FastAPI Backend</text>
                        </g>
                        <g>
                            <rect x="75%" y="40%" width="20%" height="20%" rx="8" fill="#1E293B" stroke="#475569" />
                            <text x="85%" y="52%" textAnchor="middle" fill="#E2E8F0" fontSize="12">Postgres DB</text>
                        </g>
                        {/* Connectors */}
                        <path d="M 25% 50% H 40%" stroke="#0ea5e9" strokeWidth="2" fill="none" className="draw-line-animation" style={{ animationDelay: '0.2s' }}/>
                        <path d="M 60% 50% H 75%" stroke="#0ea5e9" strokeWidth="2" fill="none" className="draw-line-animation" style={{ animationDelay: '0.4s' }}/>
                    </svg>
                 )}
              </div>
              <div className={`bg-dark-bg p-4 rounded-lg border border-border-color flex-grow studio-panel ${activePanel === 'logs' ? 'panel-focus' : ''}`}>
                 <h4 className="font-bold text-slate-300 mb-2">Code & Deployment Logs</h4>
                 <div className="font-mono text-xs text-slate-400 h-40 overflow-y-auto space-y-1">
                   {showSkeletons && logs.length === 0 ? (
                      <div className="space-y-2 animate-pulse">
                         <div className="h-3 bg-border-color rounded w-1/2"></div>
                         <div className="h-3 bg-border-color rounded w-3/4"></div>
                         <div className="h-3 bg-border-color rounded w-2/3"></div>
                      </div>
                   ) : (
                     logs.filter(Boolean).map((log, index) => (
                        <p key={index} className={`transition-opacity duration-300 ${getLogColor(log)}`}>
                            {log}
                        </p>
                    ))
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 h-12">
            {showReviewsButton && (
                <button
                    onClick={() => setShowReviewsModal(true)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-violet to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
                    <span>See Product Reviews</span>
                </button>
            )}
            {!showReviewsButton && !isVisible && ( // Only show placeholder or default button if animation isn't running
                 <button
                    onClick={onLaunchPlayground}
                    className="bg-transparent border-2 border-primary-blue text-primary-blue font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 hover:bg-primary-blue hover:text-dark-bg"
                >
                    Try the AI Studio
                </button>
            )}
        </div>
      </div>
      {showReviewsModal && <ReviewsModal onClose={() => setShowReviewsModal(false)} />}
    </section>
  );
};

export default AIStudioSection;
