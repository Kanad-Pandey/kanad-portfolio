# Component Architecture

Three tiers — respect the hierarchy. Never skip levels.

## Tier 1 — Primitives (`components/ui/`)
- Shadcn-derived, themed via CSS variables
- Stateless and presentational — no motion logic
- Examples: `Button`, `Card`, `Input`, `Textarea`, `Badge`, `Dialog`, `Separator`
- Import: `import { Button, Card } from '@/components/ui'`

## Tier 2 — Composites (`components/motion/`, `components/chrome/`)
- Opinionated combinations of primitives with motion contracts
- Each owns its motion via a `motion` prop or co-located `*.motion.ts` config
- No magic numbers inline — all values reference `lib/motion`
- Examples: `MagneticButton`, `RevealText`, `GlassCard`, `ScrollSection`, `StaggerList`, `FadeIn`, `ParallaxLayer`, `Nav`, `Footer`, `Cursor`
- Import: `import { RevealText, MagneticButton } from '@/components/motion'`

## Tier 3 — Sections (`components/sections/`)
- Page-shaped — one per home section
- Compose Tier 1 + Tier 2 only
- Receive content as typed props — no hardcoded copy inside
- One section = one question answered for the visitor
- Examples: `Hero`, `About`, `Skills`, `AIShowcase`, `Projects`, `Experience`, `Contact`
- Import: `import { Hero } from '@/components/sections/Hero'`

## General rules
- **Server components by default.** `"use client"` only at the leaf that needs interactivity, motion, or browser APIs
- **3D components** always via `dynamic(() => import(...), { ssr: false })` under `<Suspense>` with skeleton fallback
- **No prop drilling beyond two levels** — use context or composition
- **No inline styles** except dynamic CSS custom property values: `style={{ '--delay': '0.2s' }}`
- **Composition over configuration** — prefer `children` and slot patterns over proliferating `variant` props

## Section file convention
```
components/sections/SectionName/
  index.tsx           # Root — exported as named export
  SubComponent.tsx    # Section-specific sub-components
  SectionName.motion.ts  # All animation config for this section
```

## MDX components (`components/mdx/`)
- `MDXComponents.tsx` — maps HTML tags to styled components
- `CodeBlock.tsx`, `Callout.tsx`, `MetricCard.tsx`, `ArchDiagram.tsx`
- Used in case study pages at `/projects/[slug]`
