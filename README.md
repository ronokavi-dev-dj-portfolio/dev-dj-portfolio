# Ron Okavi DJ Portfolio

Personal portfolio for Ron Okavi: software developer by day, DJ by passion. The site is a
bilingual English and Hebrew single-page React application with RTL support, built for free
static hosting on GitHub Pages.

## Stack

- React and TypeScript with Vite
- Sass (SCSS) and CSS Modules
- Typed bilingual content in `src/data/`
- GitHub Actions deployment to GitHub Pages
- No backend, database, or paid hosting requirement

## Project Structure

```text
src/
	components/       # Hero, navigation, about, gallery, videos, contact, and footer
	context/           # Language state, persistence, and RTL direction
	data/              # Typed gallery, video, genre, and testimonial content
	styles/            # Shared Sass variables, mixins, and global styles
public/images/       # Optimized gallery images when real photos are available
.github/             # Copilot instructions, skills, agents, and deployment workflow
.claude/             # Claude-specific content workflow
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in a browser.

Before publishing a change, run:

```bash
npm run build
```

The build produces `dist/`, which is ignored by Git.

## Content

Editable gallery, video, genre, and testimonial content lives in typed files under
`src/data/`. Real photos belong in `public/images/` and should be resized and compressed
before committing. The current gallery, videos, and testimonials contain clearly marked
placeholders until Ron supplies verified material. See [CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md)
for the remaining content to gather.

## Contact Form

The contact form validates its fields and currently falls back to opening the visitor's
email client. A Formspree endpoint can be configured later in
`src/components/Contact/Contact.tsx` if silent form submission is needed.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages after changes
reach `main`. In repository settings, GitHub Pages should use **GitHub Actions** as its
source. The Vite base path is `/dev-dj-portfolio/`; update `vite.config.ts` if the
repository name changes.

## GitHub Workflow

`main` is protected and can only be updated through a pull request. Use Git Bash in VS Code:

```bash
git switch main
git pull --ff-only
git switch -c feature/short-description
# edit and validate
git add .
git commit -m "Describe one focused change"
git push -u origin feature/short-description
```

Open a pull request targeting `main`, then merge it after `npm run build` and any relevant
checks pass. This is a solo repository, so approval is not required and self-approval is
not possible.

See [PROJECT-SPEC.md](PROJECT-SPEC.md) for the product plan and [CLAUDE.md](CLAUDE.md) for
the static-site conventions used by Claude. Copilot guidance lives in
`.github/copilot-instructions.md`, with focused skills and agents under `.github/`.