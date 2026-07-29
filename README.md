# Mohan Lab website

A complete redesign of the University of Houston Mohan Lab website, built with
Next-compatible React components on vinext for Cloudflare Workers deployment.

## Local development

```bash
npm install
npm run dev
npm run build
```

The main site routes are in `app/`. Curated components use the preserved
WordPress export in `content-source/`, while optimized public assets live in
`public/media/`.

## Source preservation

`scripts/scrape-mohan.mjs` collects every public WordPress page, post, media
record, and original media file exposed by the source site. The raw downloaded
media is stored in the git-ignored `source-archive/media/` directory.

`scripts/prepare-media.mjs` converts public image assets to efficient WebP files
and copies documents and videos into `public/media/`. This keeps the deployed
site complete without shipping the much larger original-media archive.

Run the source refresh with:

```bash
node scripts/scrape-mohan.mjs
node scripts/prepare-media.mjs
```

## Validation

```bash
npm run build
node --test tests/rendered-html.test.mjs
```
