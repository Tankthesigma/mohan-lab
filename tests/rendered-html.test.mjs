import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";

let workerPromise;

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerPromise ||= import(workerUrl.href);
  const { default: worker } = await workerPromise;
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished Mohan Lab homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("content-security-policy") ?? "", /default-src 'self'/i);
  assert.match(response.headers.get("content-security-policy") ?? "", /object-src 'none'/i);
  const html = await response.text();
  assert.match(html, /Translational Research at the University of Houston \| Mohan Lab/i);
  assert.match(html, /Translational biomedical research/i);
  assert.match(html, /Research projects/i);
  assert.match(html, /href="#main-content"[^>]*>Skip to content/i);
  assert.match(html, /<main[^>]*id="main-content"/i);
  assert.match(html, /https:\/\/mohanlab\.bme\.uh\.edu\/og\.jpg/i);
  assert.match(html, /<link rel="icon" href="\/favicon\.png"\/?>/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders core information routes", async () => {
  for (const path of ["/research", "/people", "/publications", "/opportunities", "/opportunities/high-school", "/opportunities/high-school/cohorts", "/news", "/contact", "/archive", "/research/37-plex"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, path);
  }
});

test("labels the site-wide opportunities navigation as Internships", async () => {
  for (const path of ["/", "/research", "/people", "/publications", "/opportunities", "/news", "/contact"]) {
    const response = await render(path);
    const html = await response.text();
    const navigation = html.match(/<nav id="primary-navigation"[\s\S]*?<\/nav>/i)?.[0] ?? "";
    assert.match(navigation, />Internships</i, path);
    assert.doesNotMatch(navigation, />Opportunities</i, path);
  }
});

test("renders current news stories with specific copy", async () => {
  const response = await render("/news");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Global collaboration in Sri Lanka/i);
  assert.match(html, /Dr\. Mohan met with collaborator Prof\. Ranil de Silva/i);
  assert.match(html, /Scientific exchange at A\*STAR Singapore/i);
  assert.doesNotMatch(html, /Recorded in the Mohan Lab’s current news and photo archive/i);
});

test("permanently redirects original Mohan Lab URLs to their reorganized routes", async () => {
  const cases = [
    ["/37-plex", "/research/37-plex"],
    ["/former-high-school-summer-interns", "/opportunities/high-school/cohorts"],
    ["/high-school-students", "/opportunities/high-school"],
    ["/masters-students", "/archive/masters-students"],
    ["/acr-2017", "/archive/post-acr-2017"],
  ];

  for (const [source, destination] of cases) {
    const response = await render(source);
    assert.equal(response.status, 308, source);
    assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, destination);
  }
});

