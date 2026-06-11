# Cursor

Custom cursor with contextual states. Disabled on touch devices.

## States
| State | Trigger |
|---|---|
| `default` | Idle |
| `link` | Hovering any `<a>` or `<button>` |
| `view` | Hovering project cards |
| `drag` | Hovering horizontal scroll sections |
| `disabled` | Touch device detected |

## Files
```
components/chrome/Cursor/
  index.tsx          # Cursor renderer — "use client"
  Cursor.motion.ts   # Animation config per state

lib/motion/cursor.ts # State machine definition
providers/CursorProvider.tsx
hooks/useCursorState.ts
```

## State machine (`lib/motion/cursor.ts`)
```ts
type CursorState = 'default' | 'link' | 'view' | 'drag' | 'disabled'
```

## Usage
```tsx
// Set cursor state from any component
const { setCursor } = useCursorState()
<div onMouseEnter={() => setCursor('view')} onMouseLeave={() => setCursor('default')}>
```

## Magnetic interactions (`lib/motion/magnetic.ts`)
- Strength and radius are props — never hardcoded
- Disabled automatically on touch devices
- Applied via `useMagnetic` hook, not inline event handlers
```tsx
<MagneticButton strength={0.4} radius={80}>
  <Button>View Project</Button>
</MagneticButton>
```

## Rules
- Cursor component is `aria-hidden="true"` — purely decorative
- On touch: `CursorState = 'disabled'`, cursor element unmounted
- Never use `cursor: none` globally without rendering the custom cursor
