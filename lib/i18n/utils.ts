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
