"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, GraduationCap, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-obsidian">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold text-white font-display uppercase tracking-tighter mb-4">
              Resume<span className="text-accent-cyan">.</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-[0.3em]">
              Architectural Blueprint of Experience
            </p>
          </div>
          <a 
            href="/resume.pdf" 
            download="Kanad_Pandey_Resume.pdf"
            className="inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white gap-2 px-8 py-4 transition-colors group"
          >
            <FileDown size={20} className="group-hover:translate-y-1 transition-transform" />
            <span className="uppercase tracking-widest font-bold text-xs">Download PDF</span>
          </a>
        </div>

        {/* Resume Canvas (Futuristic UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Info & Skills */}
          <div className="lg:col-span-4 space-y-12">
            {/* Contact Card */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 glass-card">
              <h2 className="text-white font-display text-xl uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                Coordinates
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-400 group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:text-accent-cyan transition-colors">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-mono truncate">kanadpandey19946@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:text-accent-cyan transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-mono">+91-9755754199</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:text-accent-cyan transition-colors">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-mono">Hyderabad, India</span>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://www.linkedin.com/in/kanad-pandey-b1264a200/" target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-accent-cyan transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://github.com/Kanad-Pandey" target="_blank" className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-accent-cyan transition-all">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 glass-card">
              <h2 className="text-white font-display text-xl uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                Education
              </h2>
              <div className="relative pl-6 border-l border-white/10">
                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-accent-cyan" />
                <div className="text-accent-cyan font-mono text-[10px] uppercase tracking-widest mb-2">2020 — 2024</div>
                <h3 className="text-white font-bold text-lg leading-snug mb-1">National Institute of Technology Patna</h3>
                <p className="text-gray-400 text-sm">Bachelor of Technology</p>
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono">
                  CGPA: 8.1 / 10
                </div>
              </div>
            </div>

            {/* Tech Stack Pulse */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 glass-card overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe size={40} className="text-accent-cyan animate-pulse" />
              </div>
              <h2 className="text-white font-display text-xl uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                Core Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Python", "SQL", "GenAI", "Azure ML", "Snowflake", "PyTorch", "React", "Next.js", "n8n", "XGBoost"].map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Projects */}
          <div className="lg:col-span-8 space-y-12">
            {/* Experience Summary */}
            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 glass-card relative overflow-hidden">
               {/* Decorative Gradient */}
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-violet/10 rounded-full blur-[80px]" />
               
               <h2 className="text-white font-display text-2xl uppercase tracking-widest mb-10">Experience</h2>
               
               <div className="space-y-12">
                  <div className="group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">Senior Data Scientist @ Acuitas 360</h3>
                      <span className="text-accent-cyan font-mono text-xs uppercase tracking-widest">Future Trajectory</span>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Leading high-impact commercial AI initiatives and agentic RAG workflows.</li>
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Architecting the next generation of AI-enabled commercial modernization platforms.</li>
                    </ul>
                  </div>

                  <div className="group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">Data Scientist @ Acuitas 360</h3>
                      <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">May 2024 — Present</span>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Developed segmentation tools improving HCP targeting accuracy by 35%.</li>
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Integrated LLM-based summarization for CRM app, boosting follow-up accuracy by 45%.</li>
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Deployed predictive models on Azure ML for real-time commercial alerts.</li>
                    </ul>
                  </div>

                  <div className="group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">Data Science Intern @ Acuitas 360</h3>
                      <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">Sept 2023 — Apr 2024</span>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Designed ETL pipelines in ADF to process 1M+ records from disparate sources.</li>
                      <li className="flex gap-3"><span className="text-accent-cyan mt-1.5">•</span> Developed Power BI dashboards for pharmaceutical risk analytics.</li>
                    </ul>
                  </div>
               </div>
            </div>

            {/* Featured Projects Highlight */}
            <div className="p-10 rounded-3xl bg-white/5 border border-white/10 glass-card">
              <h2 className="text-white font-display text-2xl uppercase tracking-widest mb-10">Signature Builds</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Automated Resume Review", tech: "GPT-4 + n8n", impact: "Real-time Scoring" },
                  { name: "Heart Attack Assessment", tech: "XGBoost + Python", impact: "93% ROC-AUC" },
                  { name: "KOL Identification Engine", tech: "Fuzzy Logic + APIs", impact: "70% Efficiency" },
                  { name: "CRM Automation Ecosystem", tech: "Power Platform", impact: "45% Accuracy" }
                ].map((project) => (
                  <div key={project.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all group">
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-accent-cyan transition-colors">{project.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs font-mono">{project.tech}</span>
                      <span className="text-accent-cyan text-[10px] font-mono uppercase tracking-widest">{project.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
