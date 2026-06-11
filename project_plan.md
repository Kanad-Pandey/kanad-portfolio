# Portfolio Website — Architecture & Vision Plan

## Context

Greenfield build of a premium, Awwwards-caliber portfolio for **Kanad Pandey** — AI Engineer, Data Scientist, GenAI Builder, Pharma-tech Consultant. The site must communicate technical depth (AI/ML, LLMs, RAG, Snowflake, Azure ML) while showcasing taste through cinematic, immersive, highly interactive web craft. The repo currently contains only `.git`; this plan defines the full product, design, and engineering blueprint **before** any code is written.

Stack is fixed: **Next.js (latest, App Router) · TypeScript · Tailwind · Framer Motion · GSAP · React Three Fiber · Lenis · Shadcn/UI**.

**Locked v1 scope decisions**
- **Theme:** Obsidian (dark) only. Token system architected to accept a future light theme without refactor.
- **AI demos:** Static previews — short looping video/MP4, GIF fallback, architecture diagrams, code stills. No runtime LLM calls in v1.
- **Content:** MDX in-repo with typed frontmatter. No headless CMS.
- **Sound:** Deferred to v2. No audio assets, no sound toggle in chrome.
- **Featured projects:** 4 hero projects on the home Projects rail.
- **Pharma vertical:** No standalone home section. Pharma case studies live inside the Projects rail and surface via a `pharma` tag filter.
- **Resume:** MDX-rendered at `/resume` with a dedicated print stylesheet — single source of truth, browser-print to PDF.
- **Contact backend:** Formspree (or equivalent no-backend service). No `/api/contact` route in v1.

---

## 1. Product Vision

**One-line vision:** *A living, cinematic operating system for Kanad's mind — where every scroll reveals intelligence, every interaction signals craft, and every section converts curiosity into trust.*

**Pillars**
- **Signal over noise** — every animation earns its place by communicating something (skill, scale, story).
- **Quiet luxury, loud capability** — restrained palette, surgical motion, but heavy substance underneath (3D, shaders, real data viz).
- **Proof, not promises** — projects, metrics, and case studies do the talking.
- **Performance is the design** — 60fps target, sub-2s LCP, no jank on mid-tier laptops.

**Target audiences (priority order)**
1. Hiring managers / CTOs at AI-first product companies.
2. Pharma & life-sciences leaders evaluating consultants.
3. Recruiters scanning for AI/ML + data engineering combos.
4. Peers in the GenAI / RAG / LLM-ops community (link sharing).

**Success metrics**
- Time-on-site > 2 min, scroll depth > 70%.
- Project case-study CTR > 35%.
- Contact / resume conversion > 8%.
- Awwwards / SOTD submission-ready (judged on design, UX, creativity, content).

---

## 2. UX Strategy

**Narrative arc** — the site reads like a film in 6 acts:
1. **Cold open (Hero)** — identity + provocation, 3D motif, single CTA.
2. **Establishing shot (About)** — who, what, why now.
3. **Capabilities (Skills + AI/ML showcase)** — what I do, visualized.
4. **Evidence (Projects)** — anchored case studies, depth-on-demand.
5. **Trajectory (Experience timeline)** — career arc + pharma-tech specialization.
6. **Resolution (Contact)** — frictionless next step.

**Core UX principles**
- **Scroll is the protagonist.** Lenis-driven inertia, scroll-linked animations as the primary nav.
- **Reveal, don't dump.** Progressive disclosure on every section; details on hover/click.
- **Magnetic affordances.** Anything interactive subtly attracts the cursor.
- **Latency = death.** Skeletons, prefetch on intent, no spinners > 200ms.
- **One idea per viewport.** Each section answers exactly one question.

**Decision tree for visitors**
- *"Should I keep scrolling?"* → answered by hero in <3 seconds.
- *"Can they actually build?"* → answered by Projects + AI/ML showcase.
- *"Are they relevant to me?"* → answered by Experience + pharma-tagged projects.
- *"How do I reach them?"* → answered by persistent contact CTA.

---

## 3. Information Architecture

```
/                        → Home (single-page cinematic scroll)
  ├─ #hero
  ├─ #about
  ├─ #skills              → AI/ML capability matrix
  ├─ #ai-showcase         → GenAI / LLM / RAG case previews (static)
  ├─ #projects            → 4 featured case-study cards (pharma tag included)
  ├─ #experience          → Timeline
  └─ #contact

/projects/[slug]         → Deep case-study pages (MDX)
/resume                  → MDX-rendered resume + print stylesheet (PDF via browser print)
/uses                    → Tools, stack, gear (cult-classic page)
/404, /500               → Custom branded error states
```

