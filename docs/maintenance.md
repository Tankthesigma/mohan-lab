# Maintenance

## Architecture

Routes in `src/app/` render React components using content assembled by
`src/app/lib/content.ts`. Local JSON exports provide source records; curated
overrides supply selected profile, publication, and news updates.

Vite and vinext compile the site for Cloudflare Workers. `cloudflare/origin/index.ts`
handles site requests, image optimization or asset fallback, and security
headers. A separate gateway authenticates preview visitors before forwarding
requests to the site worker.

## Content updates

| Update | Where to edit |
| --- | --- |
| Page layout and page-specific copy | Relevant `src/app/**/page.tsx` |
| Research, people, and intern source records | `src/content-source/pages.json` |
| Curated profiles and content parsing | `src/app/lib/content.ts` |
| Recent news | `latestNews` in `src/app/lib/content.ts` |
| Study recruitment | `src/app/research/digital-phenotyping/page.tsx` and `src/app/components/StudyCallout.tsx`; registration URL comes from the local source record |
| Specific open positions | Open positions section in `src/app/opportunities/page.tsx` |
| Publications | Publication logic in `src/app/lib/content.ts` and records in `src/content-source/pages.json` |
| Images and documents | `public/media/` and `src/content-source/site-media-map.json` |
| Navigation | `src/app/components/Header.tsx` and `Footer.tsx` |
| Original URL redirects | `next.config.ts` |

The JSON files contain supporting source records, not additional public routes.
Check references before removing records or media. Past interns and publication
history are intentional website features; do not remove them as legacy clutter.

## Local verification

Run `npm run lint`, `npm run typecheck`, and `npm test`.
For a local production preview, run `npm run build` then `npm start`.

After changing content, check the relevant page, images, downloads, and navigation.
For layout changes, check both mobile and desktop widths.

## Cloudflare deployment

The established deployment uses two workers:

- `cloudflare/origin/wrangler.jsonc`: the site origin, named `mohan-lab-website`.
- `cloudflare/gateway/wrangler.jsonc`: the protected preview, named
  `mohan-lab-private-gateway`, bound to the origin through `UPSTREAM`.

`npm run deploy:cloudflare` builds and deploys the origin, then deploys the gateway.
Use an authorized Cloudflare account with access to both workers.

The gateway reads `ACCESS_USERNAME` from its configuration and
`ACCESS_PASSWORD` from a Cloudflare secret. Do not commit passwords, API tokens,
or authenticated URLs. An unauthenticated preview request should return HTTP 401.

The preview intentionally sends no-index headers. Connecting the official UH
domain and deciding its public access policy are separate launch steps.

## Repository hygiene

Commit source, required assets, configuration, documentation, and the npm lockfile.
Do not commit `node_modules/`, `dist/`, local environment files, Wrangler state,
or tool scratch directories. Keep changes focused and avoid rewriting Git history
as routine cleanup.
