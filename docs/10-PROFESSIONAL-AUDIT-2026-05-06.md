# 10 - Professional Audit 2026-05-06

Audit based on `/home/acewallthemac/Documentos/auditoriagpt55deepthinking.md`.

## Safe State

- Baseline commit: `cc5452d baseline antes da auditoria geral`.
- Audit branch: `audit/professional-quality-pass`.
- Initial dirty state was preserved instead of reverted.

## Commands Run

```bash
git status --short --branch
npm run lint
npm run typecheck
npm run build
npm run build:github-pages
npm audit --audit-level=low
npm run test:e2e
npm ls --depth=0
npx --yes lighthouse@latest local production routes
curl route/header smoke tests on http://127.0.0.1:3010
static export smoke tests on http://127.0.0.1:3011/wpm-portfolio/
```

Results:
- `lint`: pass.
- `typecheck`: pass.
- `build`: pass; initial build generated 14 app routes; final build generated 16 static pages after project details moved to SSG.
- `build:github-pages`: pass; static export generated `out/` with `/wpm-portfolio` base path.
- `npm audit`: initially found 2 moderate findings through `next -> postcss`; fixed with a controlled `postcss` override, not `--force`.
- `test:e2e`: pass; 10 Playwright tests on desktop Chrome and mobile Chrome.
- `npm ls --depth=0`: pass with no extraneous root packages after local cleanup.
- Lighthouse final:
  - `/` mobile default: Performance 91, Accessibility 100, Best Practices 100, SEO 100; LCP 2.1s, CLS 0, TBT 340ms.
  - `/console` desktop: Performance 97, Accessibility 94, Best Practices 100, SEO 100; LCP 1.1s, CLS 0, TBT 70ms.
  - `/console` mobile default: Performance 75, Accessibility 94, Best Practices 100, SEO 100; LCP 4.2s, CLS 0, TBT 450ms.
- Route smoke: `/`, `/console`, project pages, content pages, `robots.txt`, and `sitemap.xml` returned 200 locally.
- Static export smoke: `/wpm-portfolio/`, `/console/`, `/projects/`, `/projects/livro-llm-agentes/`, cover image, `robots.txt`, and `sitemap.xml` returned 200 through a local static server.

## Findings Matrix

| ID | Severity | Category | Evidence | Impact | Status |
|---|---|---|---|---|---|
| AUD-001 | Alta | SEO/deploy URLs | `src/lib/site.ts` used `new URL(path, SITE_URL)`, and `curl /sitemap.xml` emitted root URLs without `/wpm-portfolio`. | Crawlers and social metadata can point to wrong production paths. | Fixed in first block. |
| AUD-002 | Alta | Dependencies | `npm audit --audit-level=low` reported vulnerable `postcss` under `next`; `npm audit fix --force` would downgrade Next. | Supply-chain risk and unsafe automatic fix path. | Fixed with npm override to `postcss@8.5.14`. |
| AUD-003 | Alta | Deploy strategy | Docs/default URL imply GitHub Pages project path, but `next.config.ts` had no `output: "export"`, `basePath`, or deploy workflow. | Public deploy may work only on a Node host/Vercel-style platform, not plain GitHub Pages project hosting. | Fixed locally. Activation still requires approval. |
| AUD-004 | Media | Project SEO | `src/app/projects/[slug]/page.tsx` had no project-specific metadata and no `generateStaticParams`. | Project pages shared generic title/description and stayed request-rendered. | Fixed in first block. |
| AUD-005 | Media | Accessibility/contrast | Many labels used `text-wpm-gray/50`, `text-wpm-purple/50`, or lower. Contrast checks showed gray/50 about 2.15:1 and purple/50 about 1.77:1 on `#050509`. | Small labels can be hard to read and fail WCAG for meaningful text. | Fixed by token/class pass and covered by E2E route QA. |
| AUD-006 | Media | Performance/media | `public/project-livro-cover.png` was about 2.0 MB and reused as OG/project cover. | Large image can hurt LCP and mobile data usage once surfaced above the fold. | Fixed with optimized variants. Original retained as source. |
| AUD-007 | Media | Bundle/performance | Built JS chunks total about 1.97 MB; one chunk is about 865 KB and contains Three/R3F code. | WebGL is lazy, but route interaction can still load heavy runtime. | Mitigated. Heavy WebGL chunk is isolated behind a 1.9 KB wrapper and only requested after WebGL eligibility. |
| AUD-008 | Media | QA tooling | Playwright was not installed; Browser plugin absent. | No automated visual/mobile/keyboard screenshot evidence in the first run. | Fixed with local Playwright E2E using installed Chrome. |
| AUD-009 | Baixa | Error handling | No custom `not-found.tsx`, `error.tsx`, or `global-error.tsx` in `src/app`. | Default Next error screens break visual continuity. | Fixed with custom app-router error surfaces. |
| AUD-010 | Baixa | Maintainability | `ConsoleMenu.tsx` had 475 lines and mixed hero, artifact visuals, module ribbon, interaction state, and panel wiring. | Harder future edits and visual regression risk. | Fixed by extracting chrome, module ribbon, and artifact card components. |
| AUD-011 | Baixa | Package hygiene | `npm ls --depth=0` reported extraneous local helper packages under `node_modules`. | Local install state was noisier than the manifest, though build/audit still passed. | Fixed by pruning/removing extraneous local helper folders; manifest unchanged. |
| AUD-012 | Baixa | Dependency automation | The project uses GitHub but had no `.github/dependabot.yml`. | Dependency review would rely only on manual audit runs. | Fixed with weekly npm Dependabot configuration. |

