# 08 - Deployment

Deployment decisions follow `docs/AVAILABLE_SERVICES.md`.

## Current Decision

The portfolio supports two build targets:

1. **GitHub Pages static export** for the public `wpm-portfolio` project URL.
2. **Node-compatible Next.js host** for environments that need runtime HTTP headers and default Next image optimization.

The GitHub Pages path supports the default project URL and the approved
Namecheap custom domain:

```text
https://wphillipmaclayne.github.io/wpm-portfolio
http://wpmsmartwonkey.me
https://wpmsmartwonkey.me
```

The repository is public and GitHub Pages is published by `.github/workflows/pages.yml`.
The workflow builds the static export with `npm run build:github-pages`, adds
`out/.nojekyll`, uploads `out/` as a Pages artifact, and deploys through the
official GitHub Pages Actions flow. For the Namecheap custom domain deployment,
the workflow overrides the build envs so the site is exported at the root path
with `NEXT_PUBLIC_SITE_URL=https://wpmsmartwonkey.me` and
`NEXT_PUBLIC_BASE_PATH=`. The repository includes `public/CNAME`, which is
copied into `out/CNAME` during the static export.

Publication status on 2026-05-10:

- GitHub Pages repository: `WPHILLIPMACLAYNE/wpm-portfolio`
- Source branch: `main`
- Custom domain: `wpmsmartwonkey.me`
- GitHub Pages API status: `built`
- HTTPS certificate: approved by GitHub Pages
- HTTPS enforcement: enabled
- Account-wide root repository `WPHILLIPMACLAYNE/WPHILLIPMACLAYNE.github.io`
  must not keep `wpmsmartwonkey.me` as its custom domain, otherwise all project
  Pages under the account inherit that custom domain as their base URL.

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

GitHub Pages custom-domain export:

```bash
NEXT_PUBLIC_DEPLOY_TARGET=github-pages \
NEXT_PUBLIC_BASE_PATH= \
NEXT_PUBLIC_SITE_URL=https://wpmsmartwonkey.me \
npm run build:github-pages
```

This writes the export to `out/` with:

- `NEXT_PUBLIC_DEPLOY_TARGET=github-pages`
- `NEXT_PUBLIC_BASE_PATH=/wpm-portfolio`
- `NEXT_PUBLIC_SITE_URL=https://wphillipmaclayne.github.io/wpm-portfolio`
- `NEXT_PUBLIC_SENTRY_DSN` from GitHub secret `SENTRY_DSN` when configured
- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`

## Tradeoffs

GitHub Pages serves static files and does not run a Node.js Next server. Because of that:

- `next.config.ts` runtime `headers()` are not available in the static export.
- `next/image` default optimization is disabled for static export.
- Public asset paths must include the configured `basePath`.
- Sentry runs as browser-side monitoring only; server and edge Sentry config
  files are present for SDK compatibility but there is no server runtime in the
  GitHub Pages export.

The Node-compatible build keeps the configured security headers and default image optimization path.

## Sentry Error Monitoring

Sentry is configured for client-side error monitoring only. The static export
loads the browser SDK through `instrumentation-client.ts`, which imports
`sentry.client.config.ts`. The SDK stays disabled in local development and in
production builds without `NEXT_PUBLIC_SENTRY_DSN`.

Manual setup:

1. Open Sentry and create or select the WPM.OS Portfolio project.
2. In the project settings, open **Client Keys (DSN)** and copy the public DSN.
3. Add the DSN to GitHub repository secrets as `SENTRY_DSN`.
4. For DigitalOcean App Platform, set `NEXT_PUBLIC_SENTRY_DSN` as a build-time
   environment variable in the app settings. The `.do/app.yaml` entry is a
   placeholder and must be replaced in the panel.
5. Trigger a production deployment. Do not commit `.sentryclirc`, auth tokens,
   org slugs, project slugs, or real DSN values.
6. After deployment, verify a controlled test error from the browser appears in
   Sentry Issues. Errors thrown from DevTools console are not reliable Sentry
   verification events.

Source-map upload is intentionally disabled in `next.config.ts` until a
separate decision approves `SENTRY_AUTH_TOKEN`, org/project slugs, and the
associated build-time upload flow.

## DigitalOcean App Platform

DigitalOcean App Platform is the prepared migration target for a root-path
static export. The repo now includes `.do/app.yaml` with:

- app name `wpm-portfolio`;
- static site component `web`;
- GitHub source `WPHILLIPMACLAYNE/wpm-portfolio`, branch `main`;
- autodeploy enabled with `github.deploy_on_push: true`;
- source directory `/`;
- build command `npm ci && npm run build:github-pages`;
- output directory `out`;
- build-time public envs:
  - `NEXT_PUBLIC_DEPLOY_TARGET=digitalocean`;
  - `NEXT_PUBLIC_BASE_PATH=` empty, so the site is served from `/`;
  - `NEXT_PUBLIC_SITE_URL=https://wpm-portfolio.ondigitalocean.app` as a starter placeholder.
  - `NEXT_PUBLIC_SENTRY_DSN` as a secret placeholder for browser-side Sentry
    monitoring.

