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
    pageTitle: "Dr. Heather Cornett, PhD | PSYPACT Psychologist — KY & 40+ States",
    pageDescription:
      "Dr. Heather Cornett, PhD is the founder and licensed psychologist at Twilight Psychology, providing neuro-affirming psychological evaluations in-person in Lexington, KY and via PSYPACT telehealth in 40+ states nationwide.",
    jobTitle: "Founder and Licensed Psychologist",
    badge: "Founder & Licensed Psychologist",
    headingPrimary: "Heather Cornett,",
    headingAccent: "Ph.D., L.P., HSP.",
    intro:
      "Specializing in comprehensive psychological evaluations for high-masking neurodivergent adults and complex diagnostic clarification.",
    specialties: [
      "High-Masking Autism & ADHD",
      "Learning Disability Evaluations",
      "Personality Disorders (BPD/SPMI)",
      "Guardianship & Disability Claims",
      "PSYPACT Telehealth (40+ States)",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "A Neuro-Affirming Approach to Clarity.",
        paragraphs: [
          "Hello! I am a Licensed Psychologist and the founder of Twilight Psychology. My clinical expertise lies in working with individuals who have often been overlooked or misdiagnosed—particularly those who have learned to mask behaviors to fit into neurotypical environments.",
          "Whether you are an adult seeking answers about neurodivergence for the first time, or a parent navigating a complex learning disability, I provide a thorough, evidence-based, and compassionate evaluation process. I have extensive experience working with SPMI (Bipolar, Borderline, Schizophrenia)  populations, and I understand how personality disorders can sometimes overshadow or mask neurodivergent traits. "
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
          "Beyond my clinical work, I have served as an Assistant Professor of Psychology for three years and hold a PSYPACT certificate, allowing me to provide psychological services via telehealth to clients in over 40 states. I've served on the Ethics Committee for the Kentucky Psychological Association and am honored to serve on the Kentucky Board of Examiners of Psychology.",
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
        "Dr. Cornett provides evaluations for ages 2 and up in Lexington, KY and nationwide for adults via PSYPACT telehealth authority (40+ states).",
      items: [
        { label: "Evaluations", value: "Accepting New Clients" },
        { label: "Individual Therapy", value: "Waitlist Only", subdued: true },
      ],
      ctaLabel: "Schedule an Intake",
      ctaHref: WIDGET_LINK,
      variant: "surface",
      watermark: "PSYPACT",
    },
    secondaryPanel: {
      eyebrow: "From the Blog",
      title: "Autism Evaluations in Lexington, KY",
      description:
        "What autism evaluation involves at Twilight Psychology, including high-masking adults, AuDHD presentations, and the full diagnostic process.",
      ctaLabel: "Read the post",
      ctaHref: "/blog/clinical/autism-evaluation-lexington-ky",
      variant: "surface",
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
        title: "Safe Prescribing",
        variant: "surface-2",
        body: [
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
    secondaryPanel: {
      eyebrow: "From the Blog",
      title: "Autism Evaluation in Lexington, KY",
      description:
        "What autism evaluation involves at Twilight Psychology, including high-masking adults, AuDHD presentations, and the ADOS-2 diagnostic process.",
      ctaLabel: "Read the post",
      ctaHref: "/blog/clinical/autism-evaluation-lexington-ky",
      variant: "surface",
    },
  },

  {
    slug: "jonica-davis",
    pageTitle: "Jonica Davis, T-LPA | Neuro-Affirming Therapy",
    pageDescription:
      "Jonica Davis, Psy.D., T-LPA — Twilight Psychology clinician offering neuro-affirming therapy and assessment support for adults and families in Kentucky.",

    jobTitle: "Psychologist",
    badge: "Temporary Licensed Psychological Associate",
    headingPrimary: "Jonica",
    headingAccent: "Davis, Psy.D., T-LPA",
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
          "Jonica is currently completing her postdoctoral fellowship under the supervision of Dr. Heather Cornett, PhD. She earned her Psy.D. in Counseling Psychology from Radford University and completed her Master of Science in Counseling Psychology at the University of Kentucky.",

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
            title: "Doctor of Psychology (Psy.D.) in Counseling Psychology, Radford University",
          },
          {
            title: "Master of Science (M.S.) in Counseling Psychology, University of Kentucky",
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
    slug: "ethan-puckett",
    pageTitle: "Ethan Puckett, T-LPA | Child Therapy & Testing",
    pageDescription:
      "Ethan Puckett, T-LPA — Twilight Psychology clinician providing neuro-affirming therapy for ages 3-18, with strongest fit for ages 7-16, plus psychological and psychoeducational testing in Kentucky under the supervision of Dr. Heather Cornett.",
    jobTitle: "Temporary Licensed Psychological Associate",
    badge: "Temporary Licensed Psychological Associate",
    headingPrimary: "Ethan",
    headingAccent: "Puckett, Psy.D., T-LPA.",
    intro:
      "Providing neuro-affirming outpatient therapy for children and adolescents ages 3 to 18, with ideal clinical fit for ages 7 to 16, plus psychological and psychoeducational testing in Kentucky.",
    specialties: [
      "Child Therapy Ages 3-18",
      "Ideal Fit Ages 7-16",
      "Older Teen In-Person & Virtual Therapy",
      "Autism & ADHD Support",
      "Psychological & Psychoeducational Testing",
      "Behavioral, CBT & ACT",
      "School-Based Concerns",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Neuro-affirming therapy and testing for children and adolescents.",
        paragraphs: [
          "My name is Ethan Puckett. I graduated with my Masters in Applied Psychology from Western Kentucky University and earned my Psy.D. in Clinical Psychology from Western Kentucky University. I am a temporarily licensed psychological associate practicing under the supervision of Dr. Heather Cornett.",
          "I have previously worked as an outpatient therapist with individuals and families in a community mental health center, where I completed weekly therapy sessions as well as autism evaluations. I have most recently worked as a school psychologist intern completing many school-based evaluations for learning disabilities, autism, ADHD, and other cognitive, emotional, and behavioral concerns.",
        ],
      },
      {
        type: "quote",
        quote:
          "I help children and adolescents understand not only how to cope with ASD, ADHD, anxiety, depression, trauma, and related challenges, but also how to recognize and accentuate their existing strengths.",
        variant: "accent",
      },
      {
        type: "paragraphs",
        paragraphs: [
          "I specialize in the assessment and treatment of children and adolescents from neurodivergent populations. My ideal client range is 7 to 16, and I also welcome older teens for in-person and virtual therapy sessions. I utilize behavioral, Cognitive Behavioral Therapy (CBT), and Acceptance and Commitment Therapy (ACT) techniques with a person-centered approach to understand each individual and help them become the best version of themselves.",
          "In addition to therapy, I also provide psychological testing and psychoeducational testing, especially when families, schools, and care teams need a clearer picture of learning, attention, autism, or emotional-behavioral functioning.",
        ],
      },
    ],
    sidebarCards: [
      {
        title: "Training & Supervision",
        eyebrow: "Background",
        variant: "soft",
        items: [
          {
            title: "M.A. in Applied Psychology",
            subtitle: "Western Kentucky University",
          },
          {
            title: "Psy.D. in Clinical Psychology",
            subtitle: "Western Kentucky University",
          },
          {
            title: "Supervision",
            subtitle: "Dr. Heather Cornett",
          },
        ],
      },
      {
        title: "Clinical Experience",
        eyebrow: "Focus",
        variant: "surface-2",
        body: [
          "Ethan's background includes community mental health outpatient therapy, autism evaluations, and school-based assessments for learning, attention, and emotional-behavioral concerns. His strongest clinical fit is typically ages 7 to 16, with therapy openings for older teens offered in person and virtually.",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Availability",
      title: "Immediate Availability for Therapy & Self-Pay Evaluations",
      description:
        "Ethan offers neuro-affirming therapy for ages 3 to 18, with ideal fit for ages 7 to 16, plus in-person and virtual therapy sessions for older teens and testing services in Kentucky.",
      items: [
        { label: "Therapy", value: "Immediate" },
        { label: "Self-Pay Evaluations", value: "Immediate" },
        { label: "Older Teen Therapy", value: "In person and virtual" },
      ],
      note:
        "New child and teen therapy clients can begin with Ethan immediately.",
      ctaLabel: "Schedule an Intake",
      ctaHref: WIDGET_LINK,
      variant: "surface",
    },
    secondaryPanel: {
      eyebrow: "From the Blog",
      title: "Child and Teen Therapy in Lexington, KY",
      description:
        "What therapy looks like for children and adolescents at Twilight Psychology, including modalities and how to get started.",
      ctaLabel: "Read the post",
      ctaHref: "/blog/clinical/child-therapy-lexington-ky",
      variant: "surface",
    },
  },
  {
    slug: "michael-burns",
    pageTitle: "Michael Burns, PhD | Substance Use & DV Therapy — KY & TN",
    pageDescription:
      "Dr. Michael Burns, T-LP, LPCC, LCADC, BIP — substance use, domestic violence, PTSD, and faith-integrated counseling at Twilight Psychology, serving clients in Kentucky and Tennessee.",
    jobTitle: "Temporary Licensed Psychologist",
    badge: "PhD · T-LP · LPCC · LCADC · BIP",
    headingPrimary: "Michael Burns,",
    headingAccent: "PhD, T-LP, LPCC, LCADC, BIP.",
    intro:
      "With 24 years of experience across drug rehabilitation, inpatient settings, and domestic abuse shelters, Michael brings a rare breadth of clinical perspective to substance use disorders, domestic violence recovery, and faith-integrated therapy.",
    specialties: [
      "Substance Use & Addiction",
      "Domestic Violence Recovery",
      "Faith-Integrated Counseling",
      "PTSD & Trauma",
      "Adolescents & Adults",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "A Rare Breadth of Clinical Experience.",
        paragraphs: [
          "Hi, I'm Dr. Michael G. Burns. With 24 years of clinical experience, I have worked across some of the most challenging settings in mental health — drug rehabilitation centers, domestic abuse shelters, inpatient psychiatric hospitalization, adolescent group homes, and outpatient treatment. That depth of exposure means I understand the full continuum of care and can meet clients at any stage of their journey.",
          "I specialize in substance use disorders, domestic violence, relationships, PTSD, and therapy for adolescents and children. My LCADC credential reflects rigorous specialized training in alcohol and drug counseling, while my BIP certification equips me to work with clients in batterers intervention programs — supporting both survivors and those seeking accountability and lasting change.",
        ],
      },
      {
        type: "quote",
        quote:
          "Clients often tell me I am approachable and knowledgeable. I take that as a call to meet people exactly where they are — with honesty, warmth, and evidence-based care.",
        variant: "accent",
      },
      {
        type: "paragraphs",
        title: "Faith-Integrated, Evidence-Based Therapy.",
        paragraphs: [
          "My therapeutic toolkit includes psychoanalysis, Cognitive Behavioral Therapy (CBT), Rational Emotive Behavior Therapy (REBT), and motivational interviewing — always through a deeply humanistic lens. For clients who want to incorporate their Christian faith into the healing process, I offer a safe, informed, and nonjudgmental space to do exactly that.",
          "I am originally from Ohio, married to an amazing lady from Indonesia, and together we are raising an intelligent and humble teenage son. Outside the office I enjoy exercising, music, the outdoors, baseball, reading, and coffee. I am active at my church and love spending time with friends and family.",
        ],
      },
    ],
    sidebarCards: [
      {
        title: "Credentials & Supervision",
        eyebrow: "Background",
        variant: "soft",
        items: [
          {
            title: "Temporary Licensed Psychologist (T-LP)",
            subtitle: "Supervised by Dr. Heather Cornett, PhD",
          },
          {
            title: "LPCC — Licensed Professional Clinical Counselor",
          },
          {
            title: "LCADC — Licensed Clinical Alcohol & Drug Counselor",
          },
          {
            title: "BIP — Batterers Intervention Program Certified",
          },
        ],
      },
      {
        title: "Clinical Settings",
        eyebrow: "24 Years of Practice",
        variant: "surface-2",
        body: [
          "Drug rehabilitation centers, domestic abuse shelters, inpatient psychiatric hospitalization, adolescent group homes, and outpatient treatment — Michael has served clients across the full spectrum of care environments.",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Availability",
      title: "Immediate Openings for Therapy",
      description:
        "Michael offers individual therapy in Kentucky and Tennessee with immediate availability for new clients. He holds dual licensure in both states and accepts telehealth clients across KY and TN.",
      items: [{ label: "Individual Therapy", value: "Immediate" }],
      ctaLabel: "Request Appointment",
      ctaHref: requestAppointmentPhoneHref,
      variant: "surface",
    },
  },
  {
    slug: "taylor-pennington",
    pageTitle: "Taylor Pennington, MS, T-LPA | Psychological Evaluations — KY",
    pageDescription:
      "Taylor Pennington, MS, T-LPA — temporarily licensed psychological associate providing school-based therapy and psychoeducational and psychological testing for children and adolescents in Kentucky, supervised by Dr. Heather Cornett.",
    jobTitle: "Temporary Licensed Psychological Associate",
    badge: "Temporary Licensed Psychological Associate",
    headingPrimary: "Taylor",
    headingAccent: "Pennington, MS, T-LPA",
    intro:
      "I provide neuro-affirming assessments and therapy for children and adolescents, focusing on accurate testing and family-centered recommendations.",
    specialties: [
      "Psychological & Psychoeducational Testing",
      "Autism, ADHD, & Intellectual Disability Evaluations",
      "Family-Focused Feedback & School Advocacy",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Accurate assessment, practical recommendations.",
        paragraphs: [
          "My name is Taylor Pennington. I hold a master’s degree in counseling psychology from the University of Louisville and am a temporarily Licensed Psychological Associate practicing under the supervision of Dr. Heather Cornett.",
          "My experience includes school-based therapy for middle and high school students and outpatient work providing weekly therapy for individuals with autism, ADHD, and cognitive delays. I have completed evaluations for intellectual disability, autism spectrum disorder, and ADHD.",
          "I aim to provide accurate assessments that open doors to new opportunities and resources. I am passionate about supporting families who have received a neurodivergent diagnosis and advocating for the children I work with to help them achieve their personal best.",
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "My clinical expertise centers on assessment and treatment of children and adolescents from neurodivergent backgrounds. I offer psychological and psychoeducational testing to help families, schools, and care teams better understand learning, attention, autism, or emotional-behavioral functioning. I primarily work with clients aged 5 to 16 and use a relational-cultural therapeutic (RCT) approach that values the therapeutic relationship and family collaboration.",
        ],
      },
    ],
    sidebarCards: [
      {
        title: "Education & Supervision",
        eyebrow: "Background",
        variant: "soft",
        items: [
          {
            title: "M.S. in Counseling Psychology",
            subtitle: "University of Louisville",
          },
          {
            title: "Supervision",
            subtitle: "Supervised by Dr. Heather Cornett, PhD",
          },
        ],
      },
      {
        title: "Ideal Client",
        variant: "surface-2",
        body: [
          "Children and adolescents aged 5 to 16 seeking assessment or therapy support, families navigating neurodivergent diagnoses, and school teams looking for clear, actionable assessment recommendations.",
        ],
      },
      {
        title: "Start Date & Availability",
        eyebrow: "Scheduling",
        variant: "soft",
        body: [
          "Start date: August 10, 2026",
          "Monday: 9:00–4:00 (virtual)",
          "Tuesday: 9:00–4:00 (virtual)",
          "Wednesday: 8:00–5:00 (in person)",
          "Thursday: 8:00–4:00 (in person)",
          "Friday: 9:00–3:00 (virtual)",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Services",
      title: "Assessment & Therapy Services",
      description:
        "Psychological and psychoeducational testing, feedback with family- and school-facing recommendations, and relational-cultural therapy for neurodivergent youth.",
      items: [
        { label: "Assessments", value: "2 months" },
        { label: "Therapy", value: "Contact for availability" },
      ],
      ctaLabel: "Request Appointment",
      ctaHref: WIDGET_LINK,
      variant: "surface",
    },
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
