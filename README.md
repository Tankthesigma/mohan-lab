# Mohan Lab

Research website for the University of Houston Mohan Lab: research projects,
people, publications, news, internships, past intern cohorts, and contact.

[View protected preview](https://mohan-lab-private-gateway.tanmay-mohan-lab.workers.dev/)
· [Maintenance guide](docs/maintenance.md)
· [Contributing](docs/contributing.md)

## Get started

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by the server. No live WordPress server or database
is required; content and assets are bundled with the site.

## Stack

React · TypeScript · Next.js-compatible App Router · vinext/Vite · Cloudflare Workers

## Repository map

| Directory | Purpose |
| --- | --- |
| `src/` | Website code in `app/` and local records in `content-source/` |
| `public/` | Images, videos, downloads, and branding |
| `cloudflare/` | Site runtime in `origin/` and protected preview in `gateway/` |
| `tests/` | Public-page regression checks |
| `docs/` | Maintenance and contribution instructions |

Root configuration files support the build, linting, TypeScript, and deployment.
Dependencies, compiled output, local credentials, and design-tool scratch files
are excluded from Git.

## Checks

```sh
npm run lint
npm run typecheck
npm test
```

`npm test` builds the production site before testing its rendered pages.

## Deployment

```sh
npm run deploy:cloudflare
```

Requires authorized Cloudflare access. Preview credentials are shared separately,
not stored in Git. The official UH domain will be connected separately.

See the [maintenance guide](docs/maintenance.md) for content updates and deployment details.
