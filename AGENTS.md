# AGENTS.md

Operational contract for all AI agents and contributors working in this repository. Every decision — architecture, motion, naming, commit — must be traceable to a rule here or to an explicit user override.

---

## 1. Project Vision

A cinematic, Awwwards-caliber portfolio for **Kanad Pandey** — AI Engineer, Data Scientist, GenAI Builder, Pharma-tech Consultant. The site functions as a living operating system for his professional identity: every scroll reveals intelligence, every interaction signals craft, every section converts curiosity into trust.

**Four pillars:**
- **Signal over noise** — every animation earns its place by communicating something.
- **Quiet luxury, loud capability** — restrained palette, surgical motion, heavy substance underneath.
- **Proof, not promises** — projects, metrics, and case studies do the talking.
- **Performance is the design** — 60fps, sub-2s LCP, no jank on mid-tier hardware.

**Target audiences (priority order):**
1. Hiring managers / CTOs at AI-first product companies
2. Pharma & life-sciences leaders evaluating consultants
3. Recruiters scanning for AI/ML + data engineering combos
4. Peers in the GenAI / RAG / LLM-ops community

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest, App Router) | RSC by default; client only at leaves |
| Language | TypeScript (strict) | No `any`, no `@ts-ignore` without comment |
| Styling | Tailwind CSS v4 | Tokens via `@theme` / `tailwind.config.ts` |
| Animation (component) | Framer Motion | State transitions, layout, gestures, exit |
| Animation (scroll) | GSAP + ScrollTrigger | Pinning, timelines, SplitText, parallax |
| Smooth scroll | Lenis | Single root instance, shared via context |
| 3D | React Three Fiber + Drei + GLSL | Hero scene, shader materials |
| UI primitives | Shadcn/UI | Themed once at token layer |
| Forms | react-hook-form + Zod | Contact form only |
| Content | MDX + typed frontmatter | No headless CMS |
| Contact backend | Formspree | No `/api/contact` route |
| Analytics | Vercel Analytics | Privacy-friendly |
| Error monitoring | Sentry | |
| Hosting | Vercel | Edge + image optimization |
| Testing | Playwright (e2e) + Vitest (unit) | |

**Stack is fixed for v1. Do not introduce new libraries without explicit approval.**

---

## 3. Design Philosophy

- **Obsidian dark theme only in v1.** Token system must support a future Photon (light) theme via `data-theme="photon"` override — zero component refactor required.
- **Glassmorphism is surgical:** only on cards over imagery or 3D backgrounds. `backdrop-blur: 16–24px`, `bg-white/5`, `border-white/10`. Never stack two glass layers.
- **Depth through light, not shadow.** Elevation comes from bloom, glow, and glassmorphic blur — not `box-shadow` stacks.
- **One idea per viewport.** Each section answers exactly one question for the visitor.
- **Hover is a promise.** Every hover state previews the next interaction — never decorative-only.
- **Reveal, don't dump.** Progressive disclosure on every section; details surface on hover or click.

**Color tokens (never hard-code hex in components):**

```
--color-base:      #0A0A0F   /* near-black background */
--color-surface:   #13131A   /* card / panel surface */
--color-elevated:  #1B1B24   /* elevated surface */
--color-accent-1:  #8B5CF6   /* electric violet */
--color-accent-2:  #22D3EE   /* cyan */
--color-text-1:    #E5E7EB   /* primary text */
--color-text-2:    #9CA3AF   /* secondary text */
--color-text-3:    #6B7280   /* muted text */
```

**Typography:**
- Display: Clash Display or Satoshi (variable, self-hosted)
- Body: Inter (variable, self-hosted)
- Mono: JetBrains Mono
- Scale: `1.25` mobile / `1.333` desktop

---

## 4. Animation Rules

