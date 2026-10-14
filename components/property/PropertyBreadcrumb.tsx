'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

interface PropertyBreadcrumbProps {
  title: string;
}

export const PropertyBreadcrumb: React.FC<PropertyBreadcrumbProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-nordic-muted flex items-center gap-2">
      <Link href="/" className="hover:text-mosque transition-colors flex items-center gap-1">
        <span className="material-icons text-sm">home</span>
        {t('propertyDetail.breadcrumbHome')}
      </Link>
      <span className="text-slate-300">/</span>
      <Link href="/" className="hover:text-mosque transition-colors">
        {t('propertyDetail.breadcrumbProperties')}
      </Link>
      <span className="text-slate-300">/</span>
      <span className="text-nordic-dark font-medium truncate max-w-xs sm:max-w-md">
        {title}
      </span>
    </nav>
  );
};
