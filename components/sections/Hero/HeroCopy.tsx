"use client";

import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { easings } from "@/lib/motion";

export function HeroCopy() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4">
      {/* Background Blooms */}
      <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-1/20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/10 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easings.expoOut }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-2">
          Available for new challenges
        </span>
      </motion.div>

      <RevealText as="h1" className="text-5xl font-bold tracking-tight md:text-9xl">
        KANAD PANDEY
      </RevealText>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: easings.expoOut }}
        className="mt-8 flex flex-col items-center"
      >
        <p className="max-w-3xl text-lg leading-relaxed text-text-2 md:text-2xl font-light">
          Bridging <span className="text-white italic font-medium">Commercial Strategy</span> & <span className="text-white italic font-medium">AI Engineering</span> to transform 
          data into measurable impact.
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
          <Button size="lg" className="group relative overflow-hidden px-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="relative z-10 uppercase tracking-widest text-[10px] font-bold">View Selected Works</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent-violet/40 to-accent-cyan/40 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
          <Button variant="outline" size="lg" className="px-10 rounded-full uppercase tracking-widest text-[10px] font-bold">
            Get in touch
          </Button>
        </div>
      </motion.div>

      {/* Hero Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: easings.expoOut }}
        className="mt-20 grid grid-cols-2 gap-12 border-t border-white/5 pt-10 md:grid-cols-3 md:gap-24"
      >
        <div className="flex flex-col gap-1">
          <span className="text-4xl font-bold text-white font-display">05+</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-mono">Years Excellence</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-4xl font-bold text-white font-display">50+</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-mono">Solutions Deployed</span>
        </div>
        <div className="hidden flex-col gap-1 md:flex">
          <span className="text-4xl font-bold text-white font-display">12+</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-mono">Global Clients</span>
        </div>
      </motion.div>
    </div>
  );
}
