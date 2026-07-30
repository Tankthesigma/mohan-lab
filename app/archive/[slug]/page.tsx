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

const historicalNotices: Record<string, string> = {
  "mohan-lab-image-and-data-analytics-scholarship-midas":
    "This page documents the September 6, 2025 MIDAS Code War. The event and its September 2, 2025 registration deadline have passed.",
};

function sourceDate(item: (typeof archiveItems)[number]) {
  return new Date(item.modified || item.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
  const historicalNotice = historicalNotices[item.slug];
  return (
    <>
      <section className="archive-hero"><div className="shell"><Link href={context.href}>← {context.label}</Link><h1>{decodeHtml(item.title.rendered)}</h1></div></section>
      <section className="archive-record-meta" aria-label="Source information">
        <div className="shell narrow">
          <span>Verified Mohan Lab source record</span>
          <span>Source updated {sourceDate(item)}</span>
          <a href={item.link} target="_blank" rel="noopener noreferrer">View original page ↗</a>
        </div>
      </section>
      <section className="section-pad">
        <div className="shell narrow">
          {historicalNotice && (
            <aside className="archive-status-notice" aria-label="Historical record notice">
              <strong>Past event</strong>
              <p>{historicalNotice}</p>
            </aside>
          )}
          <article className="archive-content" dangerouslySetInnerHTML={{ __html: cleanSourceHtml(item.content.rendered) }} />
        </div>
      </section>
    </>
  );
}
