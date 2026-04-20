---
applyTo: "**/*.astro"
---

## Astro Component Rules

### Props
Always define `interface Props { ... }` in the frontmatter for any component that accepts props. Destructure from `Astro.props`:
```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = "Default" } = Astro.props;
---
```

### Layouts
- Pages extend `Layout.astro` (pass `title`, `description`, `canonical`)
- Blog posts extend `BlogLayout.astro`
- Never create a page without a layout

### Images
- Use `<Image>` from `astro:assets` for all non-SVG images — never raw `<img>` tags
- SVGs may be imported with `?raw` and inlined for icon use
- Provide `alt` text for every image

### Hydration Directives
- `client:visible` — default for any interactive component not immediately visible
- `client:load` — only for above-the-fold components (Header, ThemeToggle)
- `is:inline` — only for the theme initialization `<script>` in `<head>` to prevent FOUC
- Never use `client:only`

### Wrapper Components
When bridging a Preact component into an Astro page:
1. Import the Preact component in the wrapper's frontmatter
2. Pass only serializable props (primitives, plain arrays, plain objects — no functions, classes, Maps)
3. Apply the `client:*` directive on the Preact component element
4. Put data-fetching/transformation logic in the frontmatter, not JSX

### Content Collections
```ts
import { getCollection } from "astro:content";
const posts = (await getCollection("blog", (p) => !p.data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```
Always filter drafts and sort by `pubDate` descending.

### Schema Markup
Use `<Schema />` component from `~/components/Schema.astro` for structured data on service/provider pages.
