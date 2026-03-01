// Import all staff images
import heatherCornettImg from '../assets/images/staff/heather-cornett.png';
import nicolaAllenImg from '../assets/images/staff/nicola-allen.png';
import emeliEvansImg from '../assets/images/staff/emeli-evans.png';
import stephenShuImg from '../assets/images/staff/stephen-shu.png';
import jonicaDavisImg from '../assets/images/staff/jonica-davis.png';
import jatanaBoggsImg from '../assets/images/staff/jatana-boggs.png';
import tiffanyRoundtreeImg from '../assets/images/staff/tiffany-roundtree.png';
import surjyaBajpayeeImg from '../assets/images/staff/surjya-bajpayee.png';
import samanthaRodarte from '../assets/images/staff/samantha-rodarte.png';
import oliviaWilliamsImg from '../assets/images/staff/olivia-williams.jpg';

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
    name: 'Dr. Heather Cornett',
    slug: 'heather-cornett',
    spec: 'Adult Autism',
    image: heatherCornettImg,
    name_with_education: 'Heather Cornett, PhD',
    credential: 'LP',
    services_offered: ['Psychological evaluations', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing (Out-of-Pocket Only)', 'Personality Disorders', 'IQ testing', 'Guardianship evaluations (Out-of-Pocket Only)', 'Disability evaluations (Out-of-Pocket Only)', 'Adoption evaluations (Out-of-Pocket Only)', 'ESA evaluation (Out-of-Pocket Only)'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', esa_evaluation: '$250', guardianship_evaluation: '$500', disability_evaluation: '$1,000+', adoption_evaluation: '$1,500' },
    states_served: ['Ohio', 'Kentucky', 'New Mexico', 'Indiana', 'Tennessee', 'Psypact states'],
    ins: ['Tricare', 'Medicare', 'Ambetter', 'CHAMPVA', 'UHC', 'Medicaid', 'Aetna', 'Cigna', 'UMR', 'Humana', 'Passport'],
    wait_times: { testing_insurance: '3 months', testing_out_of_pocket: '3 weeks' }
  },
  {
    name: 'Nicola Allen',
    slug: 'nicola-allen',
    spec: 'Medication Management',
    image: nicolaAllenImg,
    name_with_education: 'Nicola Allen, MSN',
    credential: 'PMHNP',
    services_offered: ['Medication Management', 'Medical Marijuana (Out-of-Pocket Only)'],
    out_of_pocket_rates: { medication_intake: '$150', medication_followup: '$80', medical_marijuana: '$75' },
    states_served: ['Kentucky'],
    ins: ['Tricare', 'Medicare', 'Ambetter', 'CHAMPVA', 'UHC', 'Medicaid', 'Aetna', 'Cigna', 'UMR', 'Humana', 'Passport'],
    wait_times: { medication_management: 'Immediate' }
  },
  {
    name: 'Emeli Evans',
    slug: 'emeli-evans',
    spec: 'Child Assessments & PDA Profile',
    image: emeliEvansImg,
    name_with_education: 'Emeli Evans, MS',
    credential: 'LPA',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing (Out-of-Pocket Only)', 'Psychological evaluations', 'Personality Disorders', 'IQ testing', 'Therapy', 'Intimacy Therapy (Out-of-Pocket Only)'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$100' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { testing_insurance: '2 months', testing_out_of_pocket: '2 weeks', therapy: 'Contact for availability' }
  },
  {
    name: 'Stephen Shu',
    slug: 'stephen-shu',
    spec: 'Psychological Assessments',
    image: stephenShuImg,
    name_with_education: 'Stephen Shu, MS',
    credential: 'LPA',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing (Out-of-Pocket Only)', 'Psychological evaluations', 'Personality Disorders', 'IQ testing'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { testing_insurance: '2 months', testing_out_of_pocket: '2 weeks' }
  },
  {
    name: 'Jonica Davis',
    slug: 'jonica-davis',
    spec: 'Therapy for Adults',
    image: jonicaDavisImg,
    name_with_education: 'Jonica Davis, MS',
    credential: 'T-LPA',
    services_offered: ['Therapy', 'Autism Testing', 'ADHD Testing', 'Dyslexia testing (Out-of-Pocket Only)', 'Personality Disorders', 'IQ testing'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$80' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { testing_insurance: '3 months', testing_out_of_pocket: '2 weeks', therapy: '1 month' }
  },
  {
    name: 'Jatana Boggs',
    slug: 'jatana-boggs',
    spec: 'Child Assessments & Therapy',
    image: jatanaBoggsImg,
    name_with_education: 'Jatana Boggs, MA',
    credential: 'LPCA',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Personality Disorders', 'Psychological evaluations', 'Therapy'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500', therapy: '$80' },
    states_served: ['Kentucky', 'Ohio'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { testing_insurance: '2 months', testing_out_of_pocket: '2 weeks', therapy: '3 months' }
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
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { therapy: 'Immediate' }
  },
  {
    name: 'Surjya Bajpayee',
    slug: 'surjya-bajpayee',
    spec: 'Therapy for Adolescents',
    image: surjyaBajpayeeImg,
    name_with_education: 'Surjya Bajpayee, MS',
    credential: 'Clinical Intern',
    services_offered: ['Therapy'], 
    out_of_pocket_rates: { therapy: '$25' },
    states_served: ['Kentucky'], 
    ins: [], 
    wait_times: { therapy: 'Immediate availability' } 
  },
  {
    name: 'Olivia Williams',
    slug: 'olivia-williams',
    spec: 'Psychological Assessments', 
    image: oliviaWilliamsImg,
    name_with_education: 'Olivia Williams, PhD',
    credential: 'T-LPA',
    services_offered: ['Autism Testing', 'ADHD Testing', 'Dyslexia testing (Out-of-Pocket Only)', 'Personality Disorders', 'IQ testing', 'Psychological evaluations'],
    out_of_pocket_rates: { testing_standard: '$1,300', testing_dyslexia: '$1,500' },
    states_served: ['Kentucky'],
    ins: ['Medicaid', 'Aetna', 'UHC Community', 'Humana', 'Passport', 'Cigna'],
    wait_times: { testing_insurance: '3 months', testing_out_of_pocket: '4 weeks' }
  }
];

export const staff: StaffMember[] = [
  { name: 'Samantha Rodarte', slug: 'samantha-rodarte', spec: 'Admin Assistant', image: samanthaRodarte },
];
