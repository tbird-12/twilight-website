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
  schema: ({ image }) => z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(BLOG_CATEGORIES),
      author: z.string().default("Twilight Psychology Team"),
      tags: z.array(z.string()).optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .refine(
      ({ heroImage, heroImageAlt }) => !heroImage || !!heroImageAlt?.trim(),
      {
        message: "heroImageAlt is required when heroImage is set",
        path: ["heroImageAlt"],
      },
    ),
});

export const collections = { blog };
