"use client";

import React, { useRef, useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/types/content';
import { ProjectCard } from './ProjectCard';
import { RevealText } from '@/components/motion/RevealText';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags = useMemo(() => {
    const allTags = projects.flatMap(p => p.tags);
    return ['All', ...Array.from(new Set(allTags))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter(p => p.tags.includes(activeTag));
  }, [projects, activeTag]);

  useGSAP(() => {
    if (!containerRef.current || !sectionRef.current || window.innerWidth < 1024) return;

    const scrollWidth = containerRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    // Precisely calculate the distance needed to scroll so the last card is fully visible with padding
    const xDistance = scrollWidth - windowWidth + (windowWidth * 0.1); 

    const pin = gsap.to(containerRef.current, {
      x: -xDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: 'center center',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pin.kill();
    };
  }, { scope: sectionRef, dependencies: [filteredProjects] });

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative min-h-screen bg-obsidian flex flex-col overflow-hidden"
    >
      {/* Header - Fixed height/positioning to avoid overlap */}
      <div className="w-full pt-32 pb-12 lg:pt-20 lg:pb-0 z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em] mb-4">
                Selected Works
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold text-white font-display uppercase tracking-tighter">
                <RevealText>Evidence of</RevealText>
                <br />
                <span className="text-accent-cyan italic leading-none">Capability</span>
              </h3>
            </div>

            {/* Filter Bar */}
            <nav className="flex flex-wrap gap-3 max-w-2xl">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${
                    activeTag === tag
                      ? 'bg-accent-cyan border-accent-cyan text-obsidian'
                      : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Horizontal Rail / Vertical Stack */}
      <div className="flex-grow flex items-center relative w-full overflow-hidden lg:overflow-visible py-12 lg:py-0">
        <div 
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 lg:px-[10vw] w-full lg:w-max"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Text */}
      <div className="hidden lg:block absolute bottom-10 right-10 text-[15vh] font-display font-bold text-white/[0.02] select-none pointer-events-none uppercase leading-none z-0">
        Portfolio
      </div>
    </section>
  );
};
