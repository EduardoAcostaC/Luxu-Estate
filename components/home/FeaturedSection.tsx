'use client';

import React from 'react';
import { Property } from '@/types/property';
import { FeaturedPropertyCard } from './FeaturedPropertyCard';
import { useSavedHomes } from './SavedHomesProvider';

interface FeaturedSectionProps {
  properties: Property[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ properties }) => {
  const { savedIds, isSaved, toggleSave, view } = useSavedHomes();

  const visible = view === 'saved' ? properties.filter((p) => savedIds.includes(p.id)) : properties;

  if (visible.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            Featured Collections
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Curated properties for the discerning eye.
          </p>
        </div>
        <a
          href="#market"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
        >
          View all <span className="material-icons text-sm">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {visible.map((property) => (
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
