import React, { useEffect, useRef, useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

// This is a global declaration for the highlight.js library
declare const hljs: any;

interface CodeBlockProps {
  language: string;
  code: string;
  showCopyButton?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, showCopyButton = true }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative my-4 bg-card-bg/70 rounded-lg">
      <div className="text-xs text-slate-400 px-4 py-2 border-b border-border-color">{language}</div>
      <pre className="p-4 overflow-x-auto">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
      {showCopyButton && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-border-color hover:bg-slate-600 text-slate-300 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};
