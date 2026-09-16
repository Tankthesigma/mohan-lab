import type { PublicationYear } from "./content";

type SupplementalPublication = {
  citation: string;
  href: string;
  linkLabel: string;
};

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

export function createPublicationYears(
  source: string,
  textOnly: (html: string) => string,
  cleanSourceHtml: (html: string) => string,
): PublicationYear[] {
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
}
