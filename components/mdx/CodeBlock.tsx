"use client";

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock = ({ code, language = 'python', filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl border border-white/10 bg-[#0D0D12] overflow-hidden group">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          {filename && (
            <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
              <Terminal size={12} />
              <span>{filename}</span>
            </div>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-500 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-gray-300">
          <code>{code}</code>
        </pre>
      </div>

      {/* Language Badge */}
      <div className="px-4 py-1.5 bg-white/5 border-t border-white/10 flex justify-end">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
          {language}
        </span>
      </div>
    </div>
  );
};
