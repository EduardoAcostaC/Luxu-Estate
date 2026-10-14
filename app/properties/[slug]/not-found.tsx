'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useTranslation } from '@/lib/i18n';

export default function PropertyNotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background-light text-nordic-dark flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-24 text-center flex-grow flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-mosque/10 text-mosque rounded-full flex items-center justify-center mb-6">
          <span className="material-icons text-4xl">home_work</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-nordic-dark mb-3">
          {t('notFound.title')}
        </h1>

        <p className="text-nordic-muted max-w-md mx-auto mb-8 text-base">
          {t('notFound.description')}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-mosque hover:bg-[#005544] text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all cursor-pointer"
        >
          <span className="material-icons text-base">arrow_back</span>
          {t('notFound.backHome')}
        </Link>
      </main>
    </div>
  );
}
