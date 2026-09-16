import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/PageIntro";
import { SectionNav } from "../components/SectionNav";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Opportunities",
  "Explore high school, undergraduate, master’s, PhD, foreign scholar, and medical graduate research opportunities in the Mohan Lab.",
);

export default function OpportunitiesPage() {
  return (
    <>
      <PageIntro eyebrow="Training & positions" title="Research opportunities" lead="Programs and research positions for high school, undergraduate, graduate, and visiting scholars." />
      <SectionNav
        items={[
          { label: "High school internship", href: "/opportunities#high-school" },
          { label: "Other pathways", href: "/opportunities#programs" },
        ]}
      />
      <section className="internship-feature" id="high-school">
        <div className="shell internship-feature-grid">
          <div className="internship-feature-copy">
            <span className="eyebrow light">High school students</span>
            <h2>Mohan Lab Summer Internship (MLSI)</h2>
            <p>
              Rising seniors can pursue mentored work through an experimental
              bench track or a computational track spanning AI, machine
              learning, image analysis, and high-dimensional biomedical data.
            </p>
            <Link className="button button-white" href="/opportunities/high-school">
              Program details <span>→</span>
            </Link>
          </div>
          <div className="internship-feature-facts" aria-label="High school internship facts">
            <div><strong>2%</strong><span>Acceptance Rate</span></div>
            <div><strong>8 weeks</strong><span>of mentored research</span></div>
            <div><strong>2 tracks</strong><span>experimental + computational</span></div>
          </div>
        </div>
      </section>
      <section className="section-pad opportunity-index" id="programs">
        <div className="shell">
          <div className="opportunity-heading">
            <span className="eyebrow">Other pathways</span>
            <h2>Undergraduate and graduate programs</h2>
            <p>Each pathway connects applicants with work appropriate to their experience, interests, and available time.</p>
          </div>
          <div className="opportunity-grid">
            <article className="opportunity-card">
              <span>01</span><h2>Undergraduate students</h2>
              <p>Research opportunities may be available during the summer and academic year for committed students.</p>
            </article>
            <article className="opportunity-card">
              <span>02</span><h2>Graduate students</h2>
              <p>Master’s and PhD trainees contribute to translational research in biomedical engineering, data, imaging, and assay development.</p>
            </article>
            <article className="opportunity-card">
              <span>03</span><h2>Visiting scholars</h2>
              <p>Foreign scholars and medical graduates can inquire about research training and collaboration opportunities.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="application-band">
        <div className="shell application-grid"><div><span className="eyebrow light">Contact</span><h2>Questions about research positions</h2></div><div><p>Include your current stage of study, research interests, relevant experience, and available time commitment.</p><a className="button button-white" href="mailto:cmohan@central.uh.edu">Contact the lab <span>→</span></a></div></div>
      </section>
    </>
  );
}
