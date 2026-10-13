'use client';

import React from 'react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { useSavedHomes } from './SavedHomesProvider';

interface MarketGridProps {
  properties: Property[];
}

export const MarketGrid: React.FC<MarketGridProps> = ({ properties }) => {
  const { savedIds, isSaved, toggleSave, view } = useSavedHomes();

  const visible = view === 'saved' ? properties.filter((p) => savedIds.includes(p.id)) : properties;

  if (visible.length === 0) {
    const isSavedView = view === 'saved';
    return (
      <div className="text-center py-12 bg-white/60 rounded-2xl border border-nordic-dark/5 p-8 max-w-md mx-auto shadow-soft">
        <span className="material-icons text-4xl text-nordic-muted mb-2">
          {isSavedView ? 'favorite_border' : 'search_off'}
        </span>
        <h3 className="text-lg font-medium text-nordic-dark">
          {isSavedView ? 'No saved homes here yet' : 'No properties found'}
        </h3>
        <p className="text-sm text-nordic-muted mt-1">
          {isSavedView
            ? 'Click the heart icon on any property on this page to save it to your collection.'
            : 'Try adjusting your search or filters to see more results.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {visible.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          isSaved={isSaved(property.id)}
          onToggleSave={toggleSave}
        />
      ))}
    </div>
  );
};
