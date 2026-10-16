import React from 'react';
import type { Metadata } from 'next';
import { connection } from 'next/server';
import { PropertyForm } from '@/components/dashboard/PropertyForm';

export const instant = false;

export const metadata: Metadata = {
  title: 'Add New Property | LuxeEstate Admin',
  description: 'Create and list a new luxury property listing in LuxeEstate.',
};

export default async function NewPropertyPage() {
  await connection();
  return <PropertyForm mode="create" />;
}
