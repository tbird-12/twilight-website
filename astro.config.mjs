// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";

import sitemap from "@astrojs/sitemap";

// Paths matched as exact page segments (appended with "/" for trailing-slash safety).
// Using endsWith prevents a short slug like "/welcome" from matching
// "/blog/announcements/welcome-to-the-blog/".
const sitemapExcludedPaths = [
  "/welcome/",
  "/404/",
  "/client-resources/",
  "/specialities/",
  "/about/heather-cornett/",
  "/about/nicola-allen/",
  "/about/emeli-evans/",
  "/about/mike-burns/",
  "/about/stephen-shu/",
  "/about/jonica-davis/",
  "/about/jatana-boggs/",
  "/about/tiffany-roundtree/",
  "/about/samantha-rodarte/",
  "/about/mission-vision-values/",
  "/services/adhd-testing-ky/",
  "/services/autism-testing-ky/",
  "/services/autism-therapy-ky/",
  "/services/diagnostic-interviews-ky/",
  "/services/intellectual-disabilities-ky/",
  "/services/notary-services/",
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
      // Paths are matched with endsWith (after lowercasing) so a short slug like
      // "/welcome/" never accidentally excludes "/blog/.../welcome-to-the-blog/".
      filter: (page) => {
        const normalizedPage = page.toLowerCase().replace(/\/$/, "") + "/";
        return !sitemapExcludedPaths.some((path) =>
          normalizedPage.endsWith(path.toLowerCase())
        );
      },
    }),
    pagefind(),
  ],
  site: "https://www.twilightpsychology.com",
});
