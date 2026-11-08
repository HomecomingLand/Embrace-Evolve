import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../site.config';
import { routes } from '../i18n/ui';

/**
 * llms.txt (https://llmstxt.org): a plain Markdown overview for AI assistants
 * (ChatGPT, Claude, Perplexity, ...) so they can answer questions about the
 * offer correctly and link to the right page. Built from the same data as the site.
 */
export const GET: APIRoute = async ({ site: origin }) => {
  const url = (path: string) => new URL(path, origin).toString();
  const today = new Date(Date.now() - 86400000);
  const events = (await getCollection('events', (e) => !e.data.draft && e.data.lang === 'nl' && e.data.date >= today))
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const posts = (await getCollection('posts', (p) => !p.data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const addr = `${site.address.venue}, ${site.address.street}, ${site.address.postal} ${site.address.city}, ${site.address.countryEn}`;
  const page = (key: keyof typeof routes, nl: string, en: string) =>
    `- [${nl}](${url(routes[key].nl)}) · English: [${en}](${url(routes[key].en)})`;

  const body = `# ${site.name} · ${site.person}

> Family constellations (familieopstellingen) in groups and private sessions with Jessica Abicht, and the writing course "The Story of my Life" with Gert Embrechts, at ${addr} (about 15 minutes from Antwerp). Part of ${site.umbrella}. The site is in Dutch (default) and English.

## Offer

- **Group constellation days**: 12 to 20 participants; you can take part as questioner, representative or observer. Constellations are set up "blind". Specials include drinks, snacks and a home-cooked organic meal.
- **Private constellations**: one-to-one sessions, scheduled on request; price according to means.
- **The Story of my Life** (writing course, formerly "Meesterlijk Schrijven"): turn your life story, family history or personal experiences into a compelling book, memoir or screenplay. Combines storytelling craft (film and narrative writing) with systemic work on family patterns. 5 weekends over 9 months (24–25 April 2027, 26–27 June 2027, 11–12 September 2027, 30–31 October 2027, 15–16 January 2028; dates subject to change), max. 12 participants, 70 hours of live teaching, 4 written feedback rounds and 4 individual online feedback sessions, meals included, € 2,450 (payment in instalments possible). Led by Gert Embrechts; Jessica Abicht co-leads weekend 2 (family, system and dynamics). Taught in Dutch.

## People

- **Jessica Abicht**: systemic coach and holistic therapist with more than 30 years of experience; leads the family constellations.
- **Gert Embrechts**: coach, storyteller and creative facilitator; worked more than 30 years in film as screenwriter, director and creative producer and taught at film schools; leads The Story of my Life.

## Pages

${page('home', 'Home', 'Home')}
${page('opstellingen', 'Opstellingen in groep en privé', 'Group and private constellations')}
${page('story', 'The Story of my Life (schrijfopleiding)', 'The Story of my Life (writing course)')}
${page('agenda', 'Agenda', 'Dates')}
${page('inschrijven', 'Inschrijven', 'Register')}
${page('over', 'Over ons', 'About')}
${page('locatie', 'Locatie & route', 'Location & directions')}
${page('blog', 'Blog', 'Blog')}
${page('contact', 'Contact', 'Contact')}

## Upcoming dates

${events.length ? events.map((e) => `- ${e.data.date.toISOString().slice(0, 10)}: [${e.data.title}](${url(`${routes.agenda.nl}${e.id.split('/').pop()}/`)})${e.data.price ? ` · ${e.data.price}` : ''} · ${e.data.summary}`).join('\n') : '- No constellation days scheduled right now; see the agenda page.'}
- From 24 April 2027: [The Story of my Life](${url(routes.story.nl)}) · € 2,450 · 5 weekends

## Articles

${posts.map((p) => `- [${p.data.title}](${url(`${routes.blog[p.data.lang]}${p.id.split('/').pop()}/`)}) (${p.data.lang.toUpperCase()}): ${p.data.description}`).join('\n')}

## Contact

- Email: ${site.email}
- Phone: ${site.phone}
- Address: ${addr}
- Directions: ${site.mapsUrl}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
