# Project Structure

Enterprise-grade architecture for the Kanad Pandey portfolio. Every folder has a single responsibility. Nothing lives in two places.

---

## Directory Tree

```
C:\Portfolio-Kanad\
│
├── app/                          # Next.js App Router — routing only
│   ├── (site)/                   # Route group — site chrome applied here
│   │   ├── layout.tsx            # Providers, Nav, Footer, Cursor
│   │   ├── page.tsx              # Home — composes section components
│   │   ├── projects/
│   │   │   ├── page.tsx          # Optional projects index (SSG)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx      # Case study shell (SSG via MDX)
│   │   │       └── loading.tsx   # Skeleton while MDX hydrates
│   │   ├── resume/
│   │   │   └── page.tsx          # MDX resume + print stylesheet
│   │   └── uses/
│   │       └── page.tsx          # Stack / tools page
│   ├── opengraph-image.tsx       # Dynamic OG via @vercel/og
│   ├── sitemap.ts                # Generated sitemap
│   ├── robots.ts                 # robots.txt rules
│   ├── not-found.tsx             # Branded 404
│   ├── error.tsx                 # Branded 500
│   ├── layout.tsx                # Root layout — html/body, fonts, global CSS
│   └── globals.css               # Tailwind base import only
│
├── components/
│   ├── sections/                 # Tier 3 — page-shaped, one per home section
│   │   ├── Hero/
│   │   │   ├── index.tsx
│   │   │   ├── HeroScene.tsx     # R3F canvas (client, ssr:false)
│   │   │   ├── HeroCopy.tsx
│   │   │   └── Hero.motion.ts
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── AIShowcase/
│   │   ├── Projects/
│   │   ├── Experience/
│   │   ├── Testimonials/
│   │   └── Contact/
│   │
│   ├── ui/                       # Tier 1 — Shadcn primitives, themed
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Dialog.tsx
│   │   ├── Separator.tsx
│   │   └── index.ts              # Barrel export
│   │
│   ├── motion/                   # Tier 2 — composites with motion contracts
│   │   ├── MagneticButton.tsx
│   │   ├── RevealText.tsx
│   │   ├── GlassCard.tsx
│   │   ├── ScrollSection.tsx
│   │   ├── ParallaxLayer.tsx
│   │   ├── StaggerList.tsx
│   │   ├── FadeIn.tsx
│   │   └── index.ts
│   │
│   ├── three/                    # R3F scenes and materials
│   │   ├── scenes/
│   │   │   ├── NeuralMesh.tsx
│   │   │   └── ParticleField.tsx
│   │   ├── materials/
│   │   │   ├── GlowMaterial.tsx
│   │   │   └── ShaderMaterial.tsx
│   │   ├── shaders/
│   │   │   ├── noise.glsl
│   │   │   └── displacement.glsl
│   │   └── index.ts
│   │
│   ├── chrome/                   # Site-level chrome
│   │   ├── Nav/
│   │   │   ├── index.tsx
│   │   │   ├── NavLinks.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Nav.motion.ts
│   │   ├── Footer/
│   │   │   ├── index.tsx
│   │   │   └── Footer.motion.ts
│   │   └── Cursor/
│   │       ├── index.tsx
│   │       └── Cursor.motion.ts
│   │
│   └── mdx/                      # MDX component overrides
│       ├── MDXComponents.tsx     # Maps HTML tags to styled components
│       ├── CodeBlock.tsx
│       ├── Callout.tsx
│       ├── MetricCard.tsx        # Case study metric display
│       └── ArchDiagram.tsx       # Architecture diagram wrapper
│
├── content/                      # MDX source of truth — no logic here
│   ├── projects/
│   │   ├── rag-pipeline-builder.mdx
│   │   ├── llm-ops-platform.mdx
│   │   ├── pharma-analytics-suite.mdx
│   │   └── snowflake-ml-pipeline.mdx
│   ├── experience/
│   │   ├── company-a.mdx
│   │   └── company-b.mdx
│   ├── resume.mdx
│   └── site.config.ts            # Singleton: name, tagline, socials, nav links
│
├── lib/                          # Pure logic — no React, no JSX
│   │
│   ├── motion/                   # Animation system — the single source of truth
│   │   ├── easings.ts            # Named cubic-bezier curves
│   │   ├── durations.ts          # Named duration constants
│   │   ├── variants.ts           # Framer Motion variant presets
│   │   ├── scroll.ts             # GSAP ScrollTrigger factory functions
│   │   ├── text.ts               # SplitText reveal helpers
│   │   ├── magnetic.ts           # Magnetic pointer math
│   │   ├── cursor.ts             # Cursor state machine definition
│   │   └── index.ts              # Barrel — import from '@/lib/motion'
│   │
│   ├── three/                    # R3F utilities — no scene components here
│   │   ├── geometry.ts           # Geometry factory helpers
│   │   ├── loaders.ts            # GLTF / Draco loader setup
│   │   ├── materials.ts          # Material factory helpers
│   │   └── index.ts
│   │
│   ├── content/                  # MDX loading and parsing
│   │   ├── projects.ts           # getAllProjects(), getProjectBySlug()
│   │   ├── experience.ts         # getAllExperience()
│   │   └── resume.ts             # getResume()
│   │
│   ├── seo.ts                    # generateMetadata helpers, JSON-LD builders
│   ├── analytics.ts              # Vercel Analytics event helpers
│   └── utils.ts                  # cn(), formatDate(), clamp(), etc.
│
├── hooks/                        # React hooks — stateful, browser-aware
│   ├── useLenis.ts               # Access shared Lenis instance from context
│   ├── useMagnetic.ts            # Magnetic pointer effect
│   ├── useScrollTrigger.ts       # GSAP ScrollTrigger lifecycle wrapper
│   ├── useReducedMotion.ts       # prefers-reduced-motion gate
│   ├── useMediaQuery.ts          # Responsive breakpoint detection
│   ├── useThemeTokens.ts         # Read CSS variables for R3F theming
│   ├── useCursorState.ts         # Read/set cursor state from context
│   └── useInView.ts              # IntersectionObserver wrapper
│
├── providers/                    # React context providers — app-level state
│   ├── MotionProvider.tsx        # reduced-motion gate + intensity context
│   ├── LenisProvider.tsx         # Lenis instance + ScrollTrigger sync
│   ├── CursorProvider.tsx        # Cursor state machine context
│   └── index.tsx                 # Composes all providers in correct order
│
├── constants/                    # Static values — no logic, no types
│   ├── breakpoints.ts            # Numeric breakpoint values (mirrors Tailwind)
│   ├── routes.ts                 # Route path constants
│   ├── tags.ts                   # Project tag enum values
│   └── index.ts
│
├── types/                        # TypeScript types and Zod schemas
│   ├── content.ts                # ProjectFrontmatter, ExperienceFrontmatter, etc.
│   ├── motion.ts                 # MotionVariant, CursorState, EasingName, etc.
│   ├── three.ts                  # R3F prop types, shader uniform types
│   ├── seo.ts                    # Metadata, JSON-LD shape types
│   └── index.ts                  # Barrel
│
├── styles/
│   ├── tokens.css                # CSS custom properties — single source of truth
│   ├── globals.css               # Tailwind directives + base resets
│   └── print.css                 # /resume print stylesheet
│
├── public/
│   ├── fonts/                    # Self-hosted variable fonts (.woff2)
│   ├── models/                   # Draco-compressed .glb files
│   ├── video/                    # Looping AI-showcase previews (.mp4 / .webm)
│   └── images/                   # Portrait, OG fallback, diagrams
│
└── tests/
    ├── e2e/                      # Playwright end-to-end
    │   ├── home.spec.ts
    │   ├── projects.spec.ts
    │   └── resume.spec.ts
    └── unit/                     # Vitest unit tests
        ├── lib/
        └── hooks/
```

