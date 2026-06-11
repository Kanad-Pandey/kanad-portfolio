# Code Quality Rules

## TypeScript
- Strict mode always — `"strict": true` in `tsconfig.json`
- No `any` — ever
- No `@ts-ignore` without an explanatory comment on the same line
- Types: `PascalCase`. Props: `ComponentNameProps`. Constants: `SCREAMING_SNAKE_CASE`
- Enums: `PascalCase` with `PascalCase` members

## Imports
- Absolute paths via `@/` alias — no relative `../../` beyond one level
- Group order: external → internal → relative → types
- Barrel exports (`index.ts`) for `components/ui`, `components/motion`, `lib/motion`, `types`

## No magic numbers
- All durations → `lib/motion/durations.ts`
- All easings → `lib/motion/easings.ts`
- All colors → `styles/tokens.css` CSS variables
- All spacing → Tailwind tokens
- All route paths → `constants/routes.ts`

## Comments
- Only comment the *why* — never the *what*
- One short line max — no multi-paragraph docstrings
- No comments referencing the current task, fix, or caller

## No hardcoded copy
- All text content comes from props or MDX frontmatter
- No strings inside section or component files

## Linting
- ESLint + Prettier must pass before any commit
- No `eslint-disable` without an explanatory comment
- No `console.log` in committed code — use structured logging or remove

## Validation
- Zod schemas for all MDX frontmatter and any external data boundary
- Validate at system boundaries only — trust internal code and framework guarantees

## Dead code
- No unused exports, dead code, or backwards-compatibility shims
- Delete confidently — git history preserves removed code

## Error handling
- No error handling for scenarios that cannot happen
- No fallbacks for internal code paths — only at system boundaries (user input, external APIs)
