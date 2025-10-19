import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BeakerIcon } from './icons/BeakerIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { CodeBlock } from './CodeBlock';
import { SparklesIcon } from './icons/SparklesIcon';

interface AIPlaygroundSectionProps {
  onClose: () => void;
}

const AIPlaygroundSection: React.FC<AIPlaygroundSectionProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('Create a simple Express.js server with a single endpoint "/api/hello" that returns a JSON object { "message": "Hello, World!" }');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    if (!process.env.API_KEY) {
      setError('API key is not configured. Please set the API_KEY environment variable.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setGeneratedCode('');

    try {
      // FIX: Use the correct constructor with a named apiKey parameter.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // FIX: Use ai.models.generateContent and provide the model and contents.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro', // Using a powerful model for code generation
        contents: `Generate a full, runnable code snippet for the following request. Only output the code, with no explanations or markdown formatting. Request: ${prompt}`,
      });
      
      // FIX: Extract the generated text directly from the 'text' property of the response.
      const text = response.text;
      setGeneratedCode(text.replace(/```(javascript|typescript|js|ts)?\n/g, '').replace(/```/g, '').trim());

    } catch (e) {
      console.error(e);
      setError('Failed to generate code. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-500/10">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <BeakerIcon className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">AI Command Center</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700">
            <XMarkIcon className="w-6 h-6 text-slate-400" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-slate-400 mb-4">
            Describe the application or component you want to build. Our AI engineer will generate the code for you in real-time.
          </p>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
              placeholder="e.g., 'A React component for a pricing table with three tiers'"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : <><SparklesIcon className="w-5 h-5" /> Generate Code</>}
            </button>
          </div>

          {error && <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}

          {generatedCode && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Generated Code:</h3>
              <CodeBlock language="javascript" code={generatedCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlaygroundSection;
