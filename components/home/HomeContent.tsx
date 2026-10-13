import React from 'react';
import { redirect } from 'next/navigation';
import { HeroSearch } from './HeroSearch';
import { FeaturedSection } from './FeaturedSection';
import { MarketSection } from './MarketSection';
import { getFeaturedProperties, getMarketProperties } from '@/lib/properties';
import { buildHomeHref, parseHomeParams, type HomeSearchParams } from '@/lib/home-params';

/**
 * Async Server Components. Each one reads `searchParams` (a runtime API) and must be
 * rendered inside <Suspense>; the data itself comes from cached functions that receive the
 * parsed filters as arguments (so every filter/page combination has its own cache entry).
 */

export async function HeroContainer({ searchParams }: { searchParams: HomeSearchParams }) {
  const filters = parseHomeParams(await searchParams);
  return <HeroSearch filters={filters} />;
}

export async function FeaturedContent({ searchParams }: { searchParams: HomeSearchParams }) {
  const { category, listing, q } = parseHomeParams(await searchParams);
  const featured = await getFeaturedProperties({ category, listing, q });
  return <FeaturedSection properties={featured} />;
}

export async function MarketContent({ searchParams }: { searchParams: HomeSearchParams }) {
  const filters = parseHomeParams(await searchParams);
  const data = await getMarketProperties(filters);

  // Page beyond the last one (e.g. ?page=99) → send the user to the last valid page.
  const lastPage = Math.max(data.totalPages, 1);
  if (filters.page > lastPage) {
    redirect(buildHomeHref(filters, { page: lastPage }, '#market'));
  }

  return (
    <MarketSection
      filters={filters}
      properties={data.properties}
      page={data.page}
      totalPages={data.totalPages}
      total={data.total}
    />
  );
}
