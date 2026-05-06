import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_ROUTES, absoluteUrl } from "@/lib/site";

const lastModified = new Date("2026-05-06");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = SITE_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const projectRoutes = projects
    .filter((project) => !project.locked)
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    }));

  return [...staticRoutes, ...projectRoutes];
}
