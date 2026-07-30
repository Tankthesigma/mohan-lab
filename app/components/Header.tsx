"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Research", "/research"],
  ["People", "/people"],
  ["Publications", "/publications"],
  ["News", "/news"],
  ["Opportunities", "/opportunities"],
  ["HOC Core", "https://hoc.bme.uh.edu"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="utility-shell">
          <span>University of Houston · Cullen College of Engineering</span>
          <nav aria-label="Utility navigation">
            <Link href="/archive">Content directory</Link>
            <Link href="/opportunities">Join the lab</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
      <div className="nav-shell">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Mohan Lab home">
          <span className="brand-mark" aria-hidden="true"><span>M</span><i /></span>
          <span className="brand-copy">
            <strong>Mohan Lab</strong>
            <small>University of Houston</small>
          </span>
        </Link>
        <button
          ref={menuButton}
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={open ? "is-open" : ""} aria-label="Primary navigation">
          {links.map(([label, href]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Link
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="nav-contact"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
