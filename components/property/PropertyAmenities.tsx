'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface PropertyAmenitiesProps {
  amenities: string[];
}

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  const { t } = useTranslation();

  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-6 text-nordic-dark">{t('propertyDetail.amenitiesTitle')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-nordic-dark/80 text-sm sm:text-base">
            <span className="material-icons text-mosque text-base flex-shrink-0">
              check_circle
            </span>
            <span>{t(`amenities.${item}`) || item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
