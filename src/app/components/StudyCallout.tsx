import Link from "next/link";

export function StudyCallout() {
  return (
    <section className="study-callout" aria-labelledby="study-callout-title">
      <div className="shell study-callout-grid">
        <div>
          <span className="eyebrow">Research participation</span>
          <h2 id="study-callout-title">Digital phenotyping study</h2>
          <p>Female UH students aged 18+: help researchers study stress, cognition, and digital health over three months. A Fitbit is provided.</p>
        </div>
        <Link className="button button-primary" href="/research/digital-phenotyping">Eligibility & registration <span>→</span></Link>
      </div>
    </section>
  );
}
