export interface SocialProfile {
  label: string;
  href: string;
  icon: string;
}

export interface SiteConfig {
  gaId: string;
  siteName: string;
  blogName: string;
  siteUrl: string;
  socialProfiles: readonly SocialProfile[];
}

export const siteConfig = {
  gaId: "G-8BJH56S4J8",
  siteName: "Twilight Psychology",
  blogName: "Twilight Psychology Blog",
  siteUrl: "https://www.twilightpsychology.com",
  socialProfiles: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Twilight-Psychology-PLLC/61555270131003/",
      icon: "mdi:facebook",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/twilight_psychology_pllc/",
      icon: "mdi:instagram",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/twilight-psychology/?viewAsMember=true",
      icon: "mdi:linkedin",
    },
  ],
} as const satisfies SiteConfig;