**Why single-page core + nested case studies:** the home page is the show-reel; case studies are the proof. Splitting prevents the home from bloating, and each `/projects/[slug]` becomes shareable + SEO-rich.

---

## 4. Animation Philosophy

**Three laws**
1. **Motion has meaning.** Every animation answers: *what state changed, and why does the user care?*
2. **Easing is a signature.** Custom cubic-bezier curves (`[0.22, 1, 0.36, 1]` "expo-out" as the house curve) — never default `ease`.
3. **Choreography over choreographics.** Sections enter as scenes, not as parallel fireworks. Stagger child elements by 60–120ms.

**Layers of motion**
- **Ambient** — slow, looping background motion (particles, gradient drift, 3D camera idle). Never demands attention.
- **Reactive** — cursor-magnetism, hover lifts, tilt. Provides tactile feedback.
- **Narrative** — scroll-linked transforms, pinned sections, section-to-section morphs. Drives the story.
- **Affirmative** — micro-confirmations on click/submit. Tiny, fast, never blocking.

**Tool boundaries**
- **GSAP + ScrollTrigger** → scroll choreography, pinning, timeline sequencing, SplitText reveals.
- **Framer Motion** → component-level state transitions, layout animations, gesture handling, exit animations.
- **R3F** → 3D scenes, shader-driven hero motif, particle systems.
- **Lenis** → the smooth-scroll substrate everything hooks into.

**Performance contract:** every animation must hold 60fps on a 2020 MacBook Air / mid-range Android. If it can't, it gets simplified or scoped to desktop only.

---

## 5. Interaction Philosophy

- **Cursor is a character.** Custom cursor with contextual states: default dot, magnetic pull on links, "view" label on project cards, "drag" on horizontal scrollers.
- **Hover is a promise.** Hovering should always preview the next state — never decorative-only.
- **Scroll is steerable.** Lenis with momentum; arrow keys, space, and section-anchor jumps all work.
- **Touch ≠ desktop.** On touch, magnetic interactions are removed, hover-reveals become tap-to-expand, 3D scenes simplify.
- **Keyboard is first-class.** `j/k` or arrow keys jump sections; `g h` returns home; visible focus rings always.

---

## 6. Page Hierarchy

| Route | Purpose | Render Mode |
|---|---|---|
| `/` | Cinematic single-page narrative | Static (SSG) + client-side R3F |
| `/projects/[slug]` | Deep case study | SSG via MDX |
| `/resume` | MDX resume + print stylesheet | Static |
| `/uses` | Stack/tools page | Static |
| `/404`, `/500` | Branded errors | Static |

---

## 7. Section Hierarchy (Home)

1. **Hero** — name, role triad, animated 3D motif (neural-mesh / data-orb), primary CTA, scroll cue.
2. **About** — short manifesto (3 short paragraphs), portrait with WebGL displacement on hover, key stats (years, projects shipped, models deployed).
3. **Skills Matrix** — categorized: *AI/ML · GenAI · Data · Cloud · Pharma-domain*. Animated radial / force-graph viz.
4. **AI/ML Showcase** — featured intelligent systems: LLM apps, RAG pipelines, NLP work. Each card flips to reveal architecture diagram. *Static previews in v1 — looping muted MP4 + diagram, no runtime LLM calls.*
5. **Projects** — exactly **4 hero projects**, horizontal-pinned scroll on desktop, vertical stack on mobile. Tag chips above the rail (`AI/ML`, `GenAI`, `Data`, `Pharma`) filter in place. Each card links to its full case study at `/projects/[slug]`.
6. **Experience Timeline** — vertical scroll-locked timeline, role cards animate in as the indicator passes. Pharma-tech roles surfaced via role badges, not a separate band.
7. **Testimonials / Recognition** *(if available)* — subtle marquee or quote-stack.
8. **Contact** — split layout: form (Formspree-backed, no edge route) + direct channels (email, LinkedIn, GitHub, calendar). Magnetic submit button.
9. **Footer** — sitemap, "built with" credits, return-to-top.

---

## 8. Design System Strategy

