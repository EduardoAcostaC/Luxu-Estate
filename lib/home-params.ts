import type { CategoryFilter, ListingFilter } from '@/types/property';

export const PAGE_SIZE = 8;

export const CATEGORIES: CategoryFilter[] = [
  'All',
  'House',
  'Apartment',
  'Villa',
  'Penthouse',
];

export type RawSearchParams = Record<string, string | string[] | undefined>;
export type HomeSearchParams = Promise<RawSearchParams>;

export interface HomeFilters {
  page: number;
  category: CategoryFilter;
  listing: ListingFilter;
  q: string;
}

export const DEFAULT_FILTERS: HomeFilters = {
  page: 1,
  category: 'All',
  listing: 'all',
  q: '',
};

const MAX_QUERY_LENGTH = 80;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

/** Characters with a special meaning inside a PostgREST `or()` filter / LIKE pattern. */
function sanitizeQuery(value: string): string {
  return value
    .replace(/[,()%_*\\"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_QUERY_LENGTH);
}

/** Parses and normalises URL search params. Invalid values fall back to defaults. */
export function parseHomeParams(raw: RawSearchParams): HomeFilters {
  const pageNumber = Number.parseInt(first(raw.page), 10);
  const category = first(raw.category) as CategoryFilter;
  const listing = first(raw.listing);

  return {
    page: Number.isFinite(pageNumber) && pageNumber >= 1 ? pageNumber : 1,
    category: CATEGORIES.includes(category) ? category : 'All',
    listing: listing === 'sale' || listing === 'rent' ? listing : 'all',
    q: sanitizeQuery(first(raw.q)),
  };
}

/**
 * Builds a Home URL from the current filters plus a patch.
 * Changing any filter resets pagination to page 1 unless `page` is patched explicitly.
 */
export function buildHomeHref(
  current: HomeFilters,
  patch: Partial<HomeFilters> = {},
  hash = ''
): string {
  const next: HomeFilters = {
    ...current,
    page: 1,
    ...patch,
  };

  const params = new URLSearchParams();
  if (next.category !== DEFAULT_FILTERS.category) params.set('category', next.category);
  if (next.listing !== DEFAULT_FILTERS.listing) params.set('listing', next.listing);
  if (next.q) params.set('q', next.q);
  if (next.page > 1) params.set('page', String(next.page));

  const qs = params.toString();
  return `/${qs ? `?${qs}` : ''}${hash}`;
}
