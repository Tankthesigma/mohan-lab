import type { NextConfig } from "next";
import { sourceDestination } from "./src/app/lib/source-routes";
import pagesJson from "./src/content-source/pages.json";

type SourcePage = {
  id: number;
  slug: string;
  content: { rendered: string };
};

const pages = pagesJson as SourcePage[];
const home = pages.find((page) => page.id === 1167);
const projectSlugs = new Set(
  [
    ...(home?.content.rendered.matchAll(
      /<a\b[^>]*href=["']https?:\/\/mohanlab\.bme\.uh\.edu\/([^"'#?]+)\/?["'][^>]*>/gi,
    ) ?? []),
  ]
    .map((match) => match[1].replace(/\/$/, ""))
    .filter((slug) => pages.some((page) => page.slug === slug)),
);


const legacyRedirects = new Map<string, string>();
for (const page of pages) {
  const destination = sourceDestination(page.slug, projectSlugs);
  if (destination) legacyRedirects.set(`/${page.slug}`, destination);
}

legacyRedirects.set(
  "/mohan-lab-image-and-data-analytics-scholarship-midas",
  "/opportunities",
);

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyRedirects].map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
