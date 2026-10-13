'use client';

import React, { useState, useEffect, useId, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  CATEGORIES,
  FILTER_AMENITIES,
  buildHomeHref,
  type HomeFilters,
} from '@/lib/home-params';
import type { CategoryFilter } from '@/types/property';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: HomeFilters;
}

const AMENITY_ICONS: Record<(typeof FILTER_AMENITIES)[number], string> = {
  'Swimming Pool': 'pool',
  Gym: 'fitness_center',
  Parking: 'local_parking',
  'Air Conditioning': 'ac_unit',
  'High-speed Wifi': 'wifi',
  'Patio / Terrace': 'deck',
};

const MIN_LIMIT = 0;
const MAX_LIMIT = 10000000;
const STEP = 50000;

function formatCompactPrice(val: number): string {
  if (val >= 1000000) {
    const m = val / 1000000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (val >= 1000) {
    return `$${Math.round(val / 1000)}k`;
  }
  return `$${val}`;
}

function formatNumberInput(num?: number): string {
  if (num === undefined || num === null || num === 0) return '';
  return num.toLocaleString('en-US');
}

function parseNumberInput(str: string): number | undefined {
  const clean = str.replace(/[^0-9]/g, '');
  if (!clean) return undefined;
  const parsed = Number.parseInt(clean, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export const FiltersModal: React.FC<FiltersModalProps> = ({
  isOpen,
  onClose,
  currentFilters,
}) => {
  const router = useRouter();
  const locationInputId = useId();

  // Local draft state initialized from current filters
  const [location, setLocation] = useState<string>(currentFilters.location || '');
  const [minPrice, setMinPrice] = useState<number>(currentFilters.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState<number>(currentFilters.maxPrice ?? MAX_LIMIT);
  const [propertyType, setPropertyType] = useState<CategoryFilter>(currentFilters.category);
  const [beds, setBeds] = useState<number>(currentFilters.beds ?? 0);
  const [baths, setBaths] = useState<number>(currentFilters.baths ?? 0);
  const [amenities, setAmenities] = useState<string[]>(currentFilters.amenities ?? []);

  // Live match count
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(false);

  // Sync draft state whenever modal opens or currentFilters change
  useEffect(() => {
    if (isOpen) {
      setLocation(currentFilters.location || '');
      setMinPrice(currentFilters.minPrice ?? 0);
      setMaxPrice(currentFilters.maxPrice ?? MAX_LIMIT);
      setPropertyType(currentFilters.category || 'All');
      setBeds(currentFilters.beds ?? 0);
      setBaths(currentFilters.baths ?? 0);
      setAmenities(currentFilters.amenities ?? []);
    }
  }, [isOpen, currentFilters]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Fetch live count matching current draft state
  const fetchCount = useCallback(async () => {
    try {
      setIsLoadingCount(true);
      const params = new URLSearchParams();
      if (currentFilters.listing !== 'all') params.set('listing', currentFilters.listing);
      if (currentFilters.q) params.set('q', currentFilters.q);
      if (location) params.set('location', location);
      if (propertyType !== 'All') params.set('category', propertyType);
      if (minPrice > 0) params.set('minPrice', String(minPrice));
      if (maxPrice < MAX_LIMIT) params.set('maxPrice', String(maxPrice));
      if (beds > 0) params.set('beds', String(beds));
      if (baths > 0) params.set('baths', String(baths));
      if (amenities.length > 0) params.set('amenities', amenities.join(','));

      const res = await fetch(`/api/properties/count?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMatchCount(data.count ?? 0);
      }
    } catch {
      // Ignore count fetch errors gracefully
    } finally {
      setIsLoadingCount(false);
    }
  }, [currentFilters.listing, currentFilters.q, location, propertyType, minPrice, maxPrice, beds, baths, amenities]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      fetchCount();
    }, 200);
    return () => clearTimeout(timer);
  }, [isOpen, fetchCount]);

  if (!isOpen) return null;

  const handleToggleAmenity = (name: string) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleClear = () => {
    setLocation('');
    setMinPrice(0);
    setMaxPrice(MAX_LIMIT);
    setPropertyType('All');
    setBeds(0);
    setBaths(0);
    setAmenities([]);
  };

  const handleApply = () => {
    const nextHref = buildHomeHref(currentFilters, {
      location: location || undefined,
      category: propertyType,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < MAX_LIMIT ? maxPrice : undefined,
      beds: beds > 0 ? beds : undefined,
      baths: baths > 0 ? baths : undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
      page: 1,
    });
    router.push(nextHref);
    onClose();
  };

  // Slider percentage calculations
  const minPercent = Math.max(0, Math.min(100, ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filters-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Modal Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Container (Clean Light Theme) */}
      <main className="relative z-20 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-30">
          <h1
            id="filters-modal-title"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Filters
          </h1>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
          >
            <span className="material-icons">close</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scroll p-8 space-y-10">
          {/* Section 1: Location */}
          <section>
            <label
              htmlFor={locationInputId}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3"
            >
              Location
            </label>
            <div className="relative group">
              <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors">
                location_on
              </span>
              <input
                id={locationInputId}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, neighborhood, or address"
                className="w-full pl-12 pr-4 py-3 bg-background-light border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-sm outline-none"
              />
            </div>
          </section>

          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price Range
              </label>
              <span className="text-sm font-medium text-primary">
                {minPrice <= MIN_LIMIT && maxPrice >= MAX_LIMIT
                  ? 'Any Price'
                  : `${formatCompactPrice(minPrice)} – ${
                      maxPrice >= MAX_LIMIT ? '$10M+' : formatCompactPrice(maxPrice)
                    }`}
              </span>
            </div>

            {/* Custom Dual Slider Visual with Native Overlaid Ranges */}
            <div className="relative h-12 flex items-center mb-6 px-2">
              {/* Background Track */}
              <div className="absolute left-2 right-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                {/* Active Colored Track */}
                <div
                  className="h-full bg-primary"
                  style={{
                    marginLeft: `${minPercent}%`,
                    width: `${Math.max(0, maxPercent - minPercent)}%`,
                  }}
                />
              </div>

              {/* Native Sliders (Multi-thumb) */}
              <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step={STEP}
                value={minPrice}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPrice - STEP);
                  setMinPrice(val);
                }}
                className="absolute left-2 right-2 w-[calc(100%-1rem)] pointer-events-none appearance-none bg-transparent accent-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer z-10"
              />
              <input
                type="range"
                min={MIN_LIMIT}
                max={MAX_LIMIT}
                step={STEP}
                value={maxPrice}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPrice + STEP);
                  setMaxPrice(val);
                }}
                className="absolute left-2 right-2 w-[calc(100%-1rem)] pointer-events-none appearance-none bg-transparent accent-primary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer z-20"
              />
            </div>

            {/* Inputs: Min Price & Max Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-light p-3 rounded-lg border border-transparent focus-within:border-primary/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
                  Min Price
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumberInput(minPrice)}
                    onChange={(e) => {
                      const val = parseNumberInput(e.target.value) ?? 0;
                      setMinPrice(Math.min(val, maxPrice));
                    }}
                    placeholder="0"
                    className="w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="bg-background-light p-3 rounded-lg border border-transparent focus-within:border-primary/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">
                  Max Price
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={maxPrice >= MAX_LIMIT ? '' : formatNumberInput(maxPrice)}
                    onChange={(e) => {
                      const val = parseNumberInput(e.target.value) ?? MAX_LIMIT;
                      setMaxPrice(Math.max(val, minPrice));
                    }}
                    placeholder="Any"
                    className="w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Property Type
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as CategoryFilter)}
                  className="w-full bg-background-light border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 appearance-none focus:ring-2 focus:ring-primary cursor-pointer outline-none font-medium text-sm"
                >
                  <option value="All">Any Type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
                <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
              {/* Beds */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  Bedrooms
                </span>
                <div className="flex items-center space-x-3 bg-background-light rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setBeds((b) => Math.max(0, b - 1))}
                    disabled={beds === 0}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-8 text-center text-gray-900">
                    {beds === 0 ? 'Any' : `${beds}+`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBeds((b) => Math.min(6, b + 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>

              {/* Baths */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  Bathrooms
                </span>
                <div className="flex items-center space-x-3 bg-background-light rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setBaths((b) => Math.max(0, b - 1))}
                    disabled={baths === 0}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <span className="material-icons text-base">remove</span>
                  </button>
                  <span className="text-sm font-semibold w-8 text-center text-gray-900">
                    {baths === 0 ? 'Any' : `${baths}+`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBaths((b) => Math.min(6, b + 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-icons text-base">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Amenities &amp; Features
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FILTER_AMENITIES.map((item) => {
                const isActive = amenities.includes(item);
                const icon = AMENITY_ICONS[item] || 'check_circle';

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleToggleAmenity(item)}
                    className={`relative w-full px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-primary bg-primary/10 text-primary shadow-xs'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`material-icons text-lg ${
                        isActive ? 'text-primary' : 'text-gray-400'
                      }`}
                    >
                      {icon}
                    </span>
                    <span>{item}</span>
                    {isActive && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer"
          >
            Clear all filters
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-primary/30 transition-all hover:shadow-primary/40 flex items-center gap-2 transform active:scale-95 cursor-pointer"
          >
            {isLoadingCount
              ? 'Updating...'
              : matchCount !== null
              ? `Show ${matchCount} ${matchCount === 1 ? 'Home' : 'Homes'}`
              : 'Show Homes'}
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </footer>
      </main>
    </div>
  );
};
