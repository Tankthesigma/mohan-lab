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
    new Request("http://localhost" + path, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the launch-ready Mohan Lab homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Translational Research at the University of Houston \| Mohan Lab/i);
  assert.match(html, /Research projects/i);
  assert.match(html, /href="#main-content"[^>]*>Skip to content/i);
  assert.doesNotMatch(html, /Content directory|Historical resources/i);
});

test("server-renders the current public pages", async () => {
  for (const path of ["/research", "/people", "/publications", "/opportunities", "/opportunities/high-school", "/opportunities/high-school/cohorts", "/news", "/contact", "/research/37-plex"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, path);
  }
});

test("keeps legacy archives out of the public site", async () => {
  for (const path of ["/archive", "/archive/midas-competition", "/archive/post-acr-2017", "/acr-2017"]) {
    const response = await render(path);
    assert.equal(response.status, 404, path);
  }

  for (const path of ["/", "/research", "/people", "/publications", "/opportunities", "/news", "/contact"]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /href="\/archive(?:[/"])/i, path);
    assert.doesNotMatch(html, /Content directory|Historical resources|News post archive/i, path);
  }
});

test("redirects current original URLs to replacement public pages", async () => {
  const cases = [
    ["/37-plex", "/research/37-plex"],
    ["/high-school-students", "/opportunities/high-school"],
    ["/masters-students", "/opportunities"],
    ["/mohan-lab-image-and-data-analytics-scholarship-midas", "/opportunities"],
  ];

  for (const [source, destination] of cases) {
    const response = await render(source);
    assert.equal(response.status, 308, source);
    assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, destination);
  }
});

test("shows current news without retired year and post archives", async () => {
  const html = await (await render("/news")).text();
  assert.match(html, /Global collaboration in Sri Lanka/i);
  assert.match(html, /Scientific exchange at A\*STAR Singapore/i);
  assert.doesNotMatch(html, /News & photos by year|Earlier announcements|2015 through 2018/i);
});

test("links the MLSI page to its full past-intern directory", async () => {
  const html = await (await render("/opportunities/high-school")).text();
  assert.match(html, /2026 MLSI interns/i);
  assert.match(html, /Applications closed/i);
  assert.match(html, /View all intern cohorts/i);
  assert.match(html, /href="\/opportunities\/high-school\/cohorts"/i);

  const cohortHtml = await (await render("/opportunities/high-school/cohorts")).text();
  assert.match(cohortHtml, /Intern cohorts/i);
  assert.match(cohortHtml, /Anubhav Mohapatra/i);
  assert.match(cohortHtml, /Pia Saha/i);
});

test("renders the current publication index and its year API", async () => {
  const html = await (await render("/publications")).text();
  assert.match(html, /Publications by year/i);
  assert.match(html, /aria-controls="publications-2026"/i);
  assert.doesNotMatch(html, /Research collections|href="\/archive/i);

  const response = await render("/api/publications/2026");
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.year, "2026");
  assert.match(data.html, /Baseline stool TIMP-2 predicts strictures/i);
});

test("keeps internal media local", async () => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  for (const path of ["/", "/research", "/people", "/publications", "/opportunities", "/opportunities/high-school", "/news"]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /\b(?:src|poster)=["']https?:\/\/mohanlab\.bme\.uh\.edu\/wp-content\/uploads\//i, path);
    for (const match of html.matchAll(/\b(?:src|poster|href)=["'](\/media\/[^"'?#]+)/gi)) {
      assert.ok(existsSync(root + "/public" + decodeURIComponent(match[1])), path + ": " + match[1]);
    }
  }
});

test("publishes a public-only sitemap and useful 404 page", async () => {
  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const sitemapXml = await sitemap.text();
  assert.match(sitemapXml, /https:\/\/mohanlab\.bme\.uh\.edu\/research\/37-plex/i);
  assert.doesNotMatch(sitemapXml, /\/archive(?:\/|<)/i);
  assert.match(sitemapXml, /opportunities\/high-school\/cohorts/i);

  const notFound = await render("/this-route-does-not-exist");
  assert.equal(notFound.status, 404);
  const html = await notFound.text();
  assert.match(html, /Contact the lab/i);
  assert.doesNotMatch(html, /Content directory/i);

  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/mohanlab\.bme\.uh\.edu\/sitemap\.xml/i);

  const root = fileURLToPath(new URL("..", import.meta.url));
  const css = readFileSync(root + "/app/globals.css", "utf8");
  assert.doesNotMatch(css, /counter\((?:members|member)/i);
});
