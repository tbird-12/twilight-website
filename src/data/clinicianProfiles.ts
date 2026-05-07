import {
  MAIN_OFFICE_CITY_STATE_ZIP,
  MAIN_OFFICE_STREET_ADDRESS,
  PHONE_NUMBER,
  WIDGET_LINK,
} from "./resource";
import { providers } from "./staff";
import type { Provider } from "./staff";

export interface ClinicianContentBlock {
  type: "paragraphs" | "quote";
  title?: string;
  paragraphs?: string[];
  quote?: string;
  variant?: "soft" | "accent";
}

export interface ClinicianCardItem {
  title: string;
  subtitle?: string;
  meta?: string;
}

export interface ClinicianDetailCard {
  title: string;
  eyebrow?: string;
  body?: string[];
  items?: ClinicianCardItem[];
  variant?: "soft" | "surface" | "surface-2";
  columnSpan?: 1 | 2;
}

export interface ClinicianActionStat {
  label: string;
  value: string;
  subdued?: boolean;
}

export interface ClinicianActionPanel {
  title: string;
  eyebrow?: string;
  description?: string;
  note?: string;
  items?: ClinicianActionStat[];
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "accent" | "surface";
  watermark?: string;
}

export interface ClinicianProfile {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  jobTitle: string;
  badge: string;
  headingPrimary: string;
  headingAccent: string;
  intro?: string;
  specialties: string[];
  contentBlocks: ClinicianContentBlock[];
  detailCards?: ClinicianDetailCard[];
  sidebarCards?: ClinicianDetailCard[];
  primaryPanel?: ClinicianActionPanel;
  secondaryPanel?: ClinicianActionPanel;
}

export interface ClinicianPageData {
  profile: ClinicianProfile;
  provider: Provider;
}

const requestAppointmentPhoneHref = `tel:${PHONE_NUMBER}`;