test("serves an original asset when Cloudflare image transforms are unavailable", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  const { default: worker } = await (workerPromise ||= import(workerUrl.href));
  let requestedPath = "";
  const response = await worker.fetch(
    new Request("http://localhost/_vinext/image?url=%2Fmedia%2F102-102-serc_01.webp&w=1200&q=75"),
    {
      ASSETS: {
        fetch: async (request) => {
          requestedPath = new URL(request.url).pathname;
          return new Response("asset", { status: 200 });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  assert.equal(requestedPath, "/media/102-102-serc_01.webp");
});

test("provides a complete, organized directory of preserved source content", async () => {
  const response = await render("/archive");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /52[\s\S]{0,40}information pages/i);
  assert.match(html, /14[\s\S]{0,40}news posts/i);
  assert.match(html, /Antibody-Based Proteomics/i);
  assert.match(html, /Former Undergraduate Summer Interns/i);
  assert.match(html, /Research Fellowships Awarded/i);
});

test("explains both high school internship research tracks", async () => {
  const response = await render("/opportunities/high-school");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Experimental track/i);
  assert.match(html, /Computational track/i);
  assert.match(html, />2%<[\s\S]{0,100}>Acceptance Rate</i);
  assert.match(html, /Most recent cohort/i);
  assert.match(html, /AI-aided assessment of renal pathology/i);
  assert.match(html, /2026 MLSI interns/i);
  for (const name of [
    "Anubhav Mohapatra",
    "Aman Wairkar",
    "Tanmay Vasudeva",
    "Derek Jiu",
    "Eashan Shetty",
    "Ezra Weng",
    "Kushagra Nagar",
    "Katherine Lin",
    "Samyak Samantaray",
    "Aarush Akella",
  ]) assert.match(html, new RegExp(name, "i"));
  assert.match(html, /Aman Wairkar[\s\S]{0,260}Clear Springs High School, League City, TX/i);
  assert.match(html, /Aman[\s\S]{0,500}portable[\s\S]{0,120}plasmapheresis[\s\S]{0,200}IgG antibodies/i);
  assert.match(html, /Anubhav[\s\S]{0,500}TEER[\s\S]{0,300}Blood Brain Barrier[\s\S]{0,300}NPSLE/i);
  assert.match(html, /Tanmay[\s\S]{0,500}patient proteomics[\s\S]{0,300}Crohn’s disease complications[\s\S]{0,400}blood-brain barrier disruption[\s\S]{0,300}kidney gene knockout model/i);
  assert.match(html, /Kushagra[\s\S]{0,600}Phikon-v2[\s\S]{0,400}LoRA[\s\S]{0,500}foundation models outperform conventional baselines/i);
  assert.match(html, /View all intern cohorts/i);
  assert.doesNotMatch(html, /spatial-omics|image-analysis|machine-learning projects/i);
});

test("renders structured MLSI intern cohorts from the original archive", async () => {
  const response = await render("/opportunities/high-school/cohorts");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Intern cohorts/i);
  assert.match(html, /Anubhav Mohapatra/i);
  assert.match(html, /Tanmay Vasudeva/i);
  assert.match(html, /Derek Jiu/i);
  assert.doesNotMatch(html, /\bsrc=["']https?:\/\/mohanlab\.bme\.uh\.edu\/wp-content\/uploads\//i);
  const root = fileURLToPath(new URL("..", import.meta.url));
  for (const match of html.matchAll(/<img\b[^>]*src=["'](\/media\/[^"']+)/gi)) {
    assert.ok(existsSync(`${root}/public${decodeURIComponent(match[1])}`), match[1]);
  }
});

test("polishes obvious source typos in structured profile cards", async () => {
  const people = await (await render("/people")).text();
  assert.match(people, /Research Tech I/i);
  assert.match(people, /predicting Strictures &amp; Fistulas/i);
  assert.match(people, /These novel biomarkers help monitor/i);
  assert.match(people, /projects focus on biostatistics/i);
  assert.doesNotMatch(people, /\b(?:predicitng|tge|projects focuses|Research Tech1)\b/i);

  const internship = await (await render("/opportunities/high-school")).text();
  assert.match(internship, /Ezra’s project/i);
  assert.doesNotMatch(internship, /Ezra\s+[‘']s/i);
});

test("renders working publication year accordions", async () => {
  const response = await render("/publications");
  const html = await response.text();
  const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  assert.doesNotMatch(html, /class="publication-year is-open"/i);
  assert.match(html, /aria-expanded="false"[^>]*aria-controls="publications-2026"/i);
  assert.match(html, /aria-expanded="false"[^>]*aria-controls="publications-2025"/i);
  assert.match(html, />2024<\/span>/i);
  assert.doesNotMatch(visibleHtml, /Baseline stool TIMP-2 predicts strictures/i);
  assert.ok(Buffer.byteLength(html) < 100_000, `publication index is ${Buffer.byteLength(html)} bytes`);

  const publications2026 = await render("/api/publications/2026");
  assert.equal(publications2026.status, 200);
  assert.match(publications2026.headers.get("content-type") ?? "", /^application\/json\b/i);
  assert.match(publications2026.headers.get("cache-control") ?? "", /s-maxage=86400/i);
  const data2026 = await publications2026.json();
  assert.equal(data2026.year, "2026");
  assert.match(data2026.html, /Baseline stool TIMP-2 predicts strictures/i);
  assert.match(data2026.html, /Robust by Design: A Continuous Monitoring/i);
  assert.match(data2026.html, /Modeling lupus in mice/i);
  assert.equal([...data2026.html.matchAll(/Assessment of skin fibrosis in a murine model of systemic sclerosis with multifunctional optical coherence tomography \(Erratum\)/gi)].length, 1);

  const publications2025 = await render("/api/publications/2025");
  const data2025 = await publications2025.json();
  assert.match(data2025.html, /DualProtoSeg/i);
  assert.match(data2025.html, /Correction: A novel technology for home monitoring/i);
  assert.match(data2025.html, /Divergent pathogenic cascades underlie acute versus chronic lupus nephritis/i);
  assert.equal([...data2025.html.matchAll(/Glomerular endothelial rarefaction associated with hypoxic neutrophils marks renal pathology activity in lupus nephritis/gi)].length, 1);

  const publications2015 = await render("/api/publications/2015");
  const data2015 = await publications2015.json();
  assert.match(data2015.html, /href="https:\/\/doi\.org\/10\.1111\/cei\.12473"/i);

  const publications2014 = await render("/api/publications/2014");
  const data2014 = await publications2014.json();
  assert.match(data2014.html, /href="https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/24860621\/"/i);
});

test("applies the requested homepage and navigation updates", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /full lab photograph/i);
  assert.doesNotMatch(home, /class="people-collage"/i);
  assert.match(home, /href="https:\/\/hoc\.bme\.uh\.edu"[^>]*>HOC Core</i);

  const root = fileURLToPath(new URL("..", import.meta.url));
  const css = readFileSync(`${root}/app/globals.css`, "utf8");
  assert.doesNotMatch(css, /counter\((?:members|member)/i);
});

test("keeps migrated rich content safe and accessible", async () => {
  const response = await render("/news");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<h1>News &amp;<br\/?>[\s\S]{0,30}events<\/h1>/i);
  assert.doesNotMatch(html, /\bhref=["']\s*javascript:/i);
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i);

  for (const match of html.matchAll(/<a\b([^>]*)>\s*<img\b([^>]*)>\s*<\/a>/gi)) {
    const anchorAttributes = match[1];
    const imageAttributes = match[2];
    const emptyAlt = /\balt=["']\s*["']/i.test(imageAttributes);
    if (emptyAlt) {
      assert.match(anchorAttributes, /\baria-label=["'][^"']+["']/i);
    }
  }
});

test("repairs metadata and document structure in sparse legacy pages", async () => {
  for (const path of [
    "/archive/houston-omics-collaborative",
    "/archive/mesoscale",
    "/archive/antibody-proteomics",
  ]) {
    const response = await render(path);
    const html = await response.text();
    assert.match(html, /<meta name="description" content="[^"]+"/i, path);
  }

  const masters = await (await render("/archive/masters-students")).text();
  assert.doesNotMatch(masters, /<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<h3\b/i);

  const aai = await (await render("/archive/post-aai-2018")).text();
  assert.match(
    aai,
    /<a href="\/media\/494-494-Sahar-kamala-sanam-shirisha-sam\.webp" aria-label="Open linked image">/i,
  );

  const people = await (await render("/people")).text();
  assert.match(people, /<meta property="og:title" content="People \| Mohan Lab"/i);
  assert.match(people, /<meta name="twitter:title" content="People \| Mohan Lab"/i);
});

test("shows archive provenance and clearly marks expired program records", async () => {
  const midas = await (await render("/archive/mohan-lab-image-and-data-analytics-scholarship-midas")).text();
  assert.match(midas, /Verified Mohan Lab source record/i);
  assert.match(midas, /Source updated[\s\S]{0,30}August 27, 2025/i);
  assert.match(midas, /Past event/i);
  assert.match(midas, /September 2, 2025 registration deadline have passed/i);
  assert.match(
    midas,
    /href="https:\/\/mohanlab\.bme\.uh\.edu\/open-positions\/masters-students\/mohan-lab-image-and-data-analytics-scholarship-midas\/"/i,
  );
});

test("publishes crawler guidance and a complete sitemap", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robotsText = await robots.text();
  assert.match(robotsText, /User-Agent: \*/i);
  assert.match(robotsText, /Sitemap: https:\/\/mohanlab\.bme\.uh\.edu\/sitemap\.xml/i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") ?? "", /xml/i);
  const sitemapXml = await sitemap.text();
  assert.match(sitemapXml, /https:\/\/mohanlab\.bme\.uh\.edu\/research\/37-plex/i);
  assert.match(sitemapXml, /https:\/\/mohanlab\.bme\.uh\.edu\/archive\/high-school-students/i);
  assert.ok([...sitemapXml.matchAll(/<url>/g)].length >= 70);
});

test("renders a useful HTML 404 page", async () => {
  const response = await render("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /This page is not in the lab record/i);
  assert.match(html, /href="\/research"/i);
});

test("renders institutional wayfinding with valid section targets", async () => {
  const cases = [
    ["/research", ["projects", "methods"]],
    ["/people", ["current-members", "former-members"]],
    ["/publications", ["collections", "by-year"]],
    ["/news", ["lab-news", "post-archive"]],
    ["/opportunities", ["high-school", "programs", "records"]],
    ["/opportunities/high-school", ["research-tracks", "current-cohort", "eligibility"]],
  ];

  for (const [path, ids] of cases) {
    const response = await render(path);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    assert.match(html, /aria-label="(?:In this section|High school internship)"/i, path);
    for (const id of ids) {
      assert.match(html, new RegExp(`id="${id}"`, "i"), `${path}#${id}`);
      assert.match(html, new RegExp(`href="${path}#${id}"`, "i"), `${path}#${id}`);
    }
  }
});

test("renders every migrated page and keeps embedded assets local", async () => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const pages = JSON.parse(readFileSync(new URL("../content-source/pages.json", import.meta.url), "utf8"));
  const posts = JSON.parse(readFileSync(new URL("../content-source/posts.json", import.meta.url), "utf8"));
  const home = pages.find((page) => page.id === 1167);
  const projectSlugs = new Set(
    [...home.content.rendered.matchAll(/href=["']https?:\/\/mohanlab\.bme\.uh\.edu\/([^"'#?]+)\/?["']/gi)]
      .map((match) => match[1].replace(/\/$/, ""))
      .filter((slug) => pages.some((page) => page.slug === slug)),
  );
  const customSlugs = new Set([
    "mohan-lab-draft", "people", "publications", "news", "contact", "open-positions",
  ]);
  const routes = [
    "/", "/research", "/people", "/publications", "/opportunities", "/news", "/contact", "/archive",
    ...[...projectSlugs].map((slug) => `/research/${slug}`),
    ...pages
      .filter((page) => !customSlugs.has(page.slug) && !projectSlugs.has(page.slug))
      .map((page) => `/archive/${page.slug}`),
    ...posts.map((post) => `/archive/post-${post.slug}`),
  ];

  for (const path of new Set(routes)) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, /Original Mohan Lab content, retained within the reorganized site/i, path);
    assert.doesNotMatch(html, /\b(?:src|poster)=["']https?:\/\/mohanlab\.bme\.uh\.edu\/wp-content\/uploads\//i, path);
    assert.doesNotMatch(html, /\bhref=["']https?:\/\/mohanlab\.bme\.uh\.edu\/wp-content\/uploads\//i, path);
    assert.doesNotMatch(
      html,
      /\bhref=["'][^"']*(?:ovidsp\.tx\.ovid\.com|apps\.isiknowledge\.com|arthritis-research\.com\/content\/13\/5\/240|springerlink\.com\/content\/120001|futuremedicine\.com\/(?:action\/doSearch|loi\/frm)|estore\.somalogic\.com|future-science\.com\/doi\/abs\/10\.4155\/fsoa-2017-0047|clinlabint\.com\/digital-editions\/3d-issues\/cli-october-2020)/i,
      path,
    );
    assert.doesNotMatch(
      html,
      /\bhref=["'][^"']*sciencedirect\.com\/[^"']*scopusAuthorDocuments[^"']*author%3DMohan/i,
      path,
    );

    for (const match of html.matchAll(/\b(?:src|poster|href)=["'](\/media\/[^"'?#]+)/gi)) {
      const assetPath = decodeURIComponent(match[1]);
      assert.ok(existsSync(`${root}/public${assetPath}`), `${path}: ${assetPath}`);
    }
  }

  assert.equal(projectSlugs.size, 23);
  assert.equal(pages.length, 52);
  assert.equal(posts.length, 14);
  assert.ok(routes.length > 60);
});
