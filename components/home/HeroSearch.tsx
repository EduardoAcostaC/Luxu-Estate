'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Form from 'next/form';
import {
  CATEGORIES,
  buildHomeHref,
  countActiveModalFilters,
  type HomeFilters,
} from '@/lib/home-params';
import { useTranslation } from '@/lib/i18n';
import { FiltersToggleButton } from './FiltersToggleButton';
import { FiltersModal } from './FiltersModal';

interface HeroSearchProps {
  filters: HomeFilters;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ filters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const activeModalCount = countActiveModalFilters(filters);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          {t('hero.titleStart')}{' '}
          <span className="relative inline-block">
            <span className="relative z-10 font-medium">{t('hero.titleSanctuary')}</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>
          .
        </h1>

        {/* Search Bar Form (server-driven: submits ?q= and preserves active filters) */}
        <Form action="/" className="relative group max-w-2xl mx-auto">
          {filters.category !== 'All' && (
            <input type="hidden" name="category" value={filters.category} />
          )}
          {filters.listing !== 'all' && (
            <input type="hidden" name="listing" value={filters.listing} />
          )}
          {filters.location && (
            <input type="hidden" name="location" value={filters.location} />
          )}
          {filters.minPrice !== undefined && filters.minPrice > 0 && (
            <input type="hidden" name="minPrice" value={filters.minPrice} />
          )}
          {filters.maxPrice !== undefined && filters.maxPrice > 0 && (
            <input type="hidden" name="maxPrice" value={filters.maxPrice} />
          )}
          {filters.beds !== undefined && filters.beds > 0 && (
            <input type="hidden" name="beds" value={filters.beds} />
          )}
          {filters.baths !== undefined && filters.baths > 0 && (
            <input type="hidden" name="baths" value={filters.baths} />
          )}
          {filters.amenities && filters.amenities.length > 0 && (
            <input type="hidden" name="amenities" value={filters.amenities.join(',')} />
          )}

          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">
              search
            </span>
          </div>
          <input
            type="text"
            name="q"
            defaultValue={filters.q}
            maxLength={80}
            className="block w-full pl-12 pr-28 sm:pr-32 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg outline-none"
            placeholder={t('hero.searchPlaceholder')}
          />
          <button
            type="submit"
            className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20 cursor-pointer"
          >
            {t('hero.searchButton')}
          </button>
        </Form>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <Link
                key={cat}
                href={buildHomeHref(filters, { category: cat })}
                aria-current={isSelected ? 'true' : undefined}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5'
                    : 'bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5'
                }`}
              >
                {t(`categories.${cat}`)}
              </Link>
            );
          })}

          <div className="w-px h-6 bg-nordic-dark/10 mx-2 flex-shrink-0"></div>

          <FiltersToggleButton
            onClick={() => setIsModalOpen(true)}
            activeCount={activeModalCount}
          />
        </div>
      </div>

      {/* Advanced Filters Modal */}
      <FiltersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentFilters={filters}
      />
    </section>
  );
};

