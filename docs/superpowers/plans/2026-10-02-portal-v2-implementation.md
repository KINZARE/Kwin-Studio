# KWIN Studio Portal V2 — Implementation Plan

Date: 2026-10-02
Spec: docs/superpowers/specs/2026-10-02-portal-v2-design.md
Baseline main SHA: 7c8612d2f65e1cd2822c9b3b079ee4a5f2d05e9d
Execution method preserved from user request: Native / inline execution in this session after plan review.

## File map

Modify:
- `site/index.html` — homepage copy, sections, motion, responsive behavior, loader
- `site/contact.html` — only if positioning/CTA language needs alignment; keep preview form honesty and noindex
- `README.md` — update preview description only if architecture/content status materially changes

Create:
- `site/assets/studies/` — 6–8 original KWIN-owned SVG visual studies used by the exploration/design scenes
- `docs/superpowers/specs/2026-10-02-portal-v2-design.md` — approved design spec
- `docs/superpowers/plans/2026-10-02-portal-v2-implementation.md` — this plan

Do not modify:
- Render service architecture
- contact delivery backend (not present)
- production SEO/noindex state
- legacy Render service

## Task 1 — Lock baseline and add verification harness

Goal: make the release criteria measurable before visual changes.

1. Read current `site/index.html` and `site/contact.html` from branch.
2. Record baseline counts:
   - legacy terms (SALON, Boekuna/Bocuna/Bukuna, beauty, appointments, boekhouding)
   - H1 count
   - duplicate IDs
   - internal hash targets
   - inline script parse status
   - wheel/scroll/resize listeners
   - reduced-motion marker
   - noindex marker
   - brief-card and float-screen counts
3. Add a lightweight verification script at `scripts/verify-site.mjs` using only Node built-ins.
4. The script must fail if:
   - legacy target terms remain
   - H1 count != 1
   - duplicate IDs exist
   - internal anchors are missing
   - any wheel listener exists
   - reduced-motion support disappears
   - preview noindex disappears
   - brief-card count < 12
   - float-screen count < 14
5. Run once before content migration and confirm expected failure on legacy terms / density thresholds.
6. Commit:
   `test: codify Portal V2 preview release gates`

Expected red evidence:
- existing homepage currently contains SALON, Boekuna, beauty/appointments
- existing counts are 10 brief cards / 12 floating screens

## Task 2 — Replace legacy audience and Selected Work

Goal: zero old niche content, no fake clients, new premium multi-sector positioning.

In `site/index.html`:
1. Replace hero intro/selected-work supporting copy where needed with premium studio positioning.
2. Replace existing SALON and Boekuna project articles with four studies:
   - Luxury Hospitality / Digital Direction 01
   - AI & Technology / Interface Study 02
   - Architecture & Premium Service / Digital Direction 03
   - Creative Brand / Experience Study 04
3. Each study must include:
   - explicit “Concept”, “Study”, “Direction”, or “Exploration” label
   - unique visual treatment
   - short objective copy
   - strategy/design/development metadata without client claims
4. Remove all old target terms from homepage markup/scripts.
5. Update services to Strategy / Experience Design / Development / Interactive (+ Launch only if layout supports it).
6. Run verification; legacy-term checks must turn green.
7. Commit:
   `feat: reposition KWIN for premium modern brands`

## Task 3 — Add original visual assets

Goal: stop relying only on gradients while remaining fully original and copyright-safe.

Create 6–8 SVG assets under `site/assets/studies/`, for example:
- `hospitality-editorial.svg`
- `ai-interface-grid.svg`
- `architecture-study.svg`
- `creative-brand-poster.svg`
- `luxury-material-study.svg`
- `spatial-interface-map.svg`

Requirements:
- original KWIN typography/geometry only
- no Portal artwork or logos
- viewBox-based responsive SVG
- no embedded external resources
- restrained palette aligned with black / cream / lime / soft blue / muted warm
- each file small enough for direct static delivery

Integrate them into relevant visual cards using `<img>` with:
- width/height or aspect-ratio reservation
- descriptive alt for meaningful content, empty alt for purely decorative content
- `loading="lazy"` for below-fold assets
- `decoding="async"`

Run verification and inspect source for missing asset paths.
Commit:
`feat: add original KWIN visual study assets`

## Task 4 — Rebuild loader and hero spatial gateway

Goal: strong first impression without slowing navigation.

Loader:
1. Keep total normal-load sequence around 1.7–2.0 seconds.
2. Hold KWIN/STUDIO readable during the middle phase.
3. Use transform-based progress bar.
4. Keep hard fallback and reduced-motion fast path.
5. Ensure body scroll lock always clears.

Hero:
1. Convert current portal-stack into a clearer spatial gateway:
   - outer frame/ring
   - inner aperture
   - two or more depth planes
   - technical labels
   - controlled glow
2. Connect gateway expansion and depth to the existing shared motion coordinator.
3. Avoid adding new scroll listeners or independent continuous RAF loops.
4. Keep CTA and scroll cue clearly readable above/around the object.

Verification:
- wheel listeners remain 0
- scroll listener count remains 1 shared coordinator
- scripts parse
- reduced motion retained

Commit:
`feat: deepen loader and hero spatial gateway`

## Task 5 — Expand the exploration wall and design workbench

Goal: eliminate empty mid-page viewports through art-directed density.

