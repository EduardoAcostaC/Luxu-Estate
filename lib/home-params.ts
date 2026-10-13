import type { CategoryFilter, ListingFilter } from '@/types/property';

export const PAGE_SIZE = 8;

export const CATEGORIES: CategoryFilter[] = [
  'All',
  'House',
  'Apartment',
  'Villa',
  'Penthouse',
];

export const FILTER_AMENITIES = [
  'Swimming Pool',
  'Gym',
  'Parking',
  'Air Conditioning',
  'High-speed Wifi',
  'Patio / Terrace',
] as const;

export type RawSearchParams = Record<string, string | string[] | undefined>;
export type HomeSearchParams = Promise<RawSearchParams>;

export interface HomeFilters {
  page: number;
  category: CategoryFilter;
  listing: ListingFilter;
  q: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  amenities?: string[];
}

export const DEFAULT_FILTERS: HomeFilters = {
  page: 1,
  category: 'All',
  listing: 'all',
  q: '',
  location: '',
  minPrice: undefined,
  maxPrice: undefined,
  beds: undefined,
  baths: undefined,
  amenities: [],
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
  const locationRaw = sanitizeQuery(first(raw.location));

  const minPriceRaw = Number.parseInt(first(raw.minPrice), 10);
  const maxPriceRaw = Number.parseInt(first(raw.maxPrice), 10);
  const bedsRaw = Number.parseInt(first(raw.beds), 10);
  const bathsRaw = Number.parseFloat(first(raw.baths));

  const amenitiesParam = raw.amenities;
  let amenities: string[] = [];
  if (Array.isArray(amenitiesParam)) {
    amenities = amenitiesParam.filter(Boolean);
  } else if (typeof amenitiesParam === 'string' && amenitiesParam.trim()) {
    amenities = amenitiesParam
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return {
    page: Number.isFinite(pageNumber) && pageNumber >= 1 ? pageNumber : 1,
    category: CATEGORIES.includes(category) ? category : 'All',
    listing: listing === 'sale' || listing === 'rent' ? listing : 'all',
    q: sanitizeQuery(first(raw.q)),
    location: locationRaw || undefined,
    minPrice: Number.isFinite(minPriceRaw) && minPriceRaw > 0 ? minPriceRaw : undefined,
    maxPrice: Number.isFinite(maxPriceRaw) && maxPriceRaw > 0 ? maxPriceRaw : undefined,
    beds: Number.isFinite(bedsRaw) && bedsRaw > 0 ? bedsRaw : undefined,
    baths: Number.isFinite(bathsRaw) && bathsRaw > 0 ? bathsRaw : undefined,
    amenities: amenities.length > 0 ? amenities : undefined,
  };
}

/**
 * Counts how many modal-specific filters are actively applied.
 */
export function countActiveModalFilters(filters: HomeFilters): number {
  let count = 0;
  if (filters.location) count++;
  if (filters.minPrice !== undefined && filters.minPrice > 0) count++;
  if (filters.maxPrice !== undefined && filters.maxPrice > 0) count++;
  if (filters.beds !== undefined && filters.beds > 0) count++;
  if (filters.baths !== undefined && filters.baths > 0) count++;
  if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length;
  return count;
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
  if (next.category && next.category !== DEFAULT_FILTERS.category) {
    params.set('category', next.category);
  }
  if (next.listing && next.listing !== DEFAULT_FILTERS.listing) {
    params.set('listing', next.listing);
  }
  if (next.q) params.set('q', next.q);
  if (next.location) params.set('location', next.location);
  if (next.minPrice !== undefined && next.minPrice > 0) {
    params.set('minPrice', String(next.minPrice));
  }
  if (next.maxPrice !== undefined && next.maxPrice > 0) {
    params.set('maxPrice', String(next.maxPrice));
  }
  if (next.beds !== undefined && next.beds > 0) {
    params.set('beds', String(next.beds));
  }
  if (next.baths !== undefined && next.baths > 0) {
    params.set('baths', String(next.baths));
  }
  if (next.amenities && next.amenities.length > 0) {
    params.set('amenities', next.amenities.join(','));
  }
  if (next.page > 1) params.set('page', String(next.page));

  const qs = params.toString();
  return `/${qs ? `?${qs}` : ''}${hash}`;
}

