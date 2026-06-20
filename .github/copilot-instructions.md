# Twilight Psychology — Copilot Instructions

## Project Overview
Psychology practice website for Twilight Psychology (neuro-affirming evaluations, therapy, medication management). Built as a static site deployed to Cloudflare Workers.

**Tech stack:** Astro 6 (SSG) · React 19 (islands via `@astrojs/react`) · Tailwind CSS v4 · TypeScript 5 (strict) · Vitest · Cloudflare Workers

## Build, test, and validation commands
Use the pinned Node/npm toolchain (`nvm use` or the Volta config in `package.json`) and install dependencies with `npm ci` before local work.

```
npm run dev        # Astro dev server
npm run check      # Astro type checking / diagnostics
npm run test       # Vitest test suite
npm run build      # Production build (always run after changes)
npm run preview    # Preview the built site locally
```

- Always run `npm run check` and `npm run test` after making changes. Both should pass.
- Run a single Vitest file with `npm run test -- tests/data/services.test.ts` or `npx vitest run tests/data/services.test.ts`.
- Use `npm run test:watch` when iterating on a targeted test.
- `npm run build` is the best end-to-end verification for this statically generated site.

## High-level architecture
- The site is a static Astro app with route entrypoints in `src/pages/` and shared page shell/layout logic in `src/layouts/`.
- Most content is data-driven: services, specialties, staff, insurance, navigation, and site config all live in `src/data/` and are validated by Vitest under `tests/data/`.
- Blog posts are content collections in `src/content/blog/` with schema enforcement in `src/content.config.ts`.
- Interactive UI is isolated to React islands under `src/components/react/` and `src/components/interactive/`; Astro wrappers in `src/components/` bridge those islands into pages.
- SEO and shared structured data are centralized in `src/components/Schema.astro` and the shared layouts, so page-level changes should preserve those conventions.
- This repository already has source-specific instruction files in `.github/instructions/` for Astro, React, data, content, and SEO/UX; follow those in addition to this file.

## Architecture Rules

### Astro vs React
- **Astro `.astro` files** — layout, static content, page shells, SEO, data fetching at build time
- **React `.tsx` files** — any interactive UI (state, events, animations)
- Use React 19 islands via `@astrojs/react`; import hooks from `react`

### Island Hydration
- `client:visible` — default for most interactive components (lazy, viewport-triggered)
- `client:load` — only for above-the-fold, immediately-interactive elements (Header, ThemeToggle)
- `is:inline` — ONLY for the theme init script in `<head>` to prevent FOUC
- Avoid `client:only`

### Wrapper Pattern (mandatory)
Every interactive Preact component has exactly two files:
```
FaqAccordion.tsx           ← Preact logic, props interface, no hydration concern
FaqAccordionWrapper.astro  ← Astro bridge: imports data, passes serializable props, applies client:*
```
Pass only serializable types through wrappers: primitives, plain arrays, plain objects.

### Path Alias
Use `~/` for all `src/` imports in `.ts`/`.tsx` files:
```ts
import { services } from "~/data/services";   // ✓
import { services } from "../../data/services"; // ✗
```

## Tailwind & Styling
Use CSS token classes — never raw Tailwind colors or arbitrary hex values:
- Backgrounds: `bg-site-bg`, `bg-surface`, `bg-surface-2`
- Text: `text-site-text`, `text-cta`
- Borders: `border-border`, `border-border-strong`
- CTA button: `bg-cta`, `text-cta`, `hover:bg-cta/90`
- Tokens are defined via `@theme {}` in `src/styles/global.css`

## TypeScript Conventions
- Astro components: `interface Props { ... }` inside frontmatter, destructured via `Astro.props`
- Preact components: named `interface [Name]Props { ... }`, destructure with defaults
- Type-only imports: `import type { Provider } from "~/data/staff"`
- Use `as const` for enum-like string literals

## Data Layer (`src/data/`)
- All exports are typed constants — no classes, no singletons
- Define TypeScript interfaces in the same file as the data
- Every new data file requires a matching test in `tests/data/`
- Use `getCollection("blog", (p) => !p.data.draft)` — always filter drafts, sort by `pubDate` descending

## Content Collections (`src/content/blog/`)
Required frontmatter: `title`, `description`, `pubDate` (YYYY-MM-DD), `category`, `author`
Valid categories: `billing` | `insurance` | `clinical` | `business` | `announcements`
File name = URL slug — use kebab-case. Set `draft: true` while authoring.

## Do Not
- Add barrel/index files — import directly from source
- Add `eslint-disable` comments — fix the underlying issue
- Use `any` type — use `unknown` + type guards or proper interfaces
- Add `console.log` — remove before committing
