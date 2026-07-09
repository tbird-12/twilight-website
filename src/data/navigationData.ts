import { specialties, services } from "./services";

export interface NavigationLinkItem {
  name: string;
  slug: string;
  desc: string;
}

export interface NavigationNestedItem extends NavigationLinkItem {
  hasNested: true;
  children: NavigationMenuItem[];
  childLabel: string;
  childHrefBase: string;
}

export type NavigationMenuItem = NavigationLinkItem | NavigationNestedItem;

export function isNavigationNestedItem(item: NavigationMenuItem): item is NavigationNestedItem {
  return "hasNested" in item && item.hasNested === true;
}

export function getNavigationItemHref(item: Pick<NavigationLinkItem, "slug">, baseHref: string): string {
  if (item.slug.startsWith("/")) {
    return item.slug;
  }

  return `${baseHref}/${item.slug}`;
}

const providerMenuChildren: NavigationLinkItem[] = [
  { name: "Heather Cornett", slug: "heather-cornett" },
  { name: "Nicola Allen", slug: "nicola-allen" },
  { name: "Jonica Davis", slug: "jonica-davis" },
  { name: "Emeli Evans", slug: "emeli-evans" },
  { name: "Ethan Puckett", slug: "ethan-puckett" },
  { name: "Michael Burns", slug: "michael-burns" },
  { name: "Tiffany Roundtree", slug: "tiffany-roundtree" },
  { name: "Taylor Pennington", slug: "taylor-pennington" },
].map((item) => ({
  ...item,
  desc: "Provider profile",
}));

const staffMenuChildren: NavigationLinkItem[] = [
  { name: "Samantha Rodarte", slug: "samantha-rodarte" },
  { name: "Ashley Perkins", slug: "ashley-perkins" },
].map((item) => ({
  ...item,
  desc: "Staff profile",
}));

export const aboutMenuItems: NavigationMenuItem[] = [
  {
    name: "Clinical Staff",
    slug: "clinical-staff",
    desc: "Meet our dedicated team of clinicians",
    hasNested: true,
    children: providerMenuChildren,
    childLabel: "Our Providers",
    childHrefBase: "/about/clinicians",
  },
  {
    name: "Admin Staff",
    slug: "admin-staff",
    desc: "Meet our admin team",
    hasNested: true,
    children: staffMenuChildren,
    childLabel: "Our Staff",
    childHrefBase: "/about/staff",
  },
  {
    name: "About Us",
    slug: "twilight-psychology",
    desc: "Learn about our mission and values",
  },
  {
    name: "Locations & Service Area",
    slug: "service-area",
    desc: "In-person in Lexington, KY — telehealth across Kentucky+",
  },
  {
    name: "Locations",
    slug: "locations",
    desc: "Find our office locations and hours",
  },
  {
    name: "Careers",
    slug: "careers",
    desc: "Join our team - current job openings",
  },
];

export const clientResourcesMenuItems: NavigationLinkItem[] = [
  { name: "Fees", slug: "fees", desc: "Pricing and payment options" },
  { name: "FAQ", slug: "faq", desc: "Frequently asked questions" },
  {
    name: "Waitlist Times",
    slug: "waitlist-times",
    desc: "New Clients Appointments",
  },
  {
    name: "Insurances Accepted",
    slug: "insurances-accepted",
    desc: "Billing Insurance and Networks",
  },
  { name: "New Client", slug: "new-client", desc: "Getting started guide" },
  {
    name: "Masking Inventory",
    slug: "masking-inventory",
    desc: "Free self-reflection tool",
  },
  { name: "Blog", slug: "/blog", desc: "Clinical updates and practice news" },
];

const therapyMenuChildren: NavigationLinkItem[] = [
  {
    name: "Therapy Overview",
    slug: "/services/therapy",
    desc: "Start with the therapy hub",
  },
  {
    name: "Therapy Clinicians",
    slug: "/services/therapy/clinicians",
    desc: "Compare fit and availability",
  },
  {
    name: "Couples Counseling",
    slug: "/services/therapy/couples-counseling",
    desc: "Relationship therapy details",
  },
  {
    name: "Therapy After Evaluation",
    slug: "/services/therapy/after-evaluation",
    desc: "Connected next-step care",
  },
];

function buildServicesMenuItems(items: NavigationLinkItem[]): NavigationMenuItem[] {
  return items.map((item) =>
    item.slug === "therapy"
      ? {
          ...item,
          hasNested: true,
          children: therapyMenuChildren,
          childLabel: "Therapy Pages",
          childHrefBase: "/services/therapy",
        }
      : item,
  );
}

export const servicesMenuItems: NavigationMenuItem[] = buildServicesMenuItems(services.slice(0, 4));
export const specialtiesMenuItems: NavigationLinkItem[] = specialties.slice(0, 4);
export const allServicesMenuItems: NavigationMenuItem[] = buildServicesMenuItems(services);
export const allSpecialtiesMenuItems: NavigationLinkItem[] = specialties;
