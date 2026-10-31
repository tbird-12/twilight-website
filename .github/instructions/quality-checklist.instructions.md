---
applyTo: "**/*.astro, **/*.tsx, src/content/**, astro.config.mjs, public/**"
---

# Quality Checklist — Pre-Commit Audit Rules

These rules were established after a full sitewide audit in October 2026. They prevent the classes of bugs, regressions, and accessibility failures found at that time. Every item is a **hard requirement**, not a suggestion.

---

## 1. Analytics

### Every layout must include `<GoogleAnalytics>`
`BlogLayout.astro` previously omitted it, causing all 47 blog posts to silently skip analytics.

- `Layout.astro` — ✅ already includes `<GoogleAnalytics gaId={siteConfig.gaId} />`
- `BlogLayout.astro` — must include it in `<head>`, after the noscript font fallback
- `LandingLayout.astro` — intentionally omits it (paid-ad / noindex pages)

```astro
<!-- Inside <head> of BlogLayout.astro -->
<noscript>...</noscript>
<GoogleAnalytics gaId={siteConfig.gaId} />
<title>...</title>
```

If you add a new layout file, add `<GoogleAnalytics>` unless the layout is explicitly `noindex`.

---

## 2. SEO — Meta Descriptions

### Target length: 140–160 characters. Never over 160, never under 140.

| Layout / default | Correct |
|---|---|
| `Layout.astro` fallback | 153 chars ✅ |
| `BlogLayout.astro` fallback | 141 chars ✅ |
| `LandingLayout.astro` fallback | 153 chars ✅ |

Do not update the default fallback descriptions to anything shorter than 140 or longer than 160.

### Blog post `description` field
Enforced at the schema level in `src/content.config.ts`:
- **Min 1 char, max 160 chars** — the build will fail if violated
- **No trailing period** — the field is a snippet, not a sentence
- **Sentence case** — mirrors the `title` rule; no title-casing

### Blog post `title` field
Enforced at the schema level:
- **Max 70 characters** — build fails if violated
- **Sentence case** — only proper nouns, acronyms, and the first word are capitalised
- Use `seoTitle` for the meta `<title>` when the display title needs to be different

---

## 3. SEO — Sitemap

### Every `noindex` page must be excluded from the sitemap

The sitemap filter lives in `astro.config.mjs` at `sitemapExcludedPaths`. **Both the `robots` meta tag AND the sitemap exclusion must be set together** — one without the other is incorrect.

```js
// astro.config.mjs — sitemapExcludedPaths array
"/welcome/",
"/client-resources/",
"/client-resources/fees-and-insurance/",
"/client-resources/location/",
"/client-resources/online-testing-and-insurance-faq/",
// + all /specialities/ and legacy /about/ slugs
```

**When adding a new `noindex` page:**
1. Pass `robots="noindex, follow"` to the layout's `robots` prop
2. Add the page path to `sitemapExcludedPaths`
3. If it is a LandingLayout page, also set `data-pagefind-ignore="all"` on `<main>` (see §6)

---

## 4. Redirects — HTTP 301, Not Meta-Refresh

### Use `public/_redirects` for all legacy URL aliases

Astro's `LegacyRedirectPage` component returns **HTTP 200** with a `<meta http-equiv="refresh">` client-side redirect. This does **not** pass link equity to the new URL and is not treated the same as a 301 by search engines.

For all alias/legacy paths, add a matching `301` line to `public/_redirects` instead:

```
/old-path    /new-path    301
```

Cloudflare Workers Assets processes this file natively — no code required. The HTML stub page (`LegacyRedirectPage`) can be kept as a graceful fallback but the `_redirects` entry is the canonical redirect mechanism.

**When retiring a URL or renaming a page:**
1. Add the `old → new 301` line to `public/_redirects`
2. Keep the `.astro` stub only as a fallback (do not delete it until the 301 is confirmed in production)
3. Add the old path to `sitemapExcludedPaths`

---

## 5. Security — External Links

### `rel="noopener noreferrer"` is required on every `target="_blank"` link

**In Astro/TSX component files:** add the attributes explicitly:
```astro
<a href="https://..." target="_blank" rel="noopener noreferrer">...</a>
```

**In Markdown blog posts:** handled automatically by the `rehype-external-links` plugin configured in `astro.config.mjs`. All external Markdown links (`[text](https://...)`) receive `target="_blank" rel="noopener noreferrer"` at build time. Do not add these attributes manually in Markdown.

