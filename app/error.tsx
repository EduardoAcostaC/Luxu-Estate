'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background-light text-nordic-dark flex items-center justify-center px-4">
      <div className="text-center bg-white/60 rounded-2xl border border-nordic-dark/5 p-10 max-w-md shadow-soft animate-fade-in">
        <span className="material-icons text-4xl text-nordic-muted mb-2">error_outline</span>
        <h1 className="text-xl font-medium text-nordic-dark">{t('error.title')}</h1>
        <p className="text-sm text-nordic-muted mt-1">
          {t('error.description')}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 px-6 py-2.5 bg-mosque hover:bg-[#005544] text-white font-medium rounded-lg transition-colors shadow-lg shadow-mosque/20 cursor-pointer active:scale-95"
        >
          {t('error.retry')}
        </button>
      </div>
    </div>
  );
}
