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

type SupplementalPublication = {
  citation: string;
  href: string;
  linkLabel: string;
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
    if (projectSlugs.has(slug)) return `/research/${slug}`;
    if (slug === "research") return "/research";
    if (slug === "people") return "/people";
    if (slug === "publications") return "/publications";
    if (slug === "news") return "/news";
    if (slug === "contact") return "/contact";
    if (["open-positions", "open-positions-2"].includes(slug)) return "/opportunities";
    if (slug === "high-school-students") return "/opportunities/high-school";
    if (slug === "former-high-school-summer-interns") return "/opportunities/high-school/cohorts";
    if (slug === "houston-omics-collaborative" || slug === "hoc") return "https://hoc.bme.uh.edu";
    if (pages.some((page) => page.slug === slug)) return `/archive/${slug}`;
    if (posts.some((post) => post.slug === slug)) return `/archive/post-${slug}`;
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
  const description = textOnly(sourcePage.excerpt.rendered || sourcePage.content.rendered);
  parsedProjects.push({
    slug,
    title,
    image: resolveMedia(mediaUrl),
    category,
    summary: description.length > 55 ? `${description.slice(0, 178).trim()}…` : "Explore the team, approach, and translational goals behind this active Mohan Lab project.",
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
      const name = parenthetical?.[1]?.trim() || boldText.trim();
      const paragraphs = [...afterImage.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((match) => textOnly(match[1]).replace(/\s+([,.;:)])/g, "$1").replace(/\(\s+/g, "("))
        .filter((value) => value.length > 45 && !/^post-internship update/i.test(value));
      const project = paragraphs.find((value) => value !== boldText) || "";
      const inferredSchool = project.match(/(?:senior|student)\s+at\s+(.+?)(?:,\s+with|\.\s| who | and has )/i)?.[1]?.trim();

      interns.push({
        name,
        school: parenthetical?.[2]?.trim() || inferredSchool || "MLSI participant",
        project: polishStructuredCopy(project),
        image: resolveMedia(image[1]),
      });
    });

    return { year: heading.year, interns };
  }).filter((cohort) => cohort.interns.length);
})();

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

function balancedDivContents(source: string, startIndex: number) {
  const openingEnd = source.indexOf(">", startIndex);
  if (openingEnd === -1) return "";
  const divPattern = /<\/?div\b[^>]*>/gi;
  divPattern.lastIndex = startIndex;
  let depth = 0;
  let match: RegExpExecArray | null;
  while ((match = divPattern.exec(source))) {
    if (/^<\/div/i.test(match[0])) depth -= 1;
    else depth += 1;
    if (depth === 0) return source.slice(openingEnd + 1, match.index);
  }
  return "";
}

