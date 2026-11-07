/**
 * Tiny i18n helper shared by all sites.
 *
 * Each site defines its own `locales`, `defaultLocale` and a `dictionary`
 * object ({ nl: {...}, en: {...} }). The helpers below only know how to pick
 * the right string and build the matching URL for the other language.
 */
export type Locale = string;

export interface I18nConfig<L extends Locale = Locale> {
  locales: readonly L[];
  defaultLocale: L;
}

/** Strip the locale prefix from a path, e.g. "/en/agenda/" -> "/agenda/". */
export function stripLocale(pathname: string, cfg: I18nConfig): string {
  for (const l of cfg.locales) {
    if (l === cfg.defaultLocale) continue;
    if (pathname === `/${l}` || pathname === `/${l}/`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/** Detect the locale of a path. The default locale has no prefix. */
export function localeFromPath(pathname: string, cfg: I18nConfig): Locale {
  for (const l of cfg.locales) {
    if (l === cfg.defaultLocale) continue;
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
  }
  return cfg.defaultLocale;
}

/** Build a localised path: href('/agenda/', 'en') -> '/en/agenda/'. */
export function localizePath(path: string, locale: Locale, cfg: I18nConfig): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === cfg.defaultLocale) return clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

/** Create a translate function bound to one locale. Falls back to the default locale, then to the key. */
export function makeT<D extends Record<string, Record<string, string>>>(dictionary: D, locale: Locale, cfg: I18nConfig) {
  return (key: string): string => {
    return dictionary[locale]?.[key] ?? dictionary[cfg.defaultLocale]?.[key] ?? key;
  };
}

/** Format a date for a locale, e.g. "zondag 20 december 2026". */
export function formatDate(date: Date | string, locale: Locale, opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const tag = locale === 'nl' ? 'nl-BE' : locale === 'en' ? 'en-GB' : locale;
  return new Intl.DateTimeFormat(tag, { timeZone: 'Europe/Brussels', ...opts }).format(d);
}
