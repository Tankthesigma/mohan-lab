"use client";

import { useState } from "react";

type PublicationResponse = {
  year: string;
  html: string;
};

export function PublicationYears({ years }: { years: string[] }) {
  const [openYear, setOpenYear] = useState("");
  const [yearContent, setYearContent] = useState<Record<string, string>>({});
  const [loadingYear, setLoadingYear] = useState("");
  const [errorYear, setErrorYear] = useState("");

  async function toggleYear(year: string) {
    if (openYear === year) {
      setOpenYear("");
      return;
    }

    setOpenYear(year);
    setErrorYear("");
    if (yearContent[year]) return;

    setLoadingYear(year);
    try {
      const response = await fetch(`/api/publications/${encodeURIComponent(year)}`);
      if (!response.ok) throw new Error(`Publication request failed: ${response.status}`);
      const data = await response.json() as PublicationResponse;
      setYearContent((current) => ({ ...current, [year]: data.html }));
    } catch {
      setErrorYear(year);
    } finally {
      setLoadingYear("");
    }
  }

  return (
    <div className="publication-years">
      {years.map((year) => {
        const open = openYear === year;
        const loading = loadingYear === year;
        const failed = errorYear === year;
        const panelId = `publications-${year}`;
        const buttonId = `${panelId}-toggle`;
        return (
          <section className={`publication-year ${open ? "is-open" : ""}`} key={year}>
            <button
              id={buttonId}
              className="publication-year-toggle"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => void toggleYear(year)}
            >
              <span>{year}</span>
              <small>
                {loading
                  ? "Loading publications"
                  : open
                    ? "Hide publications"
                    : "View publications"}
              </small>
              <i aria-hidden="true" />
            </button>
            <div
              aria-labelledby={buttonId}
              className="publication-year-panel"
              id={panelId}
              hidden={!open}
              role="region"
            >
              {loading && (
                <p className="publication-year-status" role="status">
                  Loading {year} publications…
                </p>
              )}
              {failed && (
                <p className="publication-year-status error" role="alert">
                  Publications could not be loaded. Close this year and try again.
                </p>
              )}
              {yearContent[year] && (
                <div
                  className="archive-content bibliography"
                  dangerouslySetInnerHTML={{ __html: yearContent[year] }}
                />
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