export const clinicianProfiles: ClinicianProfile[] = [
  {
    slug: "heather-cornett",
    pageTitle: "Heather Cornett, PhD | Licensed Psychologist",
    pageDescription:
      "Heather Cornett, PhD — Founder of Twilight Psychology and licensed psychologist providing neuro-affirming psychological evaluations in Lexington, KY.",
    jobTitle: "Founder and Licensed Psychologist",
    badge: "Founder & Licensed Psychologist",
    headingPrimary: "Heather Cornett,",
    headingAccent: "Ph.D., LP.",
    intro:
      "Specializing in comprehensive psychological evaluations for high-masking neurodivergent adults and complex diagnostic clarification.",
    specialties: [
      "High-Masking Autism & ADHD",
      "Learning Disability Evaluations",
      "Personality Disorders (BPD/SPMI)",
      "Guardianship & Disability Claims",
      "PsyPact Telehealth (40+ States)",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "A Neuro-Affirming Approach to Clarity.",
        paragraphs: [
          "Hello! I am a Kentucky native and the founder of Twilight Psychology. My clinical expertise lies in working with individuals who have often been overlooked or misdiagnosed—particularly those who have learned to mask behaviors to fit into neurotypical environments.",
          "Whether you are an adult seeking answers about Autism or ADHD for the first time, or a parent navigating a complex learning disability, I provide a thorough, evidence-based, and compassionate evaluation process. I believe that a diagnosis is not a deficit; it is a vital piece of your identity that provides the roadmap for profound purpose and fulfillment.",
        ],
      },
      {
        type: "quote",
        quote:
          "We do not just test using a checklist of concerns; we test with an intention to understand the person beyond the measures. My goal is to ensure you feel heard, understood, and empowered during our sessions.",
        variant: "accent",
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Beyond my clinical work, I have served as an Assistant Professor of Psychology for three years and hold a PsyPact certificate, allowing me to provide psychological services via telehealth to clients in over 40 states.",
        ],
      },
    ],
    sidebarCards: [
      {
        title: "Education & Credentials",
        eyebrow: "Background",
        variant: "soft",
        items: [
          {
            title: "Ph.D. in Counseling Psychology",
            subtitle: "Texas Woman's University",
            meta: "2019",
          },
          {
            title: "M.S. in Counseling Psychology",
            subtitle: "University of Kentucky",
            meta: "2014",
          },
          {
            title: "APA-Accredited Internship",
            subtitle: "Wichita Collaborative (WCPIP)",
            meta: "Wichita, KS",
          },
        ],
      },
      {
        title: "Outside the Clinic",
        variant: "surface-2",
        body: [
          "When I am not in the office, you will likely find me diving into a true crime documentary, playing video games, or spending time with my large orange tabby cat. I am a dedicated BIPOC and LGBTQ+ ally.",
        ],
      },
    ],
    primaryPanel: {
      title: "Current Availability",
      description:
        "Dr. Cornett provides evaluations for ages 2 and up in Lexington, KY and nationwide for adults via telehealth.",
      items: [
        { label: "Evaluations", value: "Accepting New Clients" },
        { label: "Individual Therapy", value: "Waitlist Only", subdued: true },
      ],
      ctaLabel: "Schedule an Intake",
      ctaHref: WIDGET_LINK,
      variant: "surface",
      watermark: "PsyPact",
    },
  },
  {
    slug: "nicola-allen",
    pageTitle: "Nicola Allen, PMHNP-BC | Psychiatric NP",
    pageDescription:
      "Nicola Allen, PMHNP-BC — Psychiatric nurse practitioner at Twilight Psychology providing medication management in Lexington, KY.",
    jobTitle: "Psychiatric Mental Health Nurse Practitioner",
    badge: "Psychiatric Nurse Practitioner",
    headingPrimary: "Nicola Allen,",
    headingAccent: "MSN, PMHNP-BC",
    specialties: [
      "Psychiatry",
      "Medication Management",
      "ADHD & PTSD",
      "Trauma-Informed Care",
      "Lifestyle Mindfulness",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Comprehensive, Patient-Centered Psychiatry.",
        paragraphs: [
          "With over 20 years of experience in nursing and psychiatry, I provide a compassionate, judgment-free environment focused on comprehensive medication management and whole-person care.",
          "Raised in Eastern Kentucky, I value a grounded, down-to-earth approach and strive to meet patients where they are through a combination of in-person and telehealth visits. My practice integrates evidence-based prescribing with lifestyle modifications, psychoeducation, and mindfulness strategies to support long-term mental wellness.",
        ],
      },
      {
        type: "quote",
        quote:
          "My goal is to create a collaborative, supportive partnership where patients feel heard, respected, and empowered in their care.",
        variant: "soft",
      },
    ],
    detailCards: [
      {
        title: "Education & Training",
        eyebrow: "Background",
        variant: "soft",
        items: [
          {
            title: "Associate Degree in Nursing",
            subtitle: "Hazard Community and Technical College",
          },
          {
            title: "Bachelor of Science in Nursing",
            subtitle: "Eastern Kentucky University",
          },
          {
            title: "Master of Science in Nursing",
            subtitle: "Indiana Wesleyan University",
          },
        ],
      },
      {
        title: "Clinical Focus",
        eyebrow: "Care approach",
        variant: "soft",
        items: [
          {
            title:
              "Works with individuals with autism, ADHD, anxiety, and depression",
          },
          {
            title:
              "Creates individualized treatment plans tailored to each patient's needs",
          },
          {
            title:
              "Uses a neurodiversity-affirming approach that respects each person's strengths, perspectives, and needs",
          },
        ],
      },
      {
        title: "Care Delivery",
        variant: "surface-2",
        body: [
          "I offer care through in-person and telehealth visits, pairing comprehensive medication management with evidence-based prescribing, lifestyle modifications, psychoeducation, and mindfulness strategies.",
        ],
      },
      {
        title: "Additional Services & Safety",
        variant: "surface-2",
        body: [
          "I am a THC-friendly provider and offer medical cannabis certification evaluations when clinically appropriate.",
          "At Twilight Psychology, we follow all Drug Enforcement Administration regulations and use Prescription Drug Monitoring Program checks to support safe, informed, individualized care.",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Availability",
      title: "Immediate Openings for Medication Management",
      ctaLabel: "Request Appointment",
      ctaHref: requestAppointmentPhoneHref,
      variant: "surface",
    },
  },
  {
    slug: "emeli-evans",
    pageTitle: "Emeli Evans, LPA | Therapy & Assessments",
    pageDescription:
      "Emeli Evans, LPA — Twilight Psychology clinician providing neuro-affirming therapy and assessments for neurodivergent clients in Kentucky.",
    jobTitle: "Licensed Psychological Associate",
    badge: "Psychological Associate",
    headingPrimary: "Emeli Evans,",
    headingAccent: "M.S., LPA.",
    specialties: [
      "AuDHD Identity",
      "PDA (Pathological Demand Avoidance)",
      "High-Masking Support",
      "LGBTQ+ Affirming",
      "Neuro-Affirming Therapy",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Lived Experience meets Clinical Expertise.",
        paragraphs: [
          "As an AuDHD person myself, I am passionate about helping neurodiverse kids, adolescents, and adults find their identity. I take a neuro-affirming approach to both assessment and therapy, moving away from stereotypical views of autism.",
          "I specialize in identifying Pathological Demand Avoidance and working with high-masking individuals. My goal is to support clients in unmasking and advocating for their sensory and regulation needs.",
          "Families and adults often come to me after years of feeling misunderstood by more traditional approaches. I focus on making the evaluation or therapy process collaborative, validating, and practical so clients leave with language, recommendations, and next steps that genuinely fit their day-to-day life.",
        ],
      },
      {
        type: "quote",
        quote:
          "I am passionate about fostering understanding of the autism spectrum and promoting neuroaffirmative practices among other professionals.",
        variant: "accent",
      },
    ],
  },
  {
    slug: "stephen-shu",
    pageTitle: "Stephen Shu, LPA | Psychological Assessments",
    pageDescription:
      "Stephen Shu, LPA — Twilight Psychology clinician providing psychological and neuropsychological assessments in Lexington, KY.",
    jobTitle: "Licensed Psychological Associate",
    badge: "Licensed Psychological Associate",
    headingPrimary: "Stephen Shu,",
    headingAccent: "M.A., LPA.",
    specialties: [
      "Neuropsychological Assessments",
      "Psychological Testing",
      "Marriage & Family Therapy",
      "Cognitive Behavioral Functioning",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Clarity Through Comprehensive Evaluation.",
        paragraphs: [
          "I am a Licensed Psychological Associate practicing under the supervision of Dr. Heather Cornett. Currently completing my doctoral degree at the University of Hartford, I earned my master's from Pepperdine University with an emphasis in Marriage and Family Therapy.",
          "I am passionate about neuropsychology and providing assessments that empower individuals to navigate their lives with greater confidence and insight. I strive to create a calm, supportive environment where everyone feels safe and respected throughout the evaluation process.",
        ],
      },
    ],
    primaryPanel: {
      title: "Current Availability",
      description: "Stephen provides evaluations for ages 12 and up in Lexington, KY.",
      items: [
        { label: "Evaluations", value: "Not accepting new clients" },
        { label: "Individual Therapy", value: "Waitlist Only", subdued: true },
      ],
      note:
        "If you are looking for assessment support, our intake team can help match you with the right next step.",
      ctaLabel: "Schedule an Intake",
      ctaHref: WIDGET_LINK,
      variant: "accent",
    },
  },
  {
    slug: "jonica-davis",
    pageTitle: "Jonica Davis, T-LPA | Neuro-Affirming Therapy",
    pageDescription:
      "Jonica Davis, T-LPA — Twilight Psychology clinician offering neuro-affirming therapy and assessment support for adults and families in Kentucky.",
    jobTitle: "Trainee Licensed Psychological Associate",
    badge: "Licensed Psychological Associate Trainee",
    headingPrimary: "Jonica",
    headingAccent: "Davis, M.S., T-LPA.",
    intro:
      "Specializing in supportive, neuro-affirming therapy for individuals and families navigating neurodivergent identities.",
    specialties: [
      "Neuro-Affirming Therapy",
      "Autism & ADHD Support",
      "Adult Therapy",
      "Family Systems",
      "Identity Exploration",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Authentic Connection in Clinical Care.",
        paragraphs: [
          "Jonica is currently completing her postdoctoral fellowship under the supervision of Dr. Heather Cornett, PhD. She is a doctoral candidate at Radford University in Counseling Psychology and completed her Master of Science in Counseling Psychology at the University of Kentucky.",
          "Jonica is passionate about providing therapy that meets people where they currently are in their lives. She works to offer clients a safe and affirming place to process anything that may be going on in their lives.",
        ],
      },
      {
        type: "quote",
        quote:
          "I enjoy seeing clients who want to explore their relationship with their bodies or how anti-fat bias has impacted their life.",
        variant: "soft",
      },
    ],
    sidebarCards: [
      {
        title: "Primary Office",
        eyebrow: "Location",
        variant: "soft",
        body: [MAIN_OFFICE_STREET_ADDRESS, MAIN_OFFICE_CITY_STATE_ZIP],
      },
      {
        title: "Education",
        eyebrow: "Training",
        variant: "surface-2",
        items: [
          {
            title: "Master of Science (M.S.) in Psychology",
          },
          {
            title: "Licensed Psychological Associate Trainee (T-LPA)",
          },
        ],
      },
    ],
    secondaryPanel: {
      title: "Ready to Get Started?",
      description:
        "Learn what to expect at your first appointment and get all the information you need as a new client.",
      ctaLabel: "New Client Information",
      ctaHref: "/resources/new-client",
      variant: "surface",
    },
  },
  {
    slug: "jatana-boggs",
    pageTitle: "Jatana Boggs, LPCA | Therapy & Testing",
    pageDescription:
      "Jatana Boggs, LPCA — Twilight Psychology clinician providing therapy and psychological testing support in Kentucky.",
    jobTitle: "Licensed Professional Counselor Associate",
    badge: "Licensed Professional Counselor Associate",
    headingPrimary: "Jatana Boggs,",
    headingAccent: "M.A., LPCA.",
    specialties: [
      "Adult ADHD",
      "Bipolar Disorder",
      "Substance Use",
      "Psychological Testing",
      "Clinical Supervision",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Evidence-Based Care with a Human Connection.",
        paragraphs: [
          "With over a decade of experience in community mental health and private practice, I focus on providing diagnostic clarity for complex presentations. I specialize in adult ADHD and mood disorders, ensuring that clients leave with a concrete understanding of their mental health landscape.",
          "I earned my Master's degree from Morehead State University and have dedicated my career to serving the Kentucky community through comprehensive testing and supervision of upcoming clinical professionals.",
        ],
      },
    ],
    primaryPanel: {
      title: "Schedule a Psychological Evaluation",
      description:
        "Jatana offers comprehensive psychological testing for ages under 21 in Lexington, KY. Use the link below to contact our team and schedule an intake.",
      ctaLabel: "Schedule an Intake",
      ctaHref: WIDGET_LINK,
      variant: "surface",
    },
  },
  {
    slug: "tiffany-roundtree",
    pageTitle: "Tiffany Roundtree, LPCA | Child & Adolescent Therapy",
    pageDescription:
      "Tiffany Roundtree, LPCA — Twilight Psychology clinician providing child and adolescent therapy in Kentucky.",
    jobTitle: "Licensed Professional Counselor Associate",
    badge: "Licensed Professional Counselor Associate",
    headingPrimary: "Tiffany",
    headingAccent: "Roundtree, M.A.Ed, M.A., LPCA",
    specialties: [
      "Adolescent Therapy",
      "Parenting Support",
      "Anxiety Disorders",
      "School-Based Advocacy",
      "Developmental Testing",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Supporting the Next Generation.",
        paragraphs: [
          "I go by Tree. I graduated from Lindsey Wilson College with a Master of Arts in Counseling and am supervised by Delmetria Cayson-Combs, LPCC-S.",
          "My work centers on adolescents and adults navigating the complexities of modern development. I help clients explore how societal norms, family dynamics, and life experiences have shaped their personal stories about self-worth, competence, and authenticity.",
          "I specialize in helping clients deconstruct harmful or limiting beliefs in those stories and rewrite them from a more compassionate and neuroaffirming understanding of themselves.",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Availability",
      title: "Short Wait Times for Therapy Appointments",
      ctaLabel: "Request Appointment",
      ctaHref: requestAppointmentPhoneHref,
      variant: "surface",
    },
    secondaryPanel: {
      title: "First Time Here?",
      description:
        "Learn about our intake process and what to expect as a new client at Twilight Psychology.",
      ctaLabel: "New Client Guide",
      ctaHref: "/resources/new-client",
      variant: "surface",
    },
  },
  {
    slug: "olivia-williams",
    pageTitle: "Olivia Williams, PhD | Psychological Assessments",
    pageDescription:
      "Olivia Williams, PhD — Twilight Psychology clinician providing psychological assessments for autism, ADHD, and learning needs in Kentucky.",
    jobTitle: "Licensed Psychological Associate",
    badge: "Licensed Psychological Associate",
    headingPrimary: "Olivia",
    headingAccent: "Williams, Ph.D., LPA.",
    intro: "Specializing in psychological assessments for individuals ages 2 and above.",
    specialties: [
      "Psychological Assessments",
      "Autism & ADHD Support",
      "Psychoeducational Assessments",
      "Dyslexia Assessments",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Assessment with clarity, warmth, and practical next steps.",
        paragraphs: [
          "I provide psychological assessments for young children, adolescents, and adults who need a more complete understanding of learning, attention, autism, and related developmental differences.",
          "My goal is to turn testing into something useful: clear findings, thoughtful interpretation, and recommendations that make sense for real life at home, school, and work.",
          "I value careful listening and a thorough review of developmental history, not just test scores in isolation. Whether a family is seeking school-based support or an adult is looking for diagnostic clarity, I aim to make the process feel respectful, organized, and easy to understand from start to finish.",
        ],
      },
    ],
  },
];

export function getClinicianPageData(slug: string): ClinicianPageData | undefined {
  const profile = clinicianProfiles.find((entry) => entry.slug === slug);

  if (!profile) {
    return undefined;
  }

  const provider = providers.find((entry) => entry.slug === slug);

  if (!provider) {
    return undefined;
  }

  return { profile, provider };
}
