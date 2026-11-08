/**
 * Structured data (schema.org JSON-LD) for search engines and AI crawlers.
 * Base.astro always emits the business + website; pages add their own nodes
 * (Course, Event, BlogPosting, Person, BreadcrumbList) via the `jsonLd` prop.
 * Nodes reference each other by @id so the whole site forms one graph.
 */
import { site } from '../site.config';
import type { Locale } from '../i18n';

type Node = Record<string, unknown>;

export const ids = (origin: URL | undefined) => {
  const base = (origin ?? new URL('https://example.com')).origin;
  return {
    base,
    business: `${base}/#business`,
    website: `${base}/#website`,
    jessica: `${base}/#jessica`,
    gert: `${base}/#gert`,
    place: `${base}/#homecoming-land`,
  };
};

export const abs = (path: string, origin: URL | undefined) => new URL(path, origin).toString();

/** Coordinates of Homecoming Land, parsed from the map embed in site.config.ts. */
function geo() {
  const m = site.mapEmbed.match(/marker=([\d.]+)%2C([\d.]+)/);
  return m ? { '@type': 'GeoCoordinates', latitude: Number(m[1]), longitude: Number(m[2]) } : undefined;
}

export function postalAddress(_locale?: Locale): Node {
  return {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postal,
    addressLocality: site.address.city,
    addressRegion: 'Antwerpen',
    addressCountry: 'BE',
  };
}

/** Site-wide nodes: the place, the business, the website, and both facilitators. */
export function baseGraph(locale: Locale, origin: URL | undefined): Node[] {
  const i = ids(origin);
  const sameAs = Object.values(site.social).filter(Boolean);
  return [
    {
      '@type': 'Place',
      '@id': i.place,
      name: site.address.venue,
      address: postalAddress(locale),
      geo: geo(),
      hasMap: site.mapsUrl,
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': i.business,
      name: `${site.name} · ${site.person}`,
      alternateName: site.umbrella,
      description:
        locale === 'nl'
          ? 'Familieopstellingen in groep en privé, en de schrijfopleiding The Story of my Life, op Homecoming Land in Brasschaat, tussen Antwerpen en Breda, vlak bij de Nederlandse grens.'
          : 'Family constellations in groups and private sessions, and the writing course The Story of my Life, at Homecoming Land in Brasschaat, between Antwerp and Breda, close to the Dutch border.',
      url: `${i.base}/`,
      email: site.email,
      telephone: site.phone,
      image: abs('/images/og-default.jpg', origin),
      logo: abs('/favicon.svg', origin),
      address: postalAddress(locale),
      geo: geo(),
      location: { '@id': i.place },
      areaServed: [
        { '@type': 'Country', name: 'België' },
        { '@type': 'Country', name: 'Nederland' },
        { '@type': 'City', name: 'Antwerpen' },
        { '@type': 'City', name: 'Breda' },
        { '@type': 'AdministrativeArea', name: 'Noord-Brabant' },
      ],
      knowsLanguage: ['nl', 'en'],
      vatID: site.vat,
      founder: [{ '@id': i.jessica }, { '@id': i.gert }],
      employee: [{ '@id': i.jessica }, { '@id': i.gert }],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': i.website,
      url: `${i.base}/`,
      name: site.name,
      inLanguage: ['nl', 'en'],
      publisher: { '@id': i.business },
    },
    {
      '@type': 'Person',
      '@id': i.jessica,
      name: 'Jessica Abicht',
      jobTitle: locale === 'nl' ? 'Systemisch coach en holistisch therapeut' : 'Systemic coach and holistic therapist',
      knowsAbout: ['Familieopstellingen', 'Family constellations', 'Systemisch werk', 'Systemic coaching', 'Holistische therapie'],
      image: abs('/images/jessica-portret.jpg', origin),
      email: site.email,
      worksFor: { '@id': i.business },
    },
    {
      '@type': 'Person',
      '@id': i.gert,
      name: 'Gert Embrechts',
      jobTitle: locale === 'nl' ? 'Coach, storyteller en creatief begeleider' : 'Coach, storyteller and creative facilitator',
      knowsAbout: ['Storytelling', 'Scenario', 'Screenwriting', 'Film', 'Coaching'],
      image: abs('/images/gert-portret-bril.jpg', origin),
      worksFor: { '@id': i.business },
    },
  ];
}

/** Breadcrumb trail: [{ name, path }, ...] from home to the current page. */
export function breadcrumbs(items: { name: string; path: string }[], origin: URL | undefined): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((x, n) => ({ '@type': 'ListItem', position: n + 1, name: x.name, item: abs(x.path, origin) })),
  };
}

/** "2026-12-20" + "14:00" -> "2026-12-20T14:00:00+01:00" (Brussels; winter/summer time). */
export function brusselsDateTime(date: Date, time?: string): string {
  const day = date.toISOString().slice(0, 10);
  if (!time) return day;
  const month = Number(day.slice(5, 7));
  const offset = month >= 4 && month <= 10 ? '+02:00' : '+01:00'; // close enough for CET/CEST
  return `${day}T${time}:00${offset}`;
}

/** "€ 120" / "€ 2.450" / "€ 2,450" -> "120" / "2450" (whole euros; undefined for "op aanvraag"). */
export function priceNumber(price?: string): string | undefined {
  if (!price) return undefined;
  const digits = price.replace(/\D/g, '');
  return digits || undefined;
}
