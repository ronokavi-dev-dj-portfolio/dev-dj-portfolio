---
description: "Use when creating or changing React, TypeScript, HTML, CSS, responsive layouts, components, or visual interactions in the portfolio."
name: "Portfolio Frontend"
applyTo: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.html", "src/**/*.css", "src/**/*.scss", "src/i18n/locales/**/*.json"]
---
# Frontend Instructions

- Follow the existing component and styling patterns before introducing abstractions.
- Keep components focused and move repeated content into typed data.
- Use react-i18next `useTranslation()` with an explicit feature namespace for user-facing text; use `<Trans>` only when translated copy contains component markup.
- Use `useSiteLanguage()` only for language toggles or direction-sensitive behavior. Keep document language, direction, metadata, and persistence in `LanguageEffects`.
- Keep locale files paired by namespace and key. Do not hardcode display text or restore `{ en, he }` component/data objects.
- Use the repository's Sass (SCSS) and CSS Modules architecture; keep component styles co-located.
- Use semantic HTML landmarks and heading hierarchy.
- Design from small screens upward and test at mobile and desktop widths.
- Test both English LTR and Hebrew RTL layouts; use CSS logical properties for mirrored spacing and alignment.
- Provide keyboard access, visible focus, reduced-motion behavior, and sufficient contrast.
- Use stable dimensions for buttons, cards, grids, media, and navigation to prevent layout shift.
- Do not use placeholder copy that implies real career facts.
