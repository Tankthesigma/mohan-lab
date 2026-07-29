import type { Metadata } from "next";
import Link from "next/link";
import { LoadingImage } from "../../../components/LoadingImage";
import { highSchoolInternCohorts } from "../../../lib/content";
import { pageMetadata } from "../../../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "MLSI Intern Cohorts",
  "Meet Mohan Lab Summer Internship participants and explore their biomedical, engineering, data science, and AI research projects.",
);

export default function InternCohortsPage() {
  return (
    <>
      <section className="cohort-hero">
        <div className="shell">
          <Link href="/opportunities/high-school">← High school internship</Link>
          <span className="eyebrow light">Mohan Lab Summer Internship</span>
          <h1>Intern cohorts</h1>
          <p>
            Students, schools, and research projects documented across Mohan
            Lab internship cohorts.
          </p>
        </div>
      </section>
      <section className="cohort-directory">
        <div className="shell">
          {highSchoolInternCohorts.map((cohort) => (
            <section className="cohort-year" key={cohort.year}>
              <header>
                <h2>{cohort.year}</h2>
                <span>{cohort.interns.length} interns</span>
              </header>
              <div className="cohort-grid">
                {cohort.interns.map((intern) => (
                  <article key={`${cohort.year}-${intern.name}`}>
                    <LoadingImage src={intern.image} alt={intern.name} width={520} height={700} sizes="(max-width: 560px) calc(100vw - 36px), 170px" />
                    <div>
                      <h3>{intern.name}</h3>
                      <span>{intern.school}</span>
                      <p>{intern.project}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
