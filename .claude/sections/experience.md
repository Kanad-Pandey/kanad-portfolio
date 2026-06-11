# Experience Section

**Question answered for visitor:** "What's their career trajectory and domain depth?"

## Layout
- Vertical scroll-locked timeline
- Role cards animate in as the scroll indicator passes each entry
- Desktop: staggered two-column (alternating left/right)
- Mobile: single-column with left-rail indicator

## Role card anatomy
- Company name + logo
- Role title + date range
- 2–3 bullet impact statements
- Role badge: `AI/ML`, `GenAI`, `Pharma`, `Data` — surfaces pharma-tech specialisation
- Optional: link to related project case study

## Files
```
components/sections/Experience/
  index.tsx
  Timeline.tsx        # Scroll-locked timeline container
  RoleCard.tsx        # Individual role entry
  Experience.motion.ts
```

## MDX frontmatter schema
```ts
type ExperienceFrontmatter = {
  company: string
  role: string
  startDate: string   // ISO 8601
  endDate: string | 'present'
  tags: ('AI/ML' | 'GenAI' | 'Data' | 'Pharma' | 'Cloud')[]
  bullets: string[]
  logo?: string
  relatedProject?: string  // slug
}
```

## Data loading
```ts
import { getAllExperience } from '@/lib/content/experience'
```

## Motion
- Timeline indicator: scroll-linked `scaleY` via GSAP ScrollTrigger
- Role cards: `revealOnEnter` with stagger as indicator passes
- Mobile: same reveal, no two-column choreography

## Rules
- Pharma-tech roles surfaced via role badges — no separate "Pharma" section
- `<section id="experience" aria-labelledby="experience-heading">`
- Company logos: `next/image`, meaningful `alt`
