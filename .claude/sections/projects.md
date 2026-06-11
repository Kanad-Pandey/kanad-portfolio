# Projects Section

**Question answered for visitor:** "What has this person shipped?"

## Layout
- Exactly **4 featured projects** on the home rail
- Desktop (`≥ lg`): horizontal-pinned scroll (GSAP ScrollTrigger `pinSection`)
- Mobile (`< lg`): vertical stack
- Tag filter chips above rail: `AI/ML`, `GenAI`, `Data`, `Pharma`
- Filter uses URL state via `useSearchParams` — deep-linkable

## Project card anatomy
- Cover image / looping video preview
- Title + one-line summary
- Tag chips
- Key metric (e.g. "40% latency reduction")
- "View case study" CTA → `/projects/[slug]`
- Cursor state: `view` on hover

## Files
```
components/sections/Projects/
  index.tsx           # Receives ProjectFrontmatter[] as props
  ProjectsRail.tsx    # Horizontal scroll container
  ProjectCard.tsx     # Individual card
  Projects.motion.ts
```

## MDX frontmatter schema
```ts
type ProjectFrontmatter = {
  title: string
  slug: string
  summary: string           // 1–2 sentences for card
  tags: ('AI/ML' | 'GenAI' | 'Data' | 'Pharma' | 'RAG' | 'LLM')[]
  featured: boolean
  order: number             // 1–4 for home rail ordering
  coverImage: string
  previewVideo?: string
  architectureDiagram?: string
  metrics: { label: string; value: string }[]
  tech: string[]
  publishedAt: string       // ISO 8601
}
```

## Data loading
```ts
import { getAllProjects } from '@/lib/content/projects'
// Called in app/(site)/page.tsx — server component
const projects = await getAllProjects()
```

## Motion
- Horizontal scroll: `pinSection` factory from `lib/motion/scroll.ts`
- Card hover: `GlassCard` lift + cursor state change
- Filter transition: `AnimatePresence` with `layoutId` on cards

## Rules
- Section receives typed props — no hardcoded project data inside component
- Pharma projects surface via `pharma` tag filter, not a separate section
- `<section id="projects" aria-labelledby="projects-heading">`
