# Typography

## Typefaces
| Role | Font | Format |
|---|---|---|
| Display | Clash Display or Satoshi (decide at design-system pass) | Variable, self-hosted |
| Body | Inter | Variable, self-hosted |
| Mono | JetBrains Mono | Self-hosted |

## Loading
- All fonts via `next/font`, `display: swap`
- Self-hosted in `public/fonts/` — no external font CDN
- Subsetted to ≤ 80KB total across all fonts

## Modular scale
- Mobile: `1.25` ratio
- Desktop: `1.333` ratio

## Rules
- No Google Fonts CDN — self-host only
- Variable fonts preferred (single file covers all weights)
- `font-display: swap` always
