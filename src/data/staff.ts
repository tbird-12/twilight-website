import type { ImageMetadata } from 'astro';

// Import all staff images
import heatherCornettImg from '../assets/images/staff/heather-cornett.png';
import nicolaAllenImg from '../assets/images/staff/nicola-allen.png';
import emeliEvansImg from '../assets/images/staff/emeli-evans.png';
import stephenShuImg from '../assets/images/staff/stephen-shu.png';
import jonicaDavisImg from '../assets/images/staff/jonica-davis.png';
import jatanaBoggsImg from '../assets/images/staff/jatana-boggs.png';
import tiffanyRoundtreeImg from '../assets/images/staff/tiffany-roundtree.png';
import samanthaRodarte from '../assets/images/staff/samantha-rodarte.png';
import michaelBurnsImg from '../assets/images/staff/michael-burns.jpg';
import ethanPuckettImg from '../assets/images/staff/ethan-puckett.png';
import taylorPenningtonImg from '../assets/images/staff/taylor-pennington.png';

import ashleyPerkinsImg from '../assets/images/staff/ashley-perkins.jpeg';

export interface Provider {
  name: string;
  slug: string;
  spec: string;
  image: ImageMetadata;
  name_with_education: string;
  credential: string;
  services_offered: string[];
  out_of_pocket_rates: Record<string, string>;
  states_served: string[];
  ins: string[];
  wait_times: Record<string, string>;
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
    services_offered: ['Psychological evaluations', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'IQ testing', 'Guardianship evaluations *', 'Disability evaluations*', 'Adoption evaluations *', 'ESA evaluation *'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', esa_evaluation: '$200', guardianship_evaluation: '$500', disability_evaluation: '$1,000+', adoption_evaluation: '$1,500' },
    states_served: ['Ohio', 'Kentucky', 'New Mexico', 'Indiana', 'Tennessee', 'Psypact states'],
    ins: ['Tricare', 'Medicare', 'Ambetter', 'CHAMPVA', 'UHC', 'Medicaid', 'Aetna', 'Cigna', 'UMR', 'Humana', 'Passport', 'Anthem'],
    wait_times: { testing_insurance: '4 months', testing_out_of_pocket: '3 weeks' }
  },
  {
    name: 'Nicola Allen',
    slug: 'nicola-allen',
    spec: 'Medication Management',
    image: nicolaAllenImg,
    name_with_education: 'Nicola Allen, MSN',
    credential: 'PMHNP',
    services_offered: ['Medication Management', 'Medical Marijuana *'],
    out_of_pocket_rates: { medication_intake: '$250', medication_followup: '$100', medical_marijuana: '$150' },
    states_served: ['Kentucky'],
    ins: ['Tricare', 'Medicare', 'Ambetter', 'CHAMPVA', 'UHC', 'Medicaid', 'Aetna', 'Cigna', 'UMR', 'Humana', 'Passport', 'Anthem', 'Wellcare'],
    wait_times: { medication_management: '1 week' }
  },
  {
    name: 'Emeli Evans',
    slug: 'emeli-evans',
    spec: 'Child Assessments & PDA Profile',
    image: emeliEvansImg,
    name_with_education: 'Emeli Evans, MS',
    credential: 'LPA',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Psychological evaluations', 'Personality Evaluations', 'IQ testing', 'Therapy', 'Intimacy Therapy *'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { testing_insurance: '2 months', testing_out_of_pocket: '3 weeks', therapy: 'Contact for availability' }
  },
  {
    name: 'Michael Burns',
    slug: 'michael-burns',
    spec: 'Domestic Violence, Substance Use & Faith-Based Therapy',
    image: michaelBurnsImg,
    name_with_education: 'Michael Burns, PhD',
    credential: 'T-LP, LPCC, LCADC, BIP',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Therapy'],
    out_of_pocket_rates: { therapy: '$100' },
    states_served: ['Kentucky', 'Tennessee'],
    ins: ['Medicaid', 'Medicare','Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { testing_insurance: '1 month', testing_out_of_pocket: '3 weeks', therapy: 'Immediate' }
  },
  {
    name: 'Stephen Shu',
    slug: 'stephen-shu',
    spec: 'Psychological Assessments',
    image: stephenShuImg,
    name_with_education: 'Stephen Shu, MS',
    credential: 'LPA',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Psychological evaluations', 'Personality Evaluations', 'IQ testing'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { testing_insurance: '2 months', testing_out_of_pocket: '3 weeks' }
  },
  {
    name: 'Jonica Davis',
    slug: 'jonica-davis',
    spec: 'Therapy for Adults',
    image: jonicaDavisImg,
    name_with_education: 'Jonica Davis, Psy.D.',
    credential: 'T-LPA',
    services_offered: ['Therapy', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'IQ testing'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$80' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { testing_insurance: '3 months', testing_out_of_pocket: '3 weeks', therapy: '1 month' }
  },
  {
    name: 'Ethan Puckett',
    slug: 'ethan-puckett',
    spec: 'Child Therapy & Testing (Ideal Ages 7-16)',
    image: ethanPuckettImg,
    name_with_education: 'Ethan Puckett, M.A.',
    credential: 'T-LPA',
    services_offered: ['Therapy', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'IQ testing', 'Psychological evaluations'],
    out_of_pocket_rates: {therapy: '$100', testing_standard: '$1,300', testing_dyslexia: '$1,500' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { therapy: 'Immediate', testing_insurance: '2 months', testing_out_of_pocket: 'Immediate' }
  },
  {
    name: 'Jatana Boggs',
    slug: 'jatana-boggs',
    spec: 'Neurodiverse-Affirming Therapy & Assessments',
    image: jatanaBoggsImg,
    name_with_education: 'Jatana Boggs, MS',
    credential: 'LPCA (KY), LPC (OH), NCC',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing *', 'Personality Evaluations', 'Psychological evaluations', 'Therapy', 'Couples Counseling *'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', couples_therapy: '$200' },
    states_served: ['Kentucky', 'Ohio'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { testing_insurance: '2 months', testing_out_of_pocket: '3 weeks', therapy: '1 month' }
  },
  {
    name: 'Tiffany Roundtree',
    slug: 'tiffany-roundtree',
    spec: 'Therapy for Adolescents & Adults',
    image: tiffanyRoundtreeImg,
    name_with_education: 'Tiffany Roundtree, MA.Ed',
    credential: 'LPCA',
    services_offered: ['Therapy'],
    out_of_pocket_rates: { therapy: '$80' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { therapy: '1 month' }
  },
  {
    name: 'Taylor Pennington',
    slug: 'taylor-pennington',
    spec: 'Psychological Associate',
    image: taylorPenningtonImg,
    name_with_education: 'Taylor Pennington, MS',
    credential: 'T-LPA',
    services_offered: ['Psychological and Psychoeducational Testing', 'Therapy (Ages 5-16)'],
    out_of_pocket_rates: { testing_standard: '$1,300', therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna', 'Anthem' , 'Wellcare'],
    wait_times: { testing_out_of_pocket: 'Contact for availability', therapy: 'Contact for availability' }
  },
];

export const staff: StaffMember[] = [
  { name: 'Samantha Rodarte', slug: 'samantha-rodarte', spec: 'Practice Manager', image: samanthaRodarte },
  { name: 'Ashley Perkins', slug: 'ashley-perkins', spec: 'Administrative Assistant', image: ashleyPerkinsImg },
];
