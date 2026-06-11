# AI/ML Showcase Section

**Question answered for visitor:** "Can they build real intelligent systems?"

## Purpose
Featured intelligent systems: LLM apps, RAG pipelines, NLP work.
**v1 constraint: static previews only — no runtime LLM calls.**

## Card format (per showcase item)
- Front: title, one-line description, looping muted MP4 preview
- Flip/expand: architecture diagram + key tech stack chips
- Link: to full case study at `/projects/[slug]` if available

## Content (examples)
- RAG pipeline builder
- LLM ops platform
- Pharma NLP / clinical data extraction
- Snowflake ML pipeline

## Files
```
components/sections/AIShowcase/
  index.tsx
  ShowcaseCard.tsx   # Individual card with flip animation
  AIShowcase.motion.ts
```

## Motion
- Cards enter with `staggerChildren` on scroll
- Card flip: `rotateY` via Framer Motion, `layoutId` for shared element transitions
- Video autoplay on hover, pause on mouse leave

## Assets
- Looping previews: `public/video/*.mp4` + `*.webm` pair, ≤ 2MB each
- Architecture diagrams: `public/images/diagrams/`
- Videos require captions + transcript (a11y rule)

## Rules
- No runtime LLM API calls in v1
- Video elements: `autoPlay muted loop playsInline`, `aria-hidden="true"` on decorative previews
- Architecture diagram images: meaningful `alt` text
