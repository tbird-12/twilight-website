export interface SeriesPart {
  id: string;
  title: string;
  slug: string;
}

export interface BlogSeries {
  name: string;
  description: string;
  parts: SeriesPart[];
}

export const blogSeries: Record<string, BlogSeries> = {
  "mental-health-billing": {
    name: "Mental Health Billing",
    description: "8 parts covering insurance, coding, claims, and appeals",
    parts: [
      {
        id: "billing/who-can-bill-psychological-testing-claims",
        title: "Who Can Bill Insurance Claims",
        slug: "who-can-bill-psychological-testing-claims",
      },
      {
        id: "billing/cms-1500-claims-private-practice-psychology",
        title: "CMS-1500 Forms and EHR Billing",
        slug: "cms-1500-claims-private-practice-psychology",
      },
      {
        id: "billing/where-to-submit-mental-health-claims",
        title: "Where to Submit Claims",
        slug: "where-to-submit-mental-health-claims",
      },
      {
        id: "insurance/verifying-insurance-eligibility-psychological-testing",
        title: "Verifying Insurance Eligibility",
        slug: "verifying-insurance-eligibility-psychological-testing",
      },
      {
        id: "insurance/prior-authorization-psychological-testing",
        title: "Prior Authorization for Services",
        slug: "prior-authorization-psychological-testing",
      },
      {
        id: "billing/how-psychological-testing-is-billed",
        title: "How Psychological Testing Is Billed",
        slug: "how-psychological-testing-is-billed",
      },
      {
        id: "billing/claim-denials-psychological-testing",
        title: "Claim Denials",
        slug: "claim-denials-psychological-testing",
      },
      {
        id: "billing/claim-appeals-psychological-testing",
        title: "Appeal Claim Denials",
        slug: "claim-appeals-psychological-testing",
      },
    ],
  },
};

export function getSeriesByPostId(postId: string): { series: BlogSeries; partIndex: number } | null {
  for (const [, series] of Object.entries(blogSeries)) {
    const partIndex = series.parts.findIndex((p) => p.id === postId);
    if (partIndex !== -1) {
      return { series, partIndex };
    }
  }
  return null;
}
