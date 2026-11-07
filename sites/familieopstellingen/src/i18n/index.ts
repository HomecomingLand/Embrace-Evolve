import { ui, routes, type RouteKey } from './ui';
import { i18n, type Locale } from '../site.config';
import { makeT, formatDate } from '@opstellingen/shared/i18n';

export { routes, formatDate };
export type { Locale, RouteKey };

export function t(locale: Locale) {
  const base = makeT(ui as unknown as Record<string, Record<string, string>>, locale, i18n);
  return (key: string, vars: Record<string, string | number> = {}) =>
    Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), base(key));
}

export function route(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'nl' ? 'en' : 'nl';
}

/** Build the language-switch links for the current page (optionally with per-language slugs for detail pages). */
export function localeLinks(locale: Locale, key: RouteKey, slugs?: Partial<Record<Locale, string>>) {
  return i18n.locales.map((code) => {
    let href: string = routes[key][code];
    if (slugs && slugs[code]) href = `${href}${slugs[code]}/`;
    return { code, label: code.toUpperCase(), href, current: code === locale };
  });
}