---

## Folder Rationale

### `app/`

**Why it exists:** Next.js App Router requires this. It owns routing and nothing else.

**What belongs here:** Page shells, layouts, loading states, error boundaries, `generateMetadata`, `sitemap.ts`, `robots.ts`, OG image route. No business logic, no animation config, no hardcoded copy.

**What does NOT belong here:** Component implementations, motion config, utility functions, content parsing. Pages import from `components/sections/` and `lib/content/` — they are thin composition layers.

**Scaling strategy:** Add routes by adding folders. The `(site)` route group keeps the site chrome (Nav, Footer, Cursor) scoped to public pages. A future `(admin)` or `(auth)` group gets its own layout without touching the site chrome.

---

### `components/sections/`

**Why it exists:** Sections are page-shaped — they map 1:1 to home page sections and case study page zones. They are too large and too opinionated to live in `ui/` or `motion/`.

**What belongs here:** One folder per section. Each folder contains the section's root component (`index.tsx`), any sub-components that are section-specific, and a co-located `*.motion.ts` config file.

**Import convention:** `import { Hero } from '@/components/sections/Hero'`

**Scaling strategy:** New sections are new folders. Sub-components that become reusable across sections graduate to `components/motion/` or `components/ui/`.

---

### `components/ui/`

**Why it exists:** Shadcn primitives need a home. They are stateless, presentational, and themed via CSS tokens. Nothing else should live here.