The existing `build:github-pages` script now keeps GitHub Pages defaults when no
external env is set, but allows DigitalOcean to override those values through
App Platform build-time environment variables. GitHub Pages therefore continues
to build with `/wpm-portfolio`, while DigitalOcean builds without that base
path.

### Manual setup in the DigitalOcean panel

1. Confirm the GitHub Student Developer Pack credit is active and check the App
   Platform price before creating the app.
2. Open DigitalOcean, choose **Create > App Platform**, and select GitHub as the
   source provider.
3. Grant DigitalOcean access to the repository if prompted.
4. Select `WPHILLIPMACLAYNE/wpm-portfolio` and branch `main`.
5. Keep autodeploy enabled only if App Platform should deploy every push to
   `main`.
6. Import or mirror the `.do/app.yaml` settings:
   - component type: static site;
   - source directory: `/`;
   - build command: `npm ci && npm run build:github-pages`;
   - output directory: `out`;
   - environment variables listed above with `BUILD_TIME` scope.
   - `NEXT_PUBLIC_SENTRY_DSN` populated with the Sentry project DSN when
     monitoring is approved for the DigitalOcean deployment.
7. Create the app and wait for the first deployment.
8. Replace the placeholder `NEXT_PUBLIC_SITE_URL` with the final starter domain
   or custom domain after DigitalOcean shows the live URL.
9. Validate the live root URL has no `/wpm-portfolio` prefix in navigation,
   canonical URLs, Open Graph URLs, and asset paths.

### Headers on DigitalOcean

The approved static header manifest remains `public/_headers` and is copied to
`out/_headers` by the static export. It contains the exact intended production
headers:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https: ws: wss:; media-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

Important: the current DigitalOcean App Spec documentation lists `static_sites`,
`github.deploy_on_push`, `build_command`, `output_dir`, `envs`, and CORS
response headers, but does not document a supported field for arbitrary static
site response headers such as CSP, HSTS, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. Do not add
an undocumented `headers:` block to `.do/app.yaml`; that risks an invalid App
Platform spec.

After the first deploy, manually verify:

```bash
curl -I https://wpm-portfolio.ondigitalocean.app/
```

If DigitalOcean does not apply `out/_headers`, choose one of these before
launching as the final production host:

- keep DigitalOcean for hosting but add a supported edge/proxy layer that
  applies the exact headers above;
- switch this deployment from static site to a Node-compatible service where
  `next.config.ts` `headers()` can run;
- keep GitHub Pages active until a static host with first-class `_headers`
  support is approved.

### Optional GitHub Actions fallback

`.github/workflows/deploy-digitalocean.yml` is available if App Platform
autodeploy stops working. The workflow:

- runs on pushes to `main` and manual dispatch;
- installs dependencies;
- builds the DigitalOcean static export with the root-path envs;
- verifies `public/_headers` and `out/_headers` are identical;
- deploys with `digitalocean/app_action/deploy@v2` only when the repository
  variable `ENABLE_DIGITALOCEAN_ACTION_DEPLOY` is set to `true`.

