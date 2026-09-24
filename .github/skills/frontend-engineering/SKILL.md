---
name: frontend-engineering
description: 'Use for React, TypeScript, Vite, semantic HTML, CSS architecture, responsive behavior, accessibility, performance, and maintainable portfolio UI.'
argument-hint: 'Describe the frontend feature or defect.'
---
# Frontend Engineering

## Procedure
1. Identify the component or route that owns the behavior.
2. Read nearby types, styles, content data, and existing tests before editing.
3. Make the smallest coherent change using the current stack.
4. Keep state local unless the behavior is genuinely shared.
5. Preserve the Sass and CSS Modules architecture, using shared tokens from `src/styles/`.
6. Pass explicit props only for local component contracts; avoid prop drilling and do not lift state without a shared behavior requirement.
7. Stabilize shared context values and callbacks when they would otherwise notify consumers on unrelated parent renders; do not add memoization without a measured or clear identity problem.
8. Verify keyboard behavior, responsive layout, loading states, reduced motion, and both LTR/RTL directions where relevant.
9. Confirm client-side interactions update state without unnecessary full-page navigation or refresh.
10. Run a focused check, then `npm run build` or the repository's equivalent.

## Standards
- Prefer typed props and explicit data models.
- Prefer `type` aliases for object shapes, props, state, and data models; use `interface` only when declaration merging or interface extension is specifically useful.
- Use descriptive names that reveal intent: prefer `translate`, `language`, `videoItem`, and `openItemId` over opaque names such as `t`, `lang`, `v`, or `openIndex`.
- Prefer UUID v4 identifiers for dynamic or data-backed records and use those IDs for React keys and selected-item state; do not use array indexes as identity.
- Use semantic HTML before adding ARIA.
- Avoid unnecessary dependencies and speculative abstractions.
- Keep visual hierarchy strong without sacrificing readability or performance.
- Use real links for external destinations and descriptive labels for interactive controls.
