"use client";

import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import type { ComponentProps } from "react";
import { PLASMIC } from "./plasmic-init";
import {
  MohanCallToAction,
  MohanContactPanel,
  MohanExpertiseStrip,
  MohanFocusAreas,
  MohanFeaturedProjects,
  MohanHomeHero,
  MohanMissionFeature,
  MohanNewsGrid,
  MohanNewsPage,
  MohanPageFrame,
  MohanPageIntro,
  MohanPeopleDirectory,
  MohanPeopleFeature,
  MohanPeoplePage,
  MohanPublicationsPage,
  MohanResearchPage,
  MohanResearchDirectory,
  MohanRichSection,
  MohanSectionNav,
  MohanInternshipsPage,
} from "./app/plasmic/MohanBlocks";
import {
  plasmicMembers,
  plasmicNews,
  plasmicProjects,
  plasmicPublicationYears,
} from "./app/plasmic/default-content";

// Slot-backed copy can be selected and edited directly on the Plasmic canvas.
const text = (displayName: string, defaultValue: string, _control: "default" | "large" = "default") => ({ type: "slot" as const, displayName, defaultValue });
const fieldText = (displayName: string, defaultValue: string, control: "default" | "large" = "default") => ({ type: "string" as const, displayName, defaultValue, control });
const href = (displayName: string, defaultValue: string) => ({ type: "href" as const, displayName, defaultValue });
const image = (displayName: string, defaultValue: string) => ({ type: "imageUrl" as const, displayName, defaultValue });
const projectFields = {
  slug: { type: "string" as const, displayName: "URL slug" },
  title: { type: "string" as const, displayName: "Title" },
  image: { type: "imageUrl" as const, displayName: "Image" },
  category: { type: "choice" as const, displayName: "Category", options: ["Omics", "Diagnostics", "AI & Digital", "Disease Mechanisms", "Bioengineering"] },
  summary: { type: "string" as const, displayName: "Summary", control: "large" as const },
};

PLASMIC.registerComponent(MohanPageFrame, {
  name: "MohanPageFrame",
  displayName: "Mohan page frame",
  description: "Full-width page canvas for Mohan Lab sections.",
  section: "Mohan Lab · Structure",
  props: {
    children: { type: "slot", displayName: "Page sections", defaultValue: [] },
  },
});

const detailLinkFields = {
  title: { type: "string" as const, displayName: "Title" },
  text: { type: "string" as const, displayName: "Description", control: "large" as const },
  href: { type: "href" as const, displayName: "Destination" },
};

const memberFields = {
  name: { type: "string" as const, displayName: "Name" },
  role: { type: "string" as const, displayName: "Role" },
  email: { type: "string" as const, displayName: "Email" },
  bio: { type: "string" as const, displayName: "Biography", control: "large" as const },
  image: { type: "imageUrl" as const, displayName: "Portrait" },
};

const newsFields = {
  title: { type: "string" as const, displayName: "Title" },
  detail: { type: "string" as const, displayName: "Details", control: "large" as const },
  image: { type: "imageUrl" as const, displayName: "Image" },
  date: { type: "string" as const, displayName: "Date" },
};

PLASMIC.registerComponent(MohanResearchPage, {
  name: "MohanResearchPage",
  displayName: "Research page",
  description: "Complete Mohan Lab research page with all projects and resources.",
  section: "Mohan Lab · Full pages",
  defaultStyles: { width: "100%", maxWidth: "none" },
  props: {
    introEyebrow: text("Page eyebrow", "23 active projects"),
    introTitle: text("Page title", "Research projects"),
    introLead: text("Page introduction", "Mohan Lab research spans autoimmunity, cancer, biomarkers, high-plex omics, diagnostics, artificial intelligence, and bioengineering."),
    methodsEyebrow: text("Methods eyebrow", "Methods & resources"),
    methodsTitle: text("Methods heading", "Platforms used across the lab"),
    methodsLead: text("Methods introduction", "Technical references, research methods, and collaborative resources from the Mohan Lab."),
    projects: { type: "array", displayName: "Projects", defaultValue: plasmicProjects, itemType: { type: "object", fields: projectFields, nameFunc: (item: { title?: string }) => item?.title || "Research project" } },
    resources: { type: "array", displayName: "Methods and resources", defaultValue: [
      { title: "Antibody-based proteomics", text: "Platforms and approaches for large-scale protein measurement.", href: "/archive/antibody-proteomics" },
      { title: "SOMAscan assay", text: "Aptamer-based proteomic measurement and supporting technical documents.", href: "/archive/somascan" },
      { title: "SOMAscan details", text: "Methods, specifications, and reference material for the assay.", href: "/archive/somascan-details" },
      { title: "Meso Scale", text: "Electrochemiluminescence-based biomarker measurement.", href: "/archive/mesoscale" },
      { title: "Houston Omics Collaborative", text: "Proteomics services and collaborative support at the University of Houston.", href: "https://hoc.bme.uh.edu" },
    ], itemType: { type: "object", fields: detailLinkFields, nameFunc: (item: { title?: string }) => item?.title || "Resource" } },
  },
});

