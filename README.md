# Twilight Psychology Website

Public-facing marketing, services, and blog site for Twilight Psychology.

**Production:** https://www.twilightpsychology.com

## Overview

This repository contains a static Astro site for Twilight Psychology, including:

- service and specialty landing pages
- clinician and staff profile pages
- a blog powered by Astro Content Collections
- interactive UI such as navigation, tabs, counters, and the chat assistant

## Tech stack

- **Framework:** Astro 6
- **Interactive UI:** React 19 via `@astrojs/react`
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript 5
- **Testing:** Vitest
- **Deployment target:** static build with Cloudflare Wrangler config

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Validate and build:

```bash
npm run check
npm run test
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Astro dev server |
| `npm run check` | Run `astro check` |
| `npm run test` | Run the Vitest suite |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the built site locally |

## Project structure

- `src/pages/` - Astro routes and page entrypoints
- `src/layouts/` - shared page layouts
- `src/components/` - Astro components and wrapper components
- `src/components/react/` - interactive React components used as islands
- `src/components/interactive/` - client-side entrypoints for progressive enhancement
- `src/data/` - typed site data and content metadata
- `src/content/blog/` - blog content in Markdown/MDX
- `src/content.config.ts` - content collection schema
- `tests/data/` - Vitest coverage for structured data files
- `public/` - static assets copied as-is
- `wrangler.jsonc` - Cloudflare deployment config for `dist/`

## Content and data authoring

Blog posts live in `src/content/blog/` and use the schema defined in `src/content.config.ts`.

Required blog frontmatter:

- `title`
- `description`
- `pubDate`
- `category`
- `author`

Supported categories:

- `billing`
- `insurance`
- `clinical`
- `business`
- `announcements`

Structured content such as services, navigation, clinician profiles, insurance data, and site configuration lives in `src/data/` and is covered by tests in `tests/data/`.

## Deployment

Production builds are generated into `dist/`:

```bash
npm run build
```

The repository includes `wrangler.jsonc`, which points Cloudflare at `./dist`.

## Configuration notes

No environment variables are required for standard local development. Google Analytics is currently configured in `src/data/siteConfig.ts`.

## License

See [LICENSE.md](LICENSE.md).
