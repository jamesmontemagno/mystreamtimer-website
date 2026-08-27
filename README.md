# My Stream Timer Website

Marketing site for [My Stream Timer](https://mystreamtimer.com) — countdown, count-up, and clock
overlays for OBS on macOS and Windows, plus the official Stream Deck plugin.

Built with React 19, TypeScript, Vite, and react-router. Static output deployed to GitHub Pages.

## Local setup

1. Install Node.js 22 LTS and Python 3 (only needed to regenerate assets).
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

## Routes

- `/` — hero, live interactive timer demo, features, OBS setup, screenshots, Stream Deck, automation, Pro, what's new, video
- `/download` — Mac App Store, Microsoft Store, Stream Deck plugin, Pro tiers
- `/streamdeck` — official Stream Deck plugin 2.0
- `/automation` — `mystreamtimer://` command reference and builder
- `/screenshots` — macOS / Windows gallery
- `/support` — troubleshooting and FAQ
- `/privacy`
- `/404`

## Content and assets

- All copy, links, and data live in `src/content/siteContent.ts`.
- `storeLinks.streamDeckPlugin` is `null` until the Elgato Marketplace listing is live; the site shows "Coming soon" everywhere the plugin download appears. Set it to the URL to enable the links.
- Source art lives in `art/`. Run `python scripts/generate-assets.py` (requires Pillow) to regenerate optimized screenshots, favicons, and `public/og-image.png`.

## Deployment

GitHub Actions workflows are included for CI and GitHub Pages deploy from `main`.
