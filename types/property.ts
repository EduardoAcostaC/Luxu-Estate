export interface PropertyImage {
  id: string;
  propertyId: string;
  imageUrl: string;
  altText: string;
  caption?: string;
  displayOrder: number;
}

export interface Property {
  id: string;
  slug: string;
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
  /** Inactive properties are hidden from the public site but kept in the admin panel. */
  isActive: boolean;
}

export interface PropertyDetail extends Property {
  description: string;
  garage: number;
  amenities: string[];
  latitude: number;
  longitude: number;
  agentName: string;
  agentTitle: string;
  agentPhone: string;
  agentEmail: string;
  agentAvatarUrl: string;
  images: PropertyImage[];
}

export type CategoryFilter = 'All' | 'House' | 'Apartment' | 'Villa' | 'Penthouse';
export type ListingTypeFilter = 'All' | 'Buy' | 'Rent';
/** URL-driven listing filter (maps to the `listing_type` DB enum). */
export type ListingFilter = 'all' | 'sale' | 'rent';
