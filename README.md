# Mohan Lab website

Research website for the University of Houston Mohan Lab. Includes research
projects, lab members, publications, news, internship programs, past intern
cohorts, and contact information.

[Protected preview](https://mohan-lab-private-gateway.tanmay-mohan-lab.workers.dev/)

## Tech stack

React and TypeScript with Next.js-compatible App Router components, built with
vinext/Vite and hosted on Cloudflare Workers. Content is bundled locally; the
site does not require a running WordPress server or database.

## Local development

```bash
npm ci
npm run dev
```

Open the local address printed by the development server. For a production
preview, run `npm run build` followed by `npm start`.

## Project structure

- `app/`: pages, reusable components, and content-loading logic.
- `content-source/`: content and media mappings used by the site.
- `public/`: images, videos, documents, and branding assets.
- `worker/`: Cloudflare entry point, image handling, and security headers.
- `cloudflare/gateway/`: password-protected preview gateway.
- `tests/`: public-page regression checks.

Past intern cohorts remain part of the internship section. Publication history
remains available by year. The retired content-directory routes are not public.

## Deployment

```bash
npm run deploy:cloudflare
```

This requires Cloudflare account access. Gateway passwords are Cloudflare
secrets, not stored in the repository. The official UH domain will be connected
separately.

## Updating the website

- Page layouts and copy: edit the relevant route in `app/`.
- Research projects, member profiles, and intern cohorts: source records are in
  `content-source/pages.json`; parsing and curated overrides are in
  `app/lib/content.ts`.
- Recent news: edit `latestNews` in `app/lib/content.ts`.
- Publication updates: review the publication records and supplemental entries
  in `app/lib/content.ts` and `content-source/pages.json`.
- Images and downloads: put assets in `public/media/` and update their content
  references or `content-source/site-media-map.json`.

The JSON exports include supporting source records, not extra public pages.
Avoid deleting records or media without checking their references first.

## Validation

```bash
npm run typecheck
npm run lint
npm test
```
