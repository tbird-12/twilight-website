// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), sitemap(), partytown(
    {
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
  ],
  site: "https://www.twilightpsychology.com",
});