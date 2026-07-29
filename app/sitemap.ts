import type { MetadataRoute } from "next";
import { customPageSlugs, pages, posts, projectSlugs } from "./lib/content";

const siteUrl = "https://mohanlab.bme.uh.edu";

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryRoutes = [
    "",
    "/research",
    "/people",
    "/publications",
    "/news",
    "/opportunities",
    "/opportunities/high-school",
    "/opportunities/high-school/cohorts",
    "/contact",
    "/archive",
  ];
  const projectRoutes = [...projectSlugs].map((slug) => `/research/${slug}`);
  const archivePageRoutes = pages
    .filter((page) => !customPageSlugs.has(page.slug) && !projectSlugs.has(page.slug))
    .map((page) => `/archive/${page.slug}`);
  const archivePostRoutes = posts.map((post) => `/archive/post-${post.slug}`);

  return [...new Set([
    ...primaryRoutes,
    ...projectRoutes,
    ...archivePageRoutes,
    ...archivePostRoutes,
  ])].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: path === "" || path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : primaryRoutes.includes(path) ? 0.8 : 0.6,
  }));
}
