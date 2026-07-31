---
applyTo: "**"
---

# SEO & UX Best Practices

These conventions were established during an SEO audit in May 2026 and **must be followed** when adding or editing any page, layout, or component. They are not suggestions — they are the resolved baseline.

---

## Title Tags

### Brand auto-append (layout-level — do not touch per-page)
All three layouts (`Layout.astro`, `BlogLayout.astro`, `LandingLayout.astro`) automatically append `| Twilight Psychology` when the title does not already contain it:
```ts
const pageTitle = title.includes(siteConfig.siteName)
  ? title
  : `${title} | ${siteConfig.siteName}`;
```
- **Never** manually append `| Twilight Psychology` on individual pages — the layout handles it.
- **Always** pass a raw page title without the brand suffix to the layout.

### Geographic qualifiers
- Every service page and specialty page title **must** include `in Kentucky`, `KY`, or `Kentucky`.
- Blog post `seoTitle` values should include a geo qualifier when they target local search intent.
- Telehealth/multi-state pages may reference the specific states served (KY, TN, OH) or "40+ states via PSYPACT".

### Character limits
- Aim for ≤60 chars. Up to 65 is acceptable when geographic copy cannot be trimmed.
- Check length before submitting a new page; Google truncates at ~60.

---

## Meta Descriptions

- **140–160 characters** — under 140 wastes space; over 160 gets truncated.
- Must be action-oriented and geo-qualified for any service or specialty page.
- **Never** include a price or rate (e.g. `$1,300`) — pricing in snippets is considered spammy and reduces CTR.
- Do not begin with generic phrases: "We provide," "Our team offers," "Comprehensive services."

---

## Open Graph & Social Tags

All three layouts must emit **all** of the following OG tags:

```html
<meta property="og:image" content="..." />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />
```

- `og:image:width` and `og:image:height` are **required** — social crawlers skip images without declared dimensions.
- The canonical OG image is `public/og-image.png` (1200×630 px).
- `BlogLayout.astro` can override with a post-specific image; dimensions must still be declared.

---

## Robots & Crawlability

### Default
All layouts default to `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`. Do not change this default.

