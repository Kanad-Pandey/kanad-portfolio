# Design Tokens

Single source of truth: `styles/tokens.css`. Never hard-code hex in components.

## Color tokens

```css
--color-base:      #0A0A0F   /* near-black background */
--color-surface:   #13131A   /* card / panel surface */
--color-elevated:  #1B1B24   /* elevated surface */
--color-accent-1:  #8B5CF6   /* electric violet */
--color-accent-2:  #22D3EE   /* cyan */
--color-text-1:    #E5E7EB   /* primary text */
--color-text-2:    #9CA3AF   /* secondary text */
--color-text-3:    #6B7280   /* muted text */
```

## Spacing ramp
4px base: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`

## Radii
`2 / 8 / 16 / 24 / full` — cards default to `16px`

## Blur
`--blur-glass: 16px` to `24px` — glassmorphism only

## Easing (CSS)
```css
--ease-expo-out:   cubic-bezier(0.22, 1, 0.36, 1)
--ease-soft-in-out: cubic-bezier(0.45, 0, 0.55, 1)
--ease-snap:       cubic-bezier(0.68, -0.55, 0.27, 1.55)
--ease-silk:       cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

## Theme architecture
- v1: Obsidian dark only — `<html data-theme="obsidian">`
- Future Photon (light) theme: add `:root[data-theme="photon"]` block to `tokens.css` — zero component refactor
- Tailwind consumes tokens via `@theme` (v4) or `tailwind.config.ts` extensions
- R3F materials read tokens via `useThemeTokens()` hook

## Rules
- Never hard-code hex in components — always reference a token
- Never use arbitrary Tailwind values for design tokens
- `tokens.css` is the only place token values are defined
