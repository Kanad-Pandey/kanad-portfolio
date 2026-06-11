"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useCursorState } from '@/hooks/useCursorState';
import { Network } from 'lucide-react';

// Neural Plexus: Dynamic nodes and connecting lines
function NeuralPlexus({ count = 50, radius = 2.5, isDragging = false }: { count: number, radius: number, isDragging: boolean }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Initialize particles with positions and velocities
  const particles = useMemo(() => {
    const p = [];
    for (let i = 0; i < 200; i++) { // Max possible nodes to avoid re-allocating
      p.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(Math.random() * radius),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      });
    }
    return p;
  }, [radius]);
  
  // Pre-allocate buffer for maximum possible line connections
  const maxLines = 200 * 200;
  const linePositions = useMemo(() => new Float32Array(maxLines * 3), [maxLines]);
  
  useFrame(() => {
    if (!linesRef.current || !pointsRef.current) return;
    
    let lineIdx = 0;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Nodes move faster when the core is being stretched/dragged
    const speedMult = isDragging ? 4 : 1; 

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      // Move node
      p.pos.addScaledVector(p.vel, speedMult);
      
      // Bounce off the invisible boundary sphere
      if (p.pos.length() > radius) {
        p.pos.normalize().multiplyScalar(radius);
        p.vel.multiplyScalar(-1);
      }
      
      // Update Point geometry
      posArray[i*3] = p.pos.x;
      posArray[i*3+1] = p.pos.y;
      posArray[i*3+2] = p.pos.z;
      
      // Calculate Line connections
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dist = p.pos.distanceTo(p2.pos);
        // Connect nodes over a larger distance if dragging to create a "stretching web"
        const threshold = isDragging ? 1.8 : 1.2; 
        
        if (dist < threshold) {
          linePositions[lineIdx++] = p.pos.x;
          linePositions[lineIdx++] = p.pos.y;
          linePositions[lineIdx++] = p.pos.z;
          linePositions[lineIdx++] = p2.pos.x;
          linePositions[lineIdx++] = p2.pos.y;
          linePositions[lineIdx++] = p2.pos.z;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.setDrawRange(0, count);
    
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIdx), 3));
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(200*3), 3]} />
        </bufferGeometry>
        <pointsMaterial color="#22D3EE" size={0.08} transparent opacity={0.9} sizeAttenuation={true} depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.35} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// Inner distorted sphere
function CoreMesh({ isHovered, isDragging }: { isHovered: boolean, isDragging: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const targetDistort = useRef(0.2);
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
  const targetSpeed = useRef(1);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Determine targets based on interaction
    if (isDragging) {
      targetDistort.current = 1.2;
      targetScale.current.set(1.4, 0.8, 1.4); // Stretch effect
      targetSpeed.current = 5;
    } else if (isHovered) {
      targetDistort.current = 0.5;
      targetScale.current.set(1.1, 1.1, 1.1);
      targetSpeed.current = 3;
    } else {
      targetDistort.current = 0.3;
      targetScale.current.set(1, 1, 1);
      targetSpeed.current = 1;
    }

    // Smooth transitions
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort.current, delta * 3);
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed.current, delta * 3);
    meshRef.current.scale.lerp(targetScale.current, delta * 5);
  });

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#0D0D12"
        envMapIntensity={1}
        clearcoat={0.5}
        clearcoatRoughness={0}
        metalness={0.9}
        roughness={0.2}
        distort={0.3}
        speed={1}
        emissive="#8B5CF6"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

export function DataCore() {
  const { setCursorState } = useCursorState();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [complexity, setComplexity] = useState<number>(50);

  // Toggle complexity between 50, 100, and 150 nodes
  const toggleComplexity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setComplexity(prev => prev >= 150 ? 50 : prev + 50);
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full z-10"
      onPointerEnter={() => { setIsHovered(true); setCursorState('view'); }}
      onPointerLeave={() => { setIsHovered(false); setIsDragging(false); setCursorState('default'); }}
    >
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start gap-4 z-20 pointer-events-none">
        <div className="text-gray-400 font-mono text-[10px] uppercase tracking-widest flex flex-col gap-1.5 bg-obsidian/60 p-4 rounded-xl backdrop-blur-md border border-white/5">
          <span className="text-accent-cyan font-bold flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"/>
            Neon Neural Network Active
          </span>
          <span className="mt-1">Drag core to stretch network. Feel free to change neural network complexity!</span>
        </div>
        
        <button 
          onClick={toggleComplexity}
          className="pointer-events-auto px-5 py-3 rounded-xl bg-obsidian/80 border border-white/10 hover:border-accent-cyan hover:bg-white/5 transition-all text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-3 backdrop-blur-md shadow-xl"
        >
          <Network size={16} className="text-accent-violet" />
          Nodes: {complexity} (Toggle)
        </button>
      </div>

      {/* Interactive Drag Area */}
      <div 
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setIsDragging(true); }}
        onPointerUp={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); setIsDragging(false); }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#22D3EE" />
          <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8B5CF6" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <CoreMesh isHovered={isHovered} isDragging={isDragging} />
            <NeuralPlexus count={complexity} radius={3.0} isDragging={isDragging} />
          </Float>
        </Canvas>
      </div>
    </div>
  );
}
