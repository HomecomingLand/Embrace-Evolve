/**
 * Site-specific configuration for website 1: Familieopstellingen door Jessica Abicht.
 * Everything a sibling site (site 2 / site 3) would change lives here or in
 * src/styles/theme.css and src/i18n/*.ts. Shared code never hard-codes these.
 */
export const i18n = {
  locales: ['nl', 'en'] as const,
  defaultLocale: 'nl' as const,
};
export type Locale = (typeof i18n.locales)[number];

export const site = {
  /** Short brand name used in the nav wordmark and <title>. */
  name: 'Familieopstellingen',
  /** The person behind the site. */
  person: 'Jessica Abicht',
  /** Umbrella brand all three sites belong to. */
  umbrella: 'Embrace Evolve',
  email: 'jessica@embraceevolve.com',
  phone: '+32 496 25 48 46',
  phoneHref: 'tel:+32496254846',
  address: {
    venue: 'Homecoming Land',
    street: 'Bredabaan 1251',
    postal: '2930',
    city: 'Brasschaat',
    country: 'België',
    countryEn: 'Belgium',
  },
  /** Google Maps link for the address (opens in a new tab, no cookies on our side). */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bredabaan+1251%2C+2930+Brasschaat',
  /** OpenStreetMap embed (cookie-free). Coordinates are approximate for the Bredabaan in Brasschaat. */
  mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=4.47%2C51.325%2C4.53%2C51.355&layer=mapnik&marker=51.340%2C4.500',
  vat: 'BE 0469.998.256',
  /**
   * Where the registration/contact forms post to.
   * Leave empty to use Netlify Forms (works automatically when deployed on Netlify).
   * Or paste a Formspree / Basin / Web3Forms endpoint, e.g. "https://formspree.io/f/abcdwxyz".
   */
  formEndpoint: '',
  /**
   * Mollie payment links (Mollie dashboard → Payment links). iDEAL, Bancontact and cards.
   * Leave a value empty to hide its "pay online" button.
   */
  payments: {
    story: 'https://payment-links.mollie.com/payment/XjCKeRtnZqDpmb6zZFKyT', // The Story of my Life
  },
  /** Sibling sites (filled in when they exist). Shown in the footer as "Ook van Embrace Evolve". */
  siblings: [
    // { name: 'Embrace Evolve', url: 'https://www.embraceevolve.com', nl: 'Holistische therapie & coaching', en: 'Holistic therapy & coaching' },
    // { name: 'Homecoming Land', url: 'https://www.homecomingland.be', nl: 'De plek in Brasschaat', en: 'The place in Brasschaat' },
  ] as { name: string; url: string; nl: string; en: string }[],
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
};
