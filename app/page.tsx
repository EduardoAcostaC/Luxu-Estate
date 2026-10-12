'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSearch } from '@/components/home/HeroSearch';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { MarketSection } from '@/components/home/MarketSection';
import { FEATURED_PROPERTIES, MARKET_PROPERTIES } from '@/data/mockProperties';
import { CategoryFilter } from '@/types/property';

export default function Home() {
  const [activeNavTab, setActiveNavTab] = useState<string>('Buy');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);

  // Toggle favorite property
  const handleToggleSave = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter properties based on search query and category
  const filteredFeatured = useMemo(() => {
    return FEATURED_PROPERTIES.filter((prop) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || prop.propertyType === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        prop.title.toLowerCase().includes(query) ||
        prop.location.toLowerCase().includes(query);

      // Nav Tab match (if user clicked Rent in nav, filter accordingly)
      const matchesNav =
        activeNavTab === 'Buy' ||
        activeNavTab === 'Sell' ||
        activeNavTab === 'Saved Homes' ||
        (activeNavTab === 'Rent' && prop.listingType === 'rent');

      // Saved homes filter
      const matchesSaved =
        activeNavTab !== 'Saved Homes' || savedPropertyIds.includes(prop.id);

      return matchesCategory && matchesQuery && matchesNav && matchesSaved;
    });
  }, [selectedCategory, searchQuery, activeNavTab, savedPropertyIds]);

  const filteredMarket = useMemo(() => {
    return MARKET_PROPERTIES.filter((prop) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || prop.propertyType === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        prop.title.toLowerCase().includes(query) ||
        prop.location.toLowerCase().includes(query);

      // Nav Tab match (if user selected Rent in Navbar)
      const matchesNav =
        activeNavTab === 'Buy' ||
        activeNavTab === 'Sell' ||
        activeNavTab === 'Saved Homes' ||
        (activeNavTab === 'Rent' && prop.listingType === 'rent');

      // Saved homes filter
      const matchesSaved =
        activeNavTab !== 'Saved Homes' || savedPropertyIds.includes(prop.id);

      return matchesCategory && matchesQuery && matchesNav && matchesSaved;
    });
  }, [selectedCategory, searchQuery, activeNavTab, savedPropertyIds]);

  return (
    <div className="min-h-screen bg-background-light text-nordic-dark flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={activeNavTab}
        onTabChange={setActiveNavTab}
        savedCount={savedPropertyIds.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full flex-grow">
        {/* Hero & Search Section */}
        <HeroSearch
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Saved Homes Info if tab is active and empty */}
        {activeNavTab === 'Saved Homes' && savedPropertyIds.length === 0 && (
          <div className="text-center py-12 bg-white/60 rounded-2xl border border-nordic-dark/5 p-8 max-w-md mx-auto mb-16 shadow-soft">
            <span className="material-icons text-4xl text-nordic-muted mb-2">
              favorite_border
            </span>
            <h3 className="text-lg font-medium text-nordic-dark">
              No saved homes yet
            </h3>
            <p className="text-sm text-nordic-muted mt-1">
              Click the heart icon on any property to save it to your collection.
            </p>
          </div>
        )}

        {/* Featured Collections Section */}
        {filteredFeatured.length > 0 && (
          <FeaturedSection
            properties={filteredFeatured}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* New in Market Section */}
        <MarketSection
          properties={filteredMarket}
          savedPropertyIds={savedPropertyIds}
          onToggleSave={handleToggleSave}
        />
      </main>
    </div>
  );
}
