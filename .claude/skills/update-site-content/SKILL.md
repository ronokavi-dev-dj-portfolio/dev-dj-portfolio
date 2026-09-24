---
name: update-site-content
description: Use this skill whenever Ron wants to add or update content on his DJ portfolio site — new gig photos, a new testimonial, a new video link, updated bio text, or genre/service list changes. Trigger on phrases like "add these photos from the wedding", "add a testimonial from X", "update my bio", "add this video", or any request to change what's shown on the live site. This skill keeps the repo's data files correctly typed, keeps images optimized/lean, verifies the build succeeds, and gets the change live via git push — do not hand-edit data files without following these steps.
---

# Update Site Content

Ron's site is fully static: all editable content lives in typed data files under `src/data/`,
and images live under `public/images/`. There is no CMS or admin panel — every content change
is a small, safe code change that gets committed and pushed, which triggers GitHub Actions to
redeploy automatically. This skill is the repeatable, safe path for making that change.

## Step 1 — Identify what's being added
Ask (if not already clear from the request):
- Gallery photo(s)? → goes to `src/data/gallery.ts` + `public/images/`
- Testimonial? → goes to `src/data/testimonials.ts`
- Video link? → goes to `src/data/videos.ts`
- Bio/about text or genre list? → lives directly in the `About`/`Services` component — edit
  the text content in place there

## Step 2 — Optimize images (gallery photos only)
Never commit a raw phone photo. Before adding to `public/images/`:
- Resize so the longest edge is ~1600px max (plenty for a web gallery)
- Convert to WebP if possible, target under ~300KB per image
- If ImageMagick is available: `magick input.jpg -resize 1600x1600\> -quality 82 output.webp`
- Use a clear, consistent filename: `gig-2026-06-wedding-01.webp` (event context + number)

## Step 3 — Add the typed entry
Match the existing shape in the data file exactly — don't invent new fields. Example shapes:

```ts
// src/data/gallery.ts
{ id: "gig-2026-06-wedding-01", src: "/images/gig-2026-06-wedding-01.webp",
  alt: { en: "...", he: "..." } }

// src/data/testimonials.ts
{ id: "t-2026-06", name: "Dana K.",
  event: { en: "Wedding, June 2026", he: "חתונה, יוני 2026" },
  quote: { en: "...", he: "..." } }

// src/data/videos.ts
{ id: "v-2026-06", title: { en: "...", he: "..." },
  youtubeUrl: "https://youtube.com/watch?v=..." }
```
The site is bilingual (English + Hebrew) — **every text field is an `{ en, he }` pair, never
a single string.** If a Hebrew translation isn't provided by Ron, ask for it or flag it
clearly rather than leaving it blank or duplicating the English text as a placeholder.
If the actual files differ from this shape (they will evolve during the build), read the
existing file first and match its real interface — this is illustrative, not authoritative.

## Step 4 — Verify before opening a pull request
Always run, in order:
1. `npm run build` — must succeed with no errors
2. `npm run dev` — spot-check the new content renders correctly, especially at mobile width
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
