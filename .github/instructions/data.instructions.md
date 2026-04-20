---
applyTo: "src/data/**"
---

## Data Layer Rules

### Structure
- All exports are typed constants — no classes, no singletons, no default exports that aren't objects/arrays
- Define TypeScript interfaces in the same file as the data (do not split into separate type files)
- Use `as const` for enum-like string literals

```ts
export const BLOG_CATEGORIES = ["billing", "insurance", "clinical", "business", "announcements"] as const;
export type BlogCategory = typeof BLOG_CATEGORIES[number];
```

### Interface Co-location
```ts
// ✓ Correct — interface and data in same file
export interface Service {
  name: string;
  slug: string;
  desc: string;
}

export const services: Service[] = [ ... ];
```

### Image Assets
Import `ImageMetadata` from Astro for provider/staff images:
```ts
import type { ImageMetadata } from "astro";
import staffPhoto from "../assets/images/staff/name.png";

export interface Provider {
  image: ImageMetadata;
  name: string;
}
```

### Test Requirement
Every new data file in `src/data/` must have a matching test in `tests/data/`. The test must verify:
1. The exported array/object is non-empty
2. All required fields are present and truthy on every item
3. Slugs match `/^[a-z0-9-]+$/` (URL-safe)
4. Any cross-references between data objects resolve correctly

### Consumption
- Import directly: `import { services } from "~/data/services"`
- No barrel/index files — always import from the specific data file
- Use `import type` for type-only imports: `import type { Provider } from "~/data/staff"`