### Four laws
1. **Motion has meaning.** Every animation answers: *what state changed, and why does the user care?*
2. **Easing is a signature.** House curve: `[0.22, 1, 0.36, 1]` ("expoOut"). Never use default `ease` or `linear` for UI transitions.
3. **Choreography over choreographics.** Sections enter as scenes. Stagger child elements 60–120ms — never fire all at once.
4. **Reduced-motion is a first-class path.** The no-motion experience is a different site, not a broken one.

### Motion layers
| Layer | Description | Tool |
|---|---|---|
| Ambient | Slow looping background (particles, gradient drift, 3D idle) | R3F / GSAP |
| Reactive | Cursor magnetism, hover lifts, card tilt | Framer Motion / `useMagnetic` |
| Narrative | Scroll-linked transforms, pinned sections, section morphs | GSAP + ScrollTrigger |
| Affirmative | Micro-confirmations on click/submit | Framer Motion |

### Tool boundaries (strict)
- **GSAP + ScrollTrigger** → scroll choreography, pinning, timeline sequencing, SplitText reveals.
- **Framer Motion** → component-level state transitions, layout animations, gesture handling, exit animations.
- **R3F** → 3D scenes, shader-driven hero motif, particle systems.
- **Lenis** → smooth-scroll substrate. Everything hooks into it; nothing bypasses it.

### Duration scale (`lib/motion/durations.ts`)
```ts
instant:   120ms
fast:      240ms
base:      480ms
slow:      800ms
cinematic: 1400ms
```

### Named easing curves (`lib/motion/easings.ts`)
```ts
expoOut:   [0.22, 1, 0.36, 1]      // house curve — default for entrances
softInOut: [0.45, 0, 0.55, 1]      // balanced transitions
snap:      [0.68, -0.55, 0.27, 1.55] // spring-like confirmations
silk:      [0.25, 0.46, 0.45, 0.94] // smooth exits
```

### Scroll animations
- All scroll-bound animations register with a central `ScrollTrigger.refresh()` orchestrator.
- Pause all `useFrame` loops and scroll animations on `visibilitychange: hidden`.
- Use `IntersectionObserver` to pause offscreen animations.
- Horizontal-pin sections on `≥ lg`; vertical stack on `< lg`.

---

## 5. Folder Conventions

```
app/
  (site)/
    page.tsx                  # Home — composed of section components
    layout.tsx                # Site chrome, providers
    projects/[slug]/page.tsx  # MDX case study
    resume/page.tsx
    uses/page.tsx
  opengraph-image.tsx
  sitemap.ts
  robots.ts

components/
  sections/     # Page-shaped: Hero, About, Skills, AIShowcase, Projects, Experience, Contact
  ui/           # Shadcn primitives, themed via tokens
  motion/       # Reusable motion composites: MagneticButton, RevealText, GlassCard, ScrollSection
  three/        # R3F scenes, shaders, materials
  chrome/       # Nav, Footer, Cursor
  mdx/          # MDX component overrides

content/
  projects/     # *.mdx — 4 featured + extras (tagged)
  experience/   # *.mdx
  resume.mdx
  site.ts       # Singleton site config (name, socials, nav)

hooks/          # useLenis, useMagnetic, useScrollTrigger, useReducedMotion, useMediaQuery
lib/
  motion/       # easings.ts, durations.ts, variants.ts, scroll.ts, text.ts, magnetic.ts, cursor.ts
  three/        # geometry helpers, shader loaders, material factories
  seo.ts
  analytics.ts
  utils.ts

providers/      # MotionProvider.tsx, LenisProvider.tsx
styles/
  tokens.css    # CSS variable source of truth
  globals.css
  print.css     # /resume print stylesheet

public/
  fonts/        # Self-hosted variable fonts
  models/       # .glb / .draco compressed
  video/        # AI-showcase looping previews (.mp4 / .webm)
  images/

types/          # Shared TypeScript types and MDX frontmatter schemas
tests/          # Playwright e2e + Vitest unit
```

---

## 6. Naming Conventions

