import type { NextConfig } from "next";
import pagesJson from "./content-source/pages.json";

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

const specialDestinations = new Map([
  ["mohan-lab-draft", "/"],
  ["open-positions", "/opportunities"],
  ["open-positions-2", "/opportunities"],
  ["undergraduate-students", "/opportunities"],
  ["masters-students", "/opportunities"],
  ["phd-students", "/opportunities"],
  ["foreign-and-medical-graduates", "/opportunities"],
  ["mohan-lab-image-and-data-analytics-scholarship-midas", "/opportunities"],
  ["high-school-students", "/opportunities/high-school"],
  [
    "former-high-school-summer-interns",
    "/opportunities/high-school",
  ],
]);

const legacyRedirects = new Map<string, string>();
for (const page of pages) {
  const destination = specialDestinations.get(page.slug)
    ?? (projectSlugs.has(page.slug) ? `/research/${page.slug}` : undefined);
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