**What belongs here:** Direct Shadcn outputs, lightly customized to consume design tokens. No motion logic. No section-specific variants.

**Import convention:** `import { Button, Card } from '@/components/ui'`

**Scaling strategy:** Add new primitives as Shadcn components are installed. Never add motion or business logic — that belongs in `components/motion/`.

---

### `components/motion/`

**Why it exists:** Motion composites are reused across multiple sections. Keeping them here prevents duplication and ensures the motion language stays consistent.

**What belongs here:** Components that wrap a primitive or HTML element with a motion contract — `RevealText`, `MagneticButton`, `GlassCard`, `ScrollSection`, `StaggerList`, `FadeIn`, `ParallaxLayer`. Each component's animation values come from `lib/motion` — never inline.

**Import convention:** `import { RevealText, MagneticButton } from '@/components/motion'`

**Scaling strategy:** Before adding a new motion component, check if an existing one can accept a prop to cover the new case. Only add a new component when the motion contract is genuinely distinct.

---

### `components/three/`

**Why it exists:** R3F code is fundamentally different from React component code — it runs in a WebGL context, uses imperative refs, and has its own performance model. Isolating it prevents contamination of the component tree.

**What belongs here:** R3F scene components, custom materials, GLSL shader files. All are `"use client"` and loaded via `dynamic(..., { ssr: false })`.

**Import convention:** Never import directly from server components. Always via `dynamic`:
```ts
const NeuralMesh = dynamic(() => import('@/components/three/scenes/NeuralMesh'), { ssr: false })
```

**Scaling strategy:** Add scenes under `scenes/`, materials under `materials/`, shaders under `shaders/`. Shared R3F utilities (geometry factories, loaders) live in `lib/three/` — not here.

---

### `components/chrome/`

**Why it exists:** Nav, Footer, and Cursor are site-level concerns — they appear on every page and have their own motion contracts. They are not sections and not primitives.

**What belongs here:** `Nav`, `Footer`, `Cursor`. Each in its own subfolder with a co-located `*.motion.ts`.

**Scaling strategy:** Stable. Rarely changes after initial build.

---

### `components/mdx/`

**Why it exists:** MDX renders raw HTML tags. Overriding them with styled components requires a dedicated mapping layer.

