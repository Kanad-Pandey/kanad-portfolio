# Scroll Animations

All scroll-bound animations go through `lib/motion/scroll.ts`. No orphan ScrollTrigger instances.

## Factory functions (to be implemented in `lib/motion/scroll.ts`)
```ts
revealOnEnter(containerRef, { stagger: 0.08 })
pinSection(sectionRef, { duration: '200%' })
horizontalScroll(trackRef, { items: cardRefs })
parallax(elementRef, { speed: 0.3 })
```

## Lenis + ScrollTrigger sync
- Lenis is mounted once in `LenisProvider`
- ScrollTrigger must use Lenis's scroll position — wired in `LenisProvider` via:
  ```ts
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- Never create a ScrollTrigger before Lenis is initialised

## Registration
- All ScrollTrigger instances register with a central `ScrollTrigger.refresh()` orchestrator
- Pause all scroll-bound animations on `visibilitychange: hidden`
- Use `IntersectionObserver` to pause offscreen animations

## Horizontal pin (Projects section)
- Desktop (`≥ lg`): `pinSection` + `horizontalScroll`
- Mobile (`< lg`): vertical stack — no pin, no horizontal scroll
- Transition between modes handled by `useMediaQuery('lg')`

## Performance
- Animations must be transform-only — no layout-triggering properties
- `will-change: transform` applied before animation, removed after
- `ScrollTrigger.refresh()` called after fonts load and images decode
