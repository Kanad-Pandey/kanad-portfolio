"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/content';
import { useCursorState } from '@/hooks/useCursorState';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { setCursorState } = useCursorState();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex-shrink-0 w-[85vw] md:w-[500px] h-[450px] md:h-[550px] bg-ink border border-white/10 rounded-2xl overflow-hidden glass-card"
      onMouseEnter={() => setCursorState('view')}
      onMouseLeave={() => setCursorState('default')}
    >
      <Link href={`/projects/${project.slug}`} className="block w-full h-full">
        {/* Project Image Placeholder / Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-accent-cyan/5 opacity-50 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-accent-cyan uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-4 uppercase tracking-tighter leading-tight group-hover:text-accent-cyan transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm md:text-base line-clamp-3 max-w-sm group-hover:text-gray-300 transition-colors duration-300 font-light leading-relaxed">
            {project.description}
          </p>

          <div className="mt-8 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-cyan opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            View Case Study <ArrowUpRight size={14} />
          </div>

          <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <ArrowUpRight className="text-white" size={20} />
            </div>
          </div>
        </div>

        {/* Index Number */}
        <div className="absolute top-10 left-10 text-white/5 font-display text-8xl font-bold select-none group-hover:text-white/10 transition-colors duration-500">
          {String(index + 1).padStart(2, '0')}
        </div>
      </Link>
    </motion.div>
  );
};
