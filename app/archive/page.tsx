import type { Metadata } from "next";
import Link from "next/link";
import {
  customPageSlugs,
  decodeHtml,
  pages,
  posts,
  projectSlugs,
  textOnly,
} from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Content Directory",
  "A complete directory of Mohan Lab research, publications, opportunities, news, methods, and historical resources.",
);

const researchReferenceSlugs = new Set([
  "antibody-proteomics",
  "mesoscale",
  "somascan",
  "somascan-details",
  "hoc",
  "houston-omics-collaborative",
]);

function archivedPagesFor(predicate: (page: (typeof pages)[number]) => boolean) {
  return pages.filter(
    (page) =>
      !customPageSlugs.has(page.slug) &&
      !projectSlugs.has(page.slug) &&
      predicate(page),
  );
}

const publicationPages = archivedPagesFor((page) => page.parent === 10);
const opportunityPages = archivedPagesFor(
  (page) =>
    [149, 152, 158, 982].includes(page.parent || 0) ||
    page.slug === "open-positions-2",
);
const researchReferences = archivedPagesFor((page) =>
  researchReferenceSlugs.has(page.slug),
);
const assignedSlugs = new Set(
  [...publicationPages, ...opportunityPages, ...researchReferences].map(
    (page) => page.slug,
  ),
);
const legacyPages = archivedPagesFor((page) => !assignedSlugs.has(page.slug));
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

const groups = [
  {
    title: "Research methods & collaborations",
    description:
      "Assay platforms, proteomics references, technical documents, and collaborative programs.",
    pages: researchReferences,
  },
  {
    title: "Publication collections",
    description:
      "Topic-based bibliographies alongside the full publication-by-year index.",
    pages: publicationPages,
  },
  {
    title: "Programs, positions & alumni",
    description:
      "Opportunity information, scholarships, and former intern records.",
    pages: opportunityPages,
  },
  {
    title: "Historical resources",
    description:
      "Earlier Mohan Lab pages and materials available for historical reference.",
    pages: legacyPages,
  },
];

export default function ArchiveIndexPage() {
  return (
    <>
      <section className="directory-hero">
        <div className="shell">
          <span className="eyebrow light">Mohan Lab index</span>
          <h1>Content directory</h1>
          <p>
            Browse Mohan Lab research, people, publications, programs, news,
            and historical materials.
          </p>
          <div className="directory-counts">
            <span><strong>{pages.length}</strong> information pages</span>
            <span><strong>{posts.length}</strong> news posts</span>
            <span><strong>{projectSlugs.size}</strong> research projects</span>
          </div>
        </div>
      </section>

      <nav className="directory-primary" aria-label="Primary content sections">
        <div className="shell">
          <Link href="/research"><strong>Research</strong><span>{projectSlugs.size} projects</span></Link>
          <Link href="/people"><strong>People</strong><span>Current members & alumni</span></Link>
          <Link href="/publications"><strong>Publications</strong><span>By year & topic</span></Link>
          <Link href="/opportunities"><strong>Opportunities</strong><span>Programs & positions</span></Link>
          <Link href="/news"><strong>News</strong><span>Lab activity & posts</span></Link>
          <Link href="/contact"><strong>Contact</strong><span>Location & email</span></Link>
        </div>
      </nav>

      <section className="directory-groups">
        <div className="shell">
          {groups.map((group) => (
            <section className="directory-group" key={group.title}>
              <header>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </header>
              <div className="directory-links">
                {group.pages.map((page) => (
                  <Link href={`/archive/${page.slug}`} key={page.slug}>
                    <span>{decodeHtml(page.title.rendered)}</span>
                    <small>{textOnly(page.excerpt.rendered) || "View page details"}</small>
                    <i>→</i>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section className="directory-group">
            <header>
              <h2>News post archive</h2>
              <p>Individual announcements and event posts published from 2015–2018.</p>
            </header>
            <div className="directory-links">
              {sortedPosts.map((post) => (
                <Link href={`/archive/post-${post.slug}`} key={post.slug}>
                  <span>{decodeHtml(post.title.rendered)}</span>
                  <small>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</small>
                  <i>→</i>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
