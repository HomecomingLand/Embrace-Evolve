// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Set to the final domain once known (used for canonical URLs, sitemap, og:url).
  site: 'https://familieopstellingen.embraceevolve.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false, // Dutch lives at "/", English at "/en/"
      redirectToDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
