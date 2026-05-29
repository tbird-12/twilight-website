// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";

import sitemap from "@astrojs/sitemap";

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
      // Exclude noindex pages so the sitemap doesn't contradict their robots meta tag
      filter: (page) => !page.includes("/welcome") && !page.includes("/404"),
    }),
    pagefind(),
  ],
  site: "https://www.twilightpsychology.com",
});
