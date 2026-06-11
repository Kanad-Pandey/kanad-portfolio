"use client";

import { HeroScene } from "./HeroScene";
import { HeroCopy } from "./HeroCopy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <HeroScene />
      <HeroCopy />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden">
        <div className="h-10 w-[1px] bg-gradient-to-b from-accent-1 to-transparent opacity-50" />
      </div>
    </section>
  );
}
