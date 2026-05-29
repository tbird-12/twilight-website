---
applyTo: "src/data/staff.ts, src/data/clinicianProfiles.ts, src/data/navigationData.ts, src/components/Schema.astro, src/pages/about/**"
---

# Removing a Departing Clinician or Staff Member

Follow every step in order. Run `npm run check && npm run test && npm run build` after completing all steps before committing.

---

## Determine Role Type

The departure steps differ slightly between **clinical providers** (in `providers[]` in `staff.ts`) and **administrative staff** (in `staff[]` in `staff.ts`).

---

## Removing a Clinical Provider

### 1. Remove the `Provider` Entry from `src/data/staff.ts`

Delete the provider's object from the `providers` array **and** the corresponding image import at the top of the file.

```ts
// Remove this import line:
import firstLastImg from '../assets/images/staff/first-last.png';

// Remove this object from providers[]:
{
  name: 'First Last',
  slug: 'first-last',
  ...
},
```

Do **not** delete the image asset from `src/assets/images/staff/` unless the photo was taken specifically for the site and the clinician has confirmed their consent is withdrawn. If in doubt, leave the asset file in place and simply remove the import.

### 2. Remove the `ClinicianProfile` Entry from `src/data/clinicianProfiles.ts`

Delete the matching object from `clinicianProfiles[]`. The slug to search for is identical to the one removed from `staff.ts`.

### 3. Remove the Clinician from the Navigation

In `src/data/navigationData.ts`, delete the matching entry from `providerMenuChildren[]`:

```ts
// Remove:
{ name: 'First Last', slug: 'first-last', desc: 'Provider profile' },
```

### 4. Update Multi-State Coverage (if applicable)

Only perform these steps if the departing clinician was the **sole** provider licensed in a given non-Kentucky state.

#### a. `src/components/Schema.astro` — `areaServed`
If no remaining provider covers the state, remove that state's entry from `areaServed`:
```ts
// Remove the block for the now-uncovered state:
{
  "@type": "State",
  name: "State Name",
  sameAs: "https://en.wikipedia.org/wiki/State_Name",
},
```

#### b. `src/pages/about/service-area.astro` — `extendedStates`
Remove the departing clinician's entry from `extendedStates[]`. If another provider still covers that state under a different entry, update that entry instead of removing it.

### 5. Audit Blog and Page References

Search for the clinician's slug and name across the codebase to find any hard-coded references:

```
grep -r "first-last" src/
grep -r "First Last" src/
```

Common locations to check:
- `secondaryPanel.ctaHref` in other clinicians' profiles in `src/data/clinicianProfiles.ts`
- Blog post resource sidebars in `src/pages/blog/[...slug].astro`
- Any cross-link in admin staff profile pages (e.g. `src/pages/about/staff/*.astro`)
- Any `PageLinksSection` that links to this clinician's profile

Update these references to point to the clinicians directory (`/about/clinicians/clinicians-lex-ky`) or remove them, as appropriate.

### 6. Update the Test Suite

Open `tests/data/staff.test.ts` and `tests/data/clinicianProfiles.test.ts`. Remove any test cases that are hard-coded to the departing clinician by slug (e.g. `burns`, `boggs`). Do **not** remove generic tests that validate the whole array.

Example: if a test reads `providers.find((p) => p.slug === "first-last")` and asserts something specific to that clinician, delete that test block.

---

## Removing an Administrative Staff Member

### 1. Remove the `StaffMember` Entry from `src/data/staff.ts`

Delete the staff member's object from `staff[]` **and** the corresponding image import.

### 2. Remove the Staff Profile Page

The profile page lives at `src/pages/about/staff/<slug>.astro`. Delete this file entirely.

```
src/pages/about/staff/first-last.astro  ← delete
```

### 3. Remove from the Navigation

In `src/data/navigationData.ts`, delete the matching entry from `staffMenuChildren[]`:

```ts
// Remove:
{ name: 'First Last', slug: 'first-last', desc: 'Staff profile' },
```

### 4. Audit Cross-References

Search for the staff member's slug and name across the codebase:

```
grep -r "first-last" src/
grep -r "First Last" src/
```

Common cross-reference locations:
- Other staff profile pages that link to the departing member (e.g. `src/pages/about/staff/samantha-rodarte.astro` links to Ashley Perkins)
- `PageLinksSection` components that surface the staff page

Remove or redirect these links to an appropriate alternative (another staff member or the main staff directory).

---

## Validate

Run all three commands and confirm they pass with no errors or type errors:

```
npm run check
npm run test
npm run build
```

The test suite will catch:
- Remaining profile slugs that no longer resolve to a `Provider`
- Duplicate or broken slug references
- Missing required fields on any remaining provider

Fix any failures before committing.

---

## Quick Checklist

### Clinical Provider
- [ ] Image import removed from `src/data/staff.ts`
- [ ] `Provider` entry removed from `providers[]` in `src/data/staff.ts`
- [ ] `ClinicianProfile` entry removed from `src/data/clinicianProfiles.ts`
- [ ] Entry removed from `providerMenuChildren` in `src/data/navigationData.ts`
- [ ] If sole multi-state provider: `areaServed` entry removed from `src/components/Schema.astro`
- [ ] If sole multi-state provider: entry removed from `extendedStates` in `src/pages/about/service-area.astro`
- [ ] Blog posts and page cross-references updated or removed
- [ ] Hard-coded test assertions for this clinician removed from `tests/data/`

### Administrative Staff
- [ ] Image import and `StaffMember` entry removed from `staff[]` in `src/data/staff.ts`
- [ ] Profile page `src/pages/about/staff/<slug>.astro` deleted
- [ ] Entry removed from `staffMenuChildren` in `src/data/navigationData.ts`
- [ ] Cross-references in other staff profile pages updated or removed

### Both
- [ ] `npm run check` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