const supplementalPublications: Record<string, SupplementalPublication[]> = {
  "2026": [
    {
      citation: "Louis Sam Titus ASC, Biswas A, Srinivasan V, Surya V, Appalaneni R, Chen SH, Saxena R, Cai Q, Truong L, Mohan C. Glomerular endothelial rarefaction associated with hypoxic neutrophils marks renal pathology activity in lupus nephritis. Arthritis & Rheumatology. 2026.",
      href: "https://doi.org/10.1002/art.70220",
      linkLabel: "doi: 10.1002/art.70220",
    },
    {
      citation: "Zhao R, Xi NM, Lea G, Gilbert ER, Vanarsa K, Qiao M, Zhang D, Zhang J, Mohan C, Judson MA, Koth LL, Ji HL. New proteomic biomarkers identified in plasma extracellular vesicles in sarcoidosis: a case-control matched study. Frontiers in Immunology. 2026;17:1779835.",
      href: "https://doi.org/10.3389/fimmu.2026.1779835",
      linkLabel: "doi: 10.3389/fimmu.2026.1779835",
    },
    {
      citation: "Polamarasetty H, Pereira R, Maruvada V, Vanarsa K, Wankhade D, Yadavalli R, Kugathasan S, Mohan C. Baseline stool TIMP-2 predicts strictures and penetrating disease progression in Crohn’s patients. Frontiers in Immunology. 2026;17:1624045.",
      href: "https://doi.org/10.3389/fimmu.2026.1624045",
      linkLabel: "doi: 10.3389/fimmu.2026.1624045",
    },
    {
      citation: "Daouk M, Becker JU, Kambham N, Chang A, Mohan C, Nguyen H. Robust by Design: A Continuous Monitoring and Data Integration Framework for Medical AI. 2026 IEEE 23rd International Symposium on Biomedical Imaging (ISBI). 2026:1–4.",
      href: "https://doi.org/10.1109/ISBI61048.2026.11515466",
      linkLabel: "doi: 10.1109/ISBI61048.2026.11515466",
    },
    {
      citation: "Daouk M, Nguyen H, Mohan C, Becker JU, Kambham N, Chang A. Shortcut Learning in Glomerular AI: Adversarial Penalties Hurt, Entropy Helps. 2026 IEEE 23rd International Symposium on Biomedical Imaging (ISBI). 2026:1–4.",
      href: "https://doi.org/10.1109/ISBI61048.2026.11515860",
      linkLabel: "doi: 10.1109/ISBI61048.2026.11515860",
    },
    {
      citation: "Gonawala L, Madhumaali M, Ismail H, Jayasooriya N, Wijekoon N, Rajapakshe S, Erangika H, Amaratunga D, Gunaratna R, Steinbusch HWM, Mohan C, Chiang YC, Paranagama P, de Silva KRD. Phytochemistry and nutraceutical potential of Ceylon Cinnamomum species native to Sri Lanka. Natural Product Research. 2026;40(7):1859–1870.",
      href: "https://doi.org/10.1080/14786419.2024.2438269",
      linkLabel: "doi: 10.1080/14786419.2024.2438269",
    },
    {
      citation: "Jayakumar A, Kuruvilla C, Paulose M, Schaffer L, Nonis PKS, Calderon HA, Varghese OK, Mohan C. Two dimensional layered double hydroxides augment antigen loading and release. Biomaterials Advances. 2026;184:214817.",
      href: "https://doi.org/10.1016/j.bioadv.2026.214817",
      linkLabel: "doi: 10.1016/j.bioadv.2026.214817",
    },
    {
      citation: "Vu AM, Vo TL, Bui NLQ, Le NNB, Awasthi A, Vo HQ, Nguyen TH, Han Z, Mohan C, Nguyen HV. Contrastive integrated gradients: A feature attribution-based method for explaining whole slide image classification. 2026 IEEE/CVF Winter Conference on Applications of Computer Vision (WACV). 2026:1201–1210.",
      href: "https://doi.org/10.1109/WACV61042.2026.00123",
      linkLabel: "doi: 10.1109/WACV61042.2026.00123",
    },
    {
      citation: "Chawla HS, Chen Y, Wu M, Nikitin P, Gutierrez J, Mohan C, Singh M, Aglyamov SR, Assassi S, Larin KV. Assessment of skin fibrosis in a murine model of systemic sclerosis with multifunctional optical coherence tomography (Erratum). Journal of Biomedical Optics. 2026;31(1):019801.",
      href: "https://doi.org/10.1117/1.JBO.31.1.019801",
      linkLabel: "doi: 10.1117/1.JBO.31.1.019801",
    },
    {
      citation: "Fairhurst AM, Celhar T, Mohan C. Modeling lupus in mice. In: Systemic Lupus Erythematosus. 2026:481–495.",
      href: "https://doi.org/10.1016/B978-0-443-33957-8.00037-8",
      linkLabel: "doi: 10.1016/B978-0-443-33957-8.00037-8",
    },
  ],
  "2025": [
    {
      citation: "Vu AM, Le KP, Vo TTK, Thach H, Nguyen HH, Yang D, Huynh HH, Nguyen Q, Pham TM, Le TA, Le MHN, Nguyen TH, Awasthi A, Mohan C, Han Z, Nguyen HV. DualProtoSeg: Simple and Efficient Design with Text- and Image-Guided Prototype Learning for Weakly Supervised Histopathology Image Segmentation. arXiv. 2025.",
      href: "https://arxiv.org/abs/2512.10314",
      linkLabel: "arXiv:2512.10314",
    },
    {
      citation: "Le K, Thach H, Vu AM, Vo TTK, Huynh HH, Yang D, Le MHN, Nguyen TH, Awasthi A, Mohan C, Han Z, Nguyen HV. ConStruct: Structural Distillation of Foundation Models for Prototype-Based Weakly Supervised Histopathology Segmentation. arXiv. 2025.",
      href: "https://arxiv.org/abs/2512.10316",
      linkLabel: "arXiv:2512.10316",
    },
    {
      citation: "Le K, Vu AM, Vo TKT, Thach H, Bui NLQ, Nguyen TH, Le MHN, Han Z, Mohan C, Nguyen HV. LPD: Learnable Prototypes with Diversity Regularization for Weakly Supervised Histopathology Segmentation. arXiv. 2025.",
      href: "https://arxiv.org/abs/2512.05922",
      linkLabel: "arXiv:2512.05922",
    },
    {
      citation: "Lei R, Vu B, Kourentzi K, Soomro S, Danthanarayana AN, Brgoch J, Nadimpalli S, Petri M, Mohan C, Willson RC. Correction: A novel technology for home monitoring of lupus nephritis that tracks the pathogenic urine biomarker ALCAM. Frontiers in Immunology. 2025;16:1734343.",
      href: "https://doi.org/10.3389/fimmu.2025.1734343",
      linkLabel: "doi: 10.3389/fimmu.2025.1734343",
    },
  ],
};

