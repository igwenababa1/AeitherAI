import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { XMarkIcon } from './icons/XMarkIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { CodeBlock } from './CodeBlock';
import { TerminalIcon } from './icons/TerminalIcon';
import { GoogleAILogo } from './icons/GoogleAILogo';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

interface AIPlaygroundSectionProps {
  onClose: () => void;
  initialPrompt: string;
}

const AIPlaygroundSection: React.FC<AIPlaygroundSectionProps> = ({ onClose, initialPrompt }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful and creative AI assistant.');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState('gemini-2.5-pro');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setPrompt(initialPrompt);
    if (textareaRef.current) {
        textareaRef.current.focus();
    }
  }, [initialPrompt]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const genAIResponse: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            systemInstruction: systemPrompt,
            temperature: temperature,
            topP: topP,
        }
      });
      
      const text = genAIResponse.text;
      setResponse(text);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card-bg border border-border-color rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl shadow-primary-blue/10">
        <header className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
          <div className="flex items-center gap-3">
            <GoogleAILogo className="w-8 h-8" />
            <div>
                <h2 className="text-xl font-bold text-white font-heading">Advanced AI Studio</h2>
                <p className="text-xs text-slate-400">Powered by Google Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-md transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-[60%] p-4 flex flex-col border-r-0 md:border-r border-border-color">
            <div className="flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">User Prompt</h3>
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your prompt here..."
                  className="w-full h-full bg-dark-bg border border-border-color rounded-lg p-3 text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue flex-grow"
                />
            </div>
             <div className="flex-shrink-0 mt-4">
                 <h3 className="text-lg font-semibold text-slate-200 mb-2">System Prompt</h3>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="e.g., You are a Python expert who writes elegant, efficient code."
                  className="w-full h-24 bg-dark-bg border border-border-color rounded-lg p-3 text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
             </div>
          </div>

          <div className="w-full md:w-[40%] flex flex-col">
            <div className="p-4 border-b border-border-color">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Configuration</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-slate-400 mb-1">Model</label>
                        <select id="model" value={model} onChange={e => setModel(e.target.value)} className="w-full bg-dark-bg border border-border-color rounded-md p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-blue">
                            <option>gemini-2.5-pro</option>
                            <option>gemini-2.5-flash</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="temperature" className="flex justify-between text-sm font-medium text-slate-400 mb-1">
                            <span>Temperature</span>
                            <span>{temperature}</span>
                        </label>
                        <input id="temperature" type="range" min="0" max="1" step="0.1" value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} className="w-full h-2 bg-border-color rounded-lg appearance-none cursor-pointer" />
                    </div>
                     <div>
                        <label htmlFor="topP" className="flex justify-between text-sm font-medium text-slate-400 mb-1">
                            <span>Top-P</span>
                            <span>{topP}</span>
                        </label>
                        <input id="topP" type="range" min="0" max="1" step="0.05" value={topP} onChange={e => setTopP(parseFloat(e.target.value))} className="w-full h-2 bg-border-color rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>
                 <div className="mt-6">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-primary-blue hover:bg-blue-400 text-dark-bg font-bold py-2.5 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generating...' : 'Generate'}
                        {!isLoading && <RocketLaunchIcon className="w-5 h-5" />}
                    </button>
                 </div>
            </div>

            <div className="p-4 flex-grow flex flex-col overflow-y-auto">
             <h3 className="text-lg font-semibold text-slate-200 mb-3">Response</h3>
             <div className="bg-dark-bg border border-border-color rounded-lg text-slate-300 flex-grow relative overflow-y-auto">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-slate-400">
                            <SparklesIcon className="w-5 h-5 animate-spin" />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
                {error && <div className="text-red-400 p-4 whitespace-pre-wrap">{error}</div>}
                {response && !isLoading && (
                    <div className="p-1">
                        <CodeBlock language="markdown" code={response} />
                    </div>
                )}
                {!response && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-4">
                        <TerminalIcon className="w-12 h-12 mb-2" />
                        <p>Your AI-generated response will appear here.</p>
                    </div>
                )}
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlaygroundSection;