import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="shell not-found-grid">
        <span aria-hidden="true">404</span>
        <div>
          <p className="eyebrow light">Page not found</p>
          <h1>This page is not in the lab record.</h1>
          <p>
            The address may have changed, or the page may no longer exist.
            Continue from the research overview or browse the complete content directory.
          </p>
          <div className="not-found-actions">
            <Link className="button button-white" href="/research">Explore research <span>→</span></Link>
            <Link className="text-link light" href="/archive">Content directory <span>→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
