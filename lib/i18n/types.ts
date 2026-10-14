import type esDictionary from '@/locales/es.json';
import type { Locale } from '@/locales/config';

export type TranslationDictionary = typeof esDictionary;

export type TranslationParams = Record<string, string | number>;

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
}
