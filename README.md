# Website Opstellingen — Embrace Evolve websites

One repository, three websites that link to each other, each with its own branding and story,
built on the same base so a new site is a copy of a folder plus a new theme and content.

| Site | Folder | Status |
|------|--------|--------|
| 1. Familieopstellingen door Jessica Abicht | `sites/familieopstellingen` | first version built |
| 2. (Embrace Evolve — to be defined) | `sites/<name>` | not started |
| 3. (Homecoming Land — to be defined) | `sites/<name>` | not started |

Shared code lives in `packages/shared` (layout components, i18n helper, base CSS).
It never contains brand colours, fonts or copy: those live in each site.

## Run it

```bash
npm install
npm run dev          # site 1 on http://localhost:4321
npm run build        # builds every site into sites/*/dist
```

Node 20 or newer (see `.nvmrc`). No database, no CMS: content is Markdown files in the repo.

## Where things live (site 1)

```
sites/familieopstellingen/
  astro.config.mjs        domain, i18n (nl default at "/", en at "/en/")
  src/site.config.ts      name, email, phone, address, form endpoint, sibling sites
  src/styles/theme.css    THE look: colours, fonts, spacing (Tifawine-inspired)
  src/i18n/ui.ts          UI strings nl/en + the URL of every page per language
  src/views/*.astro       one file per page type; page copy nl/en lives at the top of each
  src/pages/              thin wrappers that pick a locale (and /en/ copies)
  src/content/events/     agenda items (nl/ and en/, paired by `key`)
  src/content/posts/      blog articles (nl/ and en/, paired by `key`)
  public/images/          photos (web-sized, EXIF stripped)
```

## Everyday edits

**Add a date to the agenda** — copy `src/content/events/nl/_voorbeeld-nieuwe-datum.md`,
rename it `YYYY-MM-DD-naam.md`, set `draft: false`, fill in the fields, and make the English twin
in `events/en/` with the same `key`. Files starting with `_` are ignored.

**Write a blog post** — same idea in `src/content/posts/nl/` and `posts/en/`.

**Change copy on a page** — open the matching file in `src/views/` and edit the `copy` object
(`nl` and `en` blocks).

**Change a colour or font** — `src/styles/theme.css`.

**Forms** — the registration and contact forms post to Netlify Forms automatically when the site is
hosted on Netlify. On any other host, paste a Formspree/Basin/Web3Forms endpoint into
`formEndpoint` in `src/site.config.ts`.

## Deploy

Static output, any host works. Per site, point the host at the site folder:

- **Netlify**: base directory `sites/familieopstellingen`, build `npm run build`, publish `dist`.
  Forms work out of the box.
- **Vercel**: root directory `sites/familieopstellingen`, framework Astro.
- **Cloudflare Pages**: root `sites/familieopstellingen`, build `npm run build`, output `dist`.

Set `site` in `astro.config.mjs` to the real domain before the first production deploy
(canonical URLs, hreflang and social images depend on it).

## Starting site 2 or 3

See `docs/handover.md`, section "Adding a site". Short version: copy `sites/familieopstellingen`,
rename, replace `theme.css`, `site.config.ts`, the copy in `views/`, the content folders and the
photos. The shared package stays untouched.
