import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { XMarkIcon } from './icons/XMarkIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { CodeBlock } from './CodeBlock';
import { TerminalIcon } from './icons/TerminalIcon';

interface AIPlaygroundSectionProps {
  onClose: () => void;
  initialPrompt: string;
}

const AIPlaygroundSection: React.FC<AIPlaygroundSectionProps> = ({ onClose, initialPrompt }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const model = 'gemini-2.5-pro';

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
        textareaRef.current.setSelectionRange(initialPrompt.length, initialPrompt.length);
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
      // FIX: Correctly instantiate GoogleGenAI and call generateContent
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const genAIResponse: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: prompt,
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
      <div className="bg-card-bg border border-border-color rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl shadow-primary-blue/10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
          <div className="flex items-center gap-3">
            <SparklesIcon className="w-6 h-6 text-primary-blue" />
            <h2 className="text-xl font-bold text-white font-heading">AI Playground</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-md transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        {/* Main Content */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          {/* Input Panel */}
          <div className="w-full md:w-1/2 p-4 flex flex-col border-r-0 md:border-r border-border-color">
            <h3 className="text-lg font-semibold text-slate-200 mb-3">Prompt</h3>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your prompt here... (e.g., 'Create a React component for a login form')"
              className="w-full h-full bg-dark-bg border border-border-color rounded-lg p-3 text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue flex-grow"
            />
             <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400">Model: Gemini 2.5 Pro</span>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="flex items-center gap-2 bg-primary-blue hover:bg-blue-400 text-dark-bg font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generating...' : 'Generate'}
                    {!isLoading && <RocketLaunchIcon className="w-5 h-5" />}
                </button>
             </div>
          </div>

          {/* Output Panel */}
          <div className="w-full md:w-1/2 p-4 flex flex-col overflow-y-auto">
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
  );
};

export default AIPlaygroundSection;
