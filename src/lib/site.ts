export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wphillipmaclayne.github.io/wpm-portfolio";
export const SITE_ORIGIN = new URL(SITE_URL).origin;
export const SITE_BASE_PATH = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages"
      ? "/wpm-portfolio"
      : "")
);

export const SITE_TITLE = "WPM.OS - Wallace Phillip Maclayne";

export const SITE_DESCRIPTION =
  "Interactive portfolio system by Wallace Phillip Maclayne, combining product thinking, operations, UX, and web systems built from real constraints.";

export const SITE_KEYWORDS = [
  "Wallace Phillip Maclayne",
  "WPM.OS",
  "portfolio",
  "creative developer",
  "front-end",
  "UX",
  "motion design",
  "WebGL",
  "React",
  "Next.js",
];

export const SITE_ROUTES = [
  "/",
  "/console",
  "/projects",
  "/about",
  "/skills",
  "/resume",
  "/lab",
  "/contact",
];

export function absoluteUrl(path = "/") {
  const base = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;
  const relativePath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(relativePath, base).toString();
}

export function publicAssetPath(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalizedPath}`;
}

export function normalizeBasePath(value: string | undefined) {
  if (!value || value === "/") return "";
  return value.startsWith("/") ? value : `/${value}`;
}
