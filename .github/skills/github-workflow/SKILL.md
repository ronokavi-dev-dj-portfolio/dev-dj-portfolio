---
name: github-workflow
description: 'Use for GitHub repository setup, Git Bash workflows, branches, commits, pull requests, issues, releases, deployment configuration, and repository hygiene for this portfolio.'
argument-hint: 'Describe the GitHub task to perform.'
---
# GitHub Workflow

Use this skill for repository and GitHub operations. It explains how to move a change from the local Git Bash terminal to a protected `main` branch through a pull request.

## Procedure
1. In the VS Code Git Bash terminal, inspect `git status`, the current branch, package scripts, and contribution documentation.
2. Start from an up-to-date `main` branch and create a feature branch such as `feature/portfolio-about` or `fix/mobile-navigation`.
3. Keep changes focused and describe the user-visible or maintenance outcome.
4. Write an imperative commit message that explains one logical change.
5. Run the narrowest relevant checks and the production build before publishing.
6. Check for secrets, generated output, personal tokens, and unnecessary files.
7. Push the feature branch and open a pull request targeting `main`.
8. Summarize changed files, validation, known limitations, and deployment impact.
9. Merge the pull request after checks pass. This solo repository does not require an approval because the author cannot approve their own pull request.

## Rules
- The `main` branch is protected and can only be changed through a pull request.
- Never push directly to `main`.
- Never bypass branch protection or required checks.
- Do not claim that an approval was given; self-approval is unavailable for the pull-request author.
- Never commit `.env`, credentials, private keys, or generated reports.
- Never rewrite history or force-push without explicit approval.
- Do not claim checks passed unless they were actually run.
- Keep README and deployment instructions synchronized with the project.
