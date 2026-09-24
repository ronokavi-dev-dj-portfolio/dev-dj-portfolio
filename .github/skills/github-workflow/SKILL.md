---
name: github-workflow
description: 'Use for GitHub repository setup, branches, commits, pull requests, issues, releases, deployment configuration, and repository hygiene for this portfolio.'
argument-hint: 'Describe the GitHub task to perform.'
---
# GitHub Workflow

## Procedure
1. Inspect the repository status, current branch, package scripts, and existing contribution documentation.
2. Keep changes focused and describe the user-visible or maintenance outcome.
3. Use clear branch names such as `feature/portfolio-about` or `fix/mobile-navigation`.
4. Write imperative commit messages that explain one logical change.
5. Before a pull request, run the narrowest relevant checks and the production build.
6. Open a pull request for review before any merge into `main`.
7. Check for secrets, generated output, personal tokens, and unnecessary files before publishing.
8. Summarize changed files, validation, known limitations, and deployment impact.

## Rules
- The `main` branch is protected and can only be changed through a pull request.
- Never push directly to `main`.
- Never bypass branch protection, required checks, or review requirements.
- Never commit `.env`, credentials, private keys, or generated reports.
- Never rewrite history or force-push without explicit approval.
- Do not claim checks passed unless they were actually run.
- Keep README and deployment instructions synchronized with the project.
