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