**Foundations**
- **Color** — Obsidian (dark) only in v1:
  - Base near-black `#0A0A0F`, surface ink `#13131A`, elevated surface `#1B1B24`.
  - Accent: electric violet `#8B5CF6` + cyan `#22D3EE`.
  - Text: primary `#E5E7EB`, secondary `#9CA3AF`, muted `#6B7280`.
  - Token system designed so a future Photon (light) theme drops in via `data-theme` override without component changes.
- **Type** — display: *Clash Display* or *Satoshi* (variable). Body: *Inter* variable. Mono: *JetBrains Mono*. Modular scale `1.25` on mobile, `1.333` on desktop.
- **Spacing** — 4px base, 8/12/16/24/32/48/64/96/128 ramp.
- **Radii** — `2/8/16/24/full`. Cards default to `16px`.
- **Elevation** — flat by default; depth comes from light blooms + glassmorphic blur, not box-shadow stacks.
- **Glassmorphism rules** — only on cards over imagery/3D; `backdrop-blur: 16–24px`, `bg-white/5`, `border-white/10`. Never stack two glass layers.
- **Iconography** — Lucide for UI; custom SVG for skill marks.
- **Imagery** — high-contrast portrait, abstract WebGL textures, no stock photos.

**Tokens** live as CSS variables consumed by Tailwind via `@theme` (Tailwind v4) or `tailwind.config.ts` extensions. Shadcn primitives are themed once at the token layer.

---

## 9. Technical Architecture

**Framework** — Next.js latest, App Router, React Server Components where possible, client components for anything touching motion/3D/state.

**Runtime split**
- **Server components** — page shells, MDX rendering, metadata, static content.
- **Client components** — Hero 3D, scroll choreography, cursor, contact form.
- **Edge functions** — OG image generation only. Contact form posts directly to Formspree.

**Key boundaries**
- 3D and heavy motion live behind `dynamic(() => import(...), { ssr: false })` with skeleton fallbacks.
- A single `MotionProvider` wraps the app to gate `prefers-reduced-motion` and motion intensity.
- Lenis is mounted once at the root and exposed via context so GSAP `ScrollTrigger` can hook into it.

**Data layer**
- Project + experience content as **MDX + frontmatter** in `/content`. Type-safe via a thin custom loader (or Contentlayer if compatibility holds at the chosen Next.js version).
- No DB on v1. Contact form posts directly from the client to Formspree.

**3rd-party**
- **Formspree** for contact form delivery (no backend route needed).
- **Vercel Analytics** for privacy-friendly analytics.
- **Sentry** for error monitoring.
- **Vercel** for hosting + edge + image optimization.

---

## 10. Performance Strategy

**Targets** — LCP < 2.0s, INP < 150ms, CLS < 0.05, TBT < 200ms on Moto G Power emulation.

**Tactics**
- **Aggressive code-splitting** — R3F bundle, GSAP plugins, and any heavy client island lazy-loaded per route.
- **Asset budget per route** — JS ≤ 180KB gz, fonts ≤ 80KB total (variable, subsetted), images via `next/image` AVIF/WebP.
- **3D discipline** — instanced meshes, low-poly geometry, baked textures, frame-rate cap at 60, `useFrame` throttling when offscreen, `Suspense` boundaries with fallbacks.
- **Scroll discipline** — animations transform-only (no layout thrash), `will-change` applied surgically, `IntersectionObserver` to pause offscreen animations.
- **Font strategy** — `next/font`, `display: swap`, preconnect to none (self-host).
- **Image strategy** — `priority` only on hero, `loading="lazy"` everywhere else, blurred placeholders.
- **Caching** — static pages on CDN, MDX prebuilt, edge functions with `s-maxage`.
- **Reduced-motion path** — full alt experience that swaps motion for fades and crossfades; not a degraded site, a different one.

---

## 11. Mobile Responsiveness Strategy

**Philosophy:** mobile is not a shrunk desktop — it's a re-choreographed cut.

- **Breakpoints** — `sm: 640 / md: 768 / lg: 1024 / xl: 1280 / 2xl: 1536`.
- **Hero** — 3D motif simplifies (fewer particles, lower DPR cap at 1.5), copy reflows above the visual.
- **Horizontal-pin sections** become **vertical-stack** sections on `< lg`.
- **Custom cursor** disabled on touch; magnetic interactions replaced with subtle press states.
- **Timeline** flips from staggered two-column to single-column with left-rail indicator.
- **Navigation** collapses into a full-screen overlay menu with the same easing language.
- **Tap targets** ≥ 44px, safe-area insets respected for iOS notch/home-indicator.
- **Conditional 3D** — `if (isMobile && lowMemory) loadLightweightVariant()`.

