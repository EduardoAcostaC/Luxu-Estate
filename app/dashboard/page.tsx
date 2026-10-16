import React from 'react';
import { connection } from 'next/server';
import { createSupabaseAuthClient } from '@/lib/supabase/auth-server';
import { PropertiesManager } from '@/components/dashboard/PropertiesManager';
import type { Property } from '@/types/property';

export const instant = false;

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default async function DashboardPropertiesPage() {
  await connection();
  // Authenticated client: staff RLS policy also exposes inactive properties here.
  const supabase = await createSupabaseAuthClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching dashboard properties:', error.message);
  }

  const properties: Property[] = (data ?? []).map((row) => ({
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
    isActive: row.is_active !== false,
  }));

  return <PropertiesManager initialProperties={properties} />;
}
