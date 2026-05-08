---
name: Frontend Website Guidelines
description: "Use when editing React pages, routes, layout components, or global CSS in this website. Covers accessibility, content structure, and validation commands."
applyTo: ["src/**/*.tsx", "src/**/*.ts", "src/styles/**/*.css"]
---

# Frontend Website Guidelines

## Project Patterns

- Keep route declarations in [src/routes/AppRoutes.tsx](../../src/routes/AppRoutes.tsx).
- Keep app shell logic in [src/layouts/SiteLayout.tsx](../../src/layouts/SiteLayout.tsx).
- Keep route-level UI in `src/pages/*.tsx`.
- Keep reusable page content constants in [src/content/siteContent.ts](../../src/content/siteContent.ts) instead of duplicating strings in many components.
- Reuse existing CSS classes and variables from [src/styles/global.css](../../src/styles/global.css) before introducing new tokens.

## React and TypeScript

- Follow strict TypeScript patterns already used by the project (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- Prefer clear, typed local state and event handlers.
- Use named exports for pages/layouts and keep module structure consistent with existing files.

## Accessibility and UX

- Interactive elements must be keyboard accessible (`button` for click actions, focus styles, Escape handling for dialogs when applicable).
- Provide descriptive `alt` text for images and meaningful `aria-label` values when needed.
- Preserve mobile behavior for breakpoints already implemented in [src/styles/global.css](../../src/styles/global.css).

## Validation

When you modify frontend code, run:

```powershell
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build
```

If one cannot be run, explicitly report that gap in the final response.