import { createPublicationYears } from "./publications";
import { createLatestNews } from "./news";
import { sourceDestination } from "./source-routes";
import pagesJson from "@/content-source/pages.json";
import postsJson from "@/content-source/posts.json";
import mediaJson from "@/content-source/media.json";
import siteMediaJson from "@/content-source/site-media-map.json";
import sanitizeHtml from "sanitize-html";

type Rendered = { rendered: string };

export type SourcePage = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: Rendered;
  content: Rendered;
  excerpt: Rendered;
  featured_media: number;
  parent?: number;
};

export type Project = {
  slug: string;
  title: string;
  image: string;
  category: "Omics" | "Diagnostics" | "AI & Digital" | "Disease Mechanisms" | "Bioengineering";
  summary: string;
};

export type Member = {
  name: string;
  role: string;
  email: string;
  bio: string;
  image: string;
};

export type PublicationYear = {
  year: string;
  html: string;
};


export type HighSchoolIntern = {
  name: string;
  school: string;
  project: string;
  image: string;
};

export type HighSchoolInternCohort = {
  year: string;
  interns: HighSchoolIntern[];
};

export const pages = pagesJson as SourcePage[];
export const posts = postsJson as SourcePage[];

const originalMediaMap = (siteMediaJson as { map: Record<string, string> }).map;
const mediaIndex: Record<string, string> = {};
const mediaKeyIndex: Record<string, string> = {};

function mediaKey(value: string) {
  try {
    const parsed = new URL(decodeHtml(value).replace(/^http:/, "https:"));
    const pathParts = parsed.pathname.split("/");
    const filename = pathParts.pop()?.toLowerCase() || "";
    const extensionless = filename.replace(/\.[^.]+$/, "");
    const normalized = extensionless
      .replace(/-\d+x\d+$/, "")
      .replace(/-scaled$/, "")
      .replace(/-e\d+$/, "");
    return `${pathParts.join("/")}/${normalized}`;
  } catch {
    return value;
  }
}

for (const [url, local] of Object.entries(originalMediaMap)) {
  const normalizedUrl = url.replace(/^http:/, "https:");
  mediaIndex[normalizedUrl] = local;
  mediaKeyIndex[mediaKey(normalizedUrl)] = local;
}

for (const media of mediaJson as Array<{
  slug: string;
  source_url: string;
  media_details?: { sizes?: Record<string, { source_url?: string }> };
}>) {
  const sourceUrl = media.source_url.replace(/^http:/, "https:");
  const local = mediaIndex[sourceUrl] || mediaKeyIndex[mediaKey(sourceUrl)];
  if (!local) continue;
  mediaKeyIndex[mediaKey(sourceUrl)] = local;
  for (const size of Object.values(media.media_details?.sizes || {})) {
    if (!size.source_url) continue;
    const sizeUrl = size.source_url.replace(/^http:/, "https:");
    mediaIndex[sizeUrl] = local;
    mediaKeyIndex[mediaKey(sizeUrl)] = local;
  }
}

export function decodeHtml(value: string) {
  return value
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)));
}

