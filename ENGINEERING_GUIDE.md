# ENGINEERING_GUIDE.md

Technical standards for WPM.OS.

## Naming

- Components: `PascalCase.tsx`.
- Hooks: `useThing.ts`.
- Static data: domain nouns in `src/data`, exported with typed interfaces.
- Utilities: small pure functions in `src/lib`.
- Avoid vague names like `Box`, `Thing`, `NewComponent`, or one-off suffixes.

## Components

- Keep page files as composition and routing glue.
- Extract repeated UI into `src/components/ui`.
- Keep console-specific behavior in `src/components/console`.
- Keep boot/transition behavior in `src/components/boot` and `src/components/motion`.
- Prefer Server Components unless client state, browser APIs, or animation hooks require `"use client"`.
- Keep route-level error states in `src/app/not-found.tsx`, `src/app/error.tsx`, and `src/app/global-error.tsx`.
- Split large client surfaces before they mix routing, chrome, repeated cards, and interaction state in one file.

## Styling

- Use Tailwind tokens from `src/app/globals.css`.
- Add new colors, shadows, motion timings, or z-index values as tokens before repeating one-off values.
- Preserve the dark console identity, but do not let low opacity text break contrast.
- Use `wpm-lavender` for readable purple-family text; keep `wpm-purple` primarily for borders, glows, backgrounds, and focus accents.
- No nested decorative cards. Use cards for repeated items, panels, and framed tools only.

## Motion And Effects

- Motion must clarify state, transition, or narrative.
- Respect `prefers-reduced-motion` for all animated loops, transitions, WebGL, and custom cursor behavior.
- Keep WebGL lazy and fallback-first. Do not load 3D during the first meaningful screen unless explicitly approved.
- Keep CSS fallbacks in modules that do not import Three/R3F.
- Audio must be opt-in and user-controlled.

## Static Data

- Portfolio facts live in `src/data/profile.ts` and `src/data/projects.ts`.
- Do not bury project facts in JSX when they belong to data.
- Public contact links must be real before public deploy.
- If no public email has been approved, omit mailto links instead of publishing placeholders.

## Accessibility

- Each route needs one useful `h1`.
- Use real buttons and links for actions and navigation.
- Keep focus visible and trapped in drawers/panels.
- Avoid disabled controls without context. Explain locked/coming-soon states where possible.
- Keep mobile pages navigable without keyboard-only affordances by preserving a visible `Back` route.
- Validate keyboard flow manually before launch.

## Performance

- Run `npm run build` before claiming production readiness.
- Run `npm run build:github-pages` before claiming the GitHub Pages static target is ready.
- Watch `.next/static/chunks` and public asset sizes after adding media/effects.
- Use `next/image` for real images and provide accurate `sizes`.
- Keep source media separate from rendered media. Prefer committed WebP/JPG variants for portfolio UI and OG cards.
- Add `generateStaticParams` for static local project data.
- Do not install large libraries when CSS or an existing helper is enough.

## Deployment

- Keep deploy decisions aligned with `docs/AVAILABLE_SERVICES.md`.
- Use `NEXT_PUBLIC_DEPLOY_TARGET=github-pages` only for the static export path.
- Keep public asset URLs behind `publicAssetPath()` when rendered with `next/image`.
- Do not add or activate deployment workflows without explicit approval.

## Security

- `.env*` stays ignored.
- Never commit secrets, tokens, API keys, or private keys.
- Avoid `dangerouslySetInnerHTML`; if unavoidable, document why and sanitize.
- Do not run `npm audit fix --force` without explicit risk review.
- Keep `.github/dependabot.yml` aligned with the package manager actually used by the repo.
- CSP changes must be validated against Next.js runtime requirements.

## Validation

Minimum for code changes:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=low
```

For rendered UI changes, also run:

```bash
npm run test:e2e
```

The E2E suite uses the local Chrome channel through Playwright. If that browser is unavailable, record the gap instead of pretending visual QA happened.
