"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LoadingImage } from "../components/LoadingImage";
import { ResearchGrid } from "../components/ResearchGrid";
import type { Member, Project } from "../lib/content";

export type LinkItem = { label: string; href: string };
export type FocusItem = { number: string; title: string; text: string };
export type NewsItem = { title: string; detail: string; image: string; date: string };
export type DetailLinkItem = { title: string; text: string; href: string };

function asInternalLink(href: string, children: ReactNode, className?: string) {
  return href.startsWith("/") ? (
    <Link className={className} href={href}>{children}</Link>
  ) : (
    <a className={className} href={href}>{children}</a>
  );
}

function SlotHeading({
  level,
  children,
  className = "",
}: {
  level: 1 | 2 | 3;
  children?: ReactNode;
  className?: string;
}) {
  return <div className={`slot-heading slot-heading-${level} ${className}`.trim()} role="heading" aria-level={level}>{children}</div>;
}

function SlotText({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`slot-text ${className}`.trim()}>{children}</div>;
}

export function MohanPageFrame({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`plasmic-mohan-page ${className}`.trim()}>{children}</div>;
}

export function MohanHomeHero({
  className = "",
  heroImage = "/media/3689-3689-Website-photo_BLURRED-1-scaled.webp",
  kicker = "University of Houston · Biomedical Engineering",
  title = "Mohan Lab",
  statement = "Translational biomedical research in autoimmunity, cancer, and chronic disease.",
  body = "We combine immunology, high-plex omics, data science, and bioengineering to study disease mechanisms and improve diagnosis.",
  primaryLabel = "Research projects",
  primaryHref = "/research",
  secondaryLabel = "Lab members",
  secondaryHref = "/people",
}: {
  className?: string;
  heroImage?: string;
  kicker?: ReactNode;
  title?: ReactNode;
  statement?: ReactNode;
  body?: ReactNode;
  primaryLabel?: ReactNode;
  primaryHref?: string;
  secondaryLabel?: ReactNode;
  secondaryHref?: string;
}) {
  return (
    <section className={`home-hero ${className}`.trim()}>
      <figure className="hero-photo-stage">
        <LoadingImage src={heroImage} alt="Mohan Lab researchers at the University of Houston" width={1800} height={809} sizes="100vw" priority />
        <div className="hero-photo-wash" aria-hidden="true" />
        <div className="shell hero-photo-title"><div className="hero-kicker">{kicker}</div><SlotHeading level={1} className="hero-title">{title}</SlotHeading></div>
      </figure>
      <div className="hero-copy-band">
        <div className="shell hero-intro-grid">
          <div className="hero-summary"><SlotText className="hero-statement">{statement}</SlotText><SlotText className="hero-body">{body}</SlotText></div>
          <div className="hero-actions">
            {asInternalLink(primaryHref, <>{primaryLabel} <span>→</span></>, "button button-primary")}
            {asInternalLink(secondaryHref, secondaryLabel, "button button-ghost")}
          </div>
        </div>
      </div>
      <div className="hero-photo-caption"><div className="shell"><span>Biomedical Engineering · Houston, Texas</span><span>Mohan Lab team</span></div></div>
    </section>
  );
}

export function MohanExpertiseStrip({
  className = "",
  items = [
    { label: "Lupus nephritis" },
    { label: "High-plex omics" },
    { label: "Biomarkers" },
    { label: "Liquid biopsy" },
    { label: "AI & digital health" },
    { label: "Bioengineering" },
  ],
}: { className?: string; items?: Array<{ label: string }> }) {
  return (
    <div className={`expertise-strip ${className}`.trim()} aria-label="Mohan Lab research areas">
      <div className="shell expertise-grid">{items.map((item, index) => <div className="expertise-item" key={`${item.label}-${index}`}>{item.label}</div>)}</div>
    </div>
  );
}