**What belongs here:** The `MDXComponents` map and any custom MDX components used in case studies (`CodeBlock`, `Callout`, `MetricCard`, `ArchDiagram`).

**Scaling strategy:** Add new MDX components as case study content requires them.

---

### `content/`

**Why it exists:** Content is data, not code. Keeping MDX files separate from components makes content editable without touching the component tree, and makes the data layer testable independently.

**What belongs here:** MDX files with typed frontmatter. `site.config.ts` as the singleton for site-wide copy (name, tagline, nav links, social URLs).

**What does NOT belong here:** Component logic, animation config, utility functions.

**Scaling strategy:** Add new project MDX files as case studies are written. The `lib/content/` layer handles parsing — `content/` is pure data.

---

### `lib/motion/`

**Why it exists:** This is the animation system's single source of truth. Centralizing it prevents duplicated easing values, inconsistent durations, and orphaned ScrollTrigger instances scattered across components.

**What belongs here:**
- `easings.ts` — named cubic-bezier arrays. Import by name, never write `[0.22, 1, 0.36, 1]` inline.
- `durations.ts` — named ms constants. Import by name, never write `480` inline.
- `variants.ts` — Framer Motion variant objects. Compose from easings + durations.
- `scroll.ts` — GSAP ScrollTrigger factory functions. All ScrollTrigger instances created here.
- `text.ts` — SplitText reveal helpers.
- `magnetic.ts` — Magnetic pointer math (pure functions, no React).
- `cursor.ts` — Cursor state machine definition (states, transitions).

**Import convention:** `import { fadeUp, expoOut, base } from '@/lib/motion'`

**Scaling strategy:** Add new variants and factories here. Components never define their own animation values — they import from this module.

---

### `lib/three/`

**Why it exists:** R3F scene components need geometry factories, loader setup, and material helpers. These are pure functions with no JSX — they belong in `lib/`, not `components/three/`.

**What belongs here:** `geometry.ts` (factory functions for common geometries), `loaders.ts` (Draco loader singleton, GLTF loader config), `materials.ts` (material factory helpers).

---

### `lib/content/`

**Why it exists:** MDX parsing, frontmatter validation, and content querying are data-layer concerns. Keeping them in `lib/` makes them testable and reusable across routes.

**What belongs here:** `getAllProjects()`, `getProjectBySlug()`, `getAllExperience()`, `getResume()`. Each function reads MDX files, validates frontmatter against a Zod schema from `types/content.ts`, and returns typed data.

**Import convention:** `import { getAllProjects } from '@/lib/content/projects'`

---

### `lib/seo.ts`

**Why it exists:** `generateMetadata` and JSON-LD builders are reused across multiple routes. Centralizing them ensures consistency and makes SEO auditing a single-file concern.

**What belongs here:** `buildMetadata()`, `buildPersonJsonLd()`, `buildCreativeWorkJsonLd()`, `buildBreadcrumbJsonLd()`.

---

### `hooks/`

**Why it exists:** Stateful, browser-aware logic that multiple components share. Hooks are the React-idiomatic way to share this without prop drilling or context overuse.

**What belongs here:** Hooks that wrap browser APIs (`useMediaQuery`, `useInView`, `useReducedMotion`), hooks that access context (`useLenis`, `useCursorState`), and hooks that encapsulate complex stateful logic (`useMagnetic`, `useScrollTrigger`).

**What does NOT belong here:** Pure functions (those go in `lib/`), context providers (those go in `providers/`).

**Import convention:** `import { useMagnetic } from '@/hooks/useMagnetic'`

**Scaling strategy:** One file per hook. If a hook grows complex, extract its pure logic into `lib/` and keep the hook as a thin React wrapper.

---

### `providers/`

**Why it exists:** App-level React context needs a dedicated home. Mixing providers into `app/layout.tsx` directly makes the layout file unreadable and makes provider ordering hard to reason about.

