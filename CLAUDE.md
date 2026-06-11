# CLAUDE.md — Kanad Pandey Portfolio

Operational reference for Claude Code. Full rules in `AGENTS.md` and `PROJECT_STRUCTURE.md`.

---

## Stack (fixed for v1)

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber + Drei · Shadcn/UI · react-hook-form + Zod · MDX · Formspree · Vercel

**Do not introduce new libraries without explicit approval.**

---

## Folder layout

```
app/(site)/          # Routing only — thin page shells
components/
  sections/          # Tier 3 — page-shaped (Hero, About, Skills, …)
  ui/                # Tier 1 — Shadcn primitives, no motion
  motion/            # Tier 2 — composites with motion contracts
  three/             # R3F scenes, shaders, materials
  chrome/            # Nav, Footer, Cursor
  mdx/               # MDX component overrides
content/             # MDX source files + site.config.ts
lib/
  motion/            # easings.ts, durations.ts, variants.ts, scroll.ts, …
  three/             # geometry, loaders, materials helpers
  content/           # getAllProjects(), getProjectBySlug(), …
hooks/               # useLenis, useMagnetic, useScrollTrigger, …
providers/           # MotionProvider, LenisProvider, CursorProvider
constants/           # breakpoints, routes, tags
types/               # Shared TS types + Zod schemas
styles/              # tokens.css (source of truth), globals.css, print.css
tests/               # Playwright e2e + Vitest unit
```

---

## Key rules

### TypeScript
- Strict mode. No `any`. No `@ts-ignore` without an explanatory comment.
- Types: `PascalCase`. Props: `ComponentNameProps`. Constants: `SCREAMING_SNAKE_CASE`.

### Components
- Server components by default. `"use client"` only at the leaf that needs it.
- 3D components: always `dynamic(() => import(...), { ssr: false })` under `<Suspense>`.
- No prop drilling beyond two levels — use context or composition.
- No inline styles except dynamic CSS custom property values.

### Motion
- All durations → `lib/motion/durations.ts`. All easings → `lib/motion/easings.ts`.
- All Framer Motion variants → `lib/motion/variants.ts`.
- All ScrollTrigger instances → factory from `lib/motion/scroll.ts`. No orphan triggers.
- Never animate `top`, `left`, `width`, `height` — transforms only.
- Every motion helper must check `useReducedMotion()`.
- House easing: `expoOut: [0.22, 1, 0.36, 1]`.

### Design tokens
- Never hard-code hex in components — always use a CSS token from `styles/tokens.css`.
- Never stack two glassmorphic layers.

### Code quality
- No magic numbers — reference named constants.
- No hardcoded copy in components — content comes from props or MDX.
- No `console.log` in committed code.
- No `eslint-disable` without a comment.
- Comments only for non-obvious *why*, never *what*.

### Performance
- JS per route ≤ 180KB gzipped. Fonts ≤ 80KB total.
- `priority` only on the hero image.
- `.glb` models: Draco-compressed, ≤ 500KB each.

---

## Git workflow

- Branch from `main`. Prefix: `feat/`, `fix/`, `chore/`, `motion/`, `content/`, etc.
- Commit format: `<type>(<scope>): <imperative summary>` (≤ 72 chars, no period).
- Never force-push `main`. Never commit `.env` or secrets. Never `--no-verify`.
- PRs require passing CI (typecheck, lint, build, Playwright smoke) before merge.

---

## Import conventions

```ts
import { Hero } from '@/components/sections/Hero'
import { RevealText } from '@/components/motion'
import { Button } from '@/components/ui'
import { fadeUp } from '@/lib/motion/variants'
import { expoOut } from '@/lib/motion/easings'
import { base } from '@/lib/motion/durations'
import { useLenis } from '@/hooks/useLenis'
import type { ProjectFrontmatter } from '@/types/content'
import { ROUTES } from '@/constants/routes'
// 3D — never direct import in server components
const HeroScene = dynamic(() => import('@/components/three/scenes/NeuralMesh'), { ssr: false })
```
