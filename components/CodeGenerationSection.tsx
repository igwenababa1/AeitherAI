import React, { useState, useCallback } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { WandMagicSparklesIcon } from './icons/WandMagicSparklesIcon';
import { CodeBlock } from './CodeBlock';
import { SparklesIcon } from './icons/SparklesIcon';
import { TerminalIcon } from './icons/TerminalIcon';

const CodeGenerationSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [prompt, setPrompt] = useState('Create a React hook to fetch and cache data from an API.');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractCode = (markdown: string): string => {
    const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)\n```/;
    const match = markdown.match(codeBlockRegex);
    return match ? match[1].trim() : markdown.trim();
  };

  const handleGenerateCode = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setGeneratedCode('');
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const genAIResponse: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert code generation AI. Given a prompt, you must generate only the code requested in a single markdown block. Do not include any explanatory text before or after the code block. Provide clean, efficient, and well-commented code.',
          temperature: 0.2, // Lower temperature for more deterministic code
        }
      });
      
      const rawText = genAIResponse.text;
      const code = extractCode(rawText);
      setGeneratedCode(code);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred while generating code.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);
  
  const getLanguage = (code: string) => {
    // A simple heuristic to detect language for syntax highlighting.
    if (code.toLowerCase().includes('react') || code.includes('import React') || code.includes('useState')) return 'jsx';
    if (code.toLowerCase().includes('python') || (code.includes('import') && (code.includes('torch') || code.includes('numpy') || code.includes('def ')))) return 'python';
    if (code.includes('function') || code.includes('const ') || code.includes('let ')) return 'javascript';
    return 'bash';
  };

  return (
    <section id="code-generation" className="py-20 bg-dark-bg" ref={ref}>
      <div className={`container mx-auto px-6 section-fade-in ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">Instant Code Generation</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
            Describe the logic you need, and let our AI engineer write the code. From simple functions to complex components, get started in seconds.
          </p>
        </div>

        <div className="bg-card-bg border border-border-color rounded-xl shadow-2xl shadow-primary-blue/10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Input Panel */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-border-color flex flex-col">
            <h3 className="text-xl font-bold text-slate-200 mb-4 font-heading">Your Request</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A Python function that calculates the Fibonacci sequence."
              className="w-full flex-grow bg-dark-bg border border-border-color rounded-lg p-3 text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-primary-blue"
              rows={8}
            />
            <button
              onClick={handleGenerateCode}
              disabled={isLoading || !prompt.trim()}
              className="w-full flex items-center justify-center gap-2 mt-4 bg-primary-blue hover:bg-blue-400 text-dark-bg font-bold py-2.5 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Code'}
              {!isLoading && <WandMagicSparklesIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Output Panel */}
          <div className="p-6 flex flex-col">
            <h3 className="text-xl font-bold text-slate-200 mb-4 font-heading">Generated Code</h3>
            <div className="bg-dark-bg border border-border-color rounded-lg flex-grow relative overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-400">
                    <SparklesIcon className="w-5 h-5 animate-spin" />
                    <span>Writing code...</span>
                  </div>
                </div>
              )}
              {error && <div className="p-4 text-red-400 whitespace-pre-wrap">{error}</div>}
              {generatedCode && !isLoading && (
                <div className="h-full overflow-y-auto">
                  <CodeBlock language={getLanguage(generatedCode)} code={generatedCode} />
                </div>
              )}
              {!generatedCode && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-4">
                  <TerminalIcon className="w-12 h-12 mb-2" />
                  <p>Your generated code will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeGenerationSection;
