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
6. Check for secrets, generated output, personal tokens, and unnecessary files before publishing.
7. Summarize changed files, validation, known limitations, and deployment impact.

## Rules
- Never commit `.env`, credentials, private keys, or generated reports.
- Never rewrite history or force-push without explicit approval.
- Do not claim checks passed unless they were actually run.
- Keep README and deployment instructions synchronized with the project.
