'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, LOCALES_INFO, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'mobile';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentInfo = LOCALES_INFO[locale] || LOCALES_INFO.es;

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  // Mobile segmented control
  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 py-2 ${className}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-nordic-muted px-1 flex items-center gap-1.5">
          <span className="material-icons text-sm text-mosque">language</span>
          <span>{t('nav.language')}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-nordic-dark/5 rounded-xl border border-nordic-dark/5">
          {SUPPORTED_LOCALES.map((code) => {
            const info = LOCALES_INFO[code];
            const isSelected = locale === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-nordic-dark shadow-sm font-semibold'
                    : 'text-nordic-muted hover:text-nordic-dark'
                }`}
                aria-pressed={isSelected}
              >
                <span>{info.flag}</span>
                <span>{info.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop dropdown
  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        id="language-selector-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t('nav.language')}: ${currentInfo.nativeName}`}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-nordic-dark/10 hover:border-mosque/40 bg-white/70 hover:bg-white text-nordic-dark text-xs font-medium transition-all shadow-2xs hover:shadow-sm select-none cursor-pointer group"
      >
        <span className="text-sm leading-none" role="img" aria-hidden="true">
          {currentInfo.flag}
        </span>
        <span className="font-semibold uppercase tracking-wide text-nordic-dark/85 group-hover:text-mosque transition-colors">
          {currentInfo.code}
        </span>
        <span
          className={`material-icons text-base text-nordic-muted/80 group-hover:text-mosque transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-labelledby="language-selector-button"
          className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-soft border border-nordic-dark/10 py-1.5 z-50 animate-fade-in focus:outline-none"
        >
          <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-nordic-muted border-b border-nordic-dark/5 mb-1">
            {t('nav.language')}
          </div>
          {SUPPORTED_LOCALES.map((code) => {
            const info = LOCALES_INFO[code];
            const isSelected = locale === code;
            return (
              <button
                key={code}
                role="option"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-mosque/10 text-mosque font-semibold'
                    : 'text-nordic-dark/80 hover:bg-black/5 hover:text-nordic-dark'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-hidden="true">
                    {info.flag}
                  </span>
                  <span>{info.nativeName}</span>
                </div>
                {isSelected && (
                  <span className="material-icons text-sm text-mosque">check</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
