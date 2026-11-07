import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * EVENTS: one markdown file per event per language.
 *   src/content/events/nl/2026-12-20-midwinterspecial.md
 *   src/content/events/en/2026-12-20-midwinter-special.md
 * Both carry the same `key` so the language switch can link them.
 * The file name (without .md) becomes the URL slug.
 */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    key: z.string(),                       // shared between NL/EN versions
    lang: z.enum(['nl', 'en']),
    title: z.string(),
    type: z.enum(['groep', 'special', 'prive', 'workshop']).default('groep'),
    date: z.coerce.date(),                 // start date (Europe/Brussels)
    endDate: z.coerce.date().optional(),   // for multi-day events
    start: z.string().optional(),          // "14:00"
    end: z.string().optional(),            // "21:00"
    arrival: z.string().optional(),        // "13:30"
    location: z.string().default('Homecoming Land, Bredabaan 1251, 2930 Brasschaat'),
    price: z.string().optional(),          // "€ 120" or "op aanvraag"
    spots: z.number().optional(),          // max participants
    status: z.enum(['open', 'few', 'full', 'cancelled']).default('open'),
    summary: z.string(),                   // one or two sentences for cards
    image: z.string().optional(),          // /images/... (optional)
    draft: z.boolean().default(false),     // true = not rendered anywhere
  }),
});

/** POSTS: blog articles, same NL/EN pairing via `key`. */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    key: z.string(),
    lang: z.enum(['nl', 'en']),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { events, posts };
