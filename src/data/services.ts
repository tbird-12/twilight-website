export interface ServiceLink {
  name: string;
  slug: string;
  desc: string;
}

export const specialties: ServiceLink[] = [
  { name: 'Learning Disabilities', slug: 'dyslexia-testing', desc: 'Dyslexia, dyscalculia, and other learning disability assessments' },
  { name: 'Psychoeducational Evaluations', slug: 'psychoeducational-evaluations', desc: 'Self-pay psychoeducational evaluations for school and accommodation planning' },
  { name: 'PDA Profile', slug: 'pda-profile', desc: 'Pathological Demand Avoidance profile assessments' },
  { name: 'IEE for KY', slug: 'IEE', desc: 'Independent Educational Evaluations for special education advocacy' },
  { name: 'Adoption Evaluations', slug: 'adoption-evaluations', desc: 'Adoption evaluations prepared for agency and court requirements' },
  { name: 'Psych Evaluations for Benefits', slug: 'benefits-evaluations', desc: 'Evaluations for disability benefits and accommodation requests' },
  { name: 'Guardianship Evaluations', slug: 'guardianship-evaluations', desc: 'Court-informed evaluations for guardianship questions' },
  { name: 'ESA Evaluations', slug: 'esa-evaluations', desc: 'Clinician-led emotional support animal evaluations' },
];

export const services: ServiceLink[] = [
  { name: 'Psychological Evaluations', slug: 'psychological-evaluations', desc: 'Diagnostic evaluations with careful testing, clear recommendations, and self-pay options when broader documentation is needed' },
  { name: 'Autism Testing', slug: 'autism-testing', desc: 'Neuro-affirming autism evaluations for nuanced and high-masking presentations' },
  { name: 'Therapy', slug: 'therapy', desc: 'Neuro-affirming therapy for ages 3-99, often covered by insurance' },
  { name: 'Medication Management', slug: 'medication-management', desc: 'Psychiatric medication management, often covered by insurance' },
  { name: 'ADHD Testing', slug: 'adhd-testing', desc: 'ADHD evaluations for complex and high-masking presentations, tailored to the referral question' },
  { name: 'Personality Evaluations', slug: 'personality-profiles', desc: 'Assessments for personality, trauma, and differential diagnosis' },
  { name: 'Medical Marijuana Consultations', slug: 'medical-marijuana-consultations', desc: 'Clinical evaluations and renewals for medical marijuana treatment in Kentucky' },
];
