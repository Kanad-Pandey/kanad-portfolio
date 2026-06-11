"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Experience } from '@/types/content';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';

interface ExperienceProps {
  experience: Experience[];
}

export const ExperienceSection = ({ experience }: ExperienceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} id="experience" className="relative min-h-screen bg-obsidian py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em] mb-4">
              Career Trajectory
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold text-white font-display uppercase tracking-tighter mb-8">
              Professional <br />
              <span className="text-accent-violet italic">Evolution</span>
            </h3>
          </div>

          <div className="relative">
            {/* Fluid Path SVG */}
            <svg 
              className="absolute left-4 md:left-12 top-0 h-full w-2 overflow-visible pointer-events-none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 1 0 V 2000"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
              />
              <motion.path
                d="M 1 0 V 2000"
                fill="none"
                stroke="url(#gradient-path)"
                strokeWidth="2"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="gradient-path" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timeline Items */}
            <div className="ml-12 md:ml-24 space-y-32">
              {experience.map((item, index) => (
                <TimelineItem key={item.slug} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-violet/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[150px] translate-x-1/4" />
    </section>
  );
};

const TimelineItem = ({ item, index }: { item: Experience; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="relative"
    >
      {/* Node Dot */}
      <div className="absolute -left-[44px] md:-left-[60px] top-2">
        <div className={`w-3 h-3 rounded-full bg-obsidian border-2 ${
          item.current ? 'border-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)]' : 'border-white/20'
        }`} />
        {item.current && (
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-accent-cyan"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 text-accent-cyan font-mono text-[10px] uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} className={item.current ? 'animate-pulse' : ''} />
            {item.role}
          </div>
          <h4 className="text-3xl md:text-5xl font-bold text-white font-display uppercase tracking-tight leading-none mb-4 group hover:text-accent-violet transition-colors duration-500">
            {item.company}
          </h4>
          <div className="flex flex-wrap gap-4 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              {item.period}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} />
              {item.location}
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 glass-card hover:bg-white/[0.07] transition-all duration-500 group">
            <div 
              className="text-gray-400 text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: item.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                  .replace(/^- (.*)$/gm, '<div class="flex gap-3"><span class="text-accent-cyan mt-2 w-1.5 h-1.5 rounded-full bg-current shrink-0"></span><span class="group-hover:text-gray-200 transition-colors">$1</span></div>')
                  .replace(/\n\n/g, '<br/>') 
              }} 
            />
            
            <div className="flex flex-wrap gap-2 mt-8">
              {item.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover:border-white/20 group-hover:text-gray-300 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
