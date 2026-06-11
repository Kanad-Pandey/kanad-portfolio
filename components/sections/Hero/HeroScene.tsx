"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const NeuralMesh = dynamic(() => import("@/components/three/scenes/NeuralMesh"), {
  ssr: false,
});

export function HeroScene() {
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-base/50 animate-pulse" />}>
      <NeuralMesh />
    </Suspense>
  );
}
