'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/lib/i18n';
import type { PropertyMapProps } from './PropertyMap';

export type { PropertyMapProps };

const MapLoadingPlaceholder: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        className ||
        'relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center animate-pulse'
      }
    >
      <div className="flex flex-col items-center gap-2 text-nordic-muted">
        <span className="material-icons text-mosque text-3xl animate-bounce">location_on</span>
        <span className="text-xs font-medium">{t('map.loadingMap')}</span>
      </div>
    </div>
  );
};

const DynamicPropertyMap = dynamic(
  () => import('./PropertyMap').then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => <MapLoadingPlaceholder />,
  }
);

export const PropertyMapWrapper: React.FC<PropertyMapProps> = (props) => {
  return <DynamicPropertyMap {...props} />;
};
