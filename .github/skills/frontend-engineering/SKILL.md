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
5. Verify keyboard behavior, responsive layout, loading states, and reduced motion where relevant.
6. Run a focused check, then `npm run build` or the repository's equivalent.

## Standards
- Prefer typed props and explicit data models.
- Use semantic HTML before adding ARIA.
- Avoid unnecessary dependencies and speculative abstractions.
- Keep visual hierarchy strong without sacrificing readability or performance.
- Use real links for external destinations and descriptive labels for interactive controls.
