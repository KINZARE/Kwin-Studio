# Kwin Studio V2 — Design Specification

## Goal
Transform the existing Kwin Studio static site into a commercially credible independent digital flagship studio website while preserving the Portal V2 DNA: carbon-dark atmosphere, restrained acid accent, large editorial type, spatial composition and purposeful motion.

## Engagement mode
Refresh. Preserve useful equity; do not erase the current identity or switch frameworks without evidence.

## Brand decision record
- Brand: Kwin Studio
- Category: Independent Digital Flagship Studio
- Primary audience: founders, CEOs, CMOs, brand/digital leaders at established companies, scale-ups and premium challenger brands
- Promise: We turn ambitious brands into unmistakable digital experiences.
- Differentiation: Strategy and craft live in the same room; senior thinking carries through positioning, UX, visual system, interaction and implementation.
- Character: intelligent, confident, selective, contemporary, precise, experimental, understated, human
- Avoid: crypto/gaming neon, generic AI agency visuals, fake luxury, generic SaaS cards, fake proof, over-animation
- Primary conversion: Start a project
- Secondary conversion: View selected work

## Creative direction
Working direction: **Editorial Signal**.

A mature dark/light editorial system where carbon and warm paper create the field, typography carries most of the identity, and acid yellow-green behaves like a highlighter rather than a light source. Work presentation is large and cinematic; small labels, hairlines and coordinates provide technical precision. Motion is sparse, early-triggered and interruptible.

Rejected directions:
1. **Cyber Neon** — too gaming/AI-coded, too dependent on glow and spectacle.
2. **Quiet Beige Luxury** — too anonymous and erases Kwin's experimental digital DNA.
3. **Brutalist Lab** — too fashion-led and confrontational for high-trust flagship engagements.

## Brand system V2
### Wordmark
Keep a typographic KWIN STUDIO wordmark. No new abstract K mark. Use compact KS mark only for favicon/small digital contexts.

### Typography
Use a single high-quality system sans strategy for zero font blocking and excellent performance. Display uses very tight tracking, large optical scale and balanced wrapping. Body remains 16–20px with 1.5–1.65 line-height and 45–70 character measure.

### Color tokens
- carbon: #0a0a0a
- ink: #121212
- graphite: #1a1a1a
- warm-paper: #f0ede6
- warm-paper-2: #e4e0d7
- text-on-dark: #f3f0e9
- muted-on-dark: #9c9992
- text-on-light: #101010
- muted-on-light: #595751
- line-dark: rgba(243,240,233,.16)
- line-light: rgba(16,16,16,.16)
- accent: #d7ff38
- error: #ff786f
- success: #a9e99a

Accent is scarce: key marker, focus, selected state, single CTA emphasis, transition/detail.

### Grid
12-column conceptual desktop grid, reduced to 4 columns mobile. Stable gutters with occasional intentional bleed. No centered SaaS-template repetition.

### Imagery
Priority: real product/site screens and Kwin-owned visual studies. Existing geometric study assets remain chapter/support visuals, not a substitute for case proof. No stock-photo filler.

### Motion
Native scroll. One shared rAF scroll coordinator for the homepage, IntersectionObserver for reveal choreography, transform/opacity only for continuous motion, reduced-motion fallback, no scroll hijacking.

## Information architecture
- /
- /work/
- /work/portal-v2/
- /work/adaptive-brand-system/
- /work/spatial-interface-study/
- /services/
- /studio/
- /contact/
- /404.html
Insights is intentionally deferred until there is enough useful material.

## Proof policy
No invented clients, testimonials, awards or commercial metrics. Concept work is clearly labelled. Kwin Studio's own Portal V2 work is labelled self-initiated/internal. Outcomes are described only where observable and verifiable.

## Contact
Build full qualification UX and states, but do not claim email delivery until a verified sending domain/API path exists. Preview release may expose a transparent unavailable/draft state; production merge is blocked until delivery is connected and tested.

## Technical architecture
Keep Render static-site architecture. Refactor the monolithic homepage into shared `site/styles.css` and `site/app.js`, plus semantic multi-page HTML. This is the smallest maintainable change that supports the required IA without a framework migration.

## Accessibility
WCAG AA practical target: semantic landmarks, skip link, correct heading hierarchy, keyboard-operable mobile nav, visible focus, labelled forms, errors tied to fields, touch targets, reduced motion, contrast-safe tokens.

## Performance
No framework/runtime dependencies. Avoid loaders that block content. Existing SVG studies are reused. CSS/JS are shared and small; no WebGL or video for launch.

## Release gates
- all primary routes exist and link correctly
- no fake proof
- no horizontal-overflow-prone fixed widths
- mobile nav is functional and accessible
- reduced motion is complete
- contact never reports false delivery success
- preview remains noindex until production blockers are cleared
- automated static checks pass
- branch preview receives browser/mobile QA before merge