### noindex pages
Use `robots="noindex, follow"` (passed to the layout's `robots` prop) **only** for:
- Paid-ad landing pages (e.g. `/welcome` during an active campaign) to prevent them competing with organic pages for the same keywords.
- Utility or thank-you pages that have no independent search value.

When a page is `noindex`:
1. Add it to the sitemap filter in `astro.config.mjs` so it is excluded from `sitemap-0.xml`.
2. Document why it is noindexed in a comment near the `robots` prop.

### Canonical URLs
All layouts compute and emit the canonical automatically from `Astro.url.pathname`. Only override `canonical` manually when a page has genuine duplicate-content issues (e.g. pagination).

---

## Sitemap

- Managed automatically by `@astrojs/sitemap`.
- Draft blog posts are already excluded via `getCollection("blog", (p) => !p.data.draft)` in `getStaticPaths`.
- Any page added with `robots="noindex"` must also be excluded from the sitemap in `astro.config.mjs`:
  ```js
  sitemap({ filter: (page) => !page.includes("/your-noindex-page/") })
  ```
- **Do not** add decorative or redirect-only pages to the navigation without ensuring they either appear in the sitemap (if indexable) or are explicitly noindexed.

---

## Schema Markup

Use `<Schema />` from `~/components/Schema.astro`. The following schemas are already globally applied — do not duplicate them on individual pages:
- `MentalHealthOrganization` (all layouts via `Schema.astro`)
- `WebSite` + `WebPage` (all layouts)

**Add page-level schemas** for these page types:
| Page type | Schema to add |
|---|---|
| Blog post (`[...slug].astro`) | `BlogPosting` + `BreadcrumbList` ✅ (already present) |
| FAQ page | `FAQPage` ✅ (already present) |
| Clinician profile | `Person` ✅ (already present) |
| New service pages | `MedicalBusiness` or `Service` block inside the org schema |
| New specialty pages | Add `knowsAbout` entry to `Schema.astro` instead of a standalone page schema |

### areaServed in Schema.astro
When a clinician gains licensure in a new state or telehealth coverage expands:
1. Add the state to `areaServed` in `src/components/Schema.astro`.
2. Update the relevant clinician profile in `src/data/clinicianProfiles.ts`.
3. Update the `About Service Area` page (`src/pages/about/service-area.astro`) accordingly.

---

## Internal Linking

### Blog category resource sidebar
`src/pages/blog/[...slug].astro` renders contextual resource links per category. Keep **4–5 links per category** — enough to be useful without overwhelming the reader. When adding new service or resource pages, **update the matching category links**:

- `clinical` → `/services/psychological-evaluations`, `/services/therapy`, `/services/telehealth`, `/resources/new-client`, `/resources/waitlist-times`
- `billing` → `/resources/fees`, `/resources/insurances-accepted`, `/resources/faq`, `/resources/new-client`, `/contact`
- `insurance` → `/resources/insurances-accepted`, `/resources/fees`, `/resources/faq`, `/resources/new-client`, `/contact`
- `business` → `/about/locations`, `/about/clinicians/clinicians-lex-ky`, `/about/service-area`, `/resources/new-client`, `/contact`
- `announcements` → `/about/locations`, `/resources/insurances-accepted`, `/resources/faq`, `/resources/new-client`, `/contact`

Do not link to generic `/services` alone when a more specific page exists.

### Blog post "Related resources" section
Each blog post may end with a `## Related resources` section. Keep it to **4–5 links maximum**. Prioritize:
1. The most directly relevant service or specialty page for this post's topic
2. One or two closely related blog posts (different angle, not a repeat)
3. A resource page (FAQ, waitlist times, new client guide) when it adds practical value

Do not cross-link to every tangentially related page. Remove any link that a reader who just finished the post would not plausibly need next.

### Cross-linking specialty ↔ service
- Specialty pages (e.g. `/specialties/dyslexia-testing/`) should link to the parent service (`/services/psychological-evaluations/`).
- Service pages should mention and link to any specialty pages that fall under them.

---

## Geographic SEO & Multi-State Telehealth

- Primary geography: **Lexington, KY** (in-person) + **Kentucky statewide** (telehealth + in-person).
- Extended telehealth coverage:
  - Dr. Heather Cornett — **PSYPACT** (40+ states); reference as "40+ states via PSYPACT."
  - Dr. Michael Burns — **Kentucky + Tennessee**.
  - Jatana Boggs — **Kentucky + Ohio**.
- Never claim a state for a clinician who is not licensed there.
- Page copy for telehealth services should mention Kentucky first, then the extended reach — not the reverse.

---

## Landing Pages (`/welcome` and any future `/lp/*` pages)

### Single-viewport design
Landing pages used for direct traffic or paid campaigns must fit within **one screen height**:
- Logo → headline → 1–2 line description → service orientors → primary CTA → trust bar → minimal footer.
- No multi-section scroll experience that mirrors the homepage.

### Differentiation from homepage
- Use a distinct headline and description that are **not** the same copy as `index.astro`.
- Do not include sections that exactly duplicate homepage sections (team grid, services cards, steps, insurance badges, blog posts).
- Service badge pills or compact orientors are acceptable; full cards are not.

### Paid-ad landing pages
- Add `robots="noindex, follow"` to the layout prop.
- Add a sitemap filter to exclude the page from `sitemap-0.xml`.
- Do not add the page to site navigation.

---

## UX Patterns

### Animations & scroll reveals
- Use `client:visible` for all interactive components below the fold.
- Use `client:load` only for above-the-fold components (Header, ThemeToggle).
- `AnimatedSection` renders hidden until hydrated — do not use it as the primary container for anchor-target content (e.g. a `#section-id` the user might jump to directly).
- Always honour `prefers-reduced-motion`: skip or collapse animations when the media query matches.

### Dark-mode contrast
- Insurance and partner logo cards must stay on a **light neutral surface** (e.g. `bg-white` / `bg-slate-50`) even in dark mode so logos remain legible. Do not restyle these to dark cards.
- Never use low-contrast muted text over a dark surface for critical clinical or pricing information.

### Images
- Use `getImage` (from `astro:assets`) for any image URL embedded in structured data (schema, OG) rather than a raw `.src` reference — raw `.src` emits the unoptimised original into `dist`.
- Prefer `src/assets/images/logo.png` (via `astro:assets`) for UI logos and favicons. Avoid `public/favicon.svg` — it is oversized.

### CTA buttons
- Primary CTA colour class: `bg-cta text-cta-fg` with `hover:bg-cta/80`.
- Never hardcode hex values; always use the token classes defined in `src/styles/global.css`.

---

## Content Accuracy Checks (before publishing)

Before publishing any page or blog post that references the following, verify the current value in `src/data/`:
| Copy claim | Source of truth |
|---|---|
| Self-pay evaluation turnaround | `src/data/resource.ts` — currently **7 days** |
| Self-pay waitlist | `src/data/resource.ts` — currently **3 weeks** |
| Clinician license states | `src/data/clinicianProfiles.ts` |
| Insurance panels | `src/data/insurances.ts` |
| Staff names / credentials | `src/data/staff.ts` |

---

## Analytics-Derived Rules (July 2026)

These rules were derived from two months of Google Analytics and Search Console data and address patterns that directly hurt CTR and ranking.

### Medicaid keyword coverage (critical)
High-impression, near-zero-click searches at position 1–2 for Medicaid queries indicate that Google shows the pages for these terms but the snippet doesn't signal Medicaid acceptance, causing users to skip:
- `adhd testing medicaid` — 63 impressions, 0 clicks, avg position **1.54**
- `adult autism diagnosis near me medicaid` — 56 impressions, 0 clicks, avg position **1.50**
- `adult autism testing near me medicaid` — 51 impressions, 0 clicks, avg position **2.80**
- `adhd testing that takes insurance` — 50 impressions, 0 clicks, avg position **24.6**

**Rules:**
- Every service page meta description **must** include "Insurance and Kentucky Medicaid accepted" or equivalent phrasing when the service is covered by Medicaid.
- Service page body copy must include a dedicated insurance/Medicaid section visible above the fold or in the sidebar — not buried at the bottom.
- Do not rely only on the `/resources/insurances-accepted` page to carry Medicaid signals — each service page must contain them independently.

### Title tag accuracy for ADHD page
The approved title for ADHD testing (from the audited title list) is **`ADHD Testing KY`**, not `"ADHD Testing in Lexington, KY"`. The shorter form matches more search variants and stays within the 60-char limit. Do not revert to the longer form.

### Schema parity between service pages
Every service page (autism, ADHD, therapy, medication management, evaluations) must have a `Service` schema block passed via `<Schema slot="page-schema">`. The autism page has this; any new or updated service page must also include it. See `src/pages/services/autism-testing.astro` as the canonical reference.

### `aria-label` on phone and booking CTAs
All `<a href="tel:...">` links must include an `aria-label` that names the action and context:
```html
<a href={`tel:${PHONE_NUMBER}`}
   aria-label="Call Twilight Psychology to schedule an ADHD evaluation">
  Contact Our Office
</a>
```
Do not leave phone links with generic visible text as the only label — screen readers announce the raw number, not the purpose.

### High-impression opportunities to target with blog content
These queries appear regularly in impressions but have 0 clicks, signalling a content gap. Each is a strong candidate for a blog post or service-page section update:
- `aetna neuropsychological testing` — 173 impressions, position ~11 (needs in-body Aetna + testing mention on ADHD/autism pages or a blog post)
- `adolescent therapist near me` — 108 impressions, position ~37 (child/teen therapy page needs stronger ranking signals)
- `adhd treatment lexington ky` — 54 impressions, position ~16 (ADHD page or blog post)
- `adhd assessment for adults near me` — 54 impressions, position ~13.5

### CPT code blog post — untapped traffic
`/blog/billing/common-cpt-codes-used-in-psychological-testing/` drives 40 organic clicks and 7,524 impressions but has 0 engaged sessions (users who click through don't engage). This post needs a revised intro and an internal link CTA to the services or contact page to capture that traffic.

### `/welcome` landing page
This page currently receives organic impressions (`/welcome/` — 28 impressions, 1 click, position 6.46). It is a paid-ad landing page and **must** be `robots="noindex, follow"`. Verify it remains excluded from the sitemap filter in `astro.config.mjs`.

