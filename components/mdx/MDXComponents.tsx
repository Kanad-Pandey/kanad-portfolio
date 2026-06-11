import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { CodeBlock } from './CodeBlock';
import { MetricCard } from './MetricCard';
import { ArchDiagram } from './ArchDiagram';

export const mdxComponents: MDXComponents = {
  // Custom Components
  CodeBlock,
  MetricCard,
  ArchDiagram,
  // Styled Image Wrapper
  Image: (props: any) => (
    <div className="my-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative aspect-video group">
      <Image 
        {...props} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
    </div>
  ),
  // Grid helper for metrics
  MetricGrid: ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {children}
    </div>
  ),
  // Existing Tag Overrides
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-white font-display uppercase tracking-wider">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 text-white font-display uppercase tracking-wide border-b border-white/10 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold mt-6 mb-3 text-white font-display">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-400 leading-relaxed mb-4 text-lg">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-3 mb-6">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-gray-400 text-lg">
      <span className="text-accent-cyan mt-1.5">•</span>
      <span>{children}</span>
    </li>
  ),
  a: ({ href, children }) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href || '#'} className="text-accent-violet hover:text-accent-cyan transition-colors duration-300 underline decoration-white/20 underline-offset-4">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-violet hover:text-accent-cyan transition-colors duration-300 underline decoration-white/20 underline-offset-4"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent-violet bg-white/5 p-6 my-8 italic text-gray-300 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-sm text-accent-cyan">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#0D0D12] border border-white/10 rounded-xl p-6 my-8 overflow-x-auto font-mono text-sm leading-relaxed text-gray-300">
      {children}
    </pre>
  ),
};
