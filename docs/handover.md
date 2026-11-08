# Handover — Familieopstellingen (site 1)

Written 7 November 2026 after the first build. Read `README.md` first for the day-to-day edits.

## What was built

- Astro 5 static site, Dutch at `/`, English at `/en/`, 26 pages.
- Pages: home, opstellingen (how it works), agenda + event detail, inschrijven (registration form),
  over ons (Jessica, Gert, Embrace Evolve), locatie & route (with OpenStreetMap embed and Google Maps link), blog + article,
  contact (form), privacy, bedankt (thank-you after a form).
- Content: the full copy from the Pages brief ("Familieopstellingen door Jessica Abicht"), the
  Midwinter special of 20 December 2026 as the first agenda item (details taken from Jessica's
  confirmation mail), and two blog articles built from her own preparation text.
- Look & feel modelled on tifawine.ma: Cormorant Garamond display, Jost (Futura stand-in) text,
  sand / off-white / black palette, small uppercase labels, thin rules under headings, straight
  edges, photo collage, full-bleed banners.

## Design tokens (theme.css)

| Token | Value | From Tifawine |
|---|---|---|
| paper | #f7f3ef | page background (#f3eeea / white) |
| sand | #b69984 | their main sand |
| sand-25 | #ede5e0 | sand at 25 %, soft bands |
| clay | #a26d57 | terracotta accent (buttons) |
| moss | #549183 | their small green-teal accent |
| ink | #141210 | text |
| display | Cormorant Garamond 500 | cormorant-garamond (Typekit) |
| body | Jost 400/500/600 | futura-pt (Typekit) |

## Photos: first placement (to be improved with Jessica)

All photos come from the shared Drive folder (Opstellingen, Gert en Jess, Jessica, Homecoming Land).
They were resized to max 2000 px and stripped of EXIF (incl. GPS). Originals are not in the repo.

| Slot | File | Source | Why |
|---|---|---|---|
| Home hero | hero-home.jpg | Lente:Zomer IMG_0779 | morning light through the trees: arrival, quiet |
| Collage | collage-open-plek / -schors / -waterlelie / -houtstapel / -vuur | IMG_2343, IMG_0839, IMG_1590, IMG_1139, IMG_2092 | textures of the place, like Tifawine's collage |
| Banner | banner-tuin-mist.jpg | IMG_2355 | the garden in mist, very Tifawine; cropped to 21:9 and the parasol tip painted out with Higgsfield (GPT Image 2), only that patch is generated |
| "In alle veiligheid" | jessica-sessie.jpg | Beeld IMG_9607 | Jessica at work, attentive |
| Groep card | groep-kring-bos.jpg | IMG_1925 | circle of chairs in the woods (homepage + Opstellingen page) |
| Privé card | prive-handen.jpg | Beeld IMG_9549 | two hands, intimate and anonymous |
| Location teaser + page | locatie-poort.jpg | Schermafbeelding (gate with 1251) | literally "how to get there" |
| Closing CTA | cta-avondrood.jpg | IMG_1112 | dusk above the pines |
| Midwinter event | event-midwinter-vuur.jpg | Abstract IMG_2097 | fire bowl with sparks |
| About portrait | jessica-portret.jpg | Jessica IMG_5472 | warmest smile in the set; a proper portrait would be better |
| About + The Story of my Life, Gert | gert-portret-bril.jpg | new portrait supplied 8 Nov 2026 | replaces the earlier winter selfie |
| About extra | jessica-bospad.jpg, jessica-gert.jpg | IMG_6297, Gert en Jess IMG_6263 | |
| Location extra | locatie-bos.jpg, locatie-tuin.jpg | IMG_6730, IMG_2437 | |
| Blog | blog-voorbereiden.jpg, blog-posities.jpg | IMG_0776, IMG_0781 | |

Not used: laptop/bed photos, sheepskin photos, "Jessica achter de kist aanlopen" (funeral procession),
most bark and fire duplicates, the `.mov`. The folder `herfst:Winter` was still empty when the photos
were fetched. Placeholder for missing images: `public/images/placeholder.svg`.

