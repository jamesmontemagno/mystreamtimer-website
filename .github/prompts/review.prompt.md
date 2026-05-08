---
name: Website PR Readiness Review
description: "Use to review changes before opening a PR on this website. Focus on regressions, accessibility, route integrity, and required validation commands."
argument-hint: "Scope or files to review (optional)"
agent: "agent"
---

Review the current workspace changes for PR readiness.

Prioritize findings in this order:
1. Functional regressions and route/navigation issues.
2. Accessibility regressions (keyboard behavior, semantics, alt/aria usage).
3. Styling/layout regressions across desktop and mobile breakpoints.
4. Type safety and lint concerns.

Expectations for this repository:
- Routes are defined in [src/routes/AppRoutes.tsx](../../src/routes/AppRoutes.tsx).
- Shared site shell behavior is in [src/layouts/SiteLayout.tsx](../../src/layouts/SiteLayout.tsx).
- Reusable content should remain centralized in [src/content/siteContent.ts](../../src/content/siteContent.ts).
- Global styles and tokens are in [src/styles/global.css](../../src/styles/global.css).

Run and report these commands when possible:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build
```

Output format:
- Findings first, ordered by severity, with clickable file references.
- Then open questions/assumptions.
- Then a brief change summary.
- If no findings, say that explicitly and note any validation gaps.