function supplementalPublicationHtml(publications: SupplementalPublication[]) {
  return publications
    .map(({ citation, href, linkLabel }) => (
      `<p>${citation} <a href="${href}" target="_blank" rel="noopener noreferrer">${linkLabel}</a>.</p>`
    ))
    .join("");
}

export const publicationYears: PublicationYear[] = (() => {
  const source = getPage("publications")?.content.rendered || "";
  const titlePattern = /<a\b[^>]*class=["'][^"']*elementor-toggle-title[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
  const contentPattern = /<div\b[^>]*class=["'][^"']*elementor-tab-content[^"']*["'][^>]*>/gi;
  const years: PublicationYear[] = [];

  for (const titleMatch of source.matchAll(titlePattern)) {
    if (titleMatch.index === undefined) continue;
    const year = textOnly(titleMatch[1]);
    if (!/^\d{4}$/.test(year)) continue;
    contentPattern.lastIndex = titleMatch.index + titleMatch[0].length;
    const contentMatch = contentPattern.exec(source);
    if (contentMatch?.index == null) continue;
    const content = balancedDivContents(source, contentMatch.index);
    if (content.trim()) {
      const supplemental = supplementalPublications[year] || [];
      years.push({
        year,
        html: supplementalPublicationHtml(supplemental) + cleanSourceHtml(content),
      });
    }
  }

  const existingYears = new Set(years.map(({ year }) => year));
  const supplementalOnlyYears = Object.entries(supplementalPublications)
    .filter(([year]) => !existingYears.has(year))
    .map(([year, publications]) => ({
      year,
      html: supplementalPublicationHtml(publications),
    }));

  return [...supplementalOnlyYears, ...years].sort(
    (a, b) => Number(b.year) - Number(a.year),
  );
})();

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const heroImage = resolveMedia(
  "https://mohanlab.bme.uh.edu/wp-content/uploads/2026/03/Website-photo_BLURRED-1-scaled.jpg",
);

export const latestNews = [
  {
    title: "Global collaboration in Sri Lanka",
    detail: "Dr. Mohan met with collaborator Prof. Ranil de Silva in June 2026.",
    image: resolveMedia("https://mohanlab.bme.uh.edu/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-12-at-3.45.30-PM-1024x768.jpeg"),
    date: "June 2026",
  },
  {
    title: "Scientific exchange at A*STAR Singapore",
    detail: "A June 2026 visit with Prof. KP Lam and Dr. Frank Tay.",
    image: resolveMedia("https://mohanlab.bme.uh.edu/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-12-at-3.41.40-PM-207x300.jpeg"),
    date: "June 2026",
  },
  {
    title: "Celebrating the people behind the science",
    detail: "The lab gathered to wish Dr. Diptish well as he left for residency.",
    image: resolveMedia("https://mohanlab.bme.uh.edu/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-11-at-12.31.53-PM-1-e1781199288962-280x300.jpeg"),
    date: "2026",
  },
];

export const customPageSlugs = new Set([
  "mohan-lab-draft", "people", "publications", "news", "contact", "open-positions",
]);