## First Correction Block Applied

- Preserved subpath-aware absolute URLs with `absoluteUrl()`.
- Set robots `Host` to origin while keeping sitemap URL path-aware.
- Added `generateStaticParams`, `dynamicParams = false`, and project-specific metadata for project detail pages.
- Added `postcss@8.5.14` override and refreshed `package-lock.json`.
- Added `ENGINEERING_GUIDE.md` and expanded `AGENTS.md` with the project quality contract.

Final validation also confirmed `/projects/[slug]` now builds as SSG for:
- `/projects/wpm-gestao-interna`
- `/projects/livro-llm-agentes`

## Second Correction Block Applied

- Added an explicit GitHub Pages static export target with `NEXT_PUBLIC_DEPLOY_TARGET=github-pages`.
- Kept the normal Node-compatible build path for `next start`, security headers, and default image optimization.
- Added `publicAssetPath()` so public images work with a configured `basePath`.
- Converted Open Graph/Twitter image metadata to absolute URLs.
- Declared `robots.ts` and `sitemap.ts` as `dynamic = "force-static"` for Next static export compatibility.
- Documented deployment in `docs/08-DEPLOYMENT.md`, `README.md`, `ENGINEERING_GUIDE.md`, and `docs/00-OVERVIEW.md`.
- Did not activate GitHub Pages, add CI/CD, or touch external service settings.

## Third Correction Block Applied

- Added `wpm-lavender` as a readable text token for labels that previously used low-contrast purple text.
- Raised meaningful gray text from low opacity ranges to `text-wpm-gray/90`.
- Kept cyan accents where contrast already passed.
- Added missing focus-visible rings on secondary back links in `hobbies`, `resume`, `skills`, and `lab`.
- Verified the minimum contrast targets by script: `gray/90` is about 4.71:1, `lavender/90` about 8.00:1, `cyan/65` about 6.84:1 on `#050509`.

## Fourth Correction Block Applied

- Generated optimized static media variants from the original 2.0 MB PNG:
  - `project-livro-cover-960.webp`: 78,474 bytes.
  - `project-livro-cover-640.webp`: 41,732 bytes.
  - `project-livro-cover-og.jpg`: 39,979 bytes, 1200x630.
- Kept `project-livro-cover.png` as the source asset.
- Added `thumbnailImage` and `ogImage` to the project data contract.
- Pointed UI cover rendering to WebP variants and social metadata to the 1200x630 JPG.

## Fifth Correction Block Applied

- Split `ShaderBackgroundFallback` into its own lightweight client component.
- Removed the accidental static import of the heavy `ShaderBackground` module from `ShaderBackgroundWrapper`.
- Verified the WebGL wrapper chunk is about 1,984 bytes and dynamically references the heavy 884,085-byte Three/R3F chunk only after runtime eligibility checks.
- Total JS remains about 1.97 MB because the WebGL feature still exists, but the heavy canvas runtime is no longer pulled into the wrapper path before detection.
- Lighthouse confirms the first public route and desktop console are strong. `/console` on mobile remains the main measured performance tradeoff because the console is intentionally animation-heavy; it is documented as a future optimization target rather than hidden.

## Sixth Correction Block Applied

- Added `@playwright/test` as dev tooling and configured it to use the system Chrome channel.
- Added `npm run test:e2e`.
- Added desktop and mobile smoke coverage for:
  - critical routes, including `robots.txt` and `sitemap.xml`;
  - home start flow into the console;
  - optimized project media and social metadata;
  - keyboard reachability for contact links.
- First test run exposed brittle selectors in the test, not an app defect; selectors were corrected.
- The final 404 coverage initially exposed that Chrome reports an expected 404 navigation as a console resource error; the test now allows only that expected message in the custom 404 case while preserving the global console-error gate.
- Final E2E result: 10 passed.

## Seventh Correction Block Applied

- Added custom app-router error surfaces:
  - `src/app/not-found.tsx`
  - `src/app/error.tsx`
  - `src/app/global-error.tsx`
- Added E2E coverage for the custom 404 page on desktop and mobile.
- Split `ConsoleMenu.tsx` from 475 lines to 176 lines by extracting:
  - `ConsoleChrome.tsx` for telemetry and console navigation;
  - `ConsoleModuleRibbon.tsx` for module selection;
  - `ConsoleProjectArtifacts.tsx` for project artifact cards.
- Cleaned the local `node_modules` root package tree so `npm ls --depth=0` reports only manifest-owned dependencies.

## Eighth Checklist Closure Applied

- Added `.github/dependabot.yml` for weekly npm dependency checks.
- Kept the configuration local-only in this working tree; no GitHub API call, Pages activation, CI/CD activation, or credential change was performed.
- Used GitHub's current Dependabot options reference for required keys: `version`, `updates`, `package-ecosystem`, `directory`, and `schedule.interval`.

## Final Audit Status

All blocking findings from this audit are closed in the working tree. A follow-up MD closure pass also reconciled UX/creative/technical docs, closed executable local checklist items, and separated external blockers from intentional backlog. The remaining non-blocking optimization target is mobile Lighthouse performance on `/console`. No external deploy, GitHub Pages activation, CI/CD service, paid service, or credential change was performed.
