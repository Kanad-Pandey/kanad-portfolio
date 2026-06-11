# Performance Rules

## Targets
| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | < 0.05 |
| TBT | < 200ms |
| JS bundle (per route) | ≤ 180KB gzipped |
| Fonts | ≤ 80KB total (variable, subsetted) |
| Animation | 60fps on 2020 MacBook Air / mid-range Android |

## Code-splitting
- R3F bundle, GSAP plugins, heavy client islands: `dynamic()` with `ssr: false`
- Never import a client-only library (Lenis, GSAP, R3F) at module level in a server component
- Import only the GSAP plugins used — never the full bundle

## Images
- All images via `next/image` with AVIF/WebP output
- `priority` prop only on the hero image — `loading="lazy"` everywhere else
- Blurred placeholder on all images

## Fonts
- `next/font`, `display: swap`, self-hosted — no external font CDN
- Variable fonts, subsetted to ≤ 80KB total

## 3D discipline
- Instanced meshes for repeated geometry
- Low-poly geometry + baked textures
- Frame rate capped at 60; throttle `useFrame` when component is offscreen
- `Suspense` boundaries with skeleton fallbacks on every R3F canvas
- Mobile + low memory: `if (isMobile && lowMemory) loadLightweightVariant()`
- Hero 3D: DPR capped at 1.5 on mobile

## Scroll and animation
- Animations must be **transform-only** — no `top`, `left`, `width`, `height`
- Apply `will-change` surgically; remove after animation completes
- Pause all scroll-bound animations on `visibilitychange: hidden`
- `IntersectionObserver` to pause offscreen animations

## Asset budgets
- `.glb` models: Draco-compressed, ≤ 500KB each
- Looping video previews: ≤ 2MB per clip, `.mp4` + `.webm` pair
