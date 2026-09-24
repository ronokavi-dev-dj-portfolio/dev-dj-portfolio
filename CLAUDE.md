# Build Instructions — Ron's DJ Portfolio Site

These are the working conventions for building this repo, whether by Claude (chat, Claude
Code) or a human contributor. Read PROJECT-SPEC.md first for the full architecture and page
structure.

## Ground rules
- **Zero recurring cost is a hard constraint.** Don't introduce paid services, databases, or
  server hosting. If a feature seems to need one, find the free/static alternative first and
  flag it to Ron before adding anything with a cost.
- **Static-first.** The whole site is static files served from GitHub Pages. No backend
  process should be introduced without explicit sign-off from Ron.
- **Keep the repo lean.** Compress images before committing (target: under ~300KB each,
  WebP where possible). Don't commit raw/unoptimized phone photos.

## Tech conventions
- React + TypeScript, functional components + hooks only (no class components)
- Vite as the build tool
- Sass (SCSS) + CSS Modules for styling — one `Component.module.scss` co-located per
  component, no CSS-in-JS libraries
- Shared design tokens (colors, spacing, breakpoints) live once in `src/styles/_variables.scss`
  as CSS custom properties — components consume the variables, never hardcode a color or
  spacing value
- Responsive by default, mobile-first: base styles target mobile, then enhance upward with
  breakpoint mixins from `src/styles/_mixins.scss`. Prefer `clamp()` for fluid type/spacing
  over hard breakpoint jumps wherever it fits. Use container queries for components whose
  layout should respond to their own container rather than the viewport (e.g. a testimonial
  card that might sit in different width contexts)
- Test every component at three widths minimum: ~375px (mobile), ~768px (tablet), ~1440px
  (desktop) before calling a section done
- Content (testimonials, gallery items, video links) lives in typed data files under
  `src/data/`, never hardcoded inline in components — this is what lets Ron update content
  by editing one file and pushing, no code changes needed
- Mobile-first responsive design — most visitors will be on a phone checking Ron out before
  a booking, this has to look great small

## Bilingual content (English + Hebrew)
- Every user-facing string must exist in both languages — never hardcode English-only text
  or leave a Hebrew field empty "for later"
- Store text as `{ en, he }` pairs in the typed data files, not as two duplicate components
- Use CSS logical properties (`margin-inline-start/end`, `padding-inline-*`, `text-align: start`)
  instead of physical `left`/`right` so layout correctly mirrors in RTL without extra
  RTL-specific stylesheets
- Test every new component in **both** directions (`dir="ltr"` and `dir="rtl"`) before calling
  it done — a layout that only works in one direction isn't finished
- Don't assume Hebrew text length matches English — check that buttons, nav labels, and cards
  don't break or truncate awkwardly in either language

## Deployment
- GitHub Actions workflow builds on every push to `main` and deploys to GitHub Pages
- `main` should always be in a deployable state — use feature branches / PRs for anything
  experimental

## Definition of done for each phase
- Scaffold: `npm run dev` runs locally, `npm run build` produces a working `dist/`, deploy
  workflow succeeds and the placeholder site is live at the GitHub Pages URL
- Content pass: every section in PROJECT-SPEC.md's "Site structure" is populated with real
  content from CONTENT-CHECKLIST.md — no lorem ipsum left
- Contact form: a real test submission arrives at Ron's email/WhatsApp via Formspree
- Polish: Lighthouse/basic check — reasonable performance, correct page title, meta
  description, favicon, and Open Graph tags for link previews when shared

## What NOT to do without asking Ron first
- Don't add a CMS, admin panel, login system, or database
- Don't add paid image/video hosting
- Don't self-host video or audio files in the repo
- Don't add analytics/tracking beyond something free and privacy-respecting (if at all) —
  confirm with Ron first
