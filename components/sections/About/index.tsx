"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '@/components/motion/RevealText';
import { DataCore } from '@/components/three/scenes/DataCore';

export const About = () => {
  return (
    <section id="about" className="relative min-h-screen bg-obsidian py-24 flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em] mb-8">
              Professional Profile
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white font-display uppercase tracking-tighter mb-12 leading-tight">
              Bridging the gap between <span className="text-accent-violet italic">Strategy</span> and <span className="text-accent-cyan italic">Execution</span>.
            </h3>
            
            <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              <p>
                I am a Data Scientist and Commercial Analytics Consultant based in Hyderabad, India, specializing in Pharmaceutical Commercial Excellence, AI-Powered Analytics, and Cloud Data Platforms.
              </p>
              <p>
                My work combines deep business understanding with technical execution, enabling organizations to transform complex data into measurable commercial impact.
              </p>
              <p>
                I operate at the intersection of Strategy, Analytics, Technology, and AI to answer critical commercial questions and automate workflows for field teams.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <div className="text-white font-bold text-3xl mb-1 font-display">05+</div>
                <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">Years Experience</div>
              </div>
              <div>
                <div className="text-white font-bold text-3xl mb-1 font-display">50+</div>
                <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">Solutions Deployed</div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-accent-cyan/10" />
            
            {/* Interactive 3D Scene */}
            <DataCore />
          </div>
        </div>
      </div>
    </section>
  );
};
