import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { PropertyForm } from '@/components/dashboard/PropertyForm';
import { getPropertyById } from '@/lib/properties';

export const instant = false;

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditPropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) {
    return {
      title: 'Property Not Found | LuxeEstate Admin',
    };
  }
  return {
    title: `Edit ${property.title} | LuxeEstate Admin`,
    description: `Edit listing details for ${property.title}.`,
  };
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  await connection();
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return <PropertyForm mode="edit" initialData={property} />;
}
