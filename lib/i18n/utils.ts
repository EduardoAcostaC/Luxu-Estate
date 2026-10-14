import es from '@/locales/es.json';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import { DEFAULT_LOCALE, type Locale } from '@/locales/config';
import type { TranslationDictionary, TranslationParams } from './types';

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  es,
  en,
  fr,
};

export function getNestedValue(dict: Record<string, unknown>, path: string): string | undefined {
  // Support direct key match (e.g., 'amenities.Swimming Pool' where key might have dots or spaces)
  const parts = path.split('.');
  let current: unknown = dict;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

export function interpolate(text: string, params?: TranslationParams): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return key in params ? String(params[key]) : match;
  });
}

export function translate(
  locale: Locale,
  key: string,
  params?: TranslationParams
): string {
  const dict = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
  let value = getNestedValue(dict as unknown as Record<string, unknown>, key);

  // If not found in current locale, try default locale (es) as fallback
  if (value === undefined && locale !== DEFAULT_LOCALE) {
    value = getNestedValue(DICTIONARIES[DEFAULT_LOCALE] as unknown as Record<string, unknown>, key);
  }

  if (value !== undefined) {
    return interpolate(value, params);
  }

  // Graceful fallback to key name
  return key;
}

/**
 * Translates property badges/tags such as "New Arrival", "Exclusive", etc.
 */
export function translateTag(
  tag: string | undefined,
  t: (key: string, params?: TranslationParams) => string
): string | undefined {
  if (!tag) return undefined;
  const normalized = tag.trim().toUpperCase();
  if (normalized === 'EXCLUSIVE') return t('tags.exclusive');
  if (normalized === 'NEW ARRIVAL') return t('tags.newArrival');
  if (normalized === 'NEW LISTING') return t('tags.newListing');
  if (normalized === 'NEW') return t('tags.new');
  if (normalized === 'POPULAR') return t('tags.popular');
  if (normalized === 'LUXURY') return t('tags.luxury');
  return tag;
}

/**
 * Translates recurring price periods, e.g. "/mo" -> "/mes" (es), "/mo" (en), "/mois" (fr).
 */
export function translatePricePeriod(
  period: string | undefined,
  t: (key: string, params?: TranslationParams) => string
): string | undefined {
  if (!period) return undefined;
  const clean = period.trim().toLowerCase();
  if (clean === '/mo' || clean === '/month' || clean === '/mes' || clean === '/mois') {
    return t('propertyDetail.perMonth');
  }
  return period;
}
