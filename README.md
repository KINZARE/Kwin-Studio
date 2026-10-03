# Kwin Studio

Kwin Studio is an independent digital flagship studio website built as a lightweight static multi-page experience.

## Architecture

The existing static architecture is deliberately retained. The public site is served from `site/` on Render. Shared visual and interaction behavior lives in:

- `site/styles.css`
- `site/app.js`

Primary routes:

- `/` — Home
- `/work/` — selected work
- `/work/*` — transparent self-initiated/concept case studies
- `/services/`
- `/studio/`
- `/contact/`
- `/privacy/`
- `/404.html`

## Verification

Run:

```bash
node scripts/verify-site.mjs
```

The verification script checks route coverage, metadata, navigation, responsive/reduced-motion foundations, transparent proof language and the contact preview safety gate.

## Preview release state

The Render preview remains `noindex,nofollow`. The contact form intentionally does not report success until real transactional delivery is connected through a verified sending domain.

Production release blockers:

1. Connect and verify a production sending domain for contact enquiries.
2. Implement server-side/edge delivery with rate limiting, validation and duplicate protection.
3. Run real end-to-end contact delivery testing.
4. Attach the final production domain and replace preview canonicals.
5. Remove preview `noindex,nofollow` only after the production domain is verified.
6. Run browser, accessibility, mobile and performance smoke tests against the live production URL.
