# SEO Rules

## Per-route metadata (via `generateMetadata`)
Every route must have:
- Unique `title` and `description`
- Canonical URL
- OG image (dynamic via `next/og`)
- Twitter card

Helper: `import { buildMetadata } from '@/lib/seo'`

## OG images
- Dynamic per route via `@vercel/og` edge function (`app/opengraph-image.tsx`)
- Branded template — not a generic screenshot

## Structured data (JSON-LD)
| Page | Schema |
|---|---|
| Home | `Person`, `WebSite` |
| Case study | `CreativeWork`, `BreadcrumbList` |

Builders in `lib/seo.ts`: `buildPersonJsonLd()`, `buildCreativeWorkJsonLd()`, `buildBreadcrumbJsonLd()`

## Sitemap + robots
- `app/sitemap.ts` — generated at build via App Router conventions
- `app/robots.ts` — allow all, disallow nothing in v1

## Content SEO
- Case study MDX is the primary SEO surface: long-form, keyword-rich
- Target keywords: RAG, LLM ops, Snowflake, pharma analytics, Azure ML, GenAI
- Internal linking between case studies and the home projects rail

## Crawlability
- All content surfaces (case studies, resume) are SSG — never client-only rendered
- 3D and motion never block meaningful HTML — crawlers see full content

## Core Web Vitals
Performance targets in `rules/performance.md` are also SEO targets — treat them as one.
