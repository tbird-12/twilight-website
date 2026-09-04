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
      "Providing neuro-affirming therapy for adults navigating neurodivergent identities, modern relationship challenges, and the quieter struggles that don't always have an easy name.",
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
        title: "A space to figure things out.",
        paragraphs: [
          "Jonica is currently completing her postdoctoral fellowship under the supervision of Dr. Heather Cornett, PhD. She earned her Psy.D. in Counseling Psychology from Radford University and completed her Master of Science in Counseling Psychology at the University of Kentucky.",
          "She is passionate about working with adults who identify as neurodiverse — particularly those navigating the unique challenges that come with living in a world that wasn't quite designed with them in mind. That includes everything from masking and identity confusion to more contemporary struggles like dependency on AI, parasocial relationships, and the quiet exhaustion of performing connection without ever feeling truly seen.",
        ],
      },
      {
        type: "quote",
        quote:
          "A lot of my clients come in carrying things that are hard to explain to other people — patterns that make complete sense once we look at them together.",
        variant: "soft",
      },
      {
        type: "paragraphs",
        title: "Working through the patterns beneath the surface.",
        paragraphs: [
          "Jonica enjoys working with adults who are ready to explore the behaviors and relationships that underlie their current challenges.",
          "She also enjoys working with clients who want to examine how anti-fat bias or body image has shaped their sense of self.",
          "Her goal is simply to offer a safe, affirming, and genuinely curious place to process whatever is going on — without judgment and without having to explain yourself from scratch.",
        ],
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
    pageTitle: "Ethan Puckett, Psy.D., LPA | Child Therapy & Testing",
    pageDescription:
      "Ethan Puckett, Psy.D., LPA — Twilight Psychology clinician providing neuro-affirming therapy for ages 3-18, with strongest fit for ages 7-16, plus psychological and psychoeducational testing in Kentucky under the supervision of Dr. Heather Cornett.",
    jobTitle: "Temporary Licensed Psychological Associate",
    badge: "Temporary Licensed Psychological Associate",
    headingPrimary: "Ethan",
    headingAccent: "Puckett, Psy.D., LPA.",
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
          "My name is Ethan Puckett. I graduated with my Masters in Applied Psychology from Western Kentucky University and earned my Psy.D. in Clinical Psychology from Western Kentucky University. I am a licensed psychological associate practicing under the supervision of Dr. Heather Cornett.",
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
        { label: "Therapy", value: "2 months" },
        { label: "Self-Pay Evaluations", value: "3 weeks" },
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
      "Bringing over two decades of real-world clinical experience to substance use, trauma, domestic violence recovery, and faith-integrated counseling for adolescents and adults in Kentucky and Tennessee.",
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
        title: "Meeting you wherever you are.",
        paragraphs: [
          "Hi, I'm Michael. I've spent 24 years working alongside people in some of the most difficult chapters of their lives — in drug rehabilitation centers, domestic abuse shelters, inpatient psychiatric settings, adolescent group homes, and outpatient therapy. That experience has taught me that healing rarely looks the same twice, and that meeting someone with genuine warmth and honesty matters as much as any clinical technique.",
          "I specialize in substance use disorders, domestic violence recovery, relationships, PTSD, and therapy for adolescents and adults. My LCADC credential reflects specialized training in alcohol and drug counseling, and my BIP certification means I can work thoughtfully with both survivors of domestic violence and those seeking accountability and lasting personal change.",
        ],
      },
      {
        type: "quote",
        quote:
          "People often tell me I'm easy to talk to. I take that seriously — good therapy starts with feeling safe enough to be honest.",
        variant: "accent",
      },
      {
        type: "paragraphs",
        title: "A grounded, humanistic approach.",
        paragraphs: [
          "I draw on CBT, Rational Emotive Behavior Therapy, motivational interviewing, and psychoanalytic thinking — always through a humanistic lens that keeps the whole person in focus. For clients who want to weave their Christian faith into the work, I offer a nonjudgmental and informed space to do exactly that.",
          "Outside the office, I'm originally from Ohio, married to a wonderful person from Indonesia, and we're raising a curious teenage son together. I enjoy music, the outdoors, baseball, reading, and good coffee — and I'm active in my church community.",
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
          "Michael has worked across drug rehabilitation, domestic abuse shelters, inpatient psychiatric care, adolescent group homes, and outpatient therapy — experience that spans the full continuum of mental health care.",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Availability",
      title: "Now Accepting New Clients",
      description:
        "Michael offers individual therapy in Kentucky and Tennessee, including telehealth across both states, with availability for new clients.",
      items: [{ label: "Individual Therapy", value: "Available" }],
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
        { label: "Insurance Assessments", value: "3 months" },
        { label: "Self-Pay Assessments", value: "3 weeks" },
      ],
      ctaLabel: "Request Appointment",
      ctaHref: WIDGET_LINK,
      variant: "surface",
    },
  },
  {
    slug: "elise-vanmeter",
    pageTitle: "Jennifer Elise Van Meter, MA, LPA | Therapy & Adult Neurodivergent Assessments — KY",
    pageDescription:
      "Elise Van Meter, MA, LPA — providing neuro-affirming therapy for adolescents and adults plus psychological assessments for neurodivergent adults in Kentucky.",
    jobTitle: "Licensed Psychological Associate",
    badge: "Licensed Psychological Associate",
    headingPrimary: "Jennifer Elise",
    headingAccent: "Van Meter, MA, LPA",
    intro:
      "Providing evidence-based therapy for adolescents and adults and comprehensive psychological assessments for neurodivergent adults in Kentucky.",
    specialties: [
      "Adult Therapy",
      "Adolescent Therapy",
      "Adult Autism & ADHD Assessment",
      "Cognitive Behavioral Therapy (CBT)",
      "Personality Evaluations",
      "High-Masking Neurodivergent Support",
    ],
    contentBlocks: [
      {
        type: "paragraphs",
        title: "Evidence-based therapy and comprehensive assessment.",
        paragraphs: [
          "My name is Jennifer Elise Van Meter and I go by Elise. I hold a master's degree in clinical psychology from Western Kentucky University and am currently pursuing my doctorate in applied psychology. I am a licensed psychological associate practicing under the supervision of Dr. Heather Cornett.",
          "Over the past four years, I have provided therapy and assessment services across a range of settings, including private practice and community mental health. My clinical work focuses on supporting neurodivergent adolescents and adults as they navigate identity, relationships, trauma, and daily functioning.",
          "I specialize in comprehensive psychological assessments for adults seeking clarity around autism, ADHD, mood disorders, and personality functioning. My assessments integrate clinical interview, cognitive testing, adaptive measures, and personality inventories to provide diagnostic clarity and actionable recommendations.",
        ],
      },
      {
        type: "quote",
        quote:
          "I believe in meeting clients where they are and providing care that is both affirming and evidence-based.",
        variant: "accent",
      },
      {
        type: "paragraphs",
        paragraphs: [
          "In therapy, I work primarily with adolescents and adults experiencing anxiety, depression, stress, trauma, attention deficits, relationship issues, and the complexities of living as a neurodivergent person in a neurotypical world. I use cognitive-behavioral therapy (CBT) to help clients develop individualized coping strategies, challenge unhelpful thought patterns, and create sustainable change.",
          "Whether you're seeking a diagnostic evaluation to better understand yourself or ongoing therapy to support your mental health, I'm here to provide thoughtful, compassionate, and clinically rigorous care.",
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
            title: "M.A. in Clinical Psychology",
            subtitle: "Western Kentucky University",
          },
          {
            title: "Psy.D. in Applied Psychology (in progress)",
            subtitle: "Western Kentucky University",
          },
          {
            title: "Supervision",
            subtitle: "Supervised by Dr. Heather Cornett, PhD",
          },
        ],
      },
      {
        title: "Clinical Experience",
        eyebrow: "Focus",
        variant: "surface-2",
        body: [
          "Elise's background includes four years in private practice providing therapy and assessments for neurodivergent adolescents and adults. She has completed assessments for autism spectrum disorder, ADHD, guardianship determination, mood and personality disorders, and learning disabilities.",
        ],
      },
      {
        title: "Ideal Client",
        variant: "soft",
        body: [
          "Adolescents and adults seeking evidence-based therapy for anxiety, depression, trauma, or relationship concerns. Adults seeking diagnostic clarity around autism, ADHD, or personality functioning.",
        ],
      },
    ],
    primaryPanel: {
      eyebrow: "Availability",
      title: "Immediate Availability for Therapy, 3-Week Wait for Self-Pay Testing",
      description:
        "Elise offers therapy for adolescents and adults and psychological assessments for neurodivergent adults in Kentucky.",
      items: [
        { label: "Therapy", value: "6 weeks" },
        { label: "Self-Pay Testing", value: "3 weeks" },
        { label: "Insurance Testing", value: "4 months" },
      ],
      note:
        "New therapy clients can begin immediately. Testing availability varies by insurance status.",
      ctaLabel: "Schedule an Intake",
      ctaHref: WIDGET_LINK,
      variant: "surface",
    },
    secondaryPanel: {
      eyebrow: "From the Blog",
      title: "Adult Autism Testing in Kentucky",
      description:
        "What adult autism evaluation involves at Twilight Psychology, including high-masking presentations and the ADOS-2 diagnostic process.",
      ctaLabel: "Read the post",
      ctaHref: "/blog/clinical/adult-autism-testing-kentucky",
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
