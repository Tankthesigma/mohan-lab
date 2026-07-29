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
