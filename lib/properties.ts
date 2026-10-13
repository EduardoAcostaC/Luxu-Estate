import { cacheLife, cacheTag } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/database.types';
import { PAGE_SIZE, type HomeFilters } from '@/lib/home-params';
import type { Property } from '@/types/property';

type PropertyRow = Database['public']['Tables']['properties']['Row'];
type FilterArgs = Omit<HomeFilters, 'page'>;

export interface MarketPage {
  properties: Property[];
  total: number;
  totalPages: number;
  page: number;
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function rowToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    priceFormatted: priceFormatter.format(row.price),
    pricePeriod: row.price_period ?? undefined,
    beds: row.beds,
    baths: row.baths,
    area: `${row.area_m2.toLocaleString('en-US')} m²`,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    tag: row.tag ?? undefined,
    listingType: row.listing_type,
    propertyType: row.property_type,
    isFeatured: row.is_featured,
  };
}

/** Applies the shared category / listing / search filters to a properties query. */
function applyFilters<
  T extends {
    eq: (column: string, value: string) => T;
    or: (filters: string) => T;
  },
>(query: T, { category, listing, q }: FilterArgs): T {
  let result = query;
  if (category !== 'All') result = result.eq('property_type', category);
  if (listing !== 'all') result = result.eq('listing_type', listing);
  if (q) result = result.or(`title.ilike.%${q}%,location.ilike.%${q}%`);
  return result;
}

/**
 * Server-side paginated "New in Market" listing.
 * Filters and page are arguments, so each combination is its own cache entry.
 */
export async function getMarketProperties(filters: HomeFilters): Promise<MarketPage> {
  'use cache';
  cacheLife('minutes');
  cacheTag('properties');

  const supabase = createSupabaseServerClient();
  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count, error } = await applyFilters(
    supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .eq('is_featured', false)
      .order('created_at', { ascending: false })
      .order('id', { ascending: true })
      .range(from, to),
    filters
  );

  if (error) {
    // PGRST103: requested range is beyond the available rows (page out of range).
    if (error.code === 'PGRST103') {
      const { count: total, error: countError } = await applyFilters(
        supabase
          .from('properties')
          .select('id', { count: 'exact', head: true })
          .eq('is_featured', false),
        filters
      );
      if (countError) throw new Error(`Failed to load properties: ${countError.message}`);
      const totalRows = total ?? 0;
      return {
        properties: [],
        total: totalRows,
        totalPages: Math.ceil(totalRows / PAGE_SIZE),
        page: filters.page,
      };
    }
    throw new Error(`Failed to load properties: ${error.message}`);
  }

  const total = count ?? 0;
  return {
    properties: (data ?? []).map(rowToProperty),
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
    page: filters.page,
  };
}

/** Featured collections (not paginated). */
export async function getFeaturedProperties(filters: FilterArgs): Promise<Property[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('properties');

  const supabase = createSupabaseServerClient();
  const { data, error } = await applyFilters(
    supabase
      .from('properties')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .order('id', { ascending: true }),
    filters
  );

  if (error) throw new Error(`Failed to load featured properties: ${error.message}`);
  return (data ?? []).map(rowToProperty);
}
