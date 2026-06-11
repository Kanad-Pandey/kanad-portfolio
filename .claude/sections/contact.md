# Contact Section

**Question answered for visitor:** "How do I reach this person?"

## Layout
Split layout:
- Left: contact form (Formspree-backed)
- Right: direct channels (email, LinkedIn, GitHub, calendar link)

## Form fields
- Name (required)
- Email (required, validated)
- Message (required, min 20 chars)
- Submit: `MagneticButton` with affirmative micro-animation on success

## Validation
- `react-hook-form` + `Zod` schema
- Inline validation messages, no placeholder-as-label
- Explicit `<label>` for every input
- `aria-live` region for form state (submitting / success / error)

## Backend
- Posts directly to Formspree from the client
- No `/api/contact` route in v1
- Formspree form ID stored in `content/site.config.ts` (not hardcoded in component)

## Direct channels (right column)
- Email (mailto link)
- LinkedIn
- GitHub
- Calendar / booking link (if available)

## Files
```
components/sections/Contact/
  index.tsx
  ContactForm.tsx    # "use client" — form state
  ContactLinks.tsx   # Static links — server component
  Contact.motion.ts
```

## Motion
- Section entry: split layout slides in from sides, `expoOut`
- Submit button: `MagneticButton` with `snap` easing on click confirmation
- Success state: form fades out, success message fades in via `AnimatePresence`

## Rules
- `<section id="contact" aria-labelledby="contact-heading">`
- No `console.log` of form data
- Error messages: descriptive, not generic ("Please enter a valid email" not "Invalid input")
