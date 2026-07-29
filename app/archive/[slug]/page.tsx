import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cleanSourceHtml, customPageSlugs, decodeHtml, pages, posts, projectSlugs, textOnly } from "../../lib/content";
import { pageMetadata } from "../../lib/metadata";

const archiveItems = [
  ...pages.filter((page) => !customPageSlugs.has(page.slug) && !projectSlugs.has(page.slug)),
  ...posts.map((post) => ({ ...post, slug: `post-${post.slug}` })),
];

const researchReferenceSlugs = new Set([
  "antibody-proteomics",
  "mesoscale",
  "somascan",
  "somascan-details",
  "hoc",
  "houston-omics-collaborative",
]);

function archiveContext(item: (typeof archiveItems)[number]) {
  if (item.slug.startsWith("post-")) return { href: "/news", label: "News archive" };
  if (item.parent === 10) return { href: "/publications", label: "Publications" };
  if ([149, 152, 158, 982].includes(item.parent || 0) || item.slug === "open-positions-2") {
    return { href: "/opportunities", label: "Research opportunities" };
  }
  if (researchReferenceSlugs.has(item.slug)) return { href: "/research", label: "Research" };
  return { href: "/archive", label: "Content directory" };
}

export function generateStaticParams() { return archiveItems.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = archiveItems.find((entry) => entry.slug === slug);
  if (!item) return {};
  const description = textOnly(item.excerpt.rendered)
    || textOnly(item.content.rendered)
    || `Information from the Mohan Lab at the University of Houston.`;
  return pageMetadata(decodeHtml(item.title.rendered), description.slice(0, 160));
}

export default async function ArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = archiveItems.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const context = archiveContext(item);
  return (
    <>
      <section className="archive-hero"><div className="shell"><Link href={context.href}>← {context.label}</Link><h1>{decodeHtml(item.title.rendered)}</h1></div></section>
      <section className="section-pad"><div className="shell narrow"><article className="archive-content" dangerouslySetInnerHTML={{ __html: cleanSourceHtml(item.content.rendered) }} /></div></section>
    </>
  );
}
