---
name: visual-verification
description: 'Use for browser verification, responsive screenshots, interaction checks, accessibility review, layout regressions, and polished visual QA of the portfolio.'
argument-hint: 'Describe the page or interaction to verify.'
---
# Visual Verification

## Procedure
1. Start the Vite development server using the repository's documented command.
2. Check the main route at a narrow mobile viewport and a desktop viewport.
3. Verify the language toggle, navigation, external links, hover and focus states, media loading, and any motion.
4. Look for horizontal overflow, clipped text, layout shifts, unreadable contrast, and overlapping content.
5. Check both English LTR and Hebrew RTL states, including long labels and form validation.
6. Confirm `prefers-reduced-motion` behavior when animation exists.
7. Record failures with the viewport, route, reproduction steps, and expected result.

## Completion Criteria
- The first viewport communicates both the developer and DJ identities.
- All important content remains usable without a mouse.
- Responsive layouts do not depend on accidental wrapping.
- Console errors and broken asset requests are investigated.