## Open points for Jessica / Giulia

1. Colours: Jessica's own colour wishes were never received; the palette is Tifawine's. Adjust in
   `theme.css` once known.
2. Midwinter price: the mail did not state it; `€ 120` is taken from her therapist profile
   ("specials € 120"). Confirm in `src/content/events/*/2026-12-20-*.md`.
3. About page: Dutch bios of Jessica, Gert and the Embrace Evolve text are used verbatim from the
   Pages document "Website About en EE"; the English is a translation to be read once by Jessica.
4. Location page: directions are generic (Bredabaan N1, De Lijn along the Bredabaan, parking on the
   grounds). Confirm bus stop, parking and bike facilities. Map marker is approximate: set exact
   coordinates in `site.config.ts` (`mapEmbed`).
5. Form delivery: choose a host. On Netlify nothing to do; elsewhere set `formEndpoint`.
6. Domain: set `site` in `astro.config.mjs`. The current placeholder is
   `familieopstellingen.embraceevolve.com`.
7. Privacy text: a short, honest draft; have it checked if needed.
8. Logo: there is none yet; the wordmark is typeset. Jessica's mail signature image could be a start.
9. Sibling sites: fill `siblings` in `site.config.ts` when sites 2 and 3 exist; they appear in the footer.
10. Testimonial permissions: Björg, Jan and Els are quoted with first name and age as in the brief.

## Adding a site (2 or 3)

1. `cp -r sites/familieopstellingen sites/<newname>` and change `name` in its `package.json`.
2. Replace `src/styles/theme.css` with the new brand (colours, fonts, radius, spacing). Install other
   `@fontsource/*` fonts if needed and import them in `src/layouts/Base.astro`.
3. Edit `src/site.config.ts` (name, contact, address, siblings) and `src/i18n/ui.ts` (nav labels and
   page routes).
4. Rewrite the `copy` objects in `src/views/*.astro`; delete views/pages the site does not need.
5. Replace `src/content/*` and `public/images/*`.
6. Add the folder to the host as a separate project (root directory = the site folder).

What stays shared and should not be edited per site: `packages/shared` (Nav, Footer, Hero,
SectionHeading, PageIntro, base.css, i18n.ts). If a site needs a variant, add a prop or a new
component there so all three benefit.

## Technical notes

- Astro `i18n` routing with `prefixDefaultLocale: false`. Every page has `hreflang` alternates and a
  canonical URL.
- Content collections use the glob loader; the file name is the slug; files starting with `_` are
  ignored (used for the event template).
- The agenda hides past events at build time and again in the browser, so a stale build never
  shows a past date as upcoming.
- Fonts are self-hosted via Fontsource (no Google Fonts requests, GDPR-friendly). No cookies, no
  analytics. The only third-party request is the OpenStreetMap iframe on the location page.

## SEO and bots (added 8 November 2026)

- `sitemap-index.xml` (via `@astrojs/sitemap`), `robots.txt` and `llms.txt` are generated at build time from
  `src/pages/robots.txt.ts` and `src/pages/llms.txt.ts`. robots.txt allows search engines and AI assistants
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, ...) and hides only the thank-you pages.
- Structured data (schema.org JSON-LD) lives in `src/lib/schema.ts`: business, place, website, Jessica and Gert
  on every page, plus BreadcrumbList, Course (The Story of my Life), Event (agenda items), BlogPosting and Service.
  When the Story of my Life dates change, update both the `prak` list and `weekendDates` in `StoryOfMyLife.astro`,
  and the summary in `llms.txt.ts`.
- Thank-you pages and the 404 are `noindex`. Detail pages without a translation get no hreflang to the other language.
- `public/_headers` sets long browser caching for `/_astro/*` and `/images/*`.
- Everything uses `site` in `astro.config.mjs` for absolute URLs: set it to the real domain.