**What belongs here:** `MotionProvider` (reduced-motion gate, intensity context), `LenisProvider` (Lenis instance, ScrollTrigger sync), `CursorProvider` (cursor state machine). `providers/index.tsx` composes them in the correct order and is the only import needed in `app/(site)/layout.tsx`.

**Scaling strategy:** Add new providers here. The composition order in `index.tsx` is the single place to reason about provider nesting.

---

### `constants/`

**Why it exists:** Magic strings and numbers scattered across the codebase are a maintenance hazard. Constants are the single source of truth for values that are referenced in multiple places but never computed.

**What belongs here:** Route path strings, breakpoint numbers (mirroring Tailwind config), project tag values, animation layer z-index values.

**What does NOT belong here:** Animation values (those go in `lib/motion/`), design tokens (those go in `styles/tokens.css`), computed values (those go in `lib/utils.ts`).

---

### `types/`

**Why it exists:** TypeScript types and Zod schemas are shared across `lib/`, `components/`, `hooks/`, and `app/`. A dedicated folder prevents circular imports and makes the type surface area auditable.

**What belongs here:**
- `content.ts` — `ProjectFrontmatter`, `ExperienceFrontmatter`, Zod schemas for MDX validation.
- `motion.ts` — `CursorState`, `MotionIntensity`, `EasingName`, `DurationName`.
- `three.ts` — R3F prop types, shader uniform interfaces.
- `seo.ts` — Metadata shape types, JSON-LD interfaces.

**Import convention:** `import type { ProjectFrontmatter } from '@/types/content'`

---

### `styles/`

**Why it exists:** CSS that cannot be expressed as Tailwind utilities needs a home. The token file is the design system's source of truth.

**What belongs here:**
- `tokens.css` — all CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--ease-*`, `--blur-*`). Tailwind config reads from here.
- `globals.css` — Tailwind `@base`, `@components`, `@utilities` directives. Minimal resets. No component styles.
- `print.css` — print-specific overrides for `/resume`. Imported only in the resume page layout.

---

## Import Conventions Summary

```ts
// App Router pages — thin shells only
import { Hero } from '@/components/sections/Hero'
import { getAllProjects } from '@/lib/content/projects'

// Motion composites
import { RevealText, MagneticButton } from '@/components/motion'

// UI primitives
import { Button, Card } from '@/components/ui'

// Animation system
import { fadeUp, staggerChildren } from '@/lib/motion/variants'
import { expoOut } from '@/lib/motion/easings'
import { base } from '@/lib/motion/durations'
import { revealOnEnter } from '@/lib/motion/scroll'

// 3D — always via dynamic, never direct import in server components
const HeroScene = dynamic(() => import('@/components/three/scenes/NeuralMesh'), { ssr: false })

// Hooks
import { useLenis } from '@/hooks/useLenis'
import { useMagnetic } from '@/hooks/useMagnetic'

// Types
import type { ProjectFrontmatter } from '@/types/content'
import type { CursorState } from '@/types/motion'

// Constants
import { ROUTES } from '@/constants/routes'
import { BREAKPOINTS } from '@/constants/breakpoints'
```

---

## Scaling Strategy Summary

| Concern | How it scales |
|---|---|
| New page route | Add folder under `app/(site)/` |
| New home section | Add folder under `components/sections/` |
| New reusable animation | Add to `lib/motion/variants.ts` or `scroll.ts` |
| New motion composite | Add to `components/motion/` |
| New UI primitive | Add to `components/ui/` via Shadcn |
| New 3D scene | Add to `components/three/scenes/` |
| New project case study | Add MDX to `content/projects/` |
| New hook | Add to `hooks/` |
| New provider | Add to `providers/`, compose in `providers/index.tsx` |
| New design token | Add to `styles/tokens.css`, extend Tailwind config |
| Light theme (v2) | Add `:root[data-theme="photon"]` block to `tokens.css` |
| New content type | Add Zod schema to `types/content.ts`, loader to `lib/content/` |
