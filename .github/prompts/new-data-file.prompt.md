---
agent: "edit"
description: "Scaffold a new data file and its matching Vitest test"
---

Create two files: a typed data file in `src/data/` and its matching test in `tests/data/`.

### 1. Data File — `src/data/dataName.ts`

```ts
// Define the interface co-located with the data
export interface DataItem {
  name: string;
  slug: string;
  // Add other fields...
}

export const dataItems: DataItem[] = [
  {
    name: "Example Item",
    slug: "example-item",
  },
];
```

### 2. Test File — `tests/data/dataName.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { dataItems } from "../../src/data/dataName";

describe("dataName data", () => {
  it("exports a non-empty array", () => {
    expect(dataItems.length).toBeGreaterThan(0);
  });

  it("every item has required fields", () => {
    for (const item of dataItems) {
      expect(item.name).toBeTruthy();
      expect(item.slug).toBeTruthy();
    }
  });

  it("slugs are URL-safe", () => {
    for (const item of dataItems) {
      expect(item.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
```

**Rules:**
- All exports are typed constants — no classes, no singletons, no default function exports
- Define the TypeScript interface in the same file as the data
- Use `as const` for enum-like arrays: `export const CATEGORIES = ["a", "b"] as const`
- Import images with `import img from "../assets/images/..."` — they'll be typed as `ImageMetadata`
- Use `import type { ImageMetadata } from "astro"` for the type annotation
- No barrel/index files — consumers import directly from the data file
- Run `npm run test` after creating both files to confirm tests pass

Ask me: What is the data file name, what data does it represent, and what are the required fields per item?
