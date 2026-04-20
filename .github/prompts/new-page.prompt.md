---
agent: "edit"
description: "Scaffold a new Astro page with layout, SEO, and standard structure"
---

Create a new Astro page at the path I specify. Follow this structure:

```astro
---
import Layout from "~/layouts/Layout.astro";
// Import any needed components or data here

// Optional: fetch/transform data in frontmatter
---

<Layout
  title="Page Title | Twilight Psychology"
  description="One or two sentence description under 160 characters."
>
  <div class="bg-site-bg min-h-screen pb-24">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Page content -->
    </div>
  </div>
</Layout>
```

**Rules:**
- Always use `Layout` from `~/layouts/Layout.astro` as the root wrapper
- `title` must end with ` | Twilight Psychology`
- `description` must be under 160 characters and unique per page
- Use `bg-site-bg` as the page background — never hardcoded colors
- Import data directly from `~/data/...` files in the frontmatter
- Use `~/` path alias for all src imports
- Add `<Schema />` from `~/components/Schema.astro` for service or provider pages
- For pages with interactive sections, import the relevant `*Wrapper.astro` component

Ask me: What is the page path (e.g., `src/pages/services/new-service.astro`) and what is the page's purpose?
