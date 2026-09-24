# Ron — DJ Portfolio Website — Project Spec

## Goal
A personal site for Ron (software developer, 17 yrs, DJ for 2.5 yrs) to present himself to
potential clients/event organizers and get booked. Story-driven: "developer by trade, DJ by
passion" — credibility + personality.

## Architecture (zero recurring cost)
- **Frontend:** React + TypeScript, built with Vite
- **Styling:** Sass (SCSS) + CSS Modules for scoped component styles, using modern CSS
  (custom properties, `clamp()` fluid sizing, Grid/Flexbox, container queries) for a fully
  responsive layout across mobile/tablet/desktop
- **Hosting:** GitHub Pages (free), deployed automatically via GitHub Actions on push to `main`
- **Contact form:** Formspree free tier (50 submissions/month) — posts directly from the
  frontend, no backend/server needed. Submissions are delivered to **ronokavi@gmail.com**.
  Client-side validation required for name, reply-to email/phone, event date, and event type
  before submission. The event message is optional, while malformed contact details are rejected.
- **Images:** compressed, stored in repo under `/public/images` (~20-40 photos is a trivial
  footprint for a git repo)
- **Videos:** never self-hosted — embedded via YouTube/Instagram iframes
- **Testimonials:** stored as static structured data (`/src/data/testimonials.ts`), edited
  and committed by Ron directly — no database, no admin panel
- **Domain:** `<username>.github.io` to start; a custom domain can be pointed at GitHub Pages
  later for a few $/year if desired (not required)

No server, no database, no paid tier of anything. The whole site is static files.

## Internationalization — English + Hebrew
The site supports **both English and Hebrew**, with a language toggle in the nav bar.
- **No backend, no separate build per language** — stays a single static site, zero extra cost
- **Content:** every piece of user-facing text (bio, genres, testimonials, nav labels, form
  labels) is stored as a bilingual pair, e.g. `{ en: "...", he: "..." }`, in the data files —
  not as two separate copies of the site
- **Direction:** Hebrew is RTL. The toggle switches `dir="rtl"`/`dir="ltr"` on `<html>` and
  swaps the active language. CSS uses logical properties (`margin-inline-start`, not
  `margin-left`) so layout mirrors correctly without duplicate RTL stylesheets
- **Persistence:** the chosen language is remembered (localStorage) so returning visitors see
  their last choice; default language falls back to the browser's locale on first visit
- **Fonts:** pick a font family with solid Hebrew glyph coverage (e.g. a Google Font like
  "Heebo" or "Assistant" for Hebrew, paired with a clean Latin font for English) — verify
  Hebrew doesn't fall back to a generic serif
- **SEO note:** for a v1, a single URL with a client-side toggle is fine and keeps things
  simple. If Hebrew/English search visibility becomes important later, this can evolve into
  separate routes (`/en`, `/he`) — not needed now

## Site structure (single-page, sectioned, with smooth scroll nav)
1. **Hero** — name, tagline ("Software Developer by day, DJ by passion"), CTA button to Contact
2. **About** — Ron's story: the dev background, why he started DJing, what drives him
3. **Services / Genres** — what kind of events he plays, genre range, what makes him reliable
   (his dev background = detail-oriented, organized, tech-savvy with equipment)
4. **Gallery** — photo grid from past gigs
5. **Videos** — embedded highlight reels / mix samples (YouTube/Instagram)
6. **Testimonials** — quotes from past clients, name + event type
7. **Contact** — Formspree-powered form (name, calendar date, event type, optional message) +
   direct links (WhatsApp/Instagram/email)
8. **Footer** — social links, copyright

## Repo structure (proposed)
```
ron-dj-site/
├── .github/workflows/deploy.yml   # GitHub Actions → build & deploy to Pages
├── public/
│   └── images/                    # optimized gallery photos
├── src/
│   ├── components/                # Hero, About, Gallery, Testimonials, Contact, etc.
│   │   └── Hero/
│   │       ├── Hero.tsx
│   │       └── Hero.module.scss    # co-located, scoped styles per component
│   ├── styles/
│   │   ├── _variables.scss         # colors, spacing scale, breakpoints as CSS custom props
│   │   ├── _mixins.scss            # responsive breakpoint mixins
│   │   └── global.scss             # resets, base typography, fonts
│   ├── data/
│   │   ├── testimonials.ts
│   │   ├── gallery.ts
│   │   └── videos.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Build phases
1. Scaffold repo (Vite + React + TS + Sass/CSS Modules), GitHub Actions deploy pipeline
2. Static layout + navigation, no real content (placeholders)
3. Wire in real content: bio, photos, videos, testimonials (see CONTENT-CHECKLIST.md)
4. Contact form via Formspree
5. Polish: responsive check, image optimization, SEO basics (title, meta, favicon, OG tags)
6. Deploy, test on mobile, share the link

## Non-goals (for now, to keep cost/complexity at zero)
- No CMS or admin dashboard
- No user accounts/login
- No booking calendar/payments
- No self-hosted video/audio streaming
