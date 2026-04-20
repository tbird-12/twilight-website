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
