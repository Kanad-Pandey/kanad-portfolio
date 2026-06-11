"use client";

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-obsidian py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-6">
            <h4 className="text-white font-display text-2xl font-bold uppercase tracking-tighter mb-4">
              Kanad Pandey<span className="text-accent-cyan">.</span>
            </h4>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em] max-w-xs leading-loose">
              Designing the future of commercial intelligence through data science and AI engineering.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Navigation</div>
            <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-white/60">
              <Link href="/#about" className="hover:text-accent-cyan transition-colors">About</Link>
              <Link href="/#projects" className="hover:text-accent-cyan transition-colors">Projects</Link>
              <Link href="/resume" className="hover:text-accent-cyan transition-colors">Resume</Link>
              <Link href="/#contact" className="hover:text-accent-cyan transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">Social Signals</div>
            <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-white/60">
              <a href="https://www.linkedin.com/in/kanad-pandey-b1264a200/" target="_blank" className="hover:text-accent-violet transition-colors">LinkedIn</a>
              <a href="https://github.com/Kanad-Pandey" target="_blank" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://twitter.com/kanad_p" target="_blank" className="hover:text-accent-cyan transition-colors">X (Twitter)</a>
            </nav>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Kanad Pandey. All Rights Reserved.
          </div>
          <div className="flex items-center gap-8 text-gray-600 font-mono text-[10px] uppercase tracking-widest">
            <span>Built with Next.js 15 & Framer Motion</span>
            <span>60fps Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
