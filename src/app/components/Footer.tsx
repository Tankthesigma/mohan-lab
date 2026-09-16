import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div className="footer-statement">
          <span className="eyebrow light">Mohan Lab · Biomedical Engineering</span>
          <h2>Translational research in autoimmunity, biomarkers, and bioengineering.</h2>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/research">Research</Link>
            <Link href="/people">People</Link>
            <Link href="/publications">Publications</Link>
          </div>
          <div>
            <strong>Connect</strong>
            <Link href="/opportunities">Join the lab</Link>
            <Link href="/news">Lab news</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://hoc.bme.uh.edu">Houston Omics Collaborative</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>University of Houston · Department of Biomedical Engineering</span>
        <span>3517 Cullen Blvd · Houston, TX 77204</span>
      </div>
    </footer>
  );
}