Exploration wall:
1. Expand to exactly 14 surfaces on desktop.
2. Mix portrait, landscape, square, mobile and wide formats.
3. Reuse the new SVG studies plus DOM/CSS compositions.
4. Use asymmetrical 12-column placement with intentional overlap and different vertical offsets.
5. Add subtle per-card scroll-depth using the existing coordinator where useful.
6. Touch/coarse pointer: reveal essential card text without hover.

Design workbench:
1. Central browser/design canvas.
2. At least 7 secondary surfaces:
   - typography
   - motion
   - responsive
   - conversion
   - components
   - art direction
   - mobile/control strip
3. Scroll choreography:
   - enter
   - stack
   - separate into foreground/background
   - settle before adaptive scene
4. Keep transforms owned by one module.

Responsive:
- <=820px collapse to a coherent grid/vertical flow
- <=520px reduce secondary surfaces rather than overlap them

Run verification; brief-card count must be >=12.
Commit:
`feat: build dense exploration and design scenes`

## Task 6 — Make adaptive and studio-system scenes visibly stateful

Adaptive scene:
1. Rename modes to:
   - Fast overview
   - Brand story
   - Decision mode
2. Each mode must change:
   - grid ratio
   - heading scale/placement
   - visual emphasis
   - CTA prominence
   - supporting panels
3. Keep `aria-pressed` state in sync.

Studio system:
1. Use the prompt:
   “Build a premium digital experience for a modern AI brand.”
2. Expand stages to:
   Research → Positioning → IA → Art Direction → Interface → Development → Responsive QA → Launch.
3. Add visible artifacts:
   - research result
   - page map
   - component preview
   - browser result
   - QA status
   - final-ready card
4. Animate progress from the shared coordinator only.

Verification:
- scripts parse
- buttons remain buttons
- mode controls keyboard-operable
- no missing IDs/anchors

Commit:
`feat: make adaptive and studio-system scenes stateful`

## Task 7 — Expand floating screen world and rebuild project access object

Floating screen world:
1. Increase desktop objects to 18.
2. Include:
   - mini portrait
   - mobile
   - medium landscape
   - wide banner
   - square
   - tall editorial
3. Use color variants: cream, white, black, lime, soft blue, muted warm.
4. Choreography:
   - start clustered
   - spread through mid-progress
   - move outward near end
5. Preserve central heading readability.
6. On mobile show materially fewer simultaneous objects and simplify transforms.

Project access:
1. Replace generic pass language with original KWIN artifact:
   `KWIN / PROJECT ACCESS`
2. Include:
   - serial/status
   - STRATEGY / DESIGN / BUILD / LAUNCH
   - ONE IDEA / ONE SYSTEM / ONE RELEASE
   - cut-out/hole or layered depth detail
3. Retain subtle pointer tilt only for fine pointers.
4. Add scroll reveal without new scroll listener.

Run verification; float-screen count must be >=14.
Commit:
`feat: expand screen world and project access artifact`

## Task 8 — Responsive, accessibility and performance pass

Review widths:
- 320
- 375
- 390
- 430
- 768
- 1024
- 1440
- 1920

Source-level requirements:
1. No horizontal-overflow-causing fixed widths without mobile override.
2. Hover-only essential content has touch fallback.
3. One H1.
4. Menu focus handling remains.
5. `prefers-reduced-motion` disables/simplifies spatial motion.
6. New images reserve space and lazy load below fold.
7. No new non-passive scroll listener.
8. No new width/height animation for loader/motion where transform can be used.
9. Keep preview `noindex,nofollow`.
10. Contact page still never fakes send success.

Run:
`node scripts/verify-site.mjs`

Expected:
- exit 0
- all release-gate assertions pass

Commit:
`fix: harden Portal V2 responsive and accessibility behavior`

## Task 9 — Whole-branch review before merge

1. Compare branch against `main`.
2. Confirm:
   - behind_by = 0
   - expected files only
   - no accidental old terms
   - no fake client claims
   - no new scroll engine
3. Re-run `node scripts/verify-site.mjs`.
4. Request a fresh whole-branch code review against:
   - this implementation plan
   - design spec
   - merge base SHA
   - branch HEAD SHA
5. Fix all Critical and Important findings.
6. Re-run verification after fixes.
7. Open PR with exact checks and known limitations.
8. Mark ready only after clean review.

## Task 10 — Exact-SHA merge and Render release

1. Fetch PR and pin exact `head_sha`.
2. Merge with `expected_head_sha`.
3. Record merge commit SHA.
4. Confirm GitHub `main` points to that merge SHA.
5. Check Render `kwin-studio-preview`.
6. If auto-deploy fires, do not manually trigger.
7. If auto-deploy demonstrably does not fire after repeated checks, trigger one manual deploy without cache clear.
8. Verify Render:
   - checked out exact merge SHA
   - deploy status `live`
   - no error logs
9. Verify homepage/contact route through available runtime. Do not claim rendered visual QA if the environment cannot actually open the page.

## Final report

Report:
- RELEASE STATUS: Preview Ready / Production Ready / Blocked
- LIVE URL
- EXACT MAIN SHA
- RENDER DEPLOYMENT ID + status
- IMPLEMENTED
- REMOVED
- QA actually executed
- MOBILE evidence actually executed
- PERFORMANCE notes
- REMAINING BLOCKERS

Production Ready is not allowed until:
- real contact delivery exists
- production domain exists
- noindex removed intentionally
- production SEO is complete
- full rendered browser QA is complete
