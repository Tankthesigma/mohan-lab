import type { Metadata } from "next";
import Link from "next/link";
import { LoadingImage } from "../../components/LoadingImage";
import { SectionNav } from "../../components/SectionNav";
import { highSchoolInternCohorts } from "../../lib/content";
import { pageMetadata } from "../../lib/metadata";

export const metadata: Metadata = pageMetadata(
  "High School Summer Internship",
  "Explore experimental and computational research tracks in the Mohan Lab Summer Internship program for rising high school seniors.",
);

const computationalProjects = [
  {
    label: "Computer vision",
    title: "AI-aided assessment of renal pathology in lupus nephritis",
    href: "/research/ai-aided-assessment-of-renal-pathology-in-lupus-nephritis",
  },
  {
    label: "Machine learning",
    title: "Classifying high-plex proteomic signatures for earlier disease detection",
    href: "/research/identifying-novel-stool-biomarkers-of-colorectal-cancer-and-advanced-adenomas-using-somascan-proteomics",
  },
  {
    label: "Digital health",
    title: "Digital phenotyping from smartphone and patient-reported data",
    href: "/research/pietroai",
  },
];

const programSteps = [
  ["01", "Prepare", "Begin with focused instruction in research practice, responsible data handling, and the methods your project requires."],
  ["02", "Investigate", "Work closely with a scientist or graduate mentor on a defined question for eight weeks."],
  ["03", "Communicate", "Analyze what you found and present the work as a formal research talk at the end of the program."],
  ["04", "Continue", "When project needs and student interest align, continue with data analysis, manuscript writing, or further research."],
];

