# Dev-DJ Portfolio Guidelines

## Purpose
This is a personal portfolio for a software developer with 17 years of professional experience and a DJ who has performed at parties for the last 2.5 years out of fun, passion, and love of music.

## Stack
- Use Vite, React, TypeScript, semantic HTML, and CSS.
- Use Sass (SCSS) with co-located CSS Modules for component styling.
- Keep bilingual English/Hebrew content in typed data or content models, with RTL support.
- Prefer small, composable components and typed data models.
- Keep content separate from presentation when practical.
- Use the existing package scripts and dependencies before adding new ones.

## Product Direction
- Present both identities as equally credible: software engineering depth and authentic DJ energy.
- Use a distinctive, editorial visual system rather than a generic SaaS template.
- Keep the site fast, responsive, accessible, and easy to scan.
- Never invent employers, clients, venues, achievements, testimonials, or metrics.
- Use placeholders for facts that still need confirmation.

## Engineering Rules
- Preserve existing public APIs and local conventions.
- Do not add dependencies without a clear need.
- Use semantic elements, keyboard support, visible focus states, and meaningful alt text.
- Keep secrets out of source control and use `.env.example` for documented configuration.
- Run the narrowest relevant validation after each change, then verify the production build.

## Git and GitHub Workflow
- Use Git Bash as the preferred VS Code integrated terminal on Windows.
- Start work from an up-to-date `main` branch, then create a feature branch such as `feature/portfolio-about` or `fix/mobile-navigation`.
- Commit focused changes with imperative messages, and inspect `git status` before committing.
- The `main` branch is protected and may only be updated via a pull request.
- Never push directly to `main` under any circumstance.
- Always create or use a feature branch, push it to GitHub, and open a pull request before merging.
- This is a solo repository: an approval is not required, and self-approval is not possible. Merge your own pull request after the relevant checks pass.
- Do not bypass GitHub branch protection or force-push without explicit approval.

## Customization Map
- This file is the always-on project policy for Copilot: product direction, engineering standards, and repository workflow.
- `.github/instructions/*.instructions.md` provides focused guidance for frontend, content, and testing work.
- `.github/skills/*/SKILL.md` provides on-demand procedures for specialized work such as GitHub operations or visual verification.
- `.github/agents/*.agent.md` defines focused implementation roles, including the Portfolio Builder agent.

## Quality Bar
- Check desktop and mobile layouts.
- Avoid layout shifts, inaccessible color contrast, and text that overflows its container.
- Keep animations purposeful and respect `prefers-reduced-motion`.
- Update documentation when commands, structure, or user-facing behavior changes.
