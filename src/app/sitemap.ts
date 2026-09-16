import type { MetadataRoute } from "next";
import { projectSlugs } from "./lib/content";

const siteUrl = "https://mohanlab.bme.uh.edu";

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryRoutes = [
    "",
    "/research",
    "/research/digital-phenotyping",
    "/people",
    "/publications",
    "/news",
    "/opportunities",
    "/opportunities/high-school",
    "/opportunities/high-school/cohorts",
    "/contact",
  ];
  const projectRoutes = [...projectSlugs].map((slug) => `/research/${slug}`);

  return [...new Set([
    ...primaryRoutes,
    ...projectRoutes,
  ])].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : primaryRoutes.includes(path) ? 0.8 : 0.6,
  }));
}
