# Editing the Mohan Lab site in Plasmic

Plasmic is the visual editing layer for the existing React website. It reuses
the Mohan Lab components and CSS instead of rebuilding the site with a generic
template.

## For site editors

1. Open the Mohan Lab project in Plasmic.
2. Use the page menu at the top left to choose **Homepage**, **Research**,
   **People**, **Publications**, **News**, **Internships**, or **Contact**.
3. Click a section on the canvas.
4. Edit its text, links, images, people, projects, years, or program entries in
   the right-hand panel.
5. Check both the desktop and phone canvases.
6. Click **Publish** when the update is ready.

The large page components intentionally limit editors to real content fields,
so routine changes do not accidentally break spacing, type, or responsive
behavior. Smaller Mohan Lab sections remain available in the insert panel when
a page needs to be rearranged or expanded.

## Local app host and previews

Copy `.env.example` to `.env.local`, add the project's public delivery token,
and run:

```bash
npm install
npm run dev -- --port 3002
```

Use `http://localhost:3002/plasmic-host` as the Plasmic app-host URL.

Published and draft previews are available at:

- `http://localhost:3002/plasmic-preview/`
- `http://localhost:3002/plasmic-preview/research`
- `http://localhost:3002/plasmic-preview/people`
- `http://localhost:3002/plasmic-preview/publications`
- `http://localhost:3002/plasmic-preview/news`
- `http://localhost:3002/plasmic-preview/internships`
- `http://localhost:3002/plasmic-preview/contact`

## Production rollout

The current public routes continue serving the reviewed React implementation.
The Plasmic preview routes are isolated so the visual editor cannot weaken the
main site's Cloudflare content-security policy.

Before switching the public routes to visual content:

1. Add `NEXT_PUBLIC_PLASMIC_API_TOKEN` to the hosting environment.
2. Configure a Cloudflare deploy hook in Plasmic's **Call webhooks** publish
   action.
3. Use Plasmic code generation during the production build, or complete a
   security review before enabling the runtime loader on public routes.
4. Run `npm run lint`, `npm run typecheck`, `npm run build`, and the rendered
   HTML test suite.
5. Compare every public route against its `/plasmic-preview` counterpart before
   changing traffic.

The delivery token is intentionally stored only in `.env.local` during local
development and is not committed to Git.
