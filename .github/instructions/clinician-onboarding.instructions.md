---
applyTo: "src/data/staff.ts, src/data/clinicianProfiles.ts, src/data/navigationData.ts, src/components/Schema.astro, src/pages/about/**"
---

# Adding a New Clinician

Follow every step in order. Run `npm run check && npm run test && npm run build` after completing all steps before committing.

---

## 1. Add the Staff Photo

Place the clinician's headshot in `src/assets/images/staff/`:

- **Format:** PNG or JPG (match the existing filenames — no spaces)
- **Filename:** `firstname-lastname.png` (kebab-case, matches the future slug)
- **Recommended size:** at minimum 480 × 640 px (portrait aspect ratio). The template renders the image at `w-72 h-96` (288 × 384 px).

---

## 2. Add a `Provider` Entry in `src/data/staff.ts`

### a. Import the image at the top of the file
```ts
import newClinicianImg from '../assets/images/staff/firstname-lastname.png';
```

### b. Append an object to the `providers` array
All fields are required. Use the `Provider` interface already defined in that file.

```ts
{
  name: 'First Last',
  slug: 'first-last',                    // kebab-case; becomes the URL /about/clinicians/first-last
  spec: 'Short specialty line',          // shown on the clinicians directory card
  image: newClinicianImg,
  name_with_education: 'First Last, MS', // credential abbreviation after the comma
  credential: 'T-LPA',                   // licensure abbreviation(s) — comma-separate multiples
  services_offered: ['Therapy', 'ADHD Testing'],
  out_of_pocket_rates: { therapy: '$100' },
  states_served: ['Kentucky'],           // always include 'Kentucky'; add others only if licensed there
  ins: ['Medicaid', 'Aetna'],            // insurance panels accepted
  wait_times: { therapy: '2 weeks' },
}
```

**Multi-state note:** Only include a state in `states_served` if the clinician holds an active license or PSYPACT authority there. Never add a state preemptively.

---

## 3. Add a `ClinicianProfile` Entry in `src/data/clinicianProfiles.ts`

Each profile drives the `/about/clinicians/[slug]` page. The `slug` must exactly match the slug in `staff.ts`.

Minimum required fields (see the `ClinicianProfile` interface):

```ts
{
  slug: 'first-last',
  pageTitle: 'First Last, Credential | Role — KY',   // ≤65 chars; include KY geo; no "| Twilight Psychology" (auto-appended)
  pageDescription: '...',                             // 140–160 chars; geo-qualified; action-oriented
  jobTitle: 'Licensed Psychological Associate',
  badge: 'Psychological Associate',
  headingPrimary: 'First Last,',
  headingAccent: 'M.S., T-LPA.',
  intro: 'One-sentence specialty summary.',
  specialties: ['ADHD Testing', 'Autism Evaluations', '...'],
  contentBlocks: [
    {
      type: 'paragraphs',
      title: 'Section Heading.',
      paragraphs: ['Bio paragraph 1.', 'Bio paragraph 2.'],
    },
    {
      type: 'quote',
      quote: 'A meaningful clinical quote.',
      variant: 'accent',
    },
  ],
  primaryPanel: {
    title: 'Current Availability',
    description: 'Short description of who they serve and where.',
    items: [
      { label: 'Testing', value: 'Accepting New Clients' },
      { label: 'Therapy', value: '2-week wait' },
    ],
    ctaLabel: 'Schedule an Intake',
    ctaHref: WIDGET_LINK,
    variant: 'surface',
  },
}
```

**SEO rules for `pageTitle`:**
- Always include a geographic qualifier (`KY`, `Kentucky`, or a specific city).
- Never append `| Twilight Psychology` — the layout does this automatically.
- Target ≤60 chars; up to 65 is acceptable.

**SEO rules for `pageDescription`:**
- 140–160 characters.
- Must be geo-qualified and action-oriented.
- Do not include a dollar-rate (e.g. `$1,300`) in the description.
- Do not begin with "We provide," "Our team offers," or similar filler.

---

## 4. Add the Clinician to the Navigation

In `src/data/navigationData.ts`, append to the `providerMenuChildren` array:

```ts
{ name: 'First Last', slug: 'first-last' },
```

Keep the order consistent with the order in `staff.ts` (new providers go at the end unless clinically ordered differently).

---

## 5. Update Multi-State Coverage (if applicable)

Only perform the steps below if the clinician is licensed in a state **other than Kentucky**.

### a. `src/components/Schema.astro` — `areaServed`
Add a new `State` entry to the `areaServed` array:
```ts
{
  "@type": "State",
  name: "New State Name",
  sameAs: "https://en.wikipedia.org/wiki/New_State_Name",
},
```

### b. `src/pages/about/service-area.astro` — `extendedStates`
Add an object to the `extendedStates` array:
```ts
{
  state: 'State Name',
  flag: '🏔️',
  provider: 'First Last, Credential',
  credential: 'License abbreviation (State)',
  detail: 'One or two sentences explaining licensure and what clients in that state can access.',
  href: '/about/clinicians/first-last',
  services: ['Service 1', 'Service 2'],
},
```

---

## 6. Validate

Run all three commands and confirm they pass with no errors or type errors:

```
npm run check
npm run test
npm run build
```

The test suite (`tests/data/staff.test.ts` and `tests/data/clinicianProfiles.test.ts`) automatically covers:
- All providers have `Kentucky` in `states_served`
- Slugs are unique and URL-safe
- Every `ClinicianProfile` resolves to a matching `Provider`
- Required fields are present and truthy

Fix any failures before committing.

---

## Quick Checklist

- [ ] Photo added to `src/assets/images/staff/`
- [ ] Image imported and `Provider` entry added in `src/data/staff.ts`
- [ ] `ClinicianProfile` entry added in `src/data/clinicianProfiles.ts`
- [ ] Entry added to `providerMenuChildren` in `src/data/navigationData.ts`
- [ ] If multi-state: `areaServed` updated in `src/components/Schema.astro`
- [ ] If multi-state: `extendedStates` updated in `src/pages/about/service-area.astro`
- [ ] `npm run check` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