PLASMIC.registerComponent(MohanPeoplePage, {
  name: "MohanPeoplePage",
  displayName: "People page",
  description: "Complete current lab member directory.",
  section: "Mohan Lab · Full pages",
  defaultStyles: { width: "100%", maxWidth: "none" },
  props: {
    introEyebrow: text("Page eyebrow", "23 current members"),
    introTitle: text("Page title", "People"),
    introLead: text("Page introduction", "Faculty, research staff, scientists, graduate students, undergraduates, and trainees working across the Mohan Lab."),
    members: { type: "array", displayName: "Lab members", defaultValue: plasmicMembers, itemType: { type: "object", fields: memberFields, nameFunc: (item: { name?: string }) => item?.name || "Lab member" } },
  },
});

PLASMIC.registerComponent(MohanNewsPage, {
  name: "MohanNewsPage",
  displayName: "News page",
  description: "Mohan Lab news and recent activity page.",
  section: "Mohan Lab · Full pages",
  defaultStyles: { width: "100%", maxWidth: "none" },
  props: {
    introEyebrow: text("Page eyebrow", "Mohan Lab · Laboratory record"),
    introTitle: text("Page title", "News & events"),
    introLead: text("Page introduction", "Collaborations, conference presentations, awards, graduations, visitors, and other updates from the lab."),
    newsEyebrow: text("News eyebrow", "Current record · 2026"),
    newsTitle: text("News heading", "From the lab"),
    items: { type: "array", displayName: "News items", defaultValue: plasmicNews, itemType: { type: "object", fields: newsFields, nameFunc: (item: { title?: string }) => item?.title || "News item" } },
  },
});

PLASMIC.registerComponent(MohanPublicationsPage, {
  name: "MohanPublicationsPage",
  displayName: "Publications page",
  description: "Publication collections and complete year index.",
  section: "Mohan Lab · Full pages",
  defaultStyles: { width: "100%", maxWidth: "none" },
  props: {
    introEyebrow: text("Page eyebrow", "Research output"),
    introTitle: text("Page title", "Publications"),
    introLead: text("Page introduction", "Peer-reviewed work by Mohan Lab members and collaborators, organized by year and research area."),
    bibliographyEyebrow: text("Bibliography eyebrow", "Full bibliography"),
    bibliographyTitle: text("Bibliography heading", "Publications by year"),
    bibliographyLead: text("Bibliography introduction", "Select a year to browse author names, journals, DOI links, and indexed identifiers from the lab’s publication record."),
    years: { type: "array", displayName: "Publication years", defaultValue: plasmicPublicationYears.map((year) => ({ year })), itemType: { type: "object", fields: { year: { type: "string", displayName: "Year" } }, nameFunc: (item: { year?: string }) => item?.year || "Year" } },
    collections: { type: "array", displayName: "Research collections", defaultValue: [
      { label: "OMICS & Biomarkers", href: "/archive/manuscripts-on-omics-biomarkers" },
      { label: "Genetics", href: "/archive/manuscripts-on-genetics" },
      { label: "B-cells & Antibodies", href: "/archive/manuscripts-on-b-cells-antibodies" },
      { label: "Renal Disease", href: "/archive/manuscripts-on-renal-disease" },
      { label: "Immunological Mechanisms", href: "/archive/manuscripts-on-immunological-mechanisms-of-autoimmunity" },
      { label: "Therapeutics", href: "/archive/manuscripts-on-therapeutics-natural-alternatives" },
      { label: "Non-invasive Diagnostics", href: "/archive/manuscripts-on-non-invasive-diagnostics" },
    ], itemType: { type: "object", fields: { label: { type: "string", displayName: "Label" }, href: { type: "href", displayName: "Destination" } }, nameFunc: (item: { label?: string }) => item?.label || "Collection" } },
  },
});

