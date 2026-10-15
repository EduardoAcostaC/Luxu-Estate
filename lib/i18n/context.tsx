'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isSupportedLocale,
  type Locale,
} from '@/locales/config';
import type { I18nContextType, TranslationParams } from './types';
import { translate } from './utils';

const LanguageContext = createContext<I18nContextType | null>(null);

export interface LanguageProviderProps {
  initialLocale?: Locale;
  children: React.ReactNode;
}

function getCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`));
  const val = match ? decodeURIComponent(match[1]) : null;
  return isSupportedLocale(val) ? val : null;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  initialLocale = DEFAULT_LOCALE,
  children,
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  // Read saved cookie on client mount
  useEffect(() => {
    const saved = getCookieLocale();
    if (saved && saved !== locale) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, [locale]);

  // Keep <html lang="..."> in sync with the current locale
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (!isSupportedLocale(newLocale) || newLocale === locale) return;

      setLocaleState(newLocale);

      // Save cookie (1 year duration, site-wide, Lax)
      if (typeof document !== 'undefined') {
        const oneYear = 60 * 60 * 24 * 365;
        document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=${oneYear}; SameSite=Lax`;
        document.documentElement.lang = newLocale;
      }

      // Revalidate / refresh Server Components
      router.refresh();
    },
    [locale, router]
  );

  const t = useCallback(
    (key: string, params?: TranslationParams): string => {
      return translate(locale, key, params);
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useTranslation(): I18nContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a <LanguageProvider>');
  }
  return context;
}

export const useLanguage = useTranslation;
