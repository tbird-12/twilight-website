import type { ImageMetadata } from 'astro';

// Import all staff images
import heatherCornettImg from '../assets/images/staff/heather-cornett.png';
import nicolaAllenImg from '../assets/images/staff/nicola-allen.png';
import emeliEvansImg from '../assets/images/staff/emeli-evans.png';
import jonicaDavisImg from '../assets/images/staff/jonica-davis.png';
import tiffanyRoundtreeImg from '../assets/images/staff/tiffany-roundtree.png';
import samanthaRodarte from '../assets/images/staff/samantha-rodarte.png';
import michaelBurnsImg from '../assets/images/staff/michael-burns.jpg';
import ethanPuckettImg from '../assets/images/staff/ethan-puckett.png';
import taylorPenningtonImg from '../assets/images/staff/taylor-pennington.png';
import eliseVanMeterImg from '../assets/images/staff/elise-vanmeter.jpeg';

import ashleyPerkinsImg from '../assets/images/staff/ashley-perkins.jpeg';

/** Broad age buckets for client-facing filtering */
export const AGE_GROUPS = ["Child (3–11)", "Teen (12–17)", "Adult (18–64)", "Older Adult (65+)"] as const;
export type AgeGroup = typeof AGE_GROUPS[number];

/** High-level service categories for the matcher filter */
export const SERVICE_CATEGORIES = ["Therapy", "Psychological Testing", "Medication Management"] as const;
export type ServiceCategory = typeof SERVICE_CATEGORIES[number];

export type AvailabilityStatus = "open" | "waitlist" | "closed";

export interface Provider {
  name: string;
  slug: string;
  spec: string;
  image: ImageMetadata;
  name_with_education: string;
  credential: string;
  services_offered: string[];
  /** Broad service categories used for the matcher filter */
  service_categories: ServiceCategory[];
  out_of_pocket_rates: Record<string, string>;
  states_served: string[];
  ins: string[];
  wait_times: Record<string, string>;
  /** Age groups this provider sees */
  age_groups: AgeGroup[];
  /** Shortest human-readable wait (displayed on the card availability badge) */
  availability_note: string;
  /** Traffic-light status driving the badge colour */
  availability_status: AvailabilityStatus;
  /** SimplePractice / intake contact URL */
  contact_url: string;
}

export interface StaffMember {
  name: string;
  slug: string;
  spec: string;
  image: ImageMetadata;
}

