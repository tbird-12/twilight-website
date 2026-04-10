# Twilight Psychology — Website

Public marketing & content site for Twilight Psychology built with Astro, Preact and Tailwind.

Production site: https://www.twilightpsychology.com

## Overview

This repository contains the source for the Twilight Psychology website: a content-driven site and blog with interactive components (chatbot, provider directory, FAQs) and a small suite of structured data files used to render pages.

Key features
- Static site built with [Astro](astro.config.mjs)
- Client interactivity with Preact (components under [src/components](src/components) and [src/components/preact](src/components/preact))
- Tailwind CSS for styling
- Content collections via [src/content.config.ts](src/content.config.ts)
- Unit tests with Vitest ([vitest.config.ts](vitest.config.ts))

## Tech stack
- Framework: Astro (v5)
- UI: Preact
- Styling: Tailwind CSS v4
- Language: TypeScript
- Tests: Vitest
- Deploy target: Cloudflare (wrangler config present at [wrangler.jsonc](wrangler.jsonc)) — optional, see Deploy below

## Quickstart (local development)

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build locally

```bash
npm run preview
```

Helpful scripts (see [package.json](package.json))

- `dev` — starts Astro dev server
- `build` — builds the site to `./dist`
- `preview` — previews the built site
- `check` — runs `astro check` type checks
- `test` — runs `vitest run`
- `test:watch` — runs `vitest` in watch mode

## Project layout — important paths

- Site config: [astro.config.mjs](astro.config.mjs)
- Content schema: [src/content.config.ts](src/content.config.ts)
- Pages / routes: [src/pages](src/pages)
- Layouts: [src/layouts](src/layouts)
- UI components: [src/components](src/components)
- Preact components: [src/components/preact](src/components/preact)
- Structured site data: [src/data](src/data)
- Tests: [tests](tests)
- Deploy config: [wrangler.jsonc](wrangler.jsonc)
- License: [LICENSE.md](LICENSE.md)

## Content & data

Content lives under [src/content](src/content) as Astro Content collections. The content collection and Zod schema are defined in [src/content.config.ts](src/content.config.ts). Site data (services, staff, insurances, navigation, etc.) are stored in [src/data](src/data) and used by pages and components.

Authoring workflow
- Add or edit markdown files in `src/content/blog/*` and submit a PR. The content schema enforces required fields — see [src/content.config.ts](src/content.config.ts).

## Tests

Run the test suite with:

```bash
npm run test
```

Or run in watch mode during development:

```bash
npm run test:watch
```

Test configuration: [vitest.config.ts](vitest.config.ts)

## Deploy

This project includes a Cloudflare-related configuration ([wrangler.jsonc](wrangler.jsonc)).

```bash
npm run build
# then publish ./dist to your host (Cloudflare Pages, Netlify, Vercel, etc.)
```

Examples
- Cloudflare Pages (using Wrangler or the Pages UI) — follow Cloudflare docs and reference [wrangler.jsonc](wrangler.jsonc).


## Environment variables / secrets

This repo may reference third-party keys (analytics, chatbot). The README lists common placeholders — update with real names/values if you use them:

- `GOOGLE_ANALYTICS_ID` — Google Analytics / GA4 measurement ID
- `NODE_ENV` — `development` or `production`

Create a local `.env` (not committed) for development values and set secrets in your deployment platform.

## Contributing

Contributions are welcome. Suggested process:

1. Fork the repo
2. Create a feature branch
3. Run tests and linters locally
4. Open a PR against `main` with a clear description

If you have repository-specific conventions (commit style, PR template), add them and I will update this README.

## License

This project is licensed under the terms in [LICENSE.md](LICENSE.md).

## Maintainers / Contact

Please provide maintainer or contact details to include here (email, team, or issue tracker link).