export function MohanMissionFeature({
  className = "",
  image = "/media/1-1-1-1024x728.png",
  eyebrow = "Research overview",
  title = "Connecting disease biology with measurement.",
  text = "The lab studies molecular mechanisms of disease and develops biomarkers, assays, and computational methods for diagnosis and monitoring.",
  linkLabel = "View all research projects",
  linkHref = "/research",
  noteTitle = "Spatial and high-plex omics",
  noteText = "Mechanisms · biomarkers · clinical translation",
}: {
  className?: string;
  image?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  linkLabel?: ReactNode;
  linkHref?: string;
  noteTitle?: ReactNode;
  noteText?: ReactNode;
}) {
  return (
    <section className={`mission-band ${className}`.trim()}>
      <div className="shell mission-grid">
        <div className="mission-copy">
          <div className="eyebrow">{eyebrow}</div>
          <SlotHeading level={2}>{title}</SlotHeading>
          <SlotText>{text}</SlotText>
          {asInternalLink(linkHref, <>{linkLabel} <span>→</span></>, "text-link")}
        </div>
        <div className="mission-visual">
          <LoadingImage src={image} alt="Mohan Lab research" width={1400} height={960} sizes="(max-width: 820px) 100vw, 60vw" />
          <div className="mission-note"><div className="mission-note-title">{noteTitle}</div><div className="mission-note-text">{noteText}</div></div>
        </div>
      </div>
    </section>
  );
}

export function MohanPageIntro({
  className = "",
  eyebrow = "Mohan Lab",
  title = "Page title",
  lead = "Add a concise introduction for this page.",
}: { className?: string; eyebrow?: ReactNode; title?: ReactNode; lead?: ReactNode }) {
  return (
    <section className={`page-intro ${className}`.trim()}>
      <div className="shell intro-grid"><div className="eyebrow light">{eyebrow}</div><SlotHeading level={1}>{title}</SlotHeading><SlotText>{lead}</SlotText></div>
    </section>
  );
}

export function MohanSectionNav({
  className = "",
  label = "Explore this section",
  items = [
    { label: "Research", href: "/research" },
    { label: "People", href: "/people" },
    { label: "Publications", href: "/publications" },
  ],
}: { className?: string; label?: string; items?: LinkItem[] }) {
  return (
    <nav className={`section-nav ${className}`.trim()} aria-label={label}>
      <div className="shell section-nav-inner"><strong>{label}</strong><div>{items.map((item, index) => <Link href={item.href} key={`${item.href}-${index}`}>{item.label}</Link>)}</div></div>
    </nav>
  );
}

export function MohanFocusAreas({
  className = "",
  eyebrow = "Research areas",
  title = "Current areas of investigation",
  introduction = "Projects span autoimmune disease, cancer, chronic illness, diagnostics, and biomedical engineering.",
  items = [
    { number: "/01", title: "Disease mechanisms", text: "Spatial and high-plex omics reveal the molecular systems driving lupus, kidney injury, cancer, and inflammatory disease." },
    { number: "/02", title: "Biomarkers & diagnostics", text: "Liquid biopsy and biomarker programs seek precise, less invasive ways to diagnose disease and monitor activity." },
    { number: "/03", title: "Translational bioengineering", text: "AI, microfluidics, 3D models, and rapid tests turn biological findings into tools for research and clinical care." },
  ],
}: { className?: string; eyebrow?: ReactNode; title?: ReactNode; introduction?: ReactNode; items?: FocusItem[] }) {
  return (
    <section className={`focus-section section-pad ${className}`.trim()}>
      <div className="shell">
        <div className="section-heading split-heading"><div><div className="eyebrow">{eyebrow}</div><SlotHeading level={2}>{title}</SlotHeading></div><SlotText>{introduction}</SlotText></div>
        <div className="focus-grid">{items.map((focus, index) => <article className="focus-card" key={`${focus.number}-${index}`}><span>{focus.number}</span><h3>{focus.title}</h3><p>{focus.text}</p></article>)}</div>
      </div>
    </section>
  );
}

