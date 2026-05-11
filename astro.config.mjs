// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";
import react from "@astrojs/react";
import pagefind from "astro-pagefind";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
  integrations: [icon(), react(), sitemap(), pagefind()],
  site: "https://www.twilightpsychology.com",
});
