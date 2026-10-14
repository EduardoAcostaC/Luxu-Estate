export const SUPPORTED_LOCALES = ['es', 'en', 'fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export const LOCALES_INFO: Record<Locale, LocaleInfo> = {
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
};

export function isSupportedLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale as Locale);
}
