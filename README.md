# My Stream Timer Website

TypeScript-first website rewrite scaffold for My Stream Timer.

## Current status

- Infrastructure and templates are set up.
- Full page content migration is intentionally deferred.
- TypeScript is pinned to prerelease channel for TS7 adoption.

## Local setup

1. Install Node.js 22 LTS.
2. Enable Corepack.
3. Install dependencies and run checks.

```powershell
corepack enable
pnpm install
pnpm run dev
pnpm run lint
pnpm run typecheck
pnpm run build
```

## Routes in template

- /
- /screenshots
- /support
- /privacy
- /404

## Deployment

GitHub Actions workflows are included for CI and GitHub Pages deploy from main.
