import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoadingImage } from "../../components/LoadingImage";
import { cleanSourceHtml, getPage, getProject, projects, textOnly } from "../../lib/content";
import { pageMetadata } from "../../lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata(project.title, project.summary);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const page = getPage(slug);
  if (!project || !page) notFound();
  const body = cleanSourceHtml(page.content.rendered);

  return (
    <>
      <section className="project-hero">
        <div className="project-hero-image">
          <LoadingImage src={project.image} alt="" width={1800} height={1200} sizes="100vw" priority />
        </div>
        <div className="project-hero-wash" />
        <div className="shell project-hero-content">
          <Link href="/research">← All research</Link>
          <span className="eyebrow light">{project.category}</span>
          <h1>{project.title}</h1>
        </div>
      </section>
      <section className="section-pad project-body">
        <div className="shell article-grid">
          <aside>
            <span>Research program</span>
            <p>{textOnly(page.excerpt.rendered) || "An active Mohan Lab translational research program."}</p>
            <Link className="text-link" href="/contact">Discuss this work <b>→</b></Link>
          </aside>
          <article className="archive-content" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </section>
    </>
  );
}
