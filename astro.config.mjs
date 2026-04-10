// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";
import preact from "@astrojs/preact";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
  integrations: [icon(), preact(), sitemap()],
  site: "https://www.twilightpsychology.com",
});