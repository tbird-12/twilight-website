import { providers, staff } from "./staff";
import { specialities, services } from "./services";

export const aboutMenuItems = [
  {
    name: "Clinical Staff",
    slug: "clinical-staff",
    desc: "Meet our dedicated team of clinicians",
    hasNested: true,
    children: providers,
    childLabel: "Our Providers",
    childHrefBase: "/about/clinicians",
  },
  {
    name: "Admin Staff",
    slug: "admin-staff",
    desc: "Meet our admin team",
    hasNested: true,
    children: staff,
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

export const clientResourcesMenuItems = [
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
];

export { services as servicesMenuItems, specialities as specialtiesMenuItems };