PLASMIC.registerComponent(MohanInternshipsPage, {
  name: "MohanInternshipsPage",
  displayName: "Internships page",
  description: "Complete research opportunities and internship overview.",
  section: "Mohan Lab · Full pages",
  defaultStyles: { width: "100%", maxWidth: "none" },
  props: {
    introEyebrow: text("Page eyebrow", "Training & positions"),
    introTitle: text("Page title", "Research opportunities"),
    introLead: text("Page introduction", "Programs and research positions for high school, undergraduate, graduate, and visiting scholars."),
    highSchoolEyebrow: text("Internship eyebrow", "High school students"),
    highSchoolTitle: text("Internship heading", "Mohan Lab Summer Internship (MLSI)"),
    highSchoolDescription: text("Internship description", "Rising seniors can pursue mentored work through an experimental bench track or a computational track spanning AI, machine learning, image analysis, and high-dimensional biomedical data."),
    highSchoolButtonLabel: text("Program button label", "Program details"),
    highSchoolButtonHref: href("Program button destination", "/opportunities/high-school"),
    acceptanceValue: text("Acceptance value", "2%"),
    acceptanceLabel: text("Acceptance label", "Acceptance Rate"),
    durationValue: text("Duration value", "8 weeks"),
    durationLabel: text("Duration label", "of mentored research"),
    tracksValue: text("Tracks value", "2 tracks"),
    tracksLabel: text("Tracks label", "experimental + computational"),
    programsEyebrow: text("Programs eyebrow", "Other pathways"),
    programsTitle: text("Programs heading", "Undergraduate and graduate programs"),
    programsLead: text("Programs introduction", "Each pathway connects applicants with work appropriate to their experience, interests, and available time."),
    ctaEyebrow: text("Contact eyebrow", "Contact"),
    ctaTitle: text("Contact heading", "Questions about research positions"),
    ctaText: text("Contact description", "Include your current stage of study, research interests, relevant experience, and available time commitment."),
    ctaButtonLabel: text("Contact button label", "Contact the lab"),
    ctaButtonHref: href("Contact button destination", "mailto:cmohan@central.uh.edu"),
    tracks: { type: "array", displayName: "Programs", defaultValue: [
      { title: "Undergraduate students", text: "Wet-lab and computational experience available during the summer and academic year for committed students.", href: "/archive/undergraduate-students" },
      { title: "Master’s students", text: "Develop advanced biomedical engineering, data, imaging, or assay skills through a translational research program.", href: "/archive/masters-students" },
      { title: "PhD students", text: "Pursue original work across lupus, omics, AI, biomarker discovery, diagnostics, and bioengineering.", href: "/archive/phd-students" },
      { title: "Foreign scholars & medical graduates", text: "Build rigorous research experience in a collaborative, multidisciplinary environment.", href: "/archive/foreign-and-medical-graduates" },
      { title: "MIDAS scholarship", text: "Image and data analytics training at the intersection of biomedical research and computation.", href: "/archive/mohan-lab-image-and-data-analytics-scholarship-midas" },
    ], itemType: { type: "object", fields: detailLinkFields, nameFunc: (item: { title?: string }) => item?.title || "Program" } },
  },
});

PLASMIC.registerComponent(MohanHomeHero, {
  name: "MohanHomeHero",
  displayName: "Homepage hero",
  description: "The full-width Mohan Lab photo hero and introduction.",
  section: "Mohan Lab · Homepage",
  props: {
    heroImage: image("Lab photograph", "/media/3689-3689-Website-photo_BLURRED-1-scaled.webp"),
    kicker: text("Eyebrow", "University of Houston · Biomedical Engineering"),
    title: text("Title", "Mohan Lab"),
    statement: text("Bold introduction", "Translational biomedical research in autoimmunity, cancer, and chronic disease.", "large"),
    body: text("Supporting introduction", "We combine immunology, high-plex omics, data science, and bioengineering to study disease mechanisms and improve diagnosis.", "large"),
    primaryLabel: text("Primary button", "Research projects"),
    primaryHref: href("Primary link", "/research"),
    secondaryLabel: text("Secondary button", "Lab members"),
    secondaryHref: href("Secondary link", "/people"),
  },
});

