import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/PageIntro";
import { ResearchGrid } from "../components/ResearchGrid";
import { SectionNav } from "../components/SectionNav";
import { projects } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Research",
  "Explore Mohan Lab research in lupus nephritis, proteomics, biomarkers, AI, digital phenotyping, diagnostics, cancer, IBD, and bioengineering.",
);

const methods = [
  ["Antibody-based proteomics", "Platforms and approaches for large-scale protein measurement.", "antibody-proteomics"],
  ["SOMAscan assay", "Aptamer-based proteomic measurement and supporting technical documents.", "somascan"],
  ["SOMAscan details", "Methods, specifications, and reference material for the assay.", "somascan-details"],
  ["Meso Scale", "Electrochemiluminescence-based biomarker measurement.", "mesoscale"],
];

export default function ResearchPage() {
  return (
    <>
      <PageIntro
        eyebrow={`${projects.length} active projects`}
        title="Research projects"
        lead="Mohan Lab research spans autoimmunity, cancer, biomarkers, high-plex omics, diagnostics, artificial intelligence, and bioengineering."
      />
      <SectionNav
        items={[
          { label: "Research projects", href: "/research#projects" },
          { label: "Methods & resources", href: "/research#methods" },
          { label: "Publications", href: "/publications" },
          { label: "Content directory", href: "/archive" },
        ]}
      />
      <section className="section-pad research-index" id="projects">
        <div className="shell">
          <ResearchGrid projects={projects} />
        </div>
      </section>
      <section className="research-resources" id="methods">
        <div className="shell">
          <header className="resource-heading">
            <div><span className="eyebrow light">Methods & resources</span><h2>Platforms used across the lab</h2></div>
            <p>Technical references, research methods, and collaborative resources from the Mohan Lab.</p>
          </header>
          <div className="resource-links">
            {methods.map(([title, description, slug]) => (
              <Link href={`/archive/${slug}`} key={slug}>
                <strong>{title}</strong>
                <span>{description}</span>
                <i>→</i>
              </Link>
            ))}
            <a href="https://hoc.bme.uh.edu">
              <strong>Houston Omics Collaborative</strong>
              <span>Proteomics services and collaborative support at the University of Houston.</span>
              <i>↗</i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
