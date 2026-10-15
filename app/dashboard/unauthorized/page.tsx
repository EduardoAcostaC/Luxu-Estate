'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useLanguage } from '@/lib/i18n';

export default function DashboardUnauthorizedPage() {
  const { user, userEmail, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft border border-nordic-dark/10 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 mx-auto flex items-center justify-center">
          <span className="material-icons text-3xl">lock</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-nordic-dark tracking-tight">
            {t('dashboard.unauthorizedTitle')}
          </h1>
          <p className="text-sm text-nordic-dark/60 mt-2 leading-relaxed">
            {t('dashboard.unauthorizedSubtitle')}
          </p>
        </div>

        {user && (
          <div className="p-3 rounded-lg bg-background-light border border-nordic-dark/10 text-xs text-nordic-dark/70">
            Sesión iniciada como: <span className="font-semibold text-nordic-dark">{userEmail}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 py-2.5 px-4 rounded-xl bg-mosque text-white text-sm font-semibold hover:bg-primary-dark transition-all text-center shadow-xs"
          >
            {t('dashboard.returnHome')}
          </Link>
          {user && (
            <button
              type="button"
              onClick={async () => {
                await signOut();
                window.location.href = '/login';
              }}
              className="py-2.5 px-4 rounded-xl border border-nordic-dark/20 text-nordic-dark text-sm font-medium hover:bg-black/5 transition-all text-center cursor-pointer"
            >
              {t('nav.signOut')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
