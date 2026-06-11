# Motion System

Central source of truth: `lib/motion/`

## Files
| File | Purpose |
|---|---|
| `easings.ts` | Named cubic-bezier arrays |
| `durations.ts` | Named ms constants |
| `variants.ts` | Framer Motion variant presets |
| `scroll.ts` | GSAP ScrollTrigger factory functions |
| `text.ts` | SplitText reveal helpers |
| `magnetic.ts` | Magnetic pointer math (pure functions) |
| `cursor.ts` | Cursor state machine definition |

## Duration scale
```ts
instant:   120ms
fast:      240ms
base:      480ms
slow:      800ms
cinematic: 1400ms
```

## Named easing curves
```ts
expoOut:   [0.22, 1, 0.36, 1]        // house curve — default for entrances
softInOut: [0.45, 0, 0.55, 1]        // balanced transitions
snap:      [0.68, -0.55, 0.27, 1.55] // spring-like confirmations
silk:      [0.25, 0.46, 0.45, 0.94]  // smooth exits
```

## Motion layers
| Layer | Description | Tool |
|---|---|---|
| Ambient | Slow looping background (particles, gradient drift, 3D idle) | R3F / GSAP |
| Reactive | Cursor magnetism, hover lifts, card tilt | Framer Motion / `useMagnetic` |
| Narrative | Scroll-linked transforms, pinned sections, section morphs | GSAP + ScrollTrigger |
| Affirmative | Micro-confirmations on click/submit | Framer Motion |

## Tool boundaries (strict)
- **GSAP + ScrollTrigger** → scroll choreography, pinning, timeline sequencing, SplitText
- **Framer Motion** → component state transitions, layout animations, gestures, exit
- **R3F** → 3D scenes, shader hero, particle systems
- **Lenis** → smooth-scroll substrate — everything hooks into it, nothing bypasses it

## Choreography rules
- Stagger child elements 60–120ms — never fire all at once
- Sections enter as scenes, not parallel fireworks
- Never animate `top`, `left`, `width`, `height` — transforms only
- Apply `will-change` surgically; remove after animation completes

## Reduced-motion contract
Every motion helper must check `useReducedMotion()`:
```ts
const shouldReduce = useReducedMotion()
const variants = shouldReduce ? instantVariants : fadeUp
```
The no-motion experience is a different site, not a broken one.
