import React from 'react';

export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-background-light text-nordic-dark flex flex-col">
      {/* Navbar Placeholder */}
      <div className="h-20 bg-background-light/95 border-b border-nordic-dark/10 animate-pulse" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Breadcrumb Skeleton */}
        <div className="w-48 h-4 bg-slate-200 rounded mb-6 animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column (Hero + Thumbnails) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Hero Skeleton */}
            <div className="aspect-[16/10] bg-slate-200 rounded-xl animate-pulse" />

            {/* Thumbnails Row Skeleton */}
            <div className="flex gap-4 overflow-hidden pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-none w-48 aspect-[4/3] bg-slate-200 rounded-lg animate-pulse"
                />
              ))}
            </div>

            {/* Features Card Skeleton */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-sm space-y-4 mt-8">
              <div className="w-36 h-5 bg-slate-200 rounded animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-slate-100 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* About Card Skeleton */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
              <div className="w-32 h-5 bg-slate-200 rounded animate-pulse" />
              <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-2/3 h-4 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>

          {/* Right Column (Sticky Sidebar Skeleton) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-7 rounded-xl border border-slate-200/60 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="w-44 h-9 bg-slate-200 rounded animate-pulse" />
                <div className="w-56 h-4 bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200 animate-pulse" />
                <div className="space-y-2">
                  <div className="w-28 h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="w-20 h-3 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-12 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-12 bg-slate-100 rounded-lg animate-pulse" />
            </div>

            {/* Map Card Skeleton */}
            <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
              <div className="aspect-[4/3] bg-slate-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