Required manual setup for the fallback workflow:

1. Create a DigitalOcean API token with App Platform read/write permission.
2. Add it to GitHub as `DIGITALOCEAN_ACCESS_TOKEN`.
3. Add repository variable `ENABLE_DIGITALOCEAN_ACTION_DEPLOY=true` only when
   this fallback should actively deploy.
4. Avoid enabling both App Platform autodeploy and the GitHub Actions fallback
   at the same time unless duplicate deployments are acceptable.

## Security Headers

The repository includes `public/_headers` with the approved security header set
for static hosts that support this convention, such as Cloudflare Pages. Next.js
copies this file to `out/_headers` during `npm run build:github-pages`, but
GitHub Pages does not read or apply it.

Therefore the active GitHub Pages URL cannot serve full HTTP security headers
from repository code alone. Full header enforcement requires an approved move to
a compatible static host or a Node-compatible Next.js host. Until that deployment
change is approved, the `_headers` file is a ready-to-deploy manifest, not proof
that the live GitHub Pages response contains those headers.

In development, `next.config.ts` allows `'unsafe-eval'` only inside
`script-src` because Next.js Fast Refresh/HMR needs eval-like behavior for local
updates. Production builds do not include that token in the configured runtime
CSP. Do not remove the development allowance unless the local dev server is
validated without breaking Fast Refresh.

## Activation Rule

GitHub Pages is approved and active. Do not enable another external host,
analytics, monitoring, secrets provider, or backend service without explicit
approval.

## Namecheap Custom Domain

Approved target domain:

```text
wpmsmartwonkey.me
```

Recommended architecture:

- GitHub Pages remains the hosting provider.
- Namecheap manages DNS only.
- The site is served at the apex/root domain, not `/wpm-portfolio`.
- `www.wpmsmartwonkey.me` should resolve to the same GitHub Pages site.

### GitHub setup

1. Open the GitHub repository settings.
2. Go to **Settings > Pages**.
3. Confirm the source is **GitHub Actions**.
4. In **Custom domain**, enter:

```text
wpmsmartwonkey.me
```

5. Save and wait for GitHub to verify DNS.
6. Enable **Enforce HTTPS** after DNS verification and certificate issuance are
   complete.

### Namecheap DNS setup

In Namecheap, open the domain control panel, then **Advanced DNS > Host
Records**.

Create or keep these records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |
| CNAME Record | `www` | `wphillipmaclayne.github.io` | Automatic |

Remove conflicting parking, URL redirect, masked redirect, or old host records
for `@` and `www` before saving. Preserve unrelated records such as email
(`MX`, SPF, DKIM, DMARC) unless intentionally changing mail service.

### Validation

After DNS propagation:

```bash
dig +short wpmsmartwonkey.me A
dig +short www.wpmsmartwonkey.me CNAME
gh api repos/WPHILLIPMACLAYNE/WPHILLIPMACLAYNE.github.io/pages \
  --jq '{status:.status,cname:.cname,html_url:.html_url,https_certificate:.https_certificate}'
gh api repos/WPHILLIPMACLAYNE/wpm-portfolio/pages \
  --jq '{status:.status,cname:.cname,html_url:.html_url,https_enforced:.https_enforced,https_certificate:.https_certificate}'
curl -I http://wpmsmartwonkey.me/
curl -I https://wpmsmartwonkey.me/
curl -I https://www.wpmsmartwonkey.me/
```

Expected:

- apex resolves to GitHub Pages IPs;
- `www` resolves to `wphillipmaclayne.github.io`;
- root account Pages has `cname=null`;
- WPM.OS project Pages has `cname=wpmsmartwonkey.me`;
- HTTPS is valid and enforced after GitHub Pages issues the certificate;
- canonical URLs and sitemap use `https://wpmsmartwonkey.me`;
- navigation and assets do not include `/wpm-portfolio`.
