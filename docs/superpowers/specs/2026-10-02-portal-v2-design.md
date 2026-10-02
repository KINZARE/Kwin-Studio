# KWIN Studio Portal V2 — Design Spec

Date: 2026-10-02
Source spec: user-approved “KWIN STUDIO — MASTER PROMPT V2”
Baseline main SHA: 7c8612d2f65e1cd2822c9b3b079ee4a5f2d05e9d
Live preview: https://kwin-studio-preview.onrender.com
Primary visual reference: https://portal-to-the-future.webflow.io/

## Outcome

Turn the existing KWIN Studio static site into a denser, spatial, premium scroll experience for:
- premium service businesses
- creative / design-driven brands
- tech / AI companies
- luxury / high-end brands

Keep the existing codebase and KWIN identity. Do not copy Portal assets or text. Reproduce the design philosophy: spatial storytelling, layered visual density, controlled 3D depth, floating interfaces, oversized typography, cinematic transitions, and native-feeling scroll.

## Current-state findings

- The active site is a Render static site from `site/` on branch `main`.
- Current live SHA is `7c8612d2f65e1cd2822c9b3b079ee4a5f2d05e9d`.
- `site/index.html` still contains SALON, Boekuna, “Beauty & appointments”, and salon-specific copy.
- The current exploration wall has 10 brief cards; target is 12–16.
- The current screen-world has 12 floating screens; target is 14–22.
- The site has no image or video assets yet; visual richness is currently DOM/CSS-generated.
- Native scroll architecture from the recovery release must remain intact.

## Content model

Remove all old niche/client-specific content:
- SALON / salon / beauty / appointments
- Boekuna / Bocuna / Bukuna
- bookkeeping-specific legacy case content

Do not invent clients. Replace “Selected Work” with four clearly-labelled studies:
1. Luxury Hospitality / Digital Direction 01
2. AI & Technology / Interface Study 02
3. Architecture & Premium Service / Digital Direction 03
4. Creative Brand / Experience Study 04

Each study is explicitly presented as a concept/direction/study, not a client case.

Primary positioning:
“KWIN Studio creates premium digital experiences for ambitious modern brands.”

Supporting service pillars:
- Strategy
- Experience Design
- Development
- Interactive
- Launch (optional, if the layout benefits from five rows)

## Visual architecture

### 1. Loader
Keep total normal-load experience around 1.7–2.0 seconds:
- arrival: 0–0.4s
- brand reveal: 0.4–1.35s
- transition: ~1.35–1.9s

Use transform/opacity for progress and transitions. Preserve reduced-motion behavior and never leave scroll locked.

### 2. Hero
Retain oversized KWIN STUDIO typography.
Replace the current “decorative ring” feeling with one dominant KWIN spatial gateway:
- layered ring/frame/tunnel
- foreground/background depth layers
- small technical labels
- subtle scroll-linked opening
- no heavy WebGL unless strictly necessary

### 3. Visual exploration wall
Expand to 14 surfaces on desktop.
Use mixed aspect ratios and mixed visual types:
- editorial posters
- browser crops
- abstract interface studies
- mobile frames
- typography studies
- product-style cards
- spatial graphic surfaces

At least several surfaces should use real generated KWIN-owned visual assets rather than only gradients. Touch devices must reveal essential information without hover.

### 4. Design workbench
Make “Design at the speed of thought” a major layered scene:
- central browser/design canvas
- typography panel
- motion panel
- responsive panel
- conversion panel
- component panel
- art-direction card
- mobile screen
- control strip

Panels enter, stack, separate, and shift in depth via scroll progress.

### 5. Adaptive scene
Use three modes:
- Fast overview
- Brand story
- Decision mode

Each mode changes layout hierarchy, density, CTA position, card priority and supporting modules — not only text.

### 6. Studio system / agent scene
Show one prompt moving through:
Research → Positioning → IA → Art Direction → Interface → Development → Responsive QA → Launch.

Add visual artifacts such as a research panel, page map, browser result, component result, QA state and final ready state.

### 7. Floating screen world
Expand to 18 desktop objects with varied aspect ratios, colors and depths.
At start they are relatively clustered; mid-scene they spread spatially; at end they move outward to reveal the next section.
Keep central copy readable.

### 8. Project access object
Transform the existing pass object into an original KWIN “PROJECT ACCESS” / “BUILD PASS” artifact with depth, cut-out, serial/status typography, subtle pointer tilt and scroll reveal.

## Motion architecture

Preserve:
- browser-native wheel / trackpad / keyboard / touch scrolling
- a single shared scroll/resize coordinator
- passive listeners
- reduced-motion behavior
- visibility pause

Do not add:
- wheel interception
- multiple competing transform owners
- perpetual expensive animation
- unnecessary RAF loops

Use transforms and opacity for visual movement.

## Mobile

Desktop density must collapse deliberately:
- 320, 375, 390, 430 px: vertical card flow, fewer simultaneous floats, no hidden essential content
- 768 px: simplified spatial layers and no uncontrolled overlap
- 1024 px: intermediate composition
- 1440/1920 px: full spatial layout

No horizontal overflow.

## Accessibility

Keep:
- one H1
- skip link
- keyboard menu
- focus-visible
- semantic controls
- ARIA where needed
- reduced-motion support
- sufficient contrast

## Performance

Use optimized local assets (WebP/AVIF where applicable), lazy load non-critical media, responsive sizes, and avoid layout-thrashing animation.
Prefer CSS/DOM for depth effects. Generate only the number of raster assets that materially improves the design.

## Preview release gate

Before merge:
- branch behind main = 0
- 5/5 (or current count) inline scripts parse
- one H1
- duplicate IDs = 0
- missing internal anchors = 0
- legacy target terms = 0
- wheel listeners = 0
- one shared scroll coordinator retained
- reduced motion present
- preview noindex present
- mobile overrides present

After merge:
- Render deploy exact merge SHA
- deploy status live
- no deployment error logs
- smoke-check homepage and contact route to the extent the available runtime permits

## Production blockers

Preview may remain noindex and contact may remain preview-only. Production Ready additionally requires real form delivery, production domain, production SEO metadata, and full rendered browser QA.
