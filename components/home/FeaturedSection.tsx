'use client';

import React from 'react';
import { Property } from '@/types/property';
import { useTranslation } from '@/lib/i18n';
import { FeaturedPropertyCard } from './FeaturedPropertyCard';
import { useSavedHomes } from './SavedHomesProvider';

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ properties }) => {
  const { savedIds, isSaved, toggleSave, view } = useSavedHomes();
  const { t } = useTranslation();

  const visible = view === 'saved' ? properties.filter((p) => savedIds.includes(p.id)) : properties;
  const displayProperties = visible.slice(0, 2);

  if (displayProperties.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            {t('featured.title')}
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            {t('featured.subtitle')}
          </p>
        </div>
        <a
          href="#market"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
        >
          {t('featured.viewAll')} <span className="material-icons text-sm">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayProperties.map((property) => (
          <FeaturedPropertyCard
            key={property.id}
            property={property}
            isSaved={isSaved(property.id)}
            onToggleSave={toggleSave}
          />
        ))}
      </div>
    </section>
  );
};
