---
name: update-site-content
description: Use this skill whenever Ron wants to add or update content on his DJ portfolio site — new gig photos, a new testimonial, a new video link, updated bio text, or genre/service list changes. Trigger on phrases like "add these photos from the wedding", "add a testimonial from X", "update my bio", "add this video", or any request to change what's shown on the live site. This skill keeps the repo's data files correctly typed, keeps images optimized/lean, verifies the build succeeds, and gets the change live via git push — do not hand-edit data files without following these steps.
---

# Update Site Content

Ron's site is fully static: structural records live in typed data files under `src/data/`,
all wording lives in paired react-i18next resources under `src/i18n/locales/en/` and
`src/i18n/locales/he/`, and images live under `public/images/`. There is no CMS or admin
panel — every content change is a small, safe code change that gets committed and pushed,
which triggers GitHub Actions to redeploy automatically.

## Step 1 — Identify what's being added
Ask (if not already clear from the request):
- Gallery photo(s)? → `src/data/gallery.ts`, both `gallery.json` locale files, and `public/images/`
- Testimonial? → `src/data/testimonials.ts` and both `testimonials.json` locale files
- Video link? → `src/data/videos.ts` and both `videos.json` locale files
- Bio/about text? → the matching key in both `about.json` locale files
- Genre list? → `src/data/genres.ts` plus matching keys in both `about.json` locale files

## Step 2 — Optimize images (gallery photos only)
Never commit a raw phone photo. Before adding to `public/images/`:
- Resize so the longest edge is ~1600px max (plenty for a web gallery)
- Convert to WebP if possible, target under ~300KB per image
- If ImageMagick is available: `magick input.jpg -resize 1600x1600\> -quality 82 output.webp`
- Use a clear, consistent filename: `gig-2026-06-wedding-01.webp` (event context + number)

## Step 3 — Add the structural entry and paired copy
Read the current data file and both matching locale files first. Add a stable translation key
to the structural record, then add its English and Hebrew wording at that same key. Example
shapes (the current source remains authoritative):

```ts
// src/data/gallery.ts
{ id: "gig-2026-06-wedding-01", src: "/images/gig-2026-06-wedding-01.webp",
  altKey: "items.weddingJune2026.alt", glow: "rgba(...)" }

// src/data/testimonials.ts
{ id: "t-2026-06", quoteKey: "items.weddingJune2026.quote",
  whoKey: "items.weddingJune2026.who" }

// src/data/videos.ts
{ id: "v-2026-06", titleKey: "items.weddingJune2026.title",
  youtubeId: "..." }
```
The site is bilingual (English + Hebrew) — **every user-facing key must exist in both matching
locale namespace files.** Do not put wording in `src/data/` or inline in a component. If a
Hebrew translation isn't provided by Ron, ask for it or flag it clearly rather than leaving
it blank or duplicating the English text as a placeholder. If the actual files differ from
these examples, match their real interfaces.

## Step 4 — Verify before opening a pull request
Always run, in order:
1. `npm test` — translated behavior and resources must remain green
2. `npm run build` — must succeed with no errors and catches invalid translation keys
3. `npm run dev` — spot-check both languages, especially at mobile width
   (~375px), since that's most visitors

Never skip this. A broken build merged into `main` takes the live site down until fixed.

## Step 5 — Commit and publish through a pull request
- Use a clear, specific commit message: `content: add wedding gallery photos (June 2026)`,
  not `update`
- Create a feature branch, push it, and open a pull request targeting `main`.
- Do not push directly to `main`; the branch is protected and the repository owner cannot
  approve their own pull request. Merge the PR after the relevant checks pass.
- GitHub Actions will build and deploy automatically after the PR reaches `main`. Tell Ron
  roughly how long deployment takes (typically 1-3 minutes) and where to check it (the
  Actions tab of the repo, and then the live URL)

## What NOT to do
- Don't add new fields/structures to the data files without checking the component that
  renders them still handles the shape correctly
- Don't commit unoptimized images — this is a zero-cost static repo; keep it lean
- Don't push directly to `main`; publish changes through a feature branch and pull request.
- Don't push directly if `npm run build` fails — fix it first
