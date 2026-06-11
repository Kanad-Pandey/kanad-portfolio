"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Cloud, Activity, Terminal as TerminalIcon } from 'lucide-react';

const SKILLS_DATA = [
  {
    category: "AI & ML",
    icon: <Brain className="text-accent-cyan" size={24} />,
    skills: ["Machine Learning", "NLP", "LLMs", "Generative AI", "Agentic Systems", "Predictive Modeling"]
  },
  {
    category: "Data Engineering",
    icon: <Database className="text-accent-violet" size={24} />,
    skills: ["Snowflake", "ETL Pipelines", "Dataverse", "SQL Optimization", "Data Governance"]
  },
  {
    category: "Cloud & Ops",
    icon: <Cloud className="text-blue-400" size={24} />,
    skills: ["Azure Functions", "Azure ML", "REST APIs", "Kubernetes", "DevOps"]
  },
  {
    category: "Pharma Excellence",
    icon: <Activity className="text-green-400" size={24} />,
    skills: ["HCP Segmentation", "Territory Alignment", "Launch Strategy", "Incentive Comp", "Call Planning"]
  },
  {
    category: "Engineering",
    icon: <TerminalIcon className="text-yellow-400" size={24} />,
    skills: ["Python", "Power Fx", "TypeScript", "React", "Next.js"]
  }
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(SKILLS_DATA[0].category);

  return (
    <section id="skills" className="relative min-h-screen bg-obsidian py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em] mb-4">
              Capability Matrix
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold text-white font-display uppercase tracking-tighter mb-8">
              A multi-disciplinary <br />
              <span className="text-accent-cyan italic">Toolkit</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Category Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {SKILLS_DATA.map((item) => (
                <button
                  key={item.category}
                  onClick={() => setActiveCategory(item.category)}
                  className={`flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 group text-left ${
                    activeCategory === item.category
                      ? 'bg-white/5 border-white/20 text-white'
                      : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform ${
                    activeCategory === item.category ? 'opacity-100' : 'opacity-50'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="text-lg font-bold font-display uppercase tracking-widest">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 glass-card min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {SKILLS_DATA.find(s => s.category === activeCategory)?.skills.map((skill, index) => (
                    <div 
                      key={skill}
                      className="group relative px-6 py-4 bg-white/5 border border-white/5 rounded-xl hover:border-accent-cyan/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-lg font-medium">{skill}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-accent-cyan/50 to-accent-violet/50"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10">
        <div className="w-[800px] h-[800px] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
      </div>
    </section>
  );
};
