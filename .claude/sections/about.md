# About Section

**Question answered for visitor:** "Who is this person and why do they matter?"

## Content
- Short manifesto: 3 short paragraphs (who, what, why now)
- Portrait with WebGL displacement effect on hover
- Key stats: years of experience, projects shipped, models deployed
- No stock photos — high-contrast portrait only

## Files
```
components/sections/About/
  index.tsx
  About.motion.ts
```

## Motion
- Section enters as a scene: copy stagger-reveals left, portrait slides in right
- Portrait: WebGL displacement on hover (R3F or CSS filter fallback)
- Stats: count-up animation on scroll enter
- All via `revealOnEnter` factory from `lib/motion/scroll.ts`

## Layout
- Two-column on `≥ md`: copy left, portrait right
- Single-column on mobile: portrait above copy
- Stats row below, 3 items with `StaggerList`

## Rules
- Copy comes from `content/site.config.ts` or a dedicated `about.mdx`
- Portrait via `next/image` with blurred placeholder, no `priority` prop
- WebGL displacement scene: `aria-hidden="true"`
