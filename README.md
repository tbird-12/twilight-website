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

Standardize the runtime first:

```bash
nvm use
```

If you use Volta instead of `nvm`, the repository also pins Node.js and npm in `package.json`.

Install dependencies with the lockfile:

```bash
npm ci
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

## Runtime and dependency policy

- **Standard runtime:** Node.js `24.15.0`
- **Standard package manager:** npm `11.12.1`
- **Version pinning:** `.nvmrc`, `.node-version`, `package.json#packageManager`, `package.json#engines`, and `package.json#volta`
- **Deterministic installs:** commit `package-lock.json` and use `npm ci`
- **Future dependency additions:** `.npmrc` enables `save-exact=true` and `engine-strict=true`

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

## Docker

Build the production image:

```bash
docker build -t twilight-website .
```

Run the production image locally:

```bash
docker run --rm -p 8080:8080 twilight-website
```

The container serves the built static site at http://localhost:8080.

## Docker Compose

Run the Astro dev server in a container:

```bash
docker compose up --build
```

The development server is available at http://localhost:4321 and uses a named volume for `node_modules` so host OS package artifacts do not leak into the container.

## Dev container

This repository includes `.devcontainer/devcontainer.json` for VS Code / GitHub Codespaces style development. Reopen the folder in the container to get the pinned Node.js toolchain and then run:

```bash
npm run dev -- --host 0.0.0.0
```

## Configuration notes

No environment variables are required for standard local development. Google Analytics is currently configured in `src/data/siteConfig.ts`.

## License

See [LICENSE.md](LICENSE.md).
