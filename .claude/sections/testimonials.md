# Testimonials / Recognition Section

**Question answered for visitor:** "Do others vouch for this person?"

## Status
Optional section — include only if testimonials are available.
If no testimonials: omit entirely rather than show placeholder content.

## Layout options
- Subtle marquee (horizontal auto-scroll) for 3+ quotes
- Quote-stack (stacked cards, click to expand) for 2–3 quotes
- Single featured quote with attribution for 1 quote

## Quote card anatomy
- Quote text (1–3 sentences)
- Attribution: name, role, company
- Optional: avatar photo

## Files
```
components/sections/Testimonials/
  index.tsx
  QuoteMarquee.tsx   # Marquee variant
  QuoteStack.tsx     # Stack variant
  Testimonials.motion.ts
```

## Motion
- Marquee: CSS `animation: scroll` with `will-change: transform`, pauses on hover
- Stack: `AnimatePresence` for expand/collapse
- Entry: `fadeUp` on scroll enter

## Rules
- No fake or placeholder testimonials — real quotes only
- Marquee pauses on `prefers-reduced-motion`
- Quote text in `<blockquote>` with `<cite>` for attribution