### Files and folders
- Components: `PascalCase.tsx` — e.g. `HeroScene.tsx`, `MagneticButton.tsx`
- Hooks: `camelCase` prefixed with `use` — e.g. `useMagnetic.ts`
- Utilities / lib: `camelCase` — e.g. `easings.ts`, `seo.ts`
- MDX content: `kebab-case` — e.g. `rag-pipeline-builder.mdx`
- CSS / token files: `kebab-case` — e.g. `tokens.css`
- Motion config files: `ComponentName.motion.ts` — co-located with the component

### TypeScript
- Types and interfaces: `PascalCase` — e.g. `ProjectFrontmatter`, `CursorState`
- Enums: `PascalCase` with `PascalCase` members
- Constants: `SCREAMING_SNAKE_CASE` for module-level constants
- Props interfaces: `ComponentNameProps` — e.g. `HeroProps`

### CSS / Tailwind
- Custom CSS variables: `--color-*`, `--space-*`, `--radius-*`, `--blur-*`, `--ease-*`
- Never use arbitrary Tailwind values for design tokens — always reference a token

### MDX frontmatter keys: `camelCase`

---

## 7. Component Rules

### Three tiers — respect the hierarchy

**Tier 1 — Primitives (`/components/ui`)**
- Shadcn-derived, themed via CSS variables.
- Stateless and presentational.
- No motion logic inside primitives — motion is added at Tier 2.
- Examples: `Button`, `Card`, `Input`, `Dialog`, `Badge`

**Tier 2 — Composites (`/components/motion`, `/components/chrome`)**
- Opinionated combinations of primitives with motion contracts.
- Each composite owns its motion via a `motion` prop or a co-located `*.motion.ts` config.
- No magic numbers inline — all durations and easings reference `lib/motion`.
- Examples: `MagneticButton`, `RevealText`, `GlassCard`, `ScrollSection`, `Cursor`, `Nav`

**Tier 3 — Sections (`/components/sections`)**
- Page-shaped components. Compose Tier 1 + Tier 2.
- Receive content as typed props — no hardcoded copy inside section components.
- One section = one question answered for the visitor.
- Examples: `Hero`, `About`, `Skills`, `AIShowcase`, `Projects`, `Experience`, `Contact`

### General rules
- **Server components by default.** Add `"use client"` only at the leaf that needs interactivity, motion, or browser APIs.
- **3D components** are always isolated under `<Suspense>` with skeleton fallbacks. Never import them from server components directly — use `dynamic(() => import(...), { ssr: false })`.
- **No prop drilling beyond two levels.** Use context or composition instead.
- **No inline styles** except for dynamic CSS custom property values (e.g. `style={{ '--delay': '0.2s' }}`).
- **Composition over configuration.** Prefer `children` and slot patterns over a proliferating `variant` prop.

---

## 8. Motion Rules

### Reuse before creating
Before writing a new animation, check `lib/motion/variants.ts` and `lib/motion/scroll.ts`. If a variant or factory covers the need, use it. Only add to the library when the pattern will be used in 2+ places.

### Framer Motion patterns
```tsx
// Always use named variants from lib/motion/variants.ts
import { fadeUp, staggerChildren } from '@/lib/motion/variants'

// Stagger children — never animate siblings independently
<motion.ul variants={staggerChildren}>
  {items.map(item => (
    <motion.li key={item.id} variants={fadeUp}>{item}</motion.li>
  ))}
</motion.ul>

// Layout animations for list reorders
<motion.div layout layoutId="project-card-{slug}" />
```

### GSAP patterns
```ts
// Always use the factory from lib/motion/scroll.ts
import { revealOnEnter, pinSection } from '@/lib/motion/scroll'

// Register with the central orchestrator — never create orphan ScrollTriggers
revealOnEnter(containerRef, { stagger: 0.08 })
```

