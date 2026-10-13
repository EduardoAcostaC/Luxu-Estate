import React, { Suspense } from 'react';
import { Navbar, NavbarWithSearchParams } from '@/components/layout/Navbar';
import { SavedHomesProvider } from '@/components/home/SavedHomesProvider';
import {
  FeaturedContent,
  HeroContainer,
  MarketContent,
} from '@/components/home/HomeContent';
import {
  FeaturedSkeleton,
  HeroSearchSkeleton,
  MarketSkeleton,
} from '@/components/home/skeletons';
import type { HomeSearchParams } from '@/lib/home-params';

export default function Home({ searchParams }: { searchParams: HomeSearchParams }) {
  return (
    <SavedHomesProvider>
      <div className="min-h-screen bg-background-light text-nordic-dark flex flex-col">
        {/* Sticky Top Navigation (reads URL filters on the client, so it sits in Suspense) */}
        <Suspense fallback={<Navbar />}>
          <NavbarWithSearchParams />
        </Suspense>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full flex-grow">
          {/* Hero & Search Section */}
          <Suspense fallback={<HeroSearchSkeleton />}>
            <HeroContainer searchParams={searchParams} />
          </Suspense>

          {/* Featured Collections Section */}
          <Suspense fallback={<FeaturedSkeleton />}>
            <FeaturedContent searchParams={searchParams} />
          </Suspense>

          {/* New in Market Section (server-side paginated) */}
          <Suspense fallback={<MarketSkeleton />}>
            <MarketContent searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </SavedHomesProvider>
  );
}
