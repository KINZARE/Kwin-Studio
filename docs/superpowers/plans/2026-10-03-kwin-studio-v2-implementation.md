# Kwin Studio V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with TDD and verification-before-completion.

**Goal:** Transform the existing Kwin Studio static site into a commercially credible multi-page flagship studio website while preserving the strongest Portal V2 visual and motion DNA.

**Architecture:** Keep the existing static `site/` architecture. Add a small shared page system for secondary routes, retain the existing homepage motion implementation, and extend release verification so routes, metadata, content integrity, responsive behavior and contact-state rules are testable without a framework migration.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node verification script, Render Static Site.

**Spec:** `docs/superpowers/specs/2026-10-03-kwin-studio-v2-design.md`

## Global Constraints
- Existing `main` is the source of truth; no rewrite without a documented technical reason.
- Preserve dark visual atmosphere, controlled neon accent, editorial typography, scroll storytelling and layered motion where they improve clarity.
- Do not invent clients, metrics, testimonials, awards, team size or project outcomes.
- Use free/open-source dependencies only; avoid new dependencies unless necessary.
- Native scroll remains the baseline; `prefers-reduced-motion` must preserve a complete experience.
- Preview remains `noindex,nofollow` until production domain and real inquiry delivery are ready.
- Primary navigation: Work / Services / Studio / Contact. Primary CTA: Start a project.
- Mobile first: validate 320, 375, 390/430, tablet and desktop.

## Review Focus
- Deep routes must load directly and remain navigable after refresh/back/forward.
- Mobile navigation and long headings must not overflow at 320px.
- Contact form must never report success without a real delivery endpoint and must expose clear validation/failure state.
- Concept work must be labelled transparently; no copy may imply invented client outcomes.
- Motion/reveal additions must not create extra global scroll listeners or override native wheel/touch behavior.

---

### Task 1: Codify V2 release gates
**Files:** Modify `scripts/verify-site.mjs`.
**Produces:** failing checks for required routes, navigation, page metadata, 404, footer/legal structure, contact qualification fields, sitemap/robots and concept labels.
- [ ] Add assertions for the new multi-page information architecture and content-integrity rules.
- [ ] Run `node scripts/verify-site.mjs` and confirm the new checks fail against the old branch state.
- [ ] Commit the failing release gates.

### Task 2: Establish shared secondary-page system
**Files:** Create `site/assets/studio-v2.css`, `site/assets/studio-v2.js`.
**Produces:** shared tokens, header/mobile navigation, editorial page shells, footer, focus/reduced-motion behavior, project media patterns and form states.
- [ ] Implement shared system using Brand System V2 tokens and existing Portal V2 DNA.
- [ ] Keep JavaScript limited to menu/focus, progressive reveal and form-state behavior; no scroll hijacking.
- [ ] Verify syntax and route-relative asset paths.

### Task 3: Build Work and case-study proof
**Files:** Create `site/work.html`, `site/work/atelier.html`, `site/work/signal.html`.
**Produces:** editorial project index plus two transparent concept case studies with challenge/context/strategy/system/experience/build/responsive/outcome framing.
- [ ] Label concept work explicitly and avoid invented business results.
- [ ] Use real Kwin-owned study assets already in the repo.
- [ ] Link cases bidirectionally and provide next-project continuation.

### Task 4: Build Services and Studio
**Files:** Create `site/services.html`, `site/studio.html`.
**Produces:** outcome-led service architecture and trust-focused studio page reflecting an independent senior studio, not a fake large agency.
- [ ] Services: Flagship Websites, Brand-to-Digital, Interactive Experiences, Digital Repositioning.
- [ ] Studio: philosophy, working model, senior involvement, quality principles, collaboration model and capabilities.

### Task 5: Rebuild inquiry page without fake delivery
**Files:** Modify `site/contact.html`.
**Produces:** qualification fields from the spec, accessible validation, loading/failure/retry-safe UI, duplicate-submit guard and an honest unconnected-delivery state until email infrastructure exists.
- [ ] Update budget bands to €10k–€25k / €25k–€50k / €50k–€100k / €100k+ / Not sure yet.
- [ ] Add project objective, change needed and timing fields.
- [ ] Keep submit blocked from pretending delivery until a secure endpoint exists.

### Task 6: Add 404 and SEO foundations
**Files:** Create `site/404.html`, `site/robots.txt`, `site/sitemap.xml`, `site/site.webmanifest`; add/update metadata on new pages.
**Produces:** branded error recovery, crawlable structure and production-ready technical foundations while preview remains noindex.

### Task 7: Connect homepage to the multi-page architecture
**Files:** Modify `site/index.html` minimally.
**Produces:** primary nav/mobile nav links to `/work.html`, `/services.html`, `/studio.html`, `/contact.html`; stronger flagship-studio positioning; deep links from selected work to cases; no disruption to existing motion ownership.
- [ ] Preserve the current homepage motion scripts and 60% shared trigger.
- [ ] Keep one global scroll listener and one global resize listener.
- [ ] Avoid adding layout-heavy effects.

### Task 8: Verification, review and preview release
**Files:** Update `README.md` and any verification fixtures as needed.
- [ ] Run complete `node scripts/verify-site.mjs` and require zero failures.
- [ ] Parse all inline scripts and shared JS.
- [ ] Inspect branch diff for fake proof, dead links, missing files and accidental main-architecture churn.
- [ ] Open PR against `main`.
- [ ] Do not merge while real inquiry delivery and rendered browser QA remain unresolved release blockers.