**Never** write `target="_blank"` on an `<a>` tag in an `.astro` or `.tsx` file without `rel="noopener noreferrer"`. The build does not catch this automatically — it must be reviewed manually.

---

## 6. Performance — Prefetch and Pagefind

### Prefetch strategy
`astro.config.mjs` uses `prefetchAll: false` with `defaultStrategy: "viewport"`. This means:
- Only links with an explicit `data-astro-prefetch` attribute are prefetched
- Use `data-astro-prefetch="viewport"` on service cards, specialty cards, and CTA links
- Do **not** change `prefetchAll` to `true` — it registers hover listeners on every link sitewide, generating unnecessary idle network traffic on high-link-count pages

### Pagefind indexing
- `Layout.astro` — `<main data-pagefind-body>` ✅ (indexed in site search)
- `BlogLayout.astro` — `<main data-pagefind-body>` ✅ (indexed)
- `LandingLayout.astro` — `<main data-pagefind-ignore="all">` ✅ (noindex page; excluded from site search)

**Rule:** any page with `robots="noindex"` must use `data-pagefind-ignore="all"` on `<main>`, not `data-pagefind-body`.

---

## 7. Accessibility (ARIA)

### 7a. Breadcrumbs
Breadcrumb separator characters must be hidden from assistive technology:

```astro
<nav aria-label="Breadcrumb">
  <a href="/blog">Blog</a>
  <span aria-hidden="true">/</span>
  <a href={`/blog/category/${category}/`}>{categoryMeta.label}</a>
  <span aria-hidden="true">/</span>
  <span aria-current="page">{title}</span>  <!-- current page gets aria-current -->
</nav>
```

### 7b. Section labelling
Every `<section>` must have either an `aria-label` or an `aria-labelledby` pointing to its heading:

```astro
<section aria-labelledby="related-posts-heading">
  <h2 id="related-posts-heading">You May Also Be Interested In</h2>
  ...
</section>
```

Never leave a `<section>` without one of these. A `<div>` does not require labelling.

### 7c. Block links (card-style `<a>` wrapping rich content)
Any `<a>` that wraps a heading or multiple elements must have an explicit `aria-label`. Without it, screen readers announce the full inner text as one continuous link label:

```astro
<!-- ✅ correct -->
<a href={href} aria-label={`Read: ${post.data.title}`} class="block ...">
  <h2>{post.data.title}</h2>
  <p>{post.data.description}</p>
</a>
```

### 7d. Duplicate tab stops from repeated links
When a card or list item links to the same URL from two `<a>` tags (e.g. a title link and a "Read →" link), one of them must be removed from the tab order. The preferred approach is to make the title link the primary and convert the decorative "Read →" to an `aria-hidden` `<span>`:

```astro
<!-- ✅ correct — single tab stop, decorative arrow hidden from AT -->
<a href={href} aria-label={`Read: ${title}`}>
  <h2>{title}</h2>
</a>
<span aria-hidden="true" class="text-xs text-icon">Read →</span>
```

### 7e. Prose body links (WCAG 1.4.1 Non-text Contrast)
Links inside Markdown-rendered prose (`<div class="prose ...">`) must be distinguishable by more than colour alone. The global Tailwind Typography config must include an underline:

```astro
<!-- ✅ underline present at rest; heavier on hover -->
prose-a:text-icon prose-a:underline prose-a:underline-offset-2
prose-a:decoration-icon/40 hover:prose-a:decoration-icon
```

Never use `prose-a:no-underline` without an alternative non-colour differentiation (e.g. `prose-a:font-semibold`).

### 7f. External links on `<a href="tel:">` and `<a href="mailto:">`
All phone and email links must include a descriptive `aria-label`. The raw `tel:` or `mailto:` URI is what screen readers announce without a label:

```astro
<a
  href={`tel:${PHONE_NUMBER}`}
  aria-label="Call Twilight Psychology to schedule an evaluation"
>
  {PHONE_NUMBER_FORMATTED}
</a>

<a
  href={`mailto:${EMAIL_ADDRESS}`}
  aria-label="Email the Twilight Psychology office"
>
  Email our office
</a>
```

