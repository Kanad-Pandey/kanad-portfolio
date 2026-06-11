# Data Layer

Content is data, not code. MDX files are the source of truth for all content.

## Content files (`content/`)
```
content/
  projects/           # *.mdx — 4 featured + extras (tagged)
  experience/         # *.mdx — one file per role
  resume.mdx          # Full resume — rendered at /resume
  site.config.ts      # Singleton: name, tagline, socials, nav links, skills, about copy
```

## Loader functions (`lib/content/`)
```ts
// projects.ts
getAllProjects(): Promise<ProjectFrontmatter[]>
getProjectBySlug(slug: string): Promise<{ frontmatter, content }>

// experience.ts
getAllExperience(): Promise<ExperienceFrontmatter[]>

// resume.ts
getResume(): Promise<{ content }>
```

Each loader:
1. Reads MDX files from `content/`
2. Validates frontmatter against a Zod schema from `types/content.ts`
3. Returns typed data — never raw strings

## Zod schemas (`types/content.ts`)
All MDX frontmatter validated at build time. If frontmatter is invalid, the build fails — not a runtime error.

## MDX rendering
- `next-mdx-remote` or `@next/mdx` (decide at implementation)
- Custom components mapped in `components/mdx/MDXComponents.tsx`
- All case study pages are SSG — never client-only rendered

## site.config.ts
Single source of truth for:
- `name`, `tagline`, `bio`
- `socials`: email, LinkedIn, GitHub, calendar
- `nav`: link labels and hrefs
- `skills`: categorised skill data
- `formspreeId`: contact form endpoint

## Rules
- No headless CMS in v1 — MDX only
- No database — static content only
- No runtime data fetching on the home page — all SSG
- Frontmatter keys: `camelCase`
