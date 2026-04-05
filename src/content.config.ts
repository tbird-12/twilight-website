import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const BLOG_CATEGORIES = [
  "billing",
  "insurance",
  "clinical",
  "business",
  "announcements",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(BLOG_CATEGORIES),
    author: z.string().default("Twilight Psychology Team"),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
