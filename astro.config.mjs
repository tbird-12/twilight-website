// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import preact from "@astrojs/preact";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [preact(), icon(), sitemap()],
  site: "https://www.twilightpsychology.com",
});