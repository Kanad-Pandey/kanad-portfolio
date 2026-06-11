# Accessibility Rules

Baseline: **WCAG 2.2 AA**. Manual verification required for full compliance.

## Colour contrast
- All text meets **4.5:1** contrast ratio
- Accent-on-dark combinations validated before shipping

## Keyboard
- Every interactive element focusable in DOM order
- Visible `:focus-visible` ring on all interactive elements
- Skip-to-content link at the top of every page
- Section jump keys: `j/k` or arrow keys; `g h` returns home
- Lenis breaks native anchor scroll — programmatic `scrollTo` must update focus and announce section change via `aria-live`

## Semantic structure
- Landmarks: `<main>`, `<nav>`, `<section aria-labelledby="...">`  on every section
- Decorative 3D scenes and ambient animations: `aria-hidden="true"`
- `aria-live` regions for form state changes and async feedback

## Motion
- `prefers-reduced-motion` honored via `MotionProvider`
- Reduced-motion path: fades and crossfades — a different site, not a broken one
- Marquees and looping animations pause on `prefers-reduced-motion`

## Forms
- Explicit `<label>` for every input — no placeholder-as-label
- Inline validation with descriptive error messages
- `aria-live` for form submission state

## Media
- Any video asset requires captions and a transcript
- Decorative video: `aria-hidden="true"`, `muted`, `autoPlay`, `loop`, `playsInline`

## Touch
- Touch targets ≥ 44×44px
- iOS safe-area insets respected (`env(safe-area-inset-*)`)
- Magnetic interactions and custom cursor disabled on touch devices
