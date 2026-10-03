# Kwin Studio V2 Design Spec

## Intent
Turn the current motion-led Kwin Studio preview into a selective independent digital flagship studio presence that can credibly support serious strategic, design and build engagements. The transformation must improve clarity, proof, trust and conversion without discarding the recognisable Portal V2 DNA.

## Audience and buying questions
Primary audience: founders, CEOs, CMOs, marketing/brand/digital directors and product leadership at established companies, scale-ups and premium challenger brands. The site must answer quickly: does Kwin Studio understand the business, can it make something distinctive, can it execute technically, can it be trusted with an important launch, and is the engagement worth serious investment?

## Positioning
Category: Independent Digital Flagship Studio.
Differentiating truth: strategy and craft live in the same room. The same core thinking continues through positioning → UX → visual system → interaction → implementation.
Brand promise: We turn ambitious brands into unmistakable digital experiences.
Character: intelligent, confident, selective, contemporary, experimental, precise, cultured, technically sophisticated, understated and human.
Avoid: cheap web design, generic agency language, gaming/cyberpunk cues, generic AI aesthetics, fake luxury, corporate-consulting tone and decorative technology.

## Brand System V2
- Logo: evolve the existing typographic wordmark; do not invent a generic K icon.
- Type: restrained editorial grotesk system with fluid responsive scale, readable body sizes and disciplined weights.
- Color: carbon/ink base; warm off-white editorial counter-environment; acid yellow-green used as scarce highlighter/interaction signal.
- Grid: 12-column desktop foundation, rational reduced mobile grid, purposeful asymmetry only where it improves hierarchy.
- Imagery: actual interface/work proof first; context second; Kwin studio graphics third.
- Iconography: minimal and functional only.
- Motion: hierarchy, state, spatial relationship and storytelling; native scroll; transform/opacity preference; no scroll hijacking; reduced-motion parity.

## Information architecture
Primary routes:
- `/` Home
- `/work.html` Work
- `/work/atelier.html` Concept case study
- `/work/signal.html` Concept case study
- `/services.html` Services
- `/studio.html` Studio
- `/contact.html` Contact
- `/404.html` Branded 404

Insights is explicitly deferred until real content exists.

## Homepage
Preserve the strongest current hero/spatial system, selected-direction visuals and motion ownership. Reframe the commercial story around flagship digital work. Primary navigation must point to the real routes. Work previews should deep-link to cases. Keep one dominant CTA: Start a project.

## Work and case studies
Work is an editorial index, not a generic card grid. Until real commercial client proof is available, current studies are labelled clearly as self-initiated concept work. Case pages use: opening → challenge → context → strategy → design system → experience → build → responsive → outcome/context → next project. Do not fabricate performance metrics or testimonials.

## Services
Outcome-led categories:
1. Flagship Websites
2. Brand-to-Digital
3. Interactive Experiences
4. Digital Repositioning
Each explains who it is for, the problem, typical scope, output and process. Tool lists are secondary.

## Studio
Own the independent senior-studio model. Explain philosophy, senior involvement, selective project model, quality principles, collaboration and capabilities. Never imply a larger team than exists.

## Contact
Fields: Name, Email, Company, Website, what are you looking to create, what needs to change, approximate investment, preferred timing. Budget bands: €10k–€25k / €25k–€50k / €50k–€100k / €100k+ / Not sure yet. States: validation, processing, success, failure, retry and duplicate-submit protection. Until a secure real mail endpoint exists, success must not be simulated.

## Accessibility and responsive quality
Target practical WCAG AA. Semantic structure, skip link, visible focus, keyboard navigation, input labels, clear errors, reduced motion and touch targets are mandatory. Validate 320, 375, 390/430, tablet, laptop and large desktop. No horizontal overflow.

## Performance
Keep the static architecture and current motion coordinator unless evidence justifies change. Aim toward LCP <2.5s, CLS <0.1 and INP <200ms. Do not hide load problems behind the loader. Heavy visual systems must degrade cleanly on mobile.

## SEO and release
Every route gets unique title/description, canonical-ready structure, OG metadata and semantic headings. Add robots, sitemap, favicon/manifest-ready foundations and structured-data-ready markup where useful. Preview remains noindex until production domain and inquiry delivery are complete.

## Release blockers
No merge-to-production declaration while any of these remain: dead primary route, broken mobile navigation, fake inquiry success, significant overflow, inaccessible nav/form, console/runtime errors, severe performance regression, missing case route, production/preview mismatch, or unverified real contact delivery.
