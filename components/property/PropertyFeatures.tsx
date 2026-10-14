'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface PropertyFeaturesProps {
  area: string;
  beds: number;
  baths: number;
  garage: number;
}

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({
  area,
  beds,
  baths,
  garage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-6 text-nordic-dark">{t('propertyDetail.featuresTitle')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Square Meters */}
        <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10 transition-colors hover:bg-mosque/10">
          <span className="material-icons text-mosque text-2xl mb-2">square_foot</span>
          <span className="text-xl font-bold text-nordic-dark">{area}</span>
          <span className="text-xs uppercase tracking-wider text-nordic-muted">{t('propertyDetail.livingArea')}</span>
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10 transition-colors hover:bg-mosque/10">
          <span className="material-icons text-mosque text-2xl mb-2">king_bed</span>
          <span className="text-xl font-bold text-nordic-dark">{beds}</span>
          <span className="text-xs uppercase tracking-wider text-nordic-muted">{t('propertyDetail.bedrooms')}</span>
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10 transition-colors hover:bg-mosque/10">
          <span className="material-icons text-mosque text-2xl mb-2">shower</span>
          <span className="text-xl font-bold text-nordic-dark">{baths}</span>
          <span className="text-xs uppercase tracking-wider text-nordic-muted">{t('propertyDetail.bathrooms')}</span>
        </div>

        {/* Garage */}
        <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10 transition-colors hover:bg-mosque/10">
          <span className="material-icons text-mosque text-2xl mb-2">directions_car</span>
          <span className="text-xl font-bold text-nordic-dark">{garage}</span>
          <span className="text-xs uppercase tracking-wider text-nordic-muted">{t('propertyDetail.garage')}</span>
        </div>
      </div>
    </div>
  );
};
