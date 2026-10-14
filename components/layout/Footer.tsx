'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-nordic-dark flex items-center justify-center text-white shadow-sm">
            <span className="material-icons text-white text-sm">apartment</span>
          </div>
          <span className="font-semibold text-sm text-nordic-dark tracking-tight">
            LuxeEstate
          </span>
          <span className="text-xs text-nordic-muted ml-3">
            {t('footer.rights')}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-nordic-muted">
          <Link href="/" className="hover:text-mosque transition-colors">
            {t('footer.privacy')}
          </Link>
          <Link href="/" className="hover:text-mosque transition-colors">
            {t('footer.terms')}
          </Link>
          <Link href="/" className="hover:text-mosque transition-colors">
            {t('footer.sitemap')}
          </Link>
        </div>
      </div>
    </footer>
  );
};
