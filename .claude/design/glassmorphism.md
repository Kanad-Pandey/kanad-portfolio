# Glassmorphism

## When to use
Only on cards placed over imagery or 3D backgrounds. Never on flat surfaces.

## Recipe
```css
backdrop-filter: blur(16px);   /* 16–24px range */
background: rgba(255,255,255,0.05);   /* bg-white/5 */
border: 1px solid rgba(255,255,255,0.10);  /* border-white/10 */
```

Tailwind shorthand:
```
backdrop-blur-[16px] bg-white/5 border border-white/10
```

## Hard rules
- Never stack two glassmorphic layers
- Never use on a flat `--color-base` background — needs depth behind it
- `GlassCard` component in `components/motion/GlassCard.tsx` is the canonical implementation — use it, don't recreate

## Elevation model
Depth comes from **bloom, glow, and glassmorphic blur** — not `box-shadow` stacks.
- Use `box-shadow` only for subtle focus rings
- Glow effects via CSS `filter: drop-shadow` or R3F bloom post-processing