### Reduced-motion contract
Every motion helper must check `useReducedMotion()` and return an instant/no-op variant:
```ts
const shouldReduce = useReducedMotion()
const variants = shouldReduce ? instantVariants : fadeUp
```

### Cursor states (`lib/motion/cursor.ts`)
| State | Trigger |
|---|---|
| `default` | Idle |
| `link` | Hovering any `<a>` or `<button>` |
| `view` | Hovering project cards |
| `drag` | Hovering horizontal scroll sections |
| `disabled` | Touch device detected |

### Magnetic interactions (`lib/motion/magnetic.ts`)
- Strength and radius are props — never hardcoded.
- Disabled automatically on touch devices.
- Applied via `useMagnetic` hook, not inline event handlers.

---

## 9. Performance Rules

### Targets
| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | < 0.05 |
| TBT | < 200ms |
| JS bundle (per route) | ≤ 180KB gzipped |
| Fonts | ≤ 80KB total (variable, subsetted) |
| Animation | 60fps on 2020 MacBook Air / mid-range Android |

### Code-splitting
- R3F bundle, GSAP plugins, and any heavy client island: lazy-loaded per route.
- Use `dynamic()` with `ssr: false` for all 3D and heavy motion components.
- Never import a client-only library at the module level in a server component.

### 3D discipline
- Instanced meshes for repeated geometry.
- Low-poly geometry + baked textures.
- Cap frame rate at 60; throttle `useFrame` when component is offscreen.
- `Suspense` boundaries with skeleton fallbacks on every R3F canvas.
- On mobile + low memory: `if (isMobile && lowMemory) loadLightweightVariant()`.

### Scroll and animation
- Animations must be **transform-only** — no `top`, `left`, `width`, `height` changes.
- Apply `will-change` surgically and remove it after the animation completes.
- Pause all scroll-bound animations on `visibilitychange: hidden`.

### Images and fonts
- `priority` prop only on the hero image. `loading="lazy"` everywhere else.
- All images via `next/image` with AVIF/WebP output.
- Blurred placeholder on all images.
- Fonts: `next/font`, `display: swap`, self-hosted (no external font CDN).

### Asset budget
- `.glb` models: Draco-compressed, ≤ 500KB each.
- Looping video previews: ≤ 2MB per clip, `.mp4` + `.webm` pair.

---

## 10. Accessibility Rules

- **WCAG 2.2 AA** baseline. Manual verification required for full compliance.
- All text meets **4.5:1** contrast ratio. Accent-on-dark combinations validated before shipping.
- Every interactive element is focusable in DOM order with a visible `:focus-visible` ring.
- Skip-to-content link at the top of every page.
- Semantic landmarks: `<main>`, `<nav>`, `<section aria-labelledby="...">` on every section.
- Decorative 3D scenes and ambient animations: `aria-hidden="true"`.
- `aria-live` regions for form state changes and async feedback.
- Keyboard navigation: `j/k` or arrow keys jump sections; `g h` returns home.
- Lenis breaks native anchor scroll — programmatic `scrollTo` must update focus and announce the section change via `aria-live`.
- Forms: explicit `<label>` for every input, inline validation, descriptive error messages. No placeholder-as-label.
- Any video asset requires captions and a transcript.
- Touch targets ≥ 44×44px. iOS safe-area insets respected.

---

## 11. Responsive Design Rules

**Breakpoints (Tailwind defaults):**
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Mobile is a re-choreographed cut, not a shrunk desktop:**
- Hero 3D: fewer particles, DPR capped at 1.5 on mobile.
- Horizontal-pin scroll sections → vertical stack on `< lg`.
- Custom cursor and magnetic interactions: disabled on touch. Replace with subtle press states.
- Timeline: two-column staggered → single-column with left-rail indicator on mobile.
- Navigation: full-screen overlay menu on mobile, same easing language as desktop.
- 3D scenes: lightweight variant on low-memory mobile devices.

**Mobile-first Tailwind:** write base styles for mobile, override upward with `md:`, `lg:`, etc.

