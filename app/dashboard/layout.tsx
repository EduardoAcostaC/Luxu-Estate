import React from 'react';
import type { Metadata } from 'next';
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar';
import { getCurrentUserRole } from '@/lib/roles';

export const instant = false;

export const metadata: Metadata = {
  title: 'Dashboard Administrativo — LuxeEstate',
  description: 'Panel de administración de propiedades y gestión de roles de usuario.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = await getCurrentUserRole();

  return (
    <div className="min-h-screen bg-background-light text-nordic-dark font-display flex flex-col">
      <DashboardNavbar currentUserRole={role} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
