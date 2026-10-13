import { cacheLife, cacheTag } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/database.types';
import { PAGE_SIZE, type HomeFilters } from '@/lib/home-params';
import type { Property, PropertyDetail, PropertyImage } from '@/types/property';

type PropertyRow = Database['public']['Tables']['properties']['Row'];
type PropertyImageRow = Database['public']['Tables']['property_images']['Row'];
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
    slug: row.slug ?? row.id,
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

function rowToPropertyDetail(row: PropertyRow, images: PropertyImageRow[] = []): PropertyDetail {
  const base = rowToProperty(row);
  const mappedImages: PropertyImage[] = images
    .sort((a, b) => a.display_order - b.display_order)
    .map((img) => ({
      id: img.id,
      propertyId: img.property_id,
      imageUrl: img.image_url,
      altText: img.alt_text,
      caption: img.caption ?? undefined,
      displayOrder: img.display_order,
    }));

  if (mappedImages.length === 0) {
    mappedImages.push({
      id: `${row.id}-main`,
      propertyId: row.id,
      imageUrl: row.image_url,
      altText: row.image_alt,
      caption: 'Main View',
      displayOrder: 0,
    });
  }

  return {
    ...base,
    description:
      row.description ??
      `Experience modern luxury in this architecturally stunning ${row.property_type.toLowerCase()} located in ${row.location}. Designed with an emphasis on seamless indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light.`,
    garage: row.garage ?? 1,
    amenities:
      row.amenities && row.amenities.length > 0
        ? row.amenities
        : [
            'Smart Home System',
            'Swimming Pool',
            'Central Heating & Cooling',
            'Electric Vehicle Charging',
            'Private Gym',
            'Wine Cellar',
          ],
    latitude: Number(row.latitude ?? 37.441883),
    longitude: Number(row.longitude ?? -122.14302),
    agentName: row.agent_name ?? 'Sarah Jenkins',
    agentTitle: row.agent_title ?? 'Top Rated Agent',
    agentPhone: row.agent_phone ?? '+1 (555) 234-5678',
    agentEmail: row.agent_email ?? 'sarah.jenkins@luxeestate.com',
    agentAvatarUrl:
      row.agent_avatar_url ??
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w',
    images: mappedImages,
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

/** Detailed single property fetched by slug with 1-to-N image collection. */
export async function getPropertyBySlug(slug: string): Promise<PropertyDetail | null> {
  'use cache';
  cacheLife('minutes');
  cacheTag('properties');

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const images = (data.property_images as PropertyImageRow[]) ?? [];
  return rowToPropertyDetail(data, images);
}

/** Returns all slugs for static generation or sitemaps. */
export async function getAllPropertySlugs(): Promise<string[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('properties');

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('properties').select('slug');
  if (error || !data) return [];
  return data.map((d) => d.slug).filter((s): s is string => Boolean(s));
}
