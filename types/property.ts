export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceFormatted: string;
  pricePeriod?: string; // e.g. "/mo"
  beds: number;
  baths: number;
  area: string; // e.g. "4,200 m²" or "120m²"
  imageUrl: string;
  imageAlt: string;
  tag?: string; // e.g. "Exclusive", "New Arrival"
  listingType: 'sale' | 'rent'; // 'sale' or 'rent'
  propertyType: 'House' | 'Apartment' | 'Villa' | 'Penthouse';
  isFeatured?: boolean;
}

export type CategoryFilter = 'All' | 'House' | 'Apartment' | 'Villa' | 'Penthouse';
export type ListingTypeFilter = 'All' | 'Buy' | 'Rent';
/** URL-driven listing filter (maps to the `listing_type` DB enum). */
export type ListingFilter = 'all' | 'sale' | 'rent';
