# Twilight Psychology — Copilot Instructions

## Project Overview
Psychology practice website for Twilight Psychology (neuro-affirming evaluations, therapy, medication management). Built as a static site deployed to Cloudflare Workers.

**Tech stack:** Astro 6 (SSG) · React 19 (islands via `@astrojs/react`) · Tailwind CSS v4 · TypeScript 5 (strict) · Vitest · Cloudflare Workers

## Build & Validation Commands
```
npm run dev        # Astro dev server
npm run build      # Production build (always run after changes)
npm run check      # TypeScript type checking (run before committing)
npm run test       # Vitest test suite
npm run preview    # Preview production build locally
```
Always run `npm run check` and `npm run test` after making changes. Both must pass.

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
