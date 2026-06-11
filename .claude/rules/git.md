# Git Rules

## Branch naming
- Branch from `main` always
- `feat/description` — new feature or section
- `fix/description` — bug fix
- `motion/description` — animation change
- `content/description` — MDX content update
- `chore/description` — tooling, deps, config
- `a11y/description` — accessibility improvement
- `perf/description` — performance improvement

## Commit format
`<type>(<scope>): <imperative summary>`
- Summary: imperative mood, ≤ 72 characters, no period
- Body (optional): explain *why*, not *what*. Reference issue numbers.

### Types
| Type | When |
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

### Examples
```
feat(hero): add neural-mesh R3F scene with scroll-linked camera
motion(projects): implement horizontal-pin scroll with GSAP ScrollTrigger
fix(lenis): restore focus after programmatic section scroll
perf(three): draco-compress hero model, reduce bundle by 340KB
a11y(nav): add skip-to-content link and aria-current on active route
content(projects): add RAG pipeline builder case study MDX
```

## PR rules
- PRs require passing CI (typecheck, lint, build, Playwright smoke) before merge
- Squash merge feature branches into `main` — keep history linear
- One logical change per branch — no bundling unrelated changes

## Hard rules
- Never force-push `main`
- Never commit `.env`, secrets, large binaries, or generated files
- Never use `--no-verify` to skip hooks
- Tag releases with semver: `v1.0.0`, `v1.1.0`
