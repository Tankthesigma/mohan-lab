import type { Metadata } from "next";

const siteName = "Mohan Lab";
const socialImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Mohan Lab at the University of Houston",
};

export function pageMetadata(title: string, description: string): Metadata {
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