PLASMIC.registerComponent(MohanExpertiseStrip, {
  name: "MohanExpertiseStrip",
  displayName: "Expertise strip",
  section: "Mohan Lab · Homepage",
  props: {
    items: {
      type: "array",
      displayName: "Research areas",
      defaultValue: ["Lupus nephritis", "High-plex omics", "Biomarkers", "Liquid biopsy", "AI & digital health", "Bioengineering"].map((label) => ({ label })),
      itemType: { type: "object", fields: { label: { type: "string", displayName: "Label" } }, nameFunc: (item: { label?: string }) => item?.label || "Research area" },
    },
  },
});

PLASMIC.registerComponent(MohanMissionFeature, {
  name: "MohanMissionFeature",
  displayName: "Research overview feature",
  section: "Mohan Lab · Homepage",
  props: {
    image: image("Research image", plasmicProjects[0]?.image || "/media/1-1-1-1024x728.png"),
    eyebrow: text("Eyebrow", "Research overview"),
    title: text("Heading", "Connecting disease biology with measurement."),
    text: text("Description", "The lab studies molecular mechanisms of disease and develops biomarkers, assays, and computational methods for diagnosis and monitoring.", "large"),
    linkLabel: text("Link label", "View all research projects"),
    linkHref: href("Link destination", "/research"),
    noteTitle: text("Image note title", "Spatial and high-plex omics"),
    noteText: text("Image note text", "Mechanisms · biomarkers · clinical translation"),
  },
});

PLASMIC.registerComponent(MohanPageIntro, {
  name: "MohanPageIntro",
  displayName: "Page introduction",
  section: "Mohan Lab · Structure",
  props: {
    eyebrow: text("Eyebrow", "Mohan Lab"),
    title: text("Page title", "Page title"),
    lead: text("Introduction", "Add a concise introduction for this page.", "large"),
  },
});

PLASMIC.registerComponent(MohanSectionNav, {
  name: "MohanSectionNav",
  displayName: "Section navigation",
  section: "Mohan Lab · Structure",
  props: {
    label: fieldText("Navigation label", "Explore this section"),
    items: {
      type: "array",
      displayName: "Links",
      defaultValue: [
        { label: "Research", href: "/research" },
        { label: "People", href: "/people" },
        { label: "Publications", href: "/publications" },
      ],
      itemType: { type: "object", fields: { label: { type: "string", displayName: "Label" }, href: { type: "href", displayName: "Destination" } }, nameFunc: (item: { label?: string }) => item?.label || "Link" },
    },
  },
});

PLASMIC.registerComponent(MohanFocusAreas, {
  name: "MohanFocusAreas",
  displayName: "Research focus cards",
  section: "Mohan Lab · Homepage",
  props: {
    eyebrow: text("Eyebrow", "Research areas"),
    title: text("Heading", "Current areas of investigation"),
    introduction: text("Introduction", "Projects span autoimmune disease, cancer, chronic illness, diagnostics, and biomedical engineering.", "large"),
    items: {
      type: "array",
      displayName: "Focus areas",
      defaultValue: [
        { number: "/01", title: "Disease mechanisms", text: "Spatial and high-plex omics reveal the molecular systems driving lupus, kidney injury, cancer, and inflammatory disease." },
        { number: "/02", title: "Biomarkers & diagnostics", text: "Liquid biopsy and biomarker programs seek precise, less invasive ways to diagnose disease and monitor activity." },
        { number: "/03", title: "Translational bioengineering", text: "AI, microfluidics, 3D models, and rapid tests turn biological findings into tools for research and clinical care." },
      ],
      itemType: { type: "object", fields: { number: { type: "string", displayName: "Number" }, title: { type: "string", displayName: "Title" }, text: { type: "string", displayName: "Description", control: "large" } }, nameFunc: (item: { title?: string }) => item?.title || "Focus area" },
    },
  },
});

PLASMIC.registerComponent(MohanFeaturedProjects, {
  name: "MohanFeaturedProjects",
  displayName: "Selected projects showcase",
  section: "Mohan Lab · Homepage",
  props: {
    eyebrow: text("Eyebrow", "Research"),
    title: text("Heading", "Selected projects"),
    linkLabel: text("Link label", "View all projects"),
    linkHref: href("Link destination", "/research"),
    projects: { type: "array", displayName: "Featured projects", defaultValue: plasmicProjects, itemType: { type: "object", fields: projectFields, nameFunc: (item: { title?: string }) => item?.title || "Research project" } },
  },
});

