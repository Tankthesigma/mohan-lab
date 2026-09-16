"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "../lib/content";
import { LoadingImage } from "./LoadingImage";

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
          <button
            aria-pressed={category === item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
            type="button"
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="research-grid">
        {visible.map((project, index) => (
          <Link className="research-card" href={`/research/${project.slug}`} key={project.slug}>
            <div className="research-card-image">
              <LoadingImage
                src={project.image}
                alt=""
                width={800}
                height={600}
                sizes="(max-width: 560px) 100vw, (max-width: 820px) 220px, 280px"
              />
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