export const providers: Provider[] = [
  {
    name: 'Heather Cornett',
    slug: 'heather-cornett',
    spec: 'Psychological and Psychoeducational Assessments',
    image: heatherCornettImg,
    name_with_education: 'Heather Cornett, PhD',
    credential: 'LP',
    service_categories: ['Psychological Testing'],
    services_offered: ['Psychological evaluations', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'IQ testing', 'Guardianship evaluations *', 'Disability evaluations*', 'Adoption evaluations *', 'ESA evaluation *'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', esa_evaluation: '$300', guardianship_evaluation: '$500', disability_evaluation: '$1,000+', adoption_evaluation: '$1,500' },
    states_served: ['Ohio', 'Kentucky', 'New Mexico', 'Indiana', 'Tennessee', 'PSYPACT states'],
    ins: ['Tricare', 'Medicare', 'Ambetter', 'UHC', 'Medicaid', 'Aetna', 'Cigna', 'UMR', 'Humana', 'Passport', 'Anthem'],
    wait_times: { testing_insurance: '5 months', testing_out_of_pocket: '3 weeks' },
    age_groups: ['Child (3–11)', 'Teen (12–17)', 'Adult (18–64)', 'Older Adult (65+)'],
    availability_note: 'Self-pay: ~3 weeks · Insurance: ~5 months',
    availability_status: 'waitlist',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Nicola Allen',
    slug: 'nicola-allen',
    spec: 'Medication Management',
    image: nicolaAllenImg,
    name_with_education: 'Nicola Allen, MSN',
    credential: 'PMHNP',
    service_categories: ['Medication Management'],
    services_offered: ['Medication Management'],
    out_of_pocket_rates: { medication_intake: '$250', medication_followup: '$100' },
    states_served: ['Kentucky'],
    ins: ['Tricare', 'Medicare', 'Ambetter', 'CHAMPVA', 'UHC', 'Medicaid', 'Aetna', 'Cigna', 'UMR', 'Humana', 'Passport', 'Anthem', 'Wellcare'],
    wait_times: { medication_management: '4 weeks' },
    age_groups: ['Child (3–11)', 'Teen (12–17)', 'Adult (18–64)', 'Older Adult (65+)'],
    availability_note: '~4 weeks',
    availability_status: 'waitlist',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Emeli Evans',
    slug: 'emeli-evans',
    spec: 'Psychological Assessments & PDA Profile',
    image: emeliEvansImg,
    name_with_education: 'Emeli Evans, MS',
    credential: 'LPA',
    service_categories: ['Psychological Testing', 'Therapy'],
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Psychological evaluations', 'Personality Evaluations', 'IQ testing', 'Therapy', 'Intimacy Therapy *'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { testing_insurance: '3 months', testing_out_of_pocket: '3 weeks', therapy: 'Contact for availability' },
    age_groups: ['Teen (12–17)', 'Adult (18–64)', 'Older Adult (65+)'],
    availability_note: 'Testing self-pay: ~3 weeks',
    availability_status: 'waitlist',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Michael Burns',
    slug: 'michael-burns',
    spec: 'Domestic Violence, Substance Use & Faith-Based Therapy',
    image: michaelBurnsImg,
    name_with_education: 'Michael Burns, PhD',
    credential: 'T-LP, LPCC, LCADC, BIP',
    service_categories: ['Therapy', 'Psychological Testing'],
    services_offered: ['Autism Testing', 'ADHD Testing', 'Therapy'],
    out_of_pocket_rates: { therapy: '$100' },
    states_served: ['Kentucky', 'Tennessee'],
    ins: ['Medicaid', 'Medicare', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { testing_insurance: '5 months', testing_out_of_pocket: '3 weeks', therapy: 'Immediate' },
    age_groups: ['Adult (18–64)', 'Older Adult (65+)'],
    availability_note: 'Therapy: Immediate',
    availability_status: 'open',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Jonica Davis',
    slug: 'jonica-davis',
    spec: 'Therapy for Adults',
    image: jonicaDavisImg,
    name_with_education: 'Jonica Davis, Psy.D.',
    credential: 'T-LPA',
    service_categories: ['Therapy', 'Psychological Testing'],
    services_offered: ['Therapy', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'IQ testing'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { testing_insurance: '4 months', testing_out_of_pocket: '3 weeks', therapy: '6 weeks' },
    age_groups: ['Adult (18–64)', 'Older Adult (65+)'],
    availability_note: 'Therapy: ~6 weeks',
    availability_status: 'waitlist',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Ethan Puckett',
    slug: 'ethan-puckett',
    spec: 'Child Therapy & Psychoeducational Assessments',
    image: ethanPuckettImg,
    name_with_education: 'Ethan Puckett, Psy.D.',
    credential: 'LPA',
    service_categories: ['Therapy', 'Psychological Testing'],
    services_offered: ['Therapy', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'IQ testing', 'Psychological evaluations'],
    out_of_pocket_rates: { therapy: '$100', testing_standard: '$1,300', testing_dyslexia: '$1,500' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { therapy: 'Immediate', testing_insurance: '3 months', testing_out_of_pocket: '3 weeks' },
    age_groups: ['Child (3–11)', 'Teen (12–17)', 'Adult (18–64)'],
    availability_note: 'Therapy: Immediate',
    availability_status: 'open',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Tiffany Roundtree',
    slug: 'tiffany-roundtree',
    spec: 'Therapy for Adolescents & Adults',
    image: tiffanyRoundtreeImg,
    name_with_education: 'Tiffany Roundtree, MA.Ed',
    credential: 'LPCA',
    service_categories: ['Therapy'],
    services_offered: ['Therapy'],
    out_of_pocket_rates: { therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { therapy: '1 month' },
    age_groups: ['Teen (12–17)', 'Adult (18–64)', 'Older Adult (65+)'],
    availability_note: '~1 month',
    availability_status: 'waitlist',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Taylor Pennington',
    slug: 'taylor-pennington',
    spec: 'Child Psychological Assessments',
    image: taylorPenningtonImg,
    name_with_education: 'Taylor Pennington, MS',
    credential: 'T-LPA',
    service_categories: ['Psychological Testing', 'Therapy'],
    services_offered: ['Psychological and Psychoeducational Testing', 'Therapy (Ages 5-16)'],
    out_of_pocket_rates: { testing_standard: '$1,300', therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { testing_insurance: '3 months', testing_out_of_pocket: '3 weeks', therapy: 'Contact for availability' },
    age_groups: ['Child (3–11)', 'Teen (12–17)'],
    availability_note: 'Testing self-pay: ~3 weeks',
    availability_status: 'waitlist',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
  {
    name: 'Elise Van Meter',
    slug: 'elise-vanmeter',
    spec: 'Therapy & Adult Psychological Assessments',
    image: eliseVanMeterImg,
    name_with_education: 'Elise Van Meter, MA',
    credential: 'LPA',
    service_categories: ['Therapy', 'Psychological Testing'],
    services_offered: ['Therapy (Adolescents & Adults)', 'Autism Testing (Adults)', 'ADHD Testing (Adults)', 'Personality Evaluations'],
    out_of_pocket_rates: { therapy: '$125', testing_standard: '$1,300' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem', 'Wellcare'],
    wait_times: { therapy: 'Immediate', testing_insurance: '3 months', testing_out_of_pocket: '3 weeks' },
    age_groups: ['Teen (12–17)', 'Adult (18–64)', 'Older Adult (65+)'],
    availability_note: 'Therapy: Immediate',
    availability_status: 'open',
    contact_url: 'https://twilightpsychology.clientsecure.me/contact-widget',
  },
];

export const staff: StaffMember[] = [
  { name: 'Samantha Rodarte', slug: 'samantha-rodarte', spec: 'Practice Manager', image: samanthaRodarte },
  { name: 'Ashley Perkins', slug: 'ashley-perkins', spec: 'Intake Coordinator', image: ashleyPerkinsImg },
];