export function MohanFeaturedProjects({
  className = "",
  eyebrow = "Research",
  title = "Selected projects",
  linkLabel = "View all projects",
  linkHref = "/research",
  projects = [],
}: {
  className?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  linkLabel?: ReactNode;
  linkHref?: string;
  projects?: Project[];
}) {
  return (
    <section className={`featured-research section-pad ${className}`.trim()}>
      <div className="shell">
        <div className="section-heading split-heading light">
          <div><div className="eyebrow light">{eyebrow}</div><SlotHeading level={2}>{title}</SlotHeading></div>
          {asInternalLink(linkHref, <>{linkLabel} <span>→</span></>, "text-link light")}
        </div>
        <div className="project-showcase">
          {projects.slice(0, 4).map((project, index) => (
            <Link className={`showcase-card card-${index + 1}`} href={`/research/${project.slug}`} key={`${project.slug}-${index}`}>
              <LoadingImage src={project.image} alt="" width={720} height={480} sizes="(max-width: 820px) 100vw, 25vw" />
              <div className="showcase-overlay" />
              <div className="showcase-copy"><span>{project.category}</span><h3>{project.title}</h3><i aria-hidden="true">↗</i></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MohanPeopleFeature({
  className = "",
  image = "/media/3689-3689-Website-photo_BLURRED-1-scaled.webp",
  eyebrow = "People",
  title = "Faculty, staff, and trainees",
  text = "Engineers, data scientists, physicians, and molecular researchers work together across projects, methods, and stages of training.",
  buttonLabel = "View lab members",
  buttonHref = "/people",
}: {
  className?: string;
  image?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  buttonLabel?: ReactNode;
  buttonHref?: string;
}) {
  return (
    <section className={`people-feature section-pad ${className}`.trim()}>
      <div className="shell people-feature-grid">
        <div className="people-group-photo"><LoadingImage src={image} alt="Mohan Lab faculty, staff, and trainees" width={1800} height={809} sizes="(max-width: 820px) 100vw, 60vw" /></div>
        <div className="people-copy"><div className="eyebrow">{eyebrow}</div><SlotHeading level={2}>{title}</SlotHeading><SlotText>{text}</SlotText>{asInternalLink(buttonHref, <>{buttonLabel} <span>→</span></>, "button button-dark")}</div>
      </div>
    </section>
  );
}

export function MohanResearchDirectory({ className = "", projects = [] }: { className?: string; projects?: Project[] }) {
  return <section className={`section-pad research-index ${className}`.trim()}><div className="shell"><ResearchGrid projects={projects} /></div></section>;
}

export function MohanPeopleDirectory({ className = "", members = [] }: { className?: string; members?: Member[] }) {
  return (
    <section className={`section-pad people-index ${className}`.trim()}>
      <div className="shell member-grid">
        {members.map((member, index) => (
          <article className={`member-card-modern ${index === 0 ? "principal" : ""}`} key={`${member.name}-${index}`}>
            <div className="member-image"><LoadingImage src={member.image} alt={member.name} width={720} height={900} sizes={index === 0 ? "(max-width: 820px) 45vw, 40vw" : "(max-width: 560px) 100vw, 24vw"} /></div>
            <div className="member-info-modern"><span>{member.role}</span><h2>{member.name}</h2>{member.bio && <p>{member.bio}</p>}{member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MohanNewsGrid({
  className = "",
  eyebrow = "News",
  title = "Recent lab activity",
  items = [],
}: { className?: string; eyebrow?: ReactNode; title?: ReactNode; items?: NewsItem[] }) {
  return (
    <section className={`news-section section-pad ${className}`.trim()}>
      <div className="shell">
        <div className="section-heading split-heading"><div><div className="eyebrow">{eyebrow}</div><SlotHeading level={2}>{title}</SlotHeading></div><Link className="text-link" href="/news">News and events <span>→</span></Link></div>
        <div className="news-grid">{items.map((item, index) => <Link className="news-card" href="/news" key={`${item.title}-${index}`}><div className="news-image"><LoadingImage src={item.image} alt="" width={800} height={500} sizes="(max-width: 820px) 100vw, 33vw" /></div><span>{item.date}</span><h3>{item.title}</h3><p>{item.detail}</p></Link>)}</div>
      </div>
    </section>
  );
}

export function MohanCallToAction({
  className = "",
  eyebrow = "Opportunities",
  title = "Research training at Mohan Lab",
  text = "Information for high school interns, undergraduates, graduate students, and visiting scholars.",
  buttonLabel = "View internships",
  buttonHref = "/opportunities",
}: { className?: string; eyebrow?: ReactNode; title?: ReactNode; text?: ReactNode; buttonLabel?: ReactNode; buttonHref?: string }) {
  return (
    <section className={`join-cta ${className}`.trim()}><div className="shell join-grid"><div><div className="eyebrow light">{eyebrow}</div><SlotHeading level={2}>{title}</SlotHeading></div><div><SlotText>{text}</SlotText>{asInternalLink(buttonHref, <>{buttonLabel} <span>→</span></>, "button button-white")}</div></div></section>
  );
}

export function MohanResearchPage({
  className = "",
  introEyebrow = "23 active projects",
  introTitle = "Research projects",
  introLead = "Mohan Lab research spans autoimmunity, cancer, biomarkers, high-plex omics, diagnostics, artificial intelligence, and bioengineering.",
  methodsEyebrow = "Methods & resources",
  methodsTitle = "Platforms used across the lab",
  methodsLead = "Technical references, research methods, and collaborative resources from the Mohan Lab.",
  projects = [],
  resources = [
    { title: "Antibody-based proteomics", text: "Platforms and approaches for large-scale protein measurement.", href: "/archive/antibody-proteomics" },
    { title: "SOMAscan assay", text: "Aptamer-based proteomic measurement and supporting technical documents.", href: "/archive/somascan" },
    { title: "SOMAscan details", text: "Methods, specifications, and reference material for the assay.", href: "/archive/somascan-details" },
    { title: "Meso Scale", text: "Electrochemiluminescence-based biomarker measurement.", href: "/archive/mesoscale" },
    { title: "Houston Omics Collaborative", text: "Proteomics services and collaborative support at the University of Houston.", href: "https://hoc.bme.uh.edu" },
  ],
}: {
  className?: string;
  introEyebrow?: ReactNode;
  introTitle?: ReactNode;
  introLead?: ReactNode;
  methodsEyebrow?: ReactNode;
  methodsTitle?: ReactNode;
  methodsLead?: ReactNode;
  projects?: Project[];
  resources?: DetailLinkItem[];
}) {
  return (
    <div className={`plasmic-full-page ${className}`.trim()}>
      <MohanPageIntro eyebrow={introEyebrow} title={introTitle} lead={introLead} />
      <MohanSectionNav items={[{ label: "Research projects", href: "/research#projects" }, { label: "Methods & resources", href: "/research#methods" }, { label: "Publications", href: "/publications" }, { label: "Content directory", href: "/archive" }]} />
      <MohanResearchDirectory projects={projects} />
      <section className="research-resources" id="methods"><div className="shell"><header className="resource-heading"><div><div className="eyebrow light">{methodsEyebrow}</div><SlotHeading level={2}>{methodsTitle}</SlotHeading></div><SlotText>{methodsLead}</SlotText></header><div className="resource-links">{resources.map((item, index) => item.href.startsWith("/") ? <Link href={item.href} key={`${item.href}-${index}`}><strong>{item.title}</strong><span>{item.text}</span><i>→</i></Link> : <a href={item.href} key={`${item.href}-${index}`}><strong>{item.title}</strong><span>{item.text}</span><i>↗</i></a>)}</div></div></section>
    </div>
  );
}

export function MohanPeoplePage({
  className = "",
  introEyebrow = "23 current members",
  introTitle = "People",
  introLead = "Faculty, research staff, scientists, graduate students, undergraduates, and trainees working across the Mohan Lab.",
  members = [],
}: {
  className?: string;
  introEyebrow?: ReactNode;
  introTitle?: ReactNode;
  introLead?: ReactNode;
  members?: Member[];
}) {
  return (
    <div className={`plasmic-full-page ${className}`.trim()}>
      <MohanPageIntro eyebrow={introEyebrow} title={introTitle} lead={introLead} />
      <MohanSectionNav items={[{ label: "Current members", href: "/people#current-members" }, { label: "Former members", href: "/people#former-members" }, { label: "Research opportunities", href: "/opportunities" }]} />
      <MohanPeopleDirectory members={members} />
    </div>
  );
}

export function MohanNewsPage({
  className = "",
  introEyebrow = "Mohan Lab · Laboratory record",
  introTitle = "News & events",
  introLead = "Collaborations, conference presentations, awards, graduations, visitors, and other updates from the lab.",
  newsEyebrow = "Current record · 2026",
  newsTitle = "From the lab",
  items = [],
}: {
  className?: string;
  introEyebrow?: ReactNode;
  introTitle?: ReactNode;
  introLead?: ReactNode;
  newsEyebrow?: ReactNode;
  newsTitle?: ReactNode;
  items?: NewsItem[];
}) {
  return (
    <div className={`plasmic-full-page ${className}`.trim()}>
      <MohanPageIntro eyebrow={introEyebrow} title={introTitle} lead={introLead} />
      <MohanSectionNav items={[{ label: "Latest record", href: "/news#lab-news" }, { label: "Year archive", href: "/news#year-archive" }, { label: "Post archive", href: "/news#post-archive" }, { label: "Content directory", href: "/archive" }]} />
      <MohanNewsGrid eyebrow={newsEyebrow} title={newsTitle} items={items} />
    </div>
  );
}

export function MohanPublicationsPage({
  className = "",
  introEyebrow = "Research output",
  introTitle = "Publications",
  introLead = "Peer-reviewed work by Mohan Lab members and collaborators, organized by year and research area.",
  bibliographyEyebrow = "Full bibliography",
  bibliographyTitle = "Publications by year",
  bibliographyLead = "Select a year to browse author names, journals, DOI links, and indexed identifiers from the lab’s publication record.",
  years = [],
  collections = [
    { label: "OMICS & Biomarkers", href: "/archive/manuscripts-on-omics-biomarkers" },
    { label: "Genetics", href: "/archive/manuscripts-on-genetics" },
    { label: "B-cells & Antibodies", href: "/archive/manuscripts-on-b-cells-antibodies" },
    { label: "Renal Disease", href: "/archive/manuscripts-on-renal-disease" },
    { label: "Immunological Mechanisms", href: "/archive/manuscripts-on-immunological-mechanisms-of-autoimmunity" },
    { label: "Therapeutics", href: "/archive/manuscripts-on-therapeutics-natural-alternatives" },
    { label: "Non-invasive Diagnostics", href: "/archive/manuscripts-on-non-invasive-diagnostics" },
  ],
}: {
  className?: string;
  introEyebrow?: ReactNode;
  introTitle?: ReactNode;
  introLead?: ReactNode;
  bibliographyEyebrow?: ReactNode;
  bibliographyTitle?: ReactNode;
  bibliographyLead?: ReactNode;
  years?: Array<{ year: string }>;
  collections?: LinkItem[];
}) {
  return (
    <div className={`plasmic-full-page ${className}`.trim()}>
      <MohanPageIntro className="publication-page-intro" eyebrow={introEyebrow} title={introTitle} lead={introLead} />
      <MohanSectionNav items={[{ label: "By year", href: "/publications#by-year" }, { label: "Research collections", href: "/publications#collections" }, { label: "Research projects", href: "/research" }]} />
      <section className="publication-categories" id="collections"><div className="shell category-strip">{collections.map((item, index) => <Link href={item.href} key={`${item.href}-${index}`}><span>{item.label}</span><i>↗</i></Link>)}</div></section>
      <section className="section-pad publication-list" id="by-year"><div className="shell publication-index"><header className="publication-section-heading"><div><div className="publication-eyebrow">{bibliographyEyebrow}</div><SlotHeading level={2}>{bibliographyTitle}</SlotHeading></div><SlotText>{bibliographyLead}</SlotText></header><div className="publication-years">{years.map(({ year }) => <section className="publication-year" key={year}><Link className="publication-year-toggle" href={`/publications/${year}`}><span>{year}</span><small>View publications</small><i aria-hidden="true" /></Link></section>)}</div></div></section>
    </div>
  );
}

export function MohanInternshipsPage({
  className = "",
  introEyebrow = "Training & positions",
  introTitle = "Research opportunities",
  introLead = "Programs and research positions for high school, undergraduate, graduate, and visiting scholars.",
  highSchoolEyebrow = "High school students",
  highSchoolTitle = "Mohan Lab Summer Internship (MLSI)",
  highSchoolDescription = "Rising seniors can pursue mentored work through an experimental bench track or a computational track spanning AI, machine learning, image analysis, and high-dimensional biomedical data.",
  highSchoolButtonLabel = "Program details",
  highSchoolButtonHref = "/opportunities/high-school",
  acceptanceValue = "2%",
  acceptanceLabel = "Acceptance Rate",
  durationValue = "8 weeks",
  durationLabel = "of mentored research",
  tracksValue = "2 tracks",
  tracksLabel = "experimental + computational",
  programsEyebrow = "Other pathways",
  programsTitle = "Undergraduate and graduate programs",
  programsLead = "Each pathway connects applicants with work appropriate to their experience, interests, and available time.",
  ctaEyebrow = "Contact",
  ctaTitle = "Questions about research positions",
  ctaText = "Include your current stage of study, research interests, relevant experience, and available time commitment.",
  ctaButtonLabel = "Contact the lab",
  ctaButtonHref = "mailto:cmohan@central.uh.edu",
  tracks = [
    { title: "Undergraduate students", text: "Wet-lab and computational experience available during the summer and academic year for committed students.", href: "/archive/undergraduate-students" },
    { title: "Master’s students", text: "Develop advanced biomedical engineering, data, imaging, or assay skills through a translational research program.", href: "/archive/masters-students" },
    { title: "PhD students", text: "Pursue original work across lupus, omics, AI, biomarker discovery, diagnostics, and bioengineering.", href: "/archive/phd-students" },
    { title: "Foreign scholars & medical graduates", text: "Build rigorous research experience in a collaborative, multidisciplinary environment.", href: "/archive/foreign-and-medical-graduates" },
    { title: "MIDAS scholarship", text: "Image and data analytics training at the intersection of biomedical research and computation.", href: "/archive/mohan-lab-image-and-data-analytics-scholarship-midas" },
  ],
}: {
  className?: string;
  introEyebrow?: ReactNode;
  introTitle?: ReactNode;
  introLead?: ReactNode;
  highSchoolEyebrow?: ReactNode;
  highSchoolTitle?: ReactNode;
  highSchoolDescription?: ReactNode;
  highSchoolButtonLabel?: ReactNode;
  highSchoolButtonHref?: string;
  acceptanceValue?: ReactNode;
  acceptanceLabel?: ReactNode;
  durationValue?: ReactNode;
  durationLabel?: ReactNode;
  tracksValue?: ReactNode;
  tracksLabel?: ReactNode;
  programsEyebrow?: ReactNode;
  programsTitle?: ReactNode;
  programsLead?: ReactNode;
  ctaEyebrow?: ReactNode;
  ctaTitle?: ReactNode;
  ctaText?: ReactNode;
  ctaButtonLabel?: ReactNode;
  ctaButtonHref?: string;
  tracks?: DetailLinkItem[];
}) {
  return (
    <div className={`plasmic-full-page ${className}`.trim()}>
      <MohanPageIntro eyebrow={introEyebrow} title={introTitle} lead={introLead} />
      <MohanSectionNav items={[{ label: "High school internship", href: "/opportunities#high-school" }, { label: "Other pathways", href: "/opportunities#programs" }, { label: "Intern cohorts", href: "/opportunities/high-school/cohorts" }, { label: "Program records", href: "/opportunities#records" }]} />
      <section className="internship-feature" id="high-school"><div className="shell internship-feature-grid"><div className="internship-feature-copy"><div className="eyebrow light">{highSchoolEyebrow}</div><SlotHeading level={2}>{highSchoolTitle}</SlotHeading><SlotText>{highSchoolDescription}</SlotText><Link className="button button-white" href={highSchoolButtonHref}>{highSchoolButtonLabel} <span>→</span></Link></div><div className="internship-feature-facts" aria-label="High school internship facts"><div><div className="fact-value">{acceptanceValue}</div><div className="fact-label">{acceptanceLabel}</div></div><div><div className="fact-value">{durationValue}</div><div className="fact-label">{durationLabel}</div></div><div><div className="fact-value">{tracksValue}</div><div className="fact-label">{tracksLabel}</div></div></div></div></section>
      <section className="section-pad opportunity-index" id="programs"><div className="shell"><div className="opportunity-heading"><div className="eyebrow">{programsEyebrow}</div><SlotHeading level={2}>{programsTitle}</SlotHeading><SlotText>{programsLead}</SlotText></div><div className="opportunity-grid">{tracks.map((track, index) => <Link className="opportunity-card" href={track.href} key={`${track.href}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><h2>{track.title}</h2><p>{track.text}</p><strong>Program details <i>↗</i></strong></Link>)}</div></div></section>
      <MohanCallToAction eyebrow={ctaEyebrow} title={ctaTitle} text={ctaText} buttonLabel={ctaButtonLabel} buttonHref={ctaButtonHref} />
    </div>
  );
}

export function MohanRichSection({
  className = "",
  eyebrow = "Mohan Lab",
  title = "Section heading",
  body,
}: { className?: string; eyebrow?: ReactNode; title?: ReactNode; body?: ReactNode }) {
  return (
    <section className={`section-pad ${className}`.trim()}><div className="shell article-grid"><aside><div>{eyebrow}</div><SlotHeading level={2}>{title}</SlotHeading></aside><article className="archive-content compact">{body}</article></div></section>
  );
}

export function MohanContactPanel({
  className = "",
  image = "/media/102-102-serc_01.webp",
  eyebrow = "Visit the lab",
  title = "Visit or contact the Mohan Lab.",
  text = "Our lab is on the second floor of the University of Houston Science & Engineering Research Center.",
  address = "Science & Engineering Research Center\nDepartment of Biomedical Engineering\n3517 Cullen Blvd, Room 2027\nHouston, TX 77204",
  email = "cmohan@central.uh.edu",
}: { className?: string; image?: string; eyebrow?: ReactNode; title?: ReactNode; text?: ReactNode; address?: string; email?: string }) {
  return (
    <section className={`contact-page ${className}`.trim()}>
      <div className="contact-image"><LoadingImage src={image} alt="Science and Engineering Research Center at the University of Houston" width={1600} height={1200} sizes="(max-width: 820px) 100vw, 54vw" /></div>
      <div className="contact-panel"><div className="eyebrow">{eyebrow}</div><SlotHeading level={1}>{title}</SlotHeading><SlotText>{text}</SlotText><div className="contact-details"><div><span>Address</span><address>{address.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}<br /></span>)}</address></div><div><span>Principal investigator</span><a href={`mailto:${email}`}>{email}</a></div></div><div className="contact-actions"><a className="button button-primary" href={`mailto:${email}`}>Send an email <span>↗</span></a><a className="text-link" href="https://maps.google.com/?q=3517+Cullen+Blvd+Houston+TX+77204">Open in Maps <span>↗</span></a></div></div>
    </section>
  );
}
