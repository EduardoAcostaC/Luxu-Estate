import React from 'react';
import { PAGE_SIZE } from '@/lib/home-params';

const pulse = 'animate-pulse bg-nordic-dark/10';

export const HeroSearchSkeleton: React.FC = () => (
  <section className="py-12 md:py-16" aria-hidden="true">
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <div className={`${pulse} h-14 md:h-16 w-3/4 mx-auto rounded-xl`} />
      <div className={`${pulse} h-14 max-w-2xl mx-auto rounded-xl`} />
      <div className="flex justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`${pulse} h-9 w-24 rounded-full`} />
        ))}
      </div>
    </div>
  </section>
);

export const FeaturedSkeleton: React.FC = () => (
  <section className="mb-16" aria-hidden="true">
    <div className={`${pulse} h-7 w-56 rounded mb-8`} />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className={`${pulse} aspect-[16/10] rounded-2xl`} />
      ))}
    </div>
  </section>
);

export const MarketSkeleton: React.FC = () => (
  <section id="market" aria-hidden="true">
    <div className={`${pulse} h-7 w-48 rounded mb-8`} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-card">
          <div className={`${pulse} aspect-[4/3]`} />
          <div className="p-4 space-y-3">
            <div className={`${pulse} h-5 w-1/3 rounded`} />
            <div className={`${pulse} h-4 w-2/3 rounded`} />
            <div className={`${pulse} h-3 w-1/2 rounded`} />
          </div>
        </div>
      ))}
    </div>
  </section>
);
