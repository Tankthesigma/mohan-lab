import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SiteMotion } from "./components/SiteMotion";
import "./globals.css";

const description = "The Mohan Lab at the University of Houston advances lupus, autoimmunity, cancer, and chronic disease research through omics, biomarkers, AI, and bioengineering.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohanlab.bme.uh.edu"),
  title: {
    default: "Mohan Lab | Translational Omics & Autoimmunity Research",
    template: "%s | Mohan Lab",
  },
  description,
  openGraph: {
    title: "Mohan Lab | Understanding disease. Improving diagnosis.",
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Mohan Lab at the University of Houston" }],
  },
  twitter: { card: "summary_large_image", title: "Mohan Lab", description, images: ["/og.jpg"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <noscript>
          <style>{`.loading-image::before{display:none}.loading-image>img{opacity:1!important}`}</style>
        </noscript>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteMotion />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