### 7g. SVG icons used as decorative affordances
If a SVG icon is purely decorative (e.g. the home icon in the Header, arrow icons inside links), mark it `aria-hidden="true"`. If it is the only content of a link/button, use `aria-label` on the parent and `aria-hidden="true"` on the SVG.

---

## 8. Blog-Specific Rules

### 8a. Category resource sidebar (`categoryResourceLinks` in `[...slug].astro`)
The sidebar renders 4–5 links per category. When adding a new service, specialty, or resource page, update the matching category bucket. All hrefs must resolve to real pages in `src/pages/`. Verify with the following mapping:

| Category | Must include |
|---|---|
| `clinical` | `/services/psychological-evaluations`, `/services/therapy`, `/services/telehealth`, `/resources/new-client`, `/resources/waitlist-times` |
| `billing` | `/resources/fees`, `/resources/insurances-accepted`, `/resources/faq`, `/resources/new-client`, `/contact` |
| `insurance` | `/resources/insurances-accepted`, `/resources/fees`, `/resources/faq`, `/resources/new-client`, `/contact` |
| `business` | `/about/locations`, `/about/clinicians/clinicians-lex-ky`, `/about/service-area`, `/resources/new-client`, `/contact` |
| `announcements` | `/about/locations`, `/resources/insurances-accepted`, `/resources/faq`, `/resources/new-client`, `/contact` |

**All links must use trailing slashes** (`/resources/faq/`, not `/resources/faq`).

### 8b. Trailing slashes on blog internal links
All `href` values inside blog templates that point to internal pages must include a trailing slash for consistency:

```astro
<!-- ✅ -->
href={`/blog/${post.id}/`}
href={`/blog/category/${category}/`}

<!-- ✗ missing slash -->
href={`/blog/${post.id}`}
```

### 8c. `aria-current="page"` on the breadcrumb current item
The last breadcrumb item (the current page) must have `aria-current="page"`. This is not set automatically.

### 8d. Featured post block link
The featured post block in `blog/index.astro` is a block-level `<a>` — it needs `aria-label`:

```astro
<a href={`/blog/${featuredPost.id}/`} aria-label={`Read: ${featuredPost.data.title}`}>
```

---

## 9. Content Schema Enforcement (automated)

`src/content.config.ts` enforces these at build time — the build **fails** if any post violates them:

| Field | Constraint |
|---|---|
| `title` | `z.string().max(70)` |
| `description` | `z.string().min(1).max(160)` |
| `category` | `z.enum(BLOG_CATEGORIES)` — exact match, no extras |
| `heroImage` present → `heroImageAlt` | `required and non-empty` (`.refine()`) |

These are the schema-level guards. The **style** rules (sentence case, no trailing period) are not automated — they require manual review.

---

## 10. Pre-Commit Checklist

Before committing any change that touches layouts, blog pages, or new pages, run through this list:

**Analytics**
- [ ] New layout includes `<GoogleAnalytics>` (unless `noindex`)

**SEO**
- [ ] `description` prop / frontmatter is 140–160 chars, no trailing period
- [ ] `title` / frontmatter `title` is sentence case, ≤70 chars
- [ ] All `noindex` pages are in `sitemapExcludedPaths`

**Redirects**
- [ ] New legacy alias has a `301` line in `public/_redirects`
- [ ] Old URL added to `sitemapExcludedPaths`

**Security**
- [ ] Every `target="_blank"` in `.astro`/`.tsx` has `rel="noopener noreferrer"`
- [ ] Markdown external links are handled automatically by `rehype-external-links`

**Performance**
- [ ] New internal links on cards use `data-astro-prefetch="viewport"`
- [ ] `noindex` pages use `data-pagefind-ignore="all"` on `<main>`

**Accessibility**
- [ ] `<section>` has `aria-label` or `aria-labelledby`
- [ ] Block-level `<a>` (card links) has `aria-label`
- [ ] Breadcrumb separators have `aria-hidden="true"`; current item has `aria-current="page"`
- [ ] No duplicate `<a>` tags to the same `href` in one component
- [ ] Prose links in blog bodies use `prose-a:underline` (not `prose-a:no-underline`)
- [ ] `tel:` and `mailto:` links have `aria-label`
- [ ] Decorative SVG icons have `aria-hidden="true"`

**Content**
- [ ] `npm run check` passes (schema validates all 47 posts)
- [ ] `npm run test` passes (54 tests)
- [ ] `npm run build` passes (130 pages, no warnings)
