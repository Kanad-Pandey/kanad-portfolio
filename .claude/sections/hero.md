# Hero Section

**Question answered for visitor:** "Who is this person and should I keep scrolling?"
**Target:** Identity + provocation in < 3 seconds.

## Content
- Name: Kanad Pandey
- Role triad (animated): AI Engineer · Data Scientist · GenAI Builder · Pharma-tech Consultant
- Primary CTA (single): e.g. "View my work" → scrolls to #projects
- Scroll cue: animated indicator at bottom

## 3D Motif
- Options: neural-mesh, particle field, data-orb, shader-driven gradient flow
- Decision deferred to concept prototype stage
- Component: `components/three/scenes/NeuralMesh.tsx` (or chosen variant)
- Always `dynamic(() => import(...), { ssr: false })` under `<Suspense>` with skeleton fallback
- Mobile: fewer particles, DPR capped at 1.5
- Low-memory mobile: `loadLightweightVariant()`

## Files
```
components/sections/Hero/
  index.tsx          # Section root — server component shell
  HeroScene.tsx      # R3F canvas — "use client", ssr:false
  HeroCopy.tsx       # Name, roles, CTA — can be server component
  Hero.motion.ts     # All animation config for this section
```

## Motion
- Roles cycle or stagger-reveal on load using `staggerChildren` from `lib/motion/variants`
- 3D scene: ambient idle loop (R3F `useFrame`)
- Scroll cue: subtle bounce, `silk` easing
- Entry: `fadeUp` variants, `expoOut` easing, `cinematic` duration

## Rules
- No hardcoded copy — name/roles come from `content/site.config.ts`
- 3D scene marked `aria-hidden="true"`
- CTA button uses `MagneticButton` wrapper
