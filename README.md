# Zoe Conference 2026 — THE BOOK (alternate site concept)

A completely fresh take on the Zoe 2026 site: the whole website is an
**illuminated manuscript**. The book sits closed on a dark desk; scrolling
opens the cover and turns real 3D pages through the story — title page,
the "In the Beginning…" chapter, Pastor Leslie's letter, the speakers as
framed plates, the two days, the rates ledger, the Foundation, Q&A, and a
"Reserve your page" register finale.

**This does not touch the original site** — it lives beside it in
`book-site/` (the original remains in `site/`).

## Pages & behavior
- **Desktop**: open two-page spreads; scroll scrubs each page turn (GSAP ScrollTrigger + Lenis).
- **Mobile** (< 860px): the same book as a single-page "notebook" — one page per turn, merged/condensed content.
- **Reduced motion**: the book is laid flat — every spread rendered as a static section, fully readable.
- **No JS**: a `<noscript>` block carries the essential facts.
- Nav links (Speakers / Details / Rates / FAQs / Register) scroll the book to the right page.

## Before launch — same 2 things as the main site
1. **Registration link** — top of `js/book.js`: `var REGISTER_URL = '';`
   → paste the live URL. All `.js-register` buttons pick it up
   (until then they fall back to emailing zoe@thelifechurch.com).
2. **Pastor Leslie's letter + theme copy** — the letter spread and the
   "Chapter the First" theme page are **draft copy** written to the 2026
   theme (the copy doc notes new letter copy was needed). Have Pastor
   Leslie review before this concept ships anywhere public.

## Accessibility notes
- Only the open spread is keyboard/screen-reader reachable (hidden leaves are `inert`);
  Escape closes the mobile menu; gold text on parchment uses an AA-contrast ink.
- A 3D scroll-scrubbed book can't fully honor browser text-zoom (WCAG 1.4.4) —
  **`?flat=1`** renders the whole book as static, zoom-friendly pages (same layout
  reduced-motion users get). If this concept ships, consider a visible "read as plain
  pages" link in the nav pointing at `?flat=1`.

## Local preview
Any static server, e.g.
`npx http-server "Zoe Conference Main Site/book-site" -p 8124`
No build step. GSAP / ScrollTrigger / Lenis are vendored in `js/`.

## Art (generated with fal.ai · GPT Image 2)
All generated plates live in `art/` — prompts recorded in `art/PROMPTS.md`.
Speaker portraits were composited from the real photos with
`openai/gpt-image-2/edit` (frames painted around them; faces preserved).
Every art file has a CSS gradient fallback, so the site still renders if
a file goes missing.

## Copied assets
- `fonts/` — The Quality Brave, CL Antique No 1, F00044 (from the main site)
- `images/` — title art, Z icon, Pastor Leslie signature, speaker photos
- `js/gsap.min.js`, `js/ScrollTrigger.min.js`, `js/lenis.min.js` — vendored from the main site
