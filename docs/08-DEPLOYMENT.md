# 08 - Deployment

Deployment decisions follow `docs/AVAILABLE_SERVICES.md`.

## Current Decision

The portfolio supports two build targets:

1. **GitHub Pages static export** for the public `wpm-portfolio` project URL.
2. **Node-compatible Next.js host** for environments that need runtime HTTP headers and default Next image optimization.

The GitHub Pages path is treated as the explicit static target because the default public URL is:

```text
https://wphillipmaclayne.github.io/wpm-portfolio
```

The repository is public and GitHub Pages is published by `.github/workflows/pages.yml`.
The workflow builds the static export with `npm run build:github-pages`, adds
`out/.nojekyll`, uploads `out/` as a Pages artifact, and deploys through the
official GitHub Pages Actions flow.

## Commands

Normal Next.js server build:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3010
```

GitHub Pages static export:

```bash
npm run build:github-pages
```

This writes the export to `out/` with:

- `NEXT_PUBLIC_DEPLOY_TARGET=github-pages`
- `NEXT_PUBLIC_BASE_PATH=/wpm-portfolio`
- `NEXT_PUBLIC_SITE_URL=https://wphillipmaclayne.github.io/wpm-portfolio`
- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`

## Tradeoffs

GitHub Pages serves static files and does not run a Node.js Next server. Because of that:

- `next.config.ts` runtime `headers()` are not available in the static export.
- `next/image` default optimization is disabled for static export.
- Public asset paths must include the configured `basePath`.

The Node-compatible build keeps the configured security headers and default image optimization path.

## Activation Rule

GitHub Pages is approved and active. Do not enable another external host,
analytics, monitoring, secrets provider, or backend service without explicit
approval.
