---
name: content-update
description: 'Update website copy and screenshot metadata in src/content/siteContent.ts. Use for text updates, release note edits, command list edits, and screenshot entry maintenance while preserving TypeScript data shapes.'
argument-hint: 'Describe the content change to apply'
user-invocable: true
---

# Content Update Skill

## When to Use

- Updating marketing copy or captions that live in content constants.
- Adding/removing/editing Stream Deck command entries.
- Updating troubleshooting items or release notes.
- Editing screenshot metadata (`src`, `alt`, `caption`) in a type-safe way.

## Primary Files

- [src/content/siteContent.ts](../../../src/content/siteContent.ts): source of truth for most rendered text/content arrays.
- [src/pages/HomePage.tsx](../../../src/pages/HomePage.tsx): consumes content collections for homepage sections.
- [src/pages/ScreenshotsPage.tsx](../../../src/pages/ScreenshotsPage.tsx): consumes screenshot entries for gallery/lightbox.

## Procedure

1. Read the target section in [src/content/siteContent.ts](../../../src/content/siteContent.ts).
2. Preserve existing exported types and property names.
3. Apply the requested content changes with minimal structural edits.
4. Confirm impacted pages still align with the updated content shape.
5. Run validation commands:

```powershell
corepack pnpm run typecheck
corepack pnpm run build
```

## Guardrails

- Do not rename exported constants unless explicitly requested.
- Keep `alt` text descriptive and specific for accessibility.
- Avoid introducing duplicate entries in command and screenshot arrays.
- Keep edits focused on content data; avoid unrelated UI refactors.