# Shared layouts

## RootLayout
- Source: `app/layout.tsx`
- Global document shell, metadata, header, motion controller, main region, and footer.
```tsx
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SiteMotion } from "./components/SiteMotion";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;
  const description = "The Mohan Lab at the University of Houston advances lupus, autoimmunity, cancer, and chronic disease research through omics, biomarkers, AI, and bioengineering.";
  return {
    title: {
      default: "Mohan Lab | Translational Omics & Autoimmunity Research",
      template: "%s | Mohan Lab",
    },
    description,
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: {
      title: "Mohan Lab | Understanding disease. Improving diagnosis.",
      description,
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Mohan Lab at the University of Houston" }],
    },
    twitter: { card: "summary_large_image", title: "Mohan Lab", description, images: [socialImage] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteMotion />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## Header
- Source: `app/components/Header.tsx`
- Fixed two-level institutional header with mobile menu and active route states.
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["Research", "/research"],
  ["People", "/people"],
  ["Publications", "/publications"],
  ["News", "/news"],
  ["Opportunities", "/opportunities"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={open ? "is-open" : ""} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href || pathname.startsWith(`${href}/`) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link className="nav-contact" href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
```

## Footer
- Source: `app/components/Footer.tsx`
- Sitewide institutional footer with research statement, section links, and address.
```tsx
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
            <Link href="/archive">Content directory</Link>
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
```

## SiteMotion
- Source: `app/components/SiteMotion.tsx`
- Sitewide scroll reveal controller with reduced-motion support.
```tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealGroups: Array<[string, string]> = [
  [".mission-grid > *", "rise"],
  [".section-heading", "rise"],
  [".focus-card", "rise"],
  [".showcase-card", "rise"],
  [".people-feature-grid > *", "rise"],
  [".news-card", "rise"],
  [".intro-grid > *", "rise"],
  [".research-card", "card"],
  [".member-card-modern", "rise"],
  [".opportunity-card", "rise"],
  [".application-grid > *", "rise"],
  [".article-grid > *", "rise"],
  [".publication-section-heading", "rise"],
];

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets: HTMLElement[] = [];
    revealGroups.forEach(([selector, effect]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.reveal = effect;
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 45}ms`);
        targets.push(element);
      });
    });

    root.classList.add("motion-ready");
    if (reducedMotion) {
      root.classList.add("site-loaded", "motion-reduced");
      targets.forEach((element) => element.classList.add("is-visible"));
      return () => {
        root.classList.remove("motion-ready", "site-loaded", "motion-reduced");
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.classList.add("is-visible");
        observer?.unobserve(element);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

    targets.forEach((element) => observer?.observe(element));

    const loadFrame = requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("site-loaded")));

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(loadFrame);
      root.classList.remove("motion-ready", "site-loaded");
      targets.forEach((element) => {
        element.classList.remove("is-visible");
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
```
