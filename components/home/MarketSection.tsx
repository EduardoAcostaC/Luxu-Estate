'use client';

import React from 'react';
import Link from 'next/link';
import { Property, ListingFilter } from '@/types/property';
import { PAGE_SIZE, buildHomeHref, type HomeFilters } from '@/lib/home-params';
import { useTranslation } from '@/lib/i18n';
import { MarketGrid } from './MarketGrid';
import { Pagination } from './Pagination';

interface MarketSectionProps {
  filters: HomeFilters;
  properties: Property[];
  page: number;
  totalPages: number;
  total: number;
}

const LISTING_TABS: { key: 'all' | 'buy' | 'rent'; value: ListingFilter }[] = [
  { key: 'all', value: 'all' },
  { key: 'buy', value: 'sale' },
  { key: 'rent', value: 'rent' },
];

export const MarketSection: React.FC<MarketSectionProps> = ({
  filters,
  properties,
  page,
  totalPages,
  total,
}) => {
  const { t } = useTranslation();

  return (
    <section id="market" className="scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">{t('market.title')}</h2>
          <p className="text-nordic-muted mt-1 text-sm">{t('market.subtitle')}</p>
        </div>

        {/* Listing filter (server-driven via URL) */}
        <div className="flex bg-white p-1 rounded-lg border border-nordic-dark/5">
          {LISTING_TABS.map(({ key, value }) => {
            const isSelected = filters.listing === value;
            return (
              <Link
                key={value}
                href={buildHomeHref(filters, { listing: value }, '#market')}
                aria-current={isSelected ? 'true' : undefined}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-nordic-dark text-white shadow-sm'
                    : 'text-nordic-muted hover:text-nordic-dark'
                }`}
              >
                {t(`market.${key}`)}
              </Link>
            );
          })}
        </div>
      </div>

      <MarketGrid properties={properties} />

      <Pagination
        filters={filters}
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={PAGE_SIZE}
      />
    </section>
  );
};
