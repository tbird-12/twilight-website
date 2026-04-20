---
agent: "edit"
description: "Scaffold a new blog post with correct frontmatter"
---

Create a new blog post Markdown file at `src/content/blog/[category]/[slug].md`.

Use this frontmatter template:

```markdown
---
title: "Post Title Here"
description: "One or two sentence summary for SEO and card previews. Under 160 characters."
pubDate: 2026-04-20
category: announcements
author: "Twilight Psychology Team"
tags: []
draft: true
---

Write your post content here. Start with a brief introduction paragraph.

## First Section Heading

Content...
```

**Rules:**
- `title` — sentence case, descriptive, under 70 characters
- `description` — under 160 characters, no trailing period, distinct from the title
- `pubDate` — today's date in `YYYY-MM-DD` format (no quotes needed)
- `category` — must be exactly one of: `billing` | `insurance` | `clinical` | `business` | `announcements`
- `author` — use `"Twilight Psychology Team"` unless a specific clinician authored it
- `draft: true` — always set while authoring; change to `false` only when ready to publish
- `tags` — optional lowercase kebab-case strings; can be empty array
- **File name** = URL slug — use kebab-case only (e.g., `understanding-adhd-in-adults.md`)
- **File location** — place in the subfolder matching `category` (e.g., `src/content/blog/clinical/`)
- Headings start at `##` (H2) — the post title renders as H1 via the blog layout
- Use plain Markdown (`.md`); only use `.mdx` if you need embedded interactive components

Ask me: What is the post title, which category, and what should the slug (filename) be?
