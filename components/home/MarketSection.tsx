'use client';

import React, { useState } from 'react';
import { Property, ListingTypeFilter } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface MarketSectionProps {
  properties: Property[];
  savedPropertyIds?: string[];
  onToggleSave?: (id: string) => void;
}

export const MarketSection: React.FC<MarketSectionProps> = ({
  properties,
  savedPropertyIds = [],
  onToggleSave,
}) => {
  const [activeFilter, setActiveFilter] = useState<ListingTypeFilter>('All');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filters: ListingTypeFilter[] = ['All', 'Buy', 'Rent'];

  // Filter properties based on Buy/Rent tab
  const filteredProperties = properties.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Buy') return item.listingType === 'sale';
    if (activeFilter === 'Rent') return item.listingType === 'rent';
    return true;
  });

  const displayedProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section id="market">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            New in Market
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Fresh opportunities added this week.
          </p>
        </div>

        {/* Filter Toggle Pill (Desktop & Mobile) */}
        <div className="flex bg-white p-1 rounded-lg border border-nordic-dark/5">
          {filters.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6);
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-nordic-dark text-white shadow-sm'
                    : 'text-nordic-muted hover:text-nordic-dark'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProperties.map((property, idx) => {
          // Keep responsive display behavior matching code.html for initial 6 items if requested
          let responsiveClass = '';
          if (idx === 4) {
            responsiveClass = 'hidden xl:flex';
          } else if (idx === 5) {
            responsiveClass = 'hidden lg:flex';
          }

          // If more were loaded, show them
          if (idx >= 6) {
            responsiveClass = 'flex';
          }

          return (
            <PropertyCard
              key={property.id}
              property={property}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              className={responsiveClass}
            />
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="px-8 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md cursor-pointer"
          >
            Load more properties
          </button>
        </div>
      )}
    </section>
  );
};
