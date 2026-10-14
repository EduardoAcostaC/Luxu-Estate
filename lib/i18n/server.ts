import { cookies } from 'next/headers';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isSupportedLocale,
  type Locale,
} from '@/locales/config';
import type { TranslationParams } from './types';
import { translate } from './utils';

/**
 * Retrieves the current locale from the user's incoming request cookies on the server.
 * Falls back to DEFAULT_LOCALE ('es') if missing or invalid.
 */
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
}

/**
 * Returns a server-side translation function `t()` initialized with the user's locale.
 */
export async function getServerTranslations(localeOverride?: Locale) {
  const locale = localeOverride ?? (await getServerLocale());
  return {
    locale,
    t: (key: string, params?: TranslationParams) => translate(locale, key, params),
  };
}
