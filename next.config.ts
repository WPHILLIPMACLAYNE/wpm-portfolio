import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { normalizeBasePath } from "./src/lib/site";

const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET ?? "node";
const isGitHubPagesExport = deployTarget === "github-pages";
const isDigitalOceanExport = deployTarget === "digitalocean";
const isStaticExport = isGitHubPagesExport || isDigitalOceanExport;

const basePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ??
    (isGitHubPagesExport ? "/wpm-portfolio" : "")
);

const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline'";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https: ws: wss:",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(basePath ? { basePath } : {}),
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  telemetry: false,
  release: {
    create: false,
  },
  sourcemaps: {
    disable: true,
  },
});