---

## 12. Code Quality Rules

- **TypeScript strict mode.** No `any`. No `@ts-ignore` without an explanatory comment.
- **No magic numbers.** All durations, easings, colors, and spacing reference named tokens or constants.
- **No inline motion config.** All animation values come from `lib/motion`.
- **No hardcoded copy in components.** All text content comes from props or MDX frontmatter.
- **No comments explaining what the code does.** Only comment the *why* when it's non-obvious (hidden constraint, workaround, subtle invariant).
- **No unused exports, dead code, or backwards-compatibility shims.** Delete confidently.
- **Imports:** absolute paths via `@/` alias. Group: external → internal → relative → types.
- **ESLint + Prettier** must pass before any commit. No `eslint-disable` without a comment.
- **Zod schemas** for all MDX frontmatter and any external data boundary.
- **No `console.log` in committed code.** Use structured logging or remove before commit.

---

## 13. Git Workflow

- **Branch from `main`.** Feature branches: `feat/description`, bug fixes: `fix/description`, chores: `chore/description`.
- **One logical change per branch.** Do not bundle unrelated changes.
- **PRs require passing CI** (typecheck, lint, build, Playwright smoke) before merge.
- **Squash merge** feature branches into `main` to keep history linear.
- **Never force-push `main`.**
- **Never commit** `.env`, secrets, large binaries, or generated files tracked by `.gitignore`.
- **Tag releases** with semver: `v1.0.0`, `v1.1.0`, etc.

---

## 14. Commit Naming Conventions

Format: `<type>(<scope>): <imperative summary>`

| Type | When to use |
|---|---|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `motion` | Animation or motion change |
| `style` | Visual / design token change (no logic) |
| `refactor` | Code restructure, no behavior change |
| `content` | MDX content or copy update |
| `a11y` | Accessibility improvement |
| `seo` | Metadata, structured data, sitemap |
| `chore` | Tooling, deps, config |
| `test` | Test additions or fixes |

**Examples:**
```
feat(hero): add neural-mesh R3F scene with scroll-linked camera
motion(projects): implement horizontal-pin scroll with GSAP ScrollTrigger
fix(lenis): restore focus after programmatic section scroll
perf(three): draco-compress hero model, reduce bundle by 340KB
a11y(nav): add skip-to-content link and aria-current on active route
content(projects): add RAG pipeline builder case study MDX
```

- Summary: imperative mood, ≤ 72 characters, no period.
- Body (optional): explain *why*, not *what*. Reference issue numbers.

---

## 15. SEO Rules

- Every route has a unique `title`, `description`, canonical URL, OG image, and Twitter card via `generateMetadata`.
- OG images: dynamic per route via `next/og` (edge function), branded template.
- Structured data: `Person` and `WebSite` on home; `CreativeWork` + `BreadcrumbList` on case studies.
- Sitemap and `robots.ts` generated at build via App Router conventions.
- All content surfaces (case studies, resume) are SSG — never client-only rendered.
- Case study MDX is the primary SEO surface: long-form, keyword-rich (RAG, LLM ops, Snowflake, pharma analytics), internally linked.
- Core Web Vitals targets (§9) are SEO targets — treat them as one.
- 3D and motion never block meaningful HTML. Crawlers see full content.

---

## 16. Reusable Patterns

### Motion primitives (use these before writing new animations)

```tsx
// Fade + slide up on scroll enter
<RevealText as="h2" delay={0.1}>Section Title</RevealText>

// Staggered list reveal
<ScrollSection stagger={0.08}>
  {items.map(item => <Card key={item.id} {...item} />)}
</ScrollSection>

// Magnetic button
<MagneticButton strength={0.4} radius={80}>
  <Button>View Project</Button>
</MagneticButton>

// Glass card
<GlassCard className="p-6">...</GlassCard>
```

