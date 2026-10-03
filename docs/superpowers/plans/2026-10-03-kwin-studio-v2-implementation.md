# Kwin Studio V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the multi-page Kwin Studio V2 flagship-studio website on the existing static Render architecture and verify it before merge.

**Architecture:** Keep `site/` as a static publish directory, but split shared presentation/behavior into `styles.css` and `app.js`. Add directory-based routes for Work, Services, Studio, Contact and three transparent self-initiated case studies. Reuse existing SVG study assets and existing Render deployment topology.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript, existing SVG assets, Node static verification, GitHub, Render.

**Spec:** `docs/superpowers/specs/2026-10-03-kwin-studio-v2-design.md`

## Global Constraints
- Existing `KINZARE/Kwin-Studio` codebase remains source of truth.
- No framework migration without concrete benefit.
- No paid dependencies.
- No fake clients, awards, testimonials, metrics or team size.
- Preview stays `noindex,nofollow` until contact delivery and final production domain gates are cleared.
- Native scroll and `prefers-reduced-motion` are mandatory.
- Mobile first: 320, 375, 390/430, tablet, laptop, desktop.

## Review Focus
- Long headlines at 320px must wrap without horizontal overflow.
- Mobile navigation must trap expected interaction state and close on navigation/Escape.
- Reduced-motion users must see all content without reveal dependencies.
- Contact validation must never imply successful delivery when delivery is unavailable.
- Deep routes must use correct relative asset/link paths and remain refreshable.

---

### Task 1: Verification contract
**Files:** Create `scripts/verify-v2.mjs`.
- [ ] Write static assertions for route existence, semantics, navigation, proof labels, mobile/reduced-motion hooks, metadata and contact honesty.
- [ ] Run before implementation and confirm RED because required files are missing.
- [ ] Keep the verifier dependency-free.

### Task 2: Shared brand and interaction system
**Files:** Create `site/styles.css`, `site/app.js`, `site/favicon.svg`, `site/site.webmanifest`.
- [ ] Implement shared tokens/grid/type/components.
- [ ] Implement accessible mobile navigation, reveal observer, shared homepage scroll frame and reduced-motion fallback.
- [ ] Run verifier and confirm remaining failures are route/content failures only.

### Task 3: Homepage commercial narrative
**Files:** Replace `site/index.html`.
- [ ] Build hero, flagship work, credibility/proof, capabilities, process, case-depth, studio and final CTA.
- [ ] Use large editorial work presentation rather than generic card grids.
- [ ] Mark every concept/self-initiated project honestly.
- [ ] Run verifier.

### Task 4: Multi-page IA and cases
**Files:** Create Work, Services, Studio, three case-study routes and 404.
- [ ] Build editorial Work index.
- [ ] Build outcome-led Services page.
- [ ] Build honest Studio page.
- [ ] Build reusable case-study structure with clear self-initiated labels.
- [ ] Build branded 404.
- [ ] Run verifier.

### Task 5: Contact qualification UX
**Files:** Create `site/contact/index.html`, `site/contact.html` redirect compatibility.
- [ ] Build fields, validation, loading/processing, unavailable/failure guidance and retry-safe behavior.
- [ ] Do not fake send success.
- [ ] Keep a transparent delivery blocker until a verified sender/domain is available.
- [ ] Run verifier.

### Task 6: SEO/release structure
**Files:** Create `site/robots.txt`, `site/sitemap.xml`; update README and verification script as needed.
- [ ] Add canonical/OG metadata on every page.
- [ ] Keep preview noindex policy explicit.
- [ ] Add sitemap/robots and favicon/manifest.
- [ ] Run verifier and syntax checks.

### Task 7: Branch preview and QA
- [ ] Push isolated `feat/kwin-studio-v2` branch.
- [ ] Run GitHub verification on exact branch SHA.
- [ ] Deploy feature branch to temporary Render preview web service if needed.
- [ ] Browser QA Home/Work/cases/Services/Studio/Contact/404 at mobile + desktop.
- [ ] Fix release-blocking findings and re-run checks.
- [ ] Open PR against `main` with exact verification evidence.
- [ ] Do not merge while real contact delivery remains unverified.
