export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wphillipmaclayne.github.io/wpm-portfolio";

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
  "/hobbies",
  "/contact",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
