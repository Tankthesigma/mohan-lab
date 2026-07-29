import type { NextConfig } from "next";
import pagesJson from "./content-source/pages.json";
import postsJson from "./content-source/posts.json";

type SourcePage = {
  id: number;
  slug: string;
  content: { rendered: string };
};

type SourcePost = {
  slug: string;
};

const pages = pagesJson as SourcePage[];
const posts = postsJson as SourcePost[];
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

const unchangedRootSlugs = new Set([
  "people",
  "publications",
  "news",
  "contact",
]);

const specialDestinations = new Map([
  ["mohan-lab-draft", "/"],
  ["open-positions", "/opportunities"],
  ["open-positions-2", "/opportunities"],
  ["high-school-students", "/opportunities/high-school"],
  [
    "former-high-school-summer-interns",
    "/opportunities/high-school/cohorts",
  ],
]);

const legacyRedirects = new Map<string, string>();
for (const page of pages) {
  if (unchangedRootSlugs.has(page.slug)) continue;
  const destination = specialDestinations.get(page.slug)
    ?? (projectSlugs.has(page.slug)
      ? `/research/${page.slug}`
      : `/archive/${page.slug}`);
  legacyRedirects.set(`/${page.slug}`, destination);
}
for (const post of posts) {
  legacyRedirects.set(`/${post.slug}`, `/archive/post-${post.slug}`);
}

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
