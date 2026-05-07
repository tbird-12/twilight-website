import { specialities, services } from "./services";

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
  { name: "Emeli Evans", slug: "emeli-evans" },
  { name: "Stephen Shu", slug: "stephen-shu" },
  { name: "Jonica Davis", slug: "jonica-davis" },
  { name: "Jatana Boggs", slug: "jatana-boggs" },
  { name: "Tiffany Roundtree", slug: "tiffany-roundtree" },
  { name: "Olivia Williams", slug: "olivia-williams" },
].map((item) => ({
  ...item,
  desc: "Provider profile",
}));

const staffMenuChildren: NavigationLinkItem[] = [
  { name: "Samantha Rodarte", slug: "samantha-rodarte" },
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

export const servicesMenuItems: NavigationLinkItem[] = services.slice(0, 4);
export const specialtiesMenuItems: NavigationLinkItem[] = specialities.slice(0, 4);
export const allServicesMenuItems: NavigationLinkItem[] = services;
export const allSpecialtiesMenuItems: NavigationLinkItem[] = specialities;