export default function HighSchoolInternshipPage() {
  const currentCohort = highSchoolInternCohorts.find((cohort) => cohort.year === "2026");
  const currentInterns = currentCohort?.interns || [];

  return (
    <>
      <section className="internship-hero">
        <div className="shell internship-hero-grid">
          <div>
            <Link className="internship-back" href="/opportunities">← All opportunities</Link>
            <span className="eyebrow light">MLSI · Mohan Lab Summer Internship</span>
            <h1>High School Summer Internship</h1>
            <p>
              A selective, eight-week research experience for rising high
              school seniors interested in biomedical science, engineering,
              computer science, or the space where those fields meet.
            </p>
          </div>
          <aside className="internship-cycle">
            <span>2026 program</span>
            <strong>Applications closed</strong>
            <p>Program dates: June 8–July 31, 2026</p>
            <a href="mailto:mohanlabsummerinternship@gmail.com">Ask about a future cycle ↗</a>
          </aside>
        </div>
      </section>

      <SectionNav
        label="High school internship"
        items={[
          { label: "Research tracks", href: "/opportunities/high-school#research-tracks" },
          { label: "2026 cohort", href: "/opportunities/high-school#current-cohort" },
          { label: "Eligibility", href: "/opportunities/high-school#eligibility" },
          { label: "All intern cohorts", href: "/opportunities/high-school/cohorts" },
        ]}
      />

      <section className="internship-stats" aria-label="Program overview">
        <div className="shell internship-stat-grid">
          <div><strong>≈2%</strong><span>historical acceptance rate</span></div>
          <div><strong>8 weeks</strong><span>full research experience</span></div>
          <div><strong>2 paths</strong><span>experimental or computational</span></div>
          <div><strong>1 talk</strong><span>final research presentation</span></div>
        </div>
      </section>

      <section className="section-pad internship-paths" id="research-tracks">
        <div className="shell">
          <div className="internship-section-heading">
            <span className="eyebrow">Research tracks</span>
            <h2>Experimental and computational projects</h2>
            <p>
              Project placement depends on mentor availability, the lab’s
              active questions, and the skills a student wants to develop.
              Applicants can indicate a preferred path without needing prior
              research experience.
            </p>
          </div>
          <div className="research-path-grid">
            <article className="research-path-card experimental">
              <span>Experimental track</span>
              <h3>Experimental research</h3>
              <p>
                Learn core laboratory techniques and contribute to biomedical
                or bioengineering studies involving disease mechanisms,
                biomarkers, assays, and translational models.
              </p>
              <ul>
                <li>Sample preparation and laboratory technique</li>
                <li>Assay development and biological measurement</li>
                <li>Careful documentation and interpretation</li>
              </ul>
            </article>
            <article className="research-path-card computational">
              <span>Computational track</span>
              <h3>Computational research</h3>
              <p>
                Use coding, statistics, visualization, and machine learning to
                investigate biomedical images, omics datasets, and digital
                health measurements.
              </p>
              <ul>
                <li>Python or R data analysis</li>
                <li>Machine learning and image analytics</li>
                <li>High-dimensional omics and clinical data</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="computational-projects">
        <div className="shell">
          <div className="internship-section-heading light">
            <span className="eyebrow light">Computational examples</span>
            <h2>Related Mohan Lab projects</h2>
            <p>
              Intern projects are scoped for the summer and may support a
              portion of a larger program like these.
            </p>
          </div>
          <div className="computational-project-grid">
            {computationalProjects.map((project, index) => (
              <Link href={project.href} key={project.title}>
                <span>{String(index + 1).padStart(2, "0")} · {project.label}</span>
                <h3>{project.title}</h3>
                <strong>View related research ↗</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad program-experience">
        <div className="shell">
          <div className="internship-section-heading">
            <span className="eyebrow">The experience</span>
            <h2>Program structure</h2>
          </div>
          <div className="program-step-grid">
            {programSteps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="past-interns-preview" id="current-cohort">
        <div className="shell">
          <div className="past-interns-heading">
            <div>
              <span className="eyebrow">Current cohort</span>
              <h2>2026 MLSI interns</h2>
            </div>
            <p>
              The 2026 cohort includes experimental, bioengineering,
              proteomics, spatial-omics, image-analysis, and machine-learning
              projects.
            </p>
          </div>
          <div className="past-intern-grid">
            {currentInterns.map((intern) => (
              <article key={`2026-${intern.name}`}>
                <LoadingImage src={intern.image} alt={intern.name} width={520} height={700} sizes="(max-width: 560px) 118px, 170px" />
                <div>
                  <span>2026 cohort</span>
                  <h3>{intern.name}</h3>
                  <small>{intern.school}</small>
                  <p>{intern.project}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="past-intern-actions">
            <Link className="button button-dark" href="/opportunities/high-school/cohorts">
              View 2025 and earlier cohorts <span>→</span>
            </Link>
            <a className="text-link" href="https://drive.google.com/file/d/1x1XZubiGjQViNfjKr1U2iEPTX-D13yXE/preview">
              Watch the internship video <span>↗</span>
            </a>
            <a className="text-link" href="/media/2894-Testimonials-from-past-campers-v2.pdf">
              Read intern testimonials <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="internship-details" id="eligibility">
        <div className="shell internship-details-grid">
          <div>
            <span className="eyebrow light">Applicant information</span>
            <h2>Eligibility and requirements</h2>
          </div>
          <div className="internship-detail-list">
            <div><strong>Eligibility</strong><p>Rising seniors who have completed 11th grade and have a strong academic record.</p></div>
            <div><strong>Interests</strong><p>Biomedical science, bioengineering, neuroscience, computer science, AI, image analysis, or big-data analytics.</p></div>
            <div><strong>Application</strong><p>A résumé, one-page personal statement, academic information, and two teacher recommendations.</p></div>
            <div><strong>Logistics</strong><p>The program is unpaid. Students arrange transportation and, when needed, housing in Houston.</p></div>
          </div>
        </div>
      </section>

      <section className="application-band internship-contact">
        <div className="shell application-grid">
          <div><span className="eyebrow light">Future applicants</span><h2>Questions about a future MLSI cycle</h2></div>
          <div>
            <p>
              The 2026 cycle is closed. Contact the program for questions about
              future dates and watch this page for the next application window.
            </p>
            <a className="button button-white internship-email-button" href="mailto:mohanlabsummerinternship@gmail.com">
              Email the MLSI team <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