---

## 12. Accessibility Strategy

- **WCAG 2.2 AA** as the baseline target (manual verification required for full compliance).
- **Motion** — `prefers-reduced-motion` honored via the `MotionProvider`; reduces scroll-linked animations to fades, disables parallax and pinning.
- **Color contrast** — all text meets 4.5:1; accent-on-dark combinations validated.
- **Keyboard** — every interactive element focusable in DOM order, visible focus rings (`:focus-visible`), skip-to-content link.
- **Screen readers** — semantic landmarks (`main`, `nav`, `section` with `aria-labelledby`), `aria-live` for form state, decorative 3D marked `aria-hidden`.
- **Lenis caveat** — Lenis can break native anchor behavior; ensure programmatic `scrollTo` updates focus and announces section change.
- **Forms** — labels, inline validation, descriptive errors, no placeholder-as-label.
- **Captions** — any video has captions + transcript.

---

## 13. SEO Strategy

- **Metadata** — per-route via App Router `generateMetadata`. Every page has unique `title`, `description`, canonical, OG, Twitter card.
- **Structured data** — `Person`, `WebSite`, `BreadcrumbList`, and `CreativeWork` JSON-LD on case studies.
- **Sitemap + robots** — generated at build via `next-sitemap` or App Router conventions.
- **OG images** — dynamic per route via `next/og` (edge), branded template.
- **Content SEO** — case studies are the SEO surface area: long-form, keyword-rich (RAG, LLM ops, Snowflake, pharma analytics), internal linking.
- **Performance = SEO** — Core Web Vitals targets above directly drive ranking.
- **Crawlability** — SSR/SSG for all content surfaces; client-only 3D never blocks meaningful HTML.

---

## 14. Folder Structure

```
/
├─ app/
│  ├─ (site)/
│  │  ├─ page.tsx                 # Home (composed of section components)
│  │  ├─ layout.tsx               # Site chrome, providers
│  │  ├─ projects/
│  │  │  ├─ page.tsx              # Optional index
│  │  │  └─ [slug]/page.tsx       # MDX case study
│  │  ├─ resume/page.tsx          # MDX resume + print stylesheet
│  │  └─ uses/page.tsx
│  ├─ opengraph-image.tsx
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ sections/                   # Hero, About, Skills, Projects, etc.
│  ├─ ui/                         # Shadcn primitives (themed)
│  ├─ motion/                     # Reusable motion primitives
│  ├─ three/                      # R3F scenes, shaders, materials
│  ├─ chrome/                     # Nav, Footer, Cursor
│  └─ mdx/                        # MDX component overrides
├─ content/
│  ├─ projects/*.mdx              # 4 featured projects + any extras (tagged)
│  ├─ experience/*.mdx
│  ├─ resume.mdx
│  └─ site.ts                     # Singleton site config
├─ hooks/
│  ├─ useLenis.ts
│  ├─ useMagnetic.ts
│  ├─ useScrollTrigger.ts
│  ├─ useReducedMotion.ts
│  └─ useMediaQuery.ts
├─ lib/
│  ├─ motion/                     # easings, variants, timeline factories
│  ├─ three/                      # geometry, shaders, loaders
│  ├─ seo.ts
│  ├─ analytics.ts
│  └─ utils.ts
├─ providers/
│  ├─ MotionProvider.tsx
│  └─ LenisProvider.tsx
├─ styles/
│  ├─ globals.css
│  ├─ tokens.css
│  └─ print.css                   # /resume print stylesheet
├─ public/
│  ├─ fonts/
│  ├─ models/                     # .glb / .draco
│  ├─ video/                      # AI-showcase looping previews (.mp4 / .webm)
│  └─ images/
├─ types/
└─ tests/                         # Playwright + unit
```

---

## 15. Component Architecture

**Three tiers**

1. **Primitives (`/components/ui`)** — Shadcn-derived, themed via CSS variables. Stateless, presentational. e.g. `Button`, `Card`, `Dialog`, `Input`.
2. **Composites (`/components/chrome`, `/components/motion`)** — opinionated combinations: `MagneticButton`, `RevealText`, `GlassCard`, `ScrollSection`, `Cursor`, `Nav`. Each owns its motion contract.
3. **Sections (`/components/sections`)** — page-shaped: `Hero`, `About`, `Skills`, `AIShowcase`, `Projects`, `Experience`, `Contact`. Compose primitives + composites; receive content as props.

