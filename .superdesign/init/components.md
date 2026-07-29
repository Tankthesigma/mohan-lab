# Shared UI components

Framework: React 19 with Next.js-compatible Vinext routing. Components are custom React components styled through the global stylesheet.

## PageIntro
- Source: `app/components/PageIntro.tsx`
- Shared editorial page heading with eyebrow, title, and lead.
```tsx
export function PageIntro({
  eyebrow,
  title,
  lead,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  className?: string;
}) {
  return (
    <section className={`page-intro ${className}`.trim()}>
      <div className="shell intro-grid">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}
```

## SectionNav
- Source: `app/components/SectionNav.tsx`
- Contextual in-page navigation used across inner sections.
```tsx
import Link from "next/link";

type SectionNavItem = {
  label: string;
  href: string;
};

export function SectionNav({
  label = "In this section",
  items,
}: {
  label?: string;
  items: SectionNavItem[];
}) {
  return (
    <nav className="section-nav" aria-label={label}>
      <div className="shell section-nav-inner">
        <strong>{label}</strong>
        <div>
          {items.map((item) => (
            <Link href={item.href} key={`${item.href}-${item.label}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

## PublicationYears
- Source: `app/components/PublicationYears.tsx`
- Accessible accordion for year-grouped publication bibliographies.
```tsx
"use client";

import { useState } from "react";
import type { PublicationYear } from "../lib/content";

export function PublicationYears({ years }: { years: PublicationYear[] }) {
  const [openYear, setOpenYear] = useState("");

  return (
    <div className="publication-years">
      {years.map(({ year, html }) => {
        const open = openYear === year;
        const panelId = `publications-${year}`;
        return (
          <section className={`publication-year ${open ? "is-open" : ""}`} key={year}>
            <button
              className="publication-year-toggle"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenYear(open ? "" : year)}
            >
              <span>{year}</span>
              <small>{open ? "Hide publications" : "View publications"}</small>
              <i aria-hidden="true" />
            </button>
            <div className="publication-year-panel" id={panelId} hidden={!open}>
              <div className="archive-content bibliography" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
```

## ResearchGrid
- Source: `app/components/ResearchGrid.tsx`
- Filterable research project grid with project imagery and taxonomy.
```tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "../lib/content";

const categories = ["All", "Omics", "Diagnostics", "AI & Digital", "Disease Mechanisms", "Bioengineering"];

export function ResearchGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");
  const visible = useMemo(
    () => category === "All" ? projects : projects.filter((project) => project.category === category),
    [category, projects],
  );

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter research projects">
        {categories.map((item) => (
          <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} type="button" key={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="research-grid">
        {visible.map((project, index) => (
          <Link className="research-card" href={`/research/${project.slug}`} key={project.slug}>
            <div className="research-card-image">
              <img src={project.image} alt="" loading="lazy" decoding="async" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="research-card-copy">
              <span>{project.category}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <strong>Explore project <i>↗</i></strong>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
```
