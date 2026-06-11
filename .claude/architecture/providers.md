# Providers

App-level React context. Composed in `providers/index.tsx` — the only import needed in `app/(site)/layout.tsx`.

## Provider stack (order matters)
```tsx
// providers/index.tsx
export function Providers({ children }) {
  return (
    <MotionProvider>
      <LenisProvider>
        <CursorProvider>
          {children}
        </CursorProvider>
      </LenisProvider>
    </MotionProvider>
  )
}
```

## MotionProvider (`providers/MotionProvider.tsx`)
- Reads `prefers-reduced-motion` media query
- Exposes `{ reducedMotion: boolean, intensity: 'full' | 'reduced' | 'none' }` via context
- Must be outermost — all other providers and components read from it

## LenisProvider (`providers/LenisProvider.tsx`)
- Creates and owns the single Lenis instance
- Wires Lenis to GSAP ScrollTrigger:
  ```ts
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- Exposes Lenis instance via context — consumed by `useLenis()` hook
- Pauses Lenis on `visibilitychange: hidden`

## CursorProvider (`providers/CursorProvider.tsx`)
- Owns cursor state machine
- Exposes `{ cursorState, setCursor }` via context
- Consumed by `useCursorState()` hook and the `Cursor` component

## Hooks that consume providers
```ts
useLenis()         // → Lenis instance
useCursorState()   // → { cursorState, setCursor }
useReducedMotion() // → boolean (from MotionProvider)
```

## Rules
- No global state store (Zustand, Redux, Jotai) in v1 — these three providers cover all cross-cutting state
- Provider composition order in `providers/index.tsx` is the single place to reason about nesting
- Never instantiate Lenis outside `LenisProvider`
