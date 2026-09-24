---
description: "Use when adding tests, debugging regressions, validating builds, or verifying the portfolio in a browser."
name: "Portfolio Testing"
applyTo: ["src/**/*.ts", "src/**/*.tsx", "tests/**", "playwright.config.*"]
---
# Testing Instructions

- Start with the smallest test or validation command covering the changed behavior.
- Test user-visible behavior rather than implementation details.
- Cover navigation, external links, responsive layout, keyboard interaction, and reduced motion when relevant.
- For this Vite app, run `npm run build` after focused checks; keep `package-lock.json` synchronized with `package.json`.
- Run the production build before considering a frontend change complete.
- For visual changes, verify at mobile and desktop viewport sizes and check for overflow.
- Verify both English LTR and Hebrew RTL states when changing bilingual UI.
- Never commit screenshots, test reports, credentials, or generated build output.
