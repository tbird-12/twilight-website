---
applyTo: "src/content/**"
---

## Content Collection Rules

### Required Frontmatter
Every blog post must have all of these fields:

```yaml
---
title: "Post Title Here"
description: "One or two sentence summary for SEO and card previews."
pubDate: 2026-04-20
category: announcements
author: "Twilight Psychology Team"
draft: true
---
```

### Field Rules
- `title` — sentence case, descriptive, under 70 characters
- `description` — under 160 characters, no trailing period, no repetition of `title`
- `pubDate` — format `YYYY-MM-DD` (no quotes needed in YAML)
- `category` — must be exactly one of: `billing` | `insurance` | `clinical` | `business` | `announcements`
- `author` — use `"Twilight Psychology Team"` unless a specific clinician authored it
- `draft: true` — always set while authoring; flip to `false` only when ready to publish
- `updatedDate` — optional; add when substantially revising published content
- `tags` — optional array of lowercase, kebab-case strings

### File Naming
- File name becomes the URL slug: `new-client-faq.md` → `/blog/new-client-faq`
- Use kebab-case only: lowercase letters, hyphens, no underscores or spaces
- Place in the subfolder matching `category`: `src/content/blog/announcements/post-name.md`

### Content Style
- Use MDX (`.mdx`) only if you need interactive components embedded in the post; otherwise use plain Markdown (`.md`)
- Headings start at `##` (H2) — the post `title` renders as H1 in the layout
- Do not embed raw HTML unless absolutely necessary

### Related Resources Section
Each blog post should end with a `## Related resources` section (title case is fine but lowercase is preferred). Keep it to **4–5 links maximum**. Prioritise the most directly relevant service or specialty page, then 1–2 closely related blog posts, then a practical resource (FAQ, waitlist, new client guide). Do not cross-link to every tangentially related page — trim to the links a reader would plausibly want after finishing the post.
