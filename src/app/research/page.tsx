import type { Metadata } from "next";
import { PageIntro } from "../components/PageIntro";
import { ResearchGrid } from "../components/ResearchGrid";
import { SectionNav } from "../components/SectionNav";
import { projects } from "../lib/content";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Research",
  "Explore Mohan Lab research in lupus nephritis, proteomics, biomarkers, AI, digital phenotyping, diagnostics, cancer, IBD, and bioengineering.",
);

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
          { label: "Publications", href: "/publications" },
        ]}
      />
      <section className="section-pad research-index" id="projects">
        <div className="shell">
          <ResearchGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
