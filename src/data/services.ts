export interface ServiceLink {
  name: string;
  slug: string;
  desc: string;
}

export const specialties: ServiceLink[] = [
  { name: 'Learning Disabilities', slug: 'dyslexia-testing', desc: 'Dyslexia, dyscalculia, and learning disability testing with documentation for school and accommodations' },
  { name: 'Psychoeducational Evaluations', slug: 'psychoeducational-evaluations', desc: 'The private specialty school evaluation most practices refer out — for 2e, giftedness, and accommodation-ready documentation' },
  { name: 'PDA Profile', slug: 'pda-profile', desc: 'A rare in-house specialty: demand-avoidant and high-masking autism profiles assessed with clinical depth' },
  { name: 'IEE in Kentucky', slug: 'iee', desc: 'Independent Educational Evaluations for special education advocacy' },
  { name: 'Adoption Evaluations', slug: 'adoption-evaluations', desc: 'Adoption evaluations prepared for agency and court requirements' },
  { name: 'Psych Evaluations for Benefits', slug: 'benefits-evaluations', desc: 'Evaluations for disability benefits and accommodation requests' },
  { name: 'Guardianship Evaluations', slug: 'guardianship-evaluations', desc: 'Court-informed evaluations for guardianship questions' },
  { name: 'ESA Evaluations', slug: 'esa-evaluations', desc: 'Clinician-led emotional support animal evaluations' },
];

export const services: ServiceLink[] = [
  { name: 'Psychological Evaluations', slug: 'psychological-evaluations', desc: 'Specialty-depth evaluations for ADHD, autism, and complex referrals — self-pay reports often in 7 days' },
  { name: 'Autism Testing', slug: 'autism-testing', desc: 'Neuro-affirming autism evaluations including high-masking, PDA-trait, and AuDHD presentations' },
  { name: 'Therapy', slug: 'therapy', desc: 'Neuro-affirming therapy for ages 3–99, often covered by insurance' },
  { name: 'Medication Management', slug: 'medication-management', desc: 'Psychiatric prescribing — including controlled substances for ADHD — with a short current access wait' },
  { name: 'ADHD Testing', slug: 'adhd-testing', desc: 'ADHD evaluations for complex and high-masking presentations, with school documentation available' },
  { name: 'Personality Evaluations', slug: 'personality-profiles', desc: 'Assessments for personality, trauma, and differential diagnosis' },
  { name: 'Telehealth Services', slug: 'telehealth', desc: 'Telehealth psychology, therapy, and evaluations across Kentucky and select additional states' },
];
