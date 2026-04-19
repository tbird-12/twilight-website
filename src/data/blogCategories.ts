import type { BlogCategory } from "../content.config";

export interface BlogCategoryMeta {
  slug: BlogCategory;
  label: string;
  description: string;
  color: string;
}

export const blogCategories: BlogCategoryMeta[] = [
  {
    slug: "billing",
    label: "Billing",
    description: "Billing processes, fee schedules, and payment updates",
    color: "sky",
  },
  {
    slug: "insurance",
    label: "Insurance",
    description: "Insurance network updates and coverage information",
    color: "violet",
  },
  {
    slug: "clinical",
    label: "Clinical",
    description: "Clinical practices, approaches, and treatment updates",
    color: "emerald",
  },
  {
    slug: "business",
    label: "Business Updates",
    description: "Practice news, hours, and operational changes",
    color: "amber",
  },
  {
    slug: "announcements",
    label: "Announcements",
    description: "General announcements and news from our team",
    color: "rose",
  },
];

export const categoryColorMap: Record<BlogCategory, string> = {
  billing: "bg-sky-300 text-sky-950 dark:bg-sky-900/40 dark:text-sky-200",
  insurance: "bg-violet-300 text-violet-950 dark:bg-violet-900/40 dark:text-violet-200",
  clinical: "bg-emerald-300 text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-200",
  business: "bg-amber-300 text-amber-950 dark:bg-amber-900/40 dark:text-amber-200",
  announcements: "bg-rose-300 text-rose-950 dark:bg-rose-900/40 dark:text-rose-200",
};

export function getCategoryMeta(slug: BlogCategory): BlogCategoryMeta {
  return blogCategories.find((c) => c.slug === slug)!;
}
