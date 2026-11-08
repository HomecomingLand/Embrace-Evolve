// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Set to the final domain once known (used for canonical URLs, sitemap, og:url).
  site: 'https://familieopstellingen.embraceevolve.com',
  trailingSlash: 'always',
  integrations: [
    // sitemap-index.xml + sitemap-0.xml. Thank-you pages and the 404 stay out (they are noindex).
    // hreflang pairs live in each page's <head>: NL and EN slugs differ, so the sitemap's i18n mode can't pair them.
    sitemap({
      filter: (page) => !/\/(bedankt|thank-you|404)\/?$/.test(new URL(page).pathname),
    }),
  ],
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
