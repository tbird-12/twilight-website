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
  billing: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  insurance: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  clinical: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  business: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  announcements: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

export function getCategoryMeta(slug: BlogCategory): BlogCategoryMeta {
  return blogCategories.find((c) => c.slug === slug)!;
}
