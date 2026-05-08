# AGENTS

Repository guidance for AI coding agents working in this project.

## Scope

- Tech stack: React 19 + TypeScript + Vite.
- Package manager: pnpm (pinned in `package.json`).
- App type: static marketing/site pages with client-side routing.

## Quick Start

Run from repo root:

```powershell
corepack pnpm install
corepack pnpm run dev
corepack pnpm run lint
corepack pnpm run typecheck
corepack pnpm run build
```

Notes:

- Prefer `corepack pnpm ...` in automation for reproducible behavior.
- `build` runs `tsgo -b && vite build`.
- `typecheck` runs `tsgo --noEmit`.

## Source Layout

- `src/main.tsx`: app bootstrap (`BrowserRouter`, global styles).
- `src/routes/AppRoutes.tsx`: all route declarations.
- `src/layouts/SiteLayout.tsx`: global shell (header/nav/footer/theme toggle).
- `src/pages/*.tsx`: route page components.
- `src/content/siteContent.ts`: content/data constants rendered by pages.
- `src/styles/global.css`: shared styling and responsive behavior.

## Project Conventions

- Keep route components in `src/pages` and register new routes in `src/routes/AppRoutes.tsx`.
- Keep reusable/static content in `src/content/siteContent.ts` instead of hardcoding across multiple pages.
- Use existing class naming patterns in `src/styles/global.css`.
- Maintain strict TypeScript compatibility (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- Follow current style: double quotes, semicolons, and named exports for page/layout components.

## Validation Before Finishing

- Run `corepack pnpm run typecheck` for TS correctness.
- Run `corepack pnpm run lint` when changing TS/TSX logic.
- Run `corepack pnpm run build` for changes affecting bundling, routes, or global styles.

## Pitfalls

- Do not switch lockfiles/package manager unless explicitly requested; this repo is pnpm-first.
- If `corepack enable` fails due to permission errors on Windows, use an existing pnpm install or run pnpm through Corepack where available.
- This repository does not currently define a test script; rely on lint, typecheck, and build for validation.

## Existing Docs

- Project overview and setup: [README.md](README.md)