**Rules**
- Components declare their motion via a `motion` prop or paired `*.motion.ts` config — no magic numbers inline.
- Server components by default; opt into `"use client"` only at the leaf that needs interactivity.
- 3D components are isolated under `Suspense` with skeleton fallbacks and never imported from server components directly.
- Storybook (or Ladle) for primitive + composite review (optional v2).

---

## 16. State Management Approach

- **No global store on v1.** The site is largely stateless content.
- **Local component state** for UI affordances (hover, expanded, form state).
- **Context providers** for cross-cutting concerns: `Motion (reduced-motion + intensity)`, `Lenis instance`, `Cursor state`.
- **URL state** for deep-linkable filters (e.g., projects by tag) via `useSearchParams`.
- **Form state** via `react-hook-form` + Zod on the contact form only.
- No Zustand or external store needed for v1.

---

## 17. Reusable Motion Architecture

A first-class `lib/motion` module so motion is **declarative, themeable, and testable**.

**Modules**
- `easings.ts` — named curves (`expoOut`, `softInOut`, `snap`, `silk`).
- `durations.ts` — `instant: 120 / fast: 240 / base: 480 / slow: 800 / cinematic: 1400`.
- `variants.ts` — Framer Motion variant presets: `fadeUp`, `revealMask`, `staggerChildren`, `tiltIn`.
- `scroll.ts` — GSAP timeline factories: `pinSection`, `horizontalScroll`, `parallax`, `revealOnEnter`, all wired to the shared Lenis instance.
- `text.ts` — `SplitText` reveal helpers (line/word/char).
- `magnetic.ts` — magnetic pointer hook with strength + radius props.
- `cursor.ts` — cursor state machine (default/link/view/drag/disabled).

**Reduced-motion strategy** — every helper checks `useReducedMotion()` and returns a no-op or instant variant. The site works fully without motion; motion is enhancement.

**Performance hooks** — every scroll-bound animation registers with a central `ScrollTrigger.refresh()` orchestrator and pauses on `visibilitychange: hidden`.

---

## 18. Theme Architecture

- **Token source of truth** — `styles/tokens.css` defines CSS variables for color, type, space, radius, blur, easing.
- **Tailwind consumes tokens** via `tailwind.config.ts` (or `@theme` in v4) — no hard-coded hex in components.
- **Single theme in v1** — Obsidian only, declared on `<html data-theme="obsidian">`. The `data-theme` attribute and CSS-variable override pattern are in place from day one so a future Photon (light) theme is purely additive — drop in a `:root[data-theme="photon"]` block, ship a toggle, no component refactor.
- **3D scene theming** — R3F materials read accent / fog / bloom colors from a small `useThemeTokens()` hook that reads the same CSS variables, so the 3D scene tracks any future theme automatically.
- **Shadcn integration** — Shadcn's CSS variable convention layered on top of our tokens, so primitives stay aligned with the design system.

---

## Verification Plan

When implementation begins (separate plan), verification will cover:
1. **Lighthouse + WebPageTest** runs against the targets in §10 on mobile + desktop profiles.
2. **Manual a11y audit** — keyboard-only traversal, `prefers-reduced-motion` path, screen reader pass on home + one case study, axe DevTools clean.
3. **Cross-browser** — latest Chrome, Safari, Firefox, Edge; iOS Safari + Chrome Android on real devices.
4. **Motion QA** — visual regression on key sections (Playwright + screenshots) and an FPS profiling pass on the hero scene.
5. **SEO smoke test** — metadata, OG images, structured data validator, sitemap reachable, indexable.
6. **Content QA** — every project case study renders, links resolve, `/resume` prints to a clean PDF via the print stylesheet, Formspree submission lands a test email.

---

## Open Questions (to confirm before implementation)

All major v1 scope decisions are locked. Remaining items can be resolved during implementation:

1. **Display typeface** — Clash Display vs Satoshi (both fit; pick during the design-system pass).
2. **Hero 3D motif** — neural-mesh, particle field, data-orb, or shader-driven gradient flow (decide at concept stage with one prototype).
3. **Domain & deployment target** — final domain name, Vercel project name, Formspree form ID — to be supplied before deploy.
