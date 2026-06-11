import React from 'react';
import { Network } from 'lucide-react';

interface ArchDiagramProps {
  children: React.ReactNode;
  caption?: string;
}

export const ArchDiagram = ({ children, caption }: ArchDiagramProps) => {
  return (
    <figure className="my-12">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-violet/20 to-accent-cyan/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-obsidian border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden min-h-[300px] flex items-center justify-center">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Network size={24} className="text-accent-cyan" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center">
            {children}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-center text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          Fig: {caption}
        </figcaption>
      )}
    </figure>
  );
};