### MDX frontmatter schema (projects)
```ts
type ProjectFrontmatter = {
  title: string
  slug: string
  summary: string           // 1–2 sentences for card
  tags: ('AI/ML' | 'GenAI' | 'Data' | 'Pharma' | 'RAG' | 'LLM')[]
  featured: boolean
  order: number             // 1–4 for home rail ordering
  coverImage: string
  previewVideo?: string     // looping MP4 path
  architectureDiagram?: string
  metrics: { label: string; value: string }[]
  tech: string[]
  publishedAt: string       // ISO 8601
}
```

### Section composition pattern
```tsx
// Sections receive typed props — no hardcoded copy
export function Projects({ projects }: { projects: ProjectFrontmatter[] }) {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <RevealText as="h2" id="projects-heading">Projects</RevealText>
      <ProjectsRail projects={projects} />
    </section>
  )
}
```

### Theme token consumption in R3F
```ts
// Read CSS variables so 3D scene tracks any future theme
function useThemeTokens() {
  const style = getComputedStyle(document.documentElement)
  return {
    accent1: style.getPropertyValue('--color-accent-1').trim(),
    accent2: style.getPropertyValue('--color-accent-2').trim(),
  }
}
```

---

## 17. Preferred Libraries

Use these. Do not introduce alternatives without explicit approval.

| Purpose | Library |
|---|---|
| Smooth scroll | `@studio-freight/lenis` |
| Scroll animation | `gsap` + `@gsap/react` |
| Component animation | `framer-motion` |
| 3D | `@react-three/fiber` + `@react-three/drei` |
| UI primitives | `shadcn/ui` |
| Forms | `react-hook-form` + `zod` |
| MDX | `next-mdx-remote` or `@next/mdx` |
| Icons | `lucide-react` |
| OG images | `@vercel/og` |
| Analytics | `@vercel/analytics` |
| Error monitoring | `@sentry/nextjs` |
| Font loading | `next/font` |
| Image optimization | `next/image` |

---

## 18. Things to NEVER Do

### Architecture
- Never add a global state store (Zustand, Redux, Jotai) in v1 — the site is stateless content.
- Never add a headless CMS or database in v1 — MDX is the content layer.
- Never add a `/api/contact` route — Formspree handles form delivery.
- Never make runtime LLM API calls — AI demos are static previews only.
- Never import a client-only library (Lenis, GSAP, R3F) at the module level in a server component.

### Motion
- Never use default `ease` or `linear` for UI transitions — always use a named curve from `lib/motion/easings.ts`.
- Never hardcode duration values — always reference `lib/motion/durations.ts`.
- Never create orphan `ScrollTrigger` instances — always use the factory from `lib/motion/scroll.ts`.
- Never animate `top`, `left`, `width`, or `height` — transforms only.
- Never fire sibling animations simultaneously — always stagger.
- Never duplicate an animation that already exists in `lib/motion/variants.ts`.
- Never leave `will-change` applied after an animation completes.

### Design
- Never hard-code hex colors in components — always use a CSS token.
- Never stack two glassmorphic layers.
- Never use `box-shadow` stacks for elevation — use bloom, glow, or glassmorphic blur.
- Never use stock photos.
- Never add sound or audio assets in v1.

### Code quality
- Never use `any` in TypeScript.
- Never commit `console.log`.
- Never use `eslint-disable` without an explanatory comment.
- Never use placeholder-as-label on form inputs.
- Never write comments that explain *what* the code does — only *why*.
- Never add error handling for scenarios that cannot happen.
- Never design for hypothetical future requirements — solve the problem at hand.

### Performance
- Never set `priority` on images below the fold.
- Never import the full GSAP bundle — import only the plugins used.
- Never ship uncompressed `.glb` models.
- Never leave `useFrame` running when the component is offscreen.

### Git
- Never force-push `main`.
- Never commit `.env` files or secrets.
- Never use `--no-verify` to skip hooks.
- Never bundle unrelated changes in a single commit or PR.
