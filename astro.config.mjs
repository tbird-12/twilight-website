// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";

import sitemap from "@astrojs/sitemap";

const sitemapExcludedPaths = [
  "/welcome",
  "/404",
  "/client-resources/",
  "/specialities/",
  "/about/heather-cornett",
  "/about/nicola-allen",
  "/about/emeli-evans",
  "/about/mike-burns",
  "/about/stephen-shu",
  "/about/jonica-davis",
  "/about/jatana-boggs",
  "/about/tiffany-roundtree",
  "/about/samantha-rodarte",
  "/about/mission-vision-values",
  "/services/adhd-testing-ky",
  "/services/autism-testing-ky",
  "/services/autism-therapy-ky",
  "/services/diagnostic-interviews-ky",
  "/services/intellectual-disabilities-ky",
  "/services/notary-services",
];

export default defineConfig({
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
  integrations: [
    icon(),
    react(),
    sitemap({
      // Exclude noindex pages so the sitemap doesn't contradict their robots meta tag.
      filter: (page) => {
        const normalizedPage = page.toLowerCase();
        return !sitemapExcludedPaths.some((path) => normalizedPage.includes(path.toLowerCase()));
      },
    }),
    pagefind(),
  ],
  site: "https://www.twilightpsychology.com",
});