PLASMIC.registerComponent(MohanPeopleFeature, {
  name: "MohanPeopleFeature",
  displayName: "People feature",
  section: "Mohan Lab · Homepage",
  props: {
    image: image("Lab photograph", "/media/3689-3689-Website-photo_BLURRED-1-scaled.webp"),
    eyebrow: text("Eyebrow", "People"),
    title: text("Heading", "Faculty, staff, and trainees"),
    text: text("Description", "Engineers, data scientists, physicians, and molecular researchers work together across projects, methods, and stages of training.", "large"),
    buttonLabel: text("Button label", "View lab members"),
    buttonHref: href("Button destination", "/people"),
  },
});

PLASMIC.registerComponent(MohanResearchDirectory, {
  name: "MohanResearchDirectory",
  displayName: "Research project directory",
  section: "Mohan Lab · Directories",
  props: {
    projects: { type: "array", displayName: "Projects", defaultValue: plasmicProjects, itemType: { type: "object", fields: projectFields, nameFunc: (item: { title?: string }) => item?.title || "Research project" } },
  },
});

PLASMIC.registerComponent(MohanPeopleDirectory, {
  name: "MohanPeopleDirectory",
  displayName: "Lab member directory",
  section: "Mohan Lab · Directories",
  props: {
    members: {
      type: "array",
      displayName: "Lab members",
      defaultValue: plasmicMembers,
      itemType: { type: "object", fields: { name: { type: "string", displayName: "Name" }, role: { type: "string", displayName: "Role" }, email: { type: "string", displayName: "Email" }, bio: { type: "string", displayName: "Biography", control: "large" }, image: { type: "imageUrl", displayName: "Portrait" } }, nameFunc: (item: { name?: string }) => item?.name || "Lab member" },
    },
  },
});

PLASMIC.registerComponent(MohanNewsGrid, {
  name: "MohanNewsGrid",
  displayName: "Lab news cards",
  section: "Mohan Lab · Directories",
  props: {
    eyebrow: text("Eyebrow", "News"),
    title: text("Heading", "Recent lab activity"),
    items: { type: "array", displayName: "News items", defaultValue: plasmicNews, itemType: { type: "object", fields: { title: { type: "string", displayName: "Title" }, detail: { type: "string", displayName: "Details", control: "large" }, image: { type: "imageUrl", displayName: "Image" }, date: { type: "string", displayName: "Date" } }, nameFunc: (item: { title?: string }) => item?.title || "News item" } },
  },
});

PLASMIC.registerComponent(MohanCallToAction, {
  name: "MohanCallToAction",
  displayName: "Call-to-action band",
  section: "Mohan Lab · Structure",
  props: {
    eyebrow: text("Eyebrow", "Opportunities"),
    title: text("Heading", "Research training at Mohan Lab"),
    text: text("Description", "Information for high school interns, undergraduates, graduate students, and visiting scholars.", "large"),
    buttonLabel: text("Button label", "View internships"),
    buttonHref: href("Button link", "/opportunities"),
  },
});

PLASMIC.registerComponent(MohanRichSection, {
  name: "MohanRichSection",
  displayName: "Editorial text section",
  section: "Mohan Lab · Structure",
  props: {
    eyebrow: text("Eyebrow", "Mohan Lab"),
    title: text("Heading", "Section heading"),
    body: { type: "slot", displayName: "Content", defaultValue: [{ type: "text", value: "Add text, images, buttons, or other blocks here." }] },
  },
});

PLASMIC.registerComponent(MohanContactPanel, {
  name: "MohanContactPanel",
  displayName: "Contact page",
  section: "Mohan Lab · Directories",
  props: {
    image: image("Building photograph", "/media/102-102-serc_01.webp"),
    eyebrow: text("Eyebrow", "Visit the lab"),
    title: text("Heading", "Visit or contact the Mohan Lab."),
    text: text("Introduction", "Our lab is on the second floor of the University of Houston Science & Engineering Research Center.", "large"),
    address: fieldText("Address", "Science & Engineering Research Center\nDepartment of Biomedical Engineering\n3517 Cullen Blvd, Room 2027\nHouston, TX 77204", "large"),
    email: fieldText("Email", "cmohan@central.uh.edu"),
  },
});

export function ClientPlasmicRootProvider(
  props: Omit<ComponentProps<typeof PlasmicRootProvider>, "loader">,
) {
  return <PlasmicRootProvider loader={PLASMIC} {...props} />;
}

export { PLASMIC };