export function textOnly(value: string) {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function polishStructuredCopy(value: string) {
  return value
    .replace(/\bany types of samples\b/gi, "any type of sample")
    .replace(/\bin-vitro\b/gi, "in vitro")
    .replace(/\bprojects focuses\b/gi, "projects focus")
    .replace(/\bpredicitng\b/gi, "predicting")
    .replace(/\btge\b/gi, "the")
    .replace(/\bThese novel biomarkers helps to monitor\b/g, "These novel biomarkers help monitor")
    .replace(/\bidentify the flares\b/gi, "identify flares")
    .replace(/\bwithout the invasive renal biopsies\b/gi, "without invasive renal biopsies")
    .replace(/\bfocuses on Unravelling\b/g, "focuses on unraveling")
    .replace(/\bI aim to better understand\b/g, "his work aims to better understand")
    .replace(/\bEzra\s+[‘']s\b/g, "Ezra’s")
    .replace(/\s+([,.;:)])/g, "$1")
    .replace(/\(\s+/g, "(");
}

export function resolveMedia(url: string) {
  const clean = decodeHtml(url).replace(/^http:/, "https:");
  return mediaIndex[clean] || mediaKeyIndex[mediaKey(clean)] || clean;
}

const attachmentMediaIndex: Record<string, string> = Object.fromEntries(
  (mediaJson as Array<{ slug: string; source_url: string }>).map((media) => [
    media.slug,
    resolveMedia(media.source_url),
  ]),
);
attachmentMediaIndex["untitled-design"] = "/media/untitled-design-2024.webp";

function legacyExternalDestination(value: string) {
  const url = decodeHtml(value);

  if (/future-science\.com\/doi\/abs\/10\.4155\/fsoa-2017-0047/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/28884017/";
  }
  if (/ovidsp\.tx\.ovid\.com\/.*Complete\+Reference=S\.sh\.15%7c1%7c1/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/22341910/";
  }
  if (/ovidsp\.tx\.ovid\.com\/.*Complete\+Reference=S\.sh\.15%7c2%7c1/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/21858050/";
  }
  if (/ovidsp\.tx\.ovid\.com\/sp-3\.5\.1a\/.*Complete\+Reference=S\.sh\.15%7c3%7c1/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/21787222/";
  }
  if (/ovidsp\.tx\.ovid\.com\/sp-3\.5\.1a\/.*Complete\+Reference=S\.sh\.15%7c6%7c1/i.test(url)) {
    return "https://doi.org/10.1038/ki.2011.121";
  }
  if (/ovidsp\.tx\.ovid\.com\/sp-3\.2\.4a\/.*Complete\+Reference=S\.sh\.15%7c3%7c1/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/20810985/";
  }
  if (/ovidsp\.tx\.ovid\.com\/sp-3\.2\.4a\/.*Complete\+Reference=S\.sh\.15%7c4%7c1/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/20504883/";
  }
  if (/ovidsp\.tx\.ovid\.com\/sp-3\.2\.4a\/.*Complete\+Reference=S\.sh\.15%7c5%7c1/i.test(url)) {
    return "https://doi.org/10.1016/j.jaut.2009.11.001";
  }
  if (/arthritis-research\.com\/content\/13\/5\/240/i.test(url)) {
    return "https://doi.org/10.1186/ar3378";
  }
  if (/apps\.isiknowledge\.com(?::80)?\/CCC\/.*doc=2\/4/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/17195045/";
  }
  if (/apps\.isiknowledge\.com(?::80)?\/CCC\/.*doc=2\/6/i.test(url)) {
    return "https://pubmed.ncbi.nlm.nih.gov/17127457/";
  }
  if (/springerlink\.com\/content\/120001/i.test(url)) {
    return "https://doi.org/10.1007/s00005-008-0007-4";
  }
  if (/futuremedicine\.com\/(?:action\/doSearch|loi\/frm)/i.test(url)) {
    return "https://www.openaccessjournals.com/articles/bcell-tolerance-checkpoint-violations-in-systemic-lupus-erythematosus.pdf";
  }
  if (/estore\.somalogic\.com\/Default\.aspx/i.test(url)) {
    return "https://somalogic.com/";
  }
  if (/sciencedirect\.com\/.*scopusAuthorDocuments.*author%3DMohan/i.test(url)) {
    return "https://www.bme.uh.edu/faculty/mohan";
  }
  return "";
}

function routeForSourceUrl(url: string) {
  try {
    const legacyDestination = legacyExternalDestination(url);
    if (legacyDestination) return legacyDestination;
    const localMedia = resolveMedia(url);
    if (localMedia.startsWith("/media/")) return localMedia;
    const parsed = new URL(decodeHtml(url));
    if (parsed.hostname !== "mohanlab.bme.uh.edu") return decodeHtml(url);
    const slug = parsed.pathname.split("/").filter(Boolean).at(-1) || "";
    if (!slug || slug === "mohan-lab-draft") return "/";
    const destination = sourceDestination(slug, projectSlugs);
    if (destination) return destination;
    if (slug === "research") return "/research";
    if (slug === "people") return "/people";
    if (slug === "publications") return "/publications";
    if (slug === "news") return "/news";
    if (slug === "contact") return "/contact";
    if (slug === "houston-omics-collaborative" || slug === "hoc") return "https://hoc.bme.uh.edu";
    if (pages.some((page) => page.slug === slug) || posts.some((post) => post.slug === slug)) return "/research";
    if (attachmentMediaIndex[slug]) return attachmentMediaIndex[slug];
    return url;
  } catch {
    return url;
  }
}

export function cleanSourceHtml(source: string) {
  let html = source
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<\/?(?:section|div)\b[^>]*>/gi, "")
    .replace(/\s(?:data-[\w-]+|aria-[\w-]+|class|id|style|sizes|srcset)=("[^"]*"|'[^']*')/gi, "")
    .replace(/\son\w+=("[^"]*"|'[^']*')/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/gi, "");

  html = html.replace(
    /<a\b[^>]*href=("|')https?:\/\/(?:www\.)?clinlabint\.com\/digital-editions\/3d-issues\/cli-october-2020\/?\1[^>]*>([\s\S]*?)<\/a>/gi,
    "$2",
  );
  html = html.replace(/\b(src|poster)=("|')([^"']+)(\2)/gi, (_, attr, quote, url) => {
    return `${attr}=${quote}${resolveMedia(url)}${quote}`;
  });
  html = html.replace(/<img\b(?![^>]*\bloading=)([^>]*)>/gi, '<img loading="lazy"$1>');
  html = html.replace(/<img\b(?![^>]*\bdecoding=)([^>]*)>/gi, '<img decoding="async"$1>');
  html = html.replace(/\bhref=("|')([^"']+)(\1)/gi, (_, quote, url) => {
    return `href=${quote}${routeForSourceUrl(url)}${quote}`;
  });
  html = sanitizeHtml(html, {
    allowedTags: [
      "a", "address", "article", "b", "blockquote", "br", "caption", "code",
      "col", "colgroup", "dd", "del", "details", "dl", "dt", "em", "figcaption",
      "figure", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins",
      "li", "mark", "ol", "p", "pre", "s", "small", "source", "span", "strong",
      "sub", "summary", "sup", "table", "tbody", "td", "tfoot", "th", "thead",
      "tr", "u", "ul", "video",
    ],
    allowedAttributes: {
      "*": ["title"],
      a: ["aria-label", "href", "rel", "target"],
      col: ["span", "width"],
      colgroup: ["span", "width"],
      img: ["alt", "decoding", "height", "loading", "src", "width"],
      source: ["src", "type"],
      table: ["border", "cellpadding", "cellspacing", "summary", "width"],
      td: ["colspan", "headers", "rowspan", "scope"],
      th: ["abbr", "colspan", "headers", "rowspan", "scope"],
      video: ["autoplay", "controls", "height", "loop", "muted", "poster", "preload", "src", "width"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
    transformTags: {
      h1: (_tagName, attributes) => ({
        tagName: "h2",
        attribs: attributes,
      }),
      a: (tagName, attributes) => ({
        tagName,
        attribs: attributes.target === "_blank"
          ? { ...attributes, rel: "noopener noreferrer" }
          : attributes,
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: { ...attributes, loading: "lazy", decoding: "async" },
      }),
    },
  });

  // Older bibliography entries often store useful identifiers as plain text.
  // Turn only explicit URLs, DOIs, and PMIDs into links; citations without an
  // identifier remain unchanged rather than guessing at a destination.
  html = html
    .split(/(<a\b[\s\S]*?<\/a>)/gi)
    .map((chunk) => {
      if (/^<a\b/i.test(chunk)) return chunk;
      return chunk.replace(/>([^<]+)</g, (_match, text: string) => {
        const linked = text.replace(
          /(https?:\/\/[^\s<]+)|(doi:\s*(10\.\d{4,9}\/[-._;()/:a-z0-9]+))|(PMID:\s*(\d+))/gi,
          (identifier, url: string | undefined, _doiLabel: string | undefined, doi: string | undefined, _pmidLabel: string | undefined, pmid: string | undefined) => {
            const trailing = identifier.match(/[.,;]+$/)?.[0] || "";
            const label = trailing ? identifier.slice(0, -trailing.length) : identifier;
            const href = url
              ? label
              : doi
                ? `https://doi.org/${doi.replace(/[.,;]+$/, "")}`
                : `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>${trailing}`;
          },
        );
        return `>${linked}<`;
      });
    })
    .join("");

  html = html.replace(
    /<a\b([^>]*)>\s*((?:<img\b[^>]*>\s*)+)<\/a>/gi,
    (link, attributes: string, images: string) => {
      if (/\baria-label=/i.test(attributes)) return link;
      const hasAlt = [...images.matchAll(/\balt=(["'])([\s\S]*?)\1/gi)]
        .some((match) => match[2].trim());
      if (hasAlt) return link;
      return `<a${attributes} aria-label="Open linked image">${images}</a>`;
    },
  );

  let previousHeadingLevel = 1;
  return html.replace(
    /<h([1-6])(\b[^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_heading, levelValue: string, attributes: string, contents: string) => {
      const sourceLevel = Number(levelValue);
      const level = Math.min(sourceLevel, previousHeadingLevel + 1);
      previousHeadingLevel = level;
      return `<h${level}${attributes}>${contents}</h${level}>`;
    },
  );
}

const home = pages.find((page) => page.id === 1167)!;
const anchorRegex = /<a\b[^>]*href=["']https?:\/\/mohanlab\.bme\.uh\.edu\/([^"'#?]+)\/?["'][^>]*>([\s\S]*?)<\/a>/gi;
const parsedProjects: Project[] = [];
const projectSummaryFallbacks: Record<string, string> = {
  "aptamer-based-screen":
    "This project analyzes stool proteins to identify biomarkers associated with strictures and fistulas in Crohn’s disease.",
  "nanoparticles":
    "This project uses SomaScan proteomics to identify stool biomarkers for inflammatory bowel disease.",
};

for (const match of home.content.rendered.matchAll(anchorRegex)) {
  const slug = match[1].replace(/\/$/, "");
  const sourcePage = pages.find((page) => page.slug === slug);
  if (!sourcePage || match.index === undefined) continue;
  const preceding = home.content.rendered.slice(0, match.index);
  const mediaTags = [...preceding.matchAll(/<(img|video)\b[^>]+>/gi)];
  const mediaTag = mediaTags.at(-1)?.[0] || "";
  const isVideo = /^<video/i.test(mediaTag);
  const mediaUrl = isVideo
    ? (mediaTag.match(/poster=["']([^"']+)/i)?.[1] || mediaTag.match(/src=["']([^"']+)/i)?.[1] || "")
    : (mediaTag.match(/src=["']([^"']+)/i)?.[1] || "");
  const title = textOnly(match[2]);
  let category: Project["category"] = "Disease Mechanisms";
  if (/omics|proteom|transcript|metabol|somascan|taxonomy/i.test(title)) category = "Omics";
  if (/diagnos|biomarker|biopsy|rapid|array|epitope|autoantibod/i.test(title)) category = "Diagnostics";
  if (/AI|digital phenotyping|blood-brain|cognitive/i.test(title)) category = "AI & Digital";
  if (/engineer|microfluidic|dialysis|tubule|mechanical/i.test(title)) category = "Bioengineering";
  const description = textOnly(sourcePage.excerpt.rendered);
  parsedProjects.push({
    slug,
    title,
    image: resolveMedia(mediaUrl),
    category,
    summary: description || projectSummaryFallbacks[slug] || "Project details and supporting material from the Mohan Lab.",
  });
}

export const projects = parsedProjects;
export const projectSlugs = new Set(projects.map((project) => project.slug));

const membersPage = pages.find((page) => page.id === 197)!;
const memberRegex = /<div class="member-card">\s*<div class="member-photo">([\s\S]*?)<\/div>\s*<div class="member-info">([\s\S]*?)<\/div>\s*<\/div>/gi;

export const members: Member[] = [...membersPage.content.rendered.matchAll(memberRegex)].map((match) => {
  const photo = match[1].match(/src=["']([^"']+)/i)?.[1] || "";
  const name = textOnly(match[2].match(/<strong>([\s\S]*?)<\/strong>/i)?.[1] || "");
  const email = decodeHtml(match[2].match(/mailto:([^"']+)/i)?.[1] || "");
  const firstParagraph = match[2].match(/<p>([\s\S]*?)<\/p>/i)?.[1] || "";
  const firstLines = firstParagraph.split(/<br\s*\/?\s*>/i).map(textOnly).filter(Boolean);
  const role = (firstLines.find((line) => line !== name && line !== email) || "Mohan Lab Researcher")
    .replace(/\bResearch Tech1\b/, "Research Tech I");
  const paragraphs = [...match[2].matchAll(/<p>([\s\S]*?)<\/p>/gi)].slice(1).map((part) => textOnly(part[1])).filter(Boolean);
  return { name, role, email, bio: polishStructuredCopy(paragraphs.join(" ")), image: resolveMedia(photo) };
}).filter((member) => member.name);

const internProfileOverrides: Record<string, { name?: string; project: string }> = {
  "Anubhav Mahapatra": {
    name: "Anubhav Mohapatra",
    project: "Anubhav’s project focuses on developing a novel, upgraded transepithelial-transendothelial electrical resistance (TEER) device with Arduino to monitor Blood Brain Barrier (BBB) integrity and automate detection of tissue-barrier breaches associated with Neuropsychiatric Systemic Lupus Erythematosus (NPSLE).",
  },
  "Kushagra Nagar": {
    project: "Kushagra’s project focuses on adapting histopathology foundation models, such as Phikon-v2, for glomeruli classification under limited labeled data. He compares parameter-efficient fine-tuning methods like LoRA, BitFit, and linear probing against layer-wise training to improve performance, efficiency, and reliability for real-world kidney pathology workflows. Alongside this, he is developing the accompanying manuscript’s literature review, synthesizing evidence across lupus nephritis pathology, the shift from conventional CNNs to foundation models, and existing benchmarking work to motivate a falsifiable hypothesis on when foundation models outperform conventional baselines.",
  },
  "Tanmay Vasudeva": {
    project: "Tanmay’s project at the Mohan Lab focuses on analyzing patient proteomics data to identify biomarkers that may predict Crohn’s disease complications. He also studies proteins involved in blood-brain barrier disruption in NPSLE and is helping develop a kidney gene knockout model to predict how specific genes or receptors affect kidney pathways.",
  },
};

function removeRepeatedProfileCopy(value: string) {
  return value.match(/^(.+?[.!?])\s+\1$/)?.[1] || value;
}

export const highSchoolInternCohorts: HighSchoolInternCohort[] = (() => {
  const source = pages.find((page) => page.slug === "former-high-school-summer-interns")?.content.rendered || "";
  const headings = [...source.matchAll(/<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi)]
    .map((match) => ({
      index: match.index ?? 0,
      year: textOnly(match[1]).match(/(?:19|20)\d{2}/)?.[0] || "",
    }))
    .filter((heading) => heading.year);

  return headings.map((heading, headingIndex) => {
    const section = source.slice(heading.index, headings[headingIndex + 1]?.index ?? source.length);
    const images = [...section.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)/gi)];
    const interns: HighSchoolIntern[] = [];

    images.forEach((image, imageIndex) => {
      const afterImage = section.slice(
        (image.index ?? 0) + image[0].length,
        images[imageIndex + 1]?.index ?? section.length,
      );
      const emphasizedBlocks = [
        ...afterImage.matchAll(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi),
        ...afterImage.matchAll(/<b\b[^>]*>([\s\S]*?)<\/b>/gi),
      ].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
      const boldText = emphasizedBlocks
        .map((match) => textOnly(match[1]).replace(/\s+([,.;:)])/g, "$1").replace(/\(\s+/g, "("))
        .find((value) => value.length > 2 && !/^post-internship/i.test(value));
      if (!boldText) return;

      const parenthetical = boldText.match(/^(.+?)\s*\((.+)\)$/);
      const narrativeName = boldText.match(/^(.+?)\s+is\s+(?:a|an)\b/i)?.[1]?.trim();
      const name = parenthetical?.[1]?.trim() || narrativeName || boldText.trim();
      const paragraphs = [...afterImage.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((match) => textOnly(match[1]).replace(/\s+([,.;:)])/g, "$1").replace(/\(\s+/g, "("))
        .filter((value) => value.length > 45 && !/^post-internship update/i.test(value));
      const project = removeRepeatedProfileCopy(
        paragraphs.find((value) => value !== boldText) || (narrativeName ? boldText : ""),
      );
      const profileText = project || boldText;
      const inferredSchool = profileText
        .match(/(?:senior|student)\s+at\s+(.+?)(?:,\s+(?:with|where)|\.\s+(?:He|She|They|His|Her|Their)\b| who | and has |$)/i)?.[1]
        ?.trim()
        .replace(/\s+in\s+[^,]+(?:,\s*[^,]+)?$/i, "");
      const profileOverride = internProfileOverrides[name];

      interns.push({
        name: profileOverride?.name || name,
        school: parenthetical?.[2]?.trim() || inferredSchool || "MLSI participant",
        project: profileOverride?.project || polishStructuredCopy(project),
        image: resolveMedia(image[1]),
      });
    });

    return { year: heading.year, interns };
  }).filter((cohort) => cohort.interns.length);
})();

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export const publicationYears = createPublicationYears(
  getPage("publications")?.content.rendered || "",
  textOnly,
  cleanSourceHtml,
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const heroImage = resolveMedia(
  "https://mohanlab.bme.uh.edu/wp-content/uploads/2026/03/Website-photo_BLURRED-1-scaled.jpg",
);

export const latestNews = createLatestNews(resolveMedia);

export const customPageSlugs = new Set([
  "mohan-lab-draft", "people", "publications", "news", "contact", "open-positions",
]);
