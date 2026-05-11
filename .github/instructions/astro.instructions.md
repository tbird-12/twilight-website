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

---

## SEO Standards (audited and resolved — do not re-flag these)

These conventions have been reviewed and applied across all pages. Do not suggest changes that contradict them.

### Title Tags
- Target ≤60 chars. Up to 65 is acceptable when content cannot be trimmed further.
- Always include a geographic qualifier (`KY` or `in Kentucky`) for service and specialty pages.
- Brand suffix is always `| Twilight Psychology` (never `| Twilight Psychology PLLC`).
- Confirmed titles (do not rewrite):
  - Home: `Psychological Evaluations & Therapy in KY | Twilight Psychology`
  - Services hub: `Psychological Services | Twilight Psychology`
  - ADHD Testing: `ADHD Testing KY | Twilight Psychology`
  - Autism Testing: `Autism Testing KY | Twilight Psychology`
  - Personality Evaluations: `Personality Evaluations KY | Twilight Psychology` (not "Personality Disorder Evaluations")
  - Medication Management: `Medication Management in KY | Twilight Psychology`
  - Therapy hub: `Therapy in Kentucky | Neurodivergent, ADHD & Couples Counseling`
  - Therapy clinicians: `Kentucky Therapists for Neurodivergence | Twilight Psychology`
  - Couples Therapy: `Couples Therapy in Lexington, KY | Twilight Psychology`
  - Psychological Evaluations: `Psychological Evaluations Lexington KY | Twilight Psychology`
  - Psychoeducational: `Psychoeducational & 2E Evaluations KY | Twilight Psychology`
  - ESA Evaluations: `Emotional Support Animal Evaluations KY | Twilight Psychology` (full name, not abbreviation only)
  - Guardianship: `Guardianship Evaluations | Twilight Psychology`
  - Blog: `Clinical Resources & Updates | Twilight Psychology`
  - Fees: `Service Fees & Rates | Twilight Psychology`

### Meta Descriptions
- Target 140–160 chars.
- Must be action-oriented and include a geographic reference for service pages.
- Do not use generic phrases like "We provide comprehensive services tailored to your unique needs."

### Page Subtitles (`subtitle` prop on `PageHeroWrapper`)
- Must name the specific service, condition, or action — no filler openers like "Thoughtful," "We provide," or "Ensuring seamless."
- Must be clear within the first 1–2 sentences.
- Confirmed subtitles (do not rewrite):
  - Services hub: "We provide comprehensive psychological services tailored to your unique needs and are often covered by health insurance, including psychological evaluations, therapy, and medication management."
  - Medication Management: "Measured and supportive psychiatric care led by our specialized Nurse Practitioner."
  - Locations: "Twilight Psychology is located in Lexington, KY, with dedicated spaces for psychological evaluations, therapy, and medication management."
  - Adoption Evaluations: "Comprehensive, agency-ready evaluations for prospective adoptive parents who want a process led with compassion and clinical credibility. We support domestic and international adoptions..."
  - Insurances Accepted: "We accept most major insurance plans for covered mental health diagnoses, including Aetna, Cigna, UHC, Anthem, Medicaid, and Medicare."
  - About / Mission: "The principles that guide our clinical practice, our providers, and your care." (intentionally broad — approved by owner)

### Routing
- Specialty pages live at `/specialties/` (correct spelling). Never use `/specialities/` (misspelling — corrected sitewide in May 2026).

### Messaging Conventions
- Turnaround for self-pay evaluations: **7 days** from intake to report delivery.
- Self-pay waitlist: **3 weeks**.
- The practice is **neuro-affirming** and serves **neurodivergent** individuals — this should be reflected in page copy.
- "Personality Evaluations" is the correct term (not "Personality Disorder Evaluations") — applies to titles, descriptions, and hero text.
