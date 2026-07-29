import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/PageIntro";
import { PublicationYears } from "../components/PublicationYears";
import { SectionNav } from "../components/SectionNav";
import { publicationYears } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Publications",
  "Browse Mohan Lab publications across omics, biomarkers, lupus nephritis, genetics, immunology, therapeutics, and diagnostics.",
);

const collections = [
  ["OMICS & Biomarkers", "manuscripts-on-omics-biomarkers"],
  ["Genetics", "manuscripts-on-genetics"],
  ["B-cells & Antibodies", "manuscripts-on-b-cells-antibodies"],
  ["Renal Disease", "manuscripts-on-renal-disease"],
  ["Immunological Mechanisms", "manuscripts-on-immunological-mechanisms-of-autoimmunity"],
  ["Therapeutics", "manuscripts-on-therapeutics-natural-alternatives"],
  ["Non-invasive Diagnostics", "manuscripts-on-non-invasive-diagnostics"],
];

export default function PublicationsPage() {
  return (
    <>
      <PageIntro className="publication-page-intro" eyebrow="Research output" title="Publications" lead="Peer-reviewed work by Mohan Lab members and collaborators, organized by year and research area." />
      <SectionNav
        items={[
          { label: "By year", href: "/publications#by-year" },
          { label: "Research collections", href: "/publications#collections" },
          { label: "Research projects", href: "/research" },
        ]}
      />
      <section className="publication-categories" id="collections">
        <div className="shell category-strip">
          {collections.map(([title, slug]) => <Link href={`/archive/${slug}`} key={slug}><span>{title}</span><i>↗</i></Link>)}
        </div>
      </section>
      <section className="section-pad publication-list" id="by-year">
        <div className="shell publication-index">
          <header className="publication-section-heading">
            <div><span>Full bibliography</span><h2>Publications by year</h2></div>
            <p>Select a year to browse author names, journals, DOI links, and indexed identifiers from the lab’s publication record.</p>
          </header>
          <PublicationYears years={publicationYears.map(({ year }) => year)} />
        </div>
      </section>
    </>
  );
}
