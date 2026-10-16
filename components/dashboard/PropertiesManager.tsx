'use client';

import React, { useState, useMemo, useRef, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/types/property';
import { useLanguage } from '@/lib/i18n';
import { setPropertyActiveAction } from '@/lib/property-actions';

interface PropertiesManagerProps {
  initialProperties: Property[];
}

const PAGE_SIZE = 10;

function getPageItems(page: number, totalPages: number): (number | null)[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const items: (number | null)[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) items.push(null);
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push(null);
  items.push(totalPages);
  return items;
}

export function PropertiesManager({ initialProperties }: PropertiesManagerProps) {
  const { t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [listingFilter, setListingFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Stats calculation
  const totalListings = properties.length;
  const activeCount = properties.filter((p) => p.isActive).length;
  const pendingCount = properties.filter((p) => p.listingType === 'rent').length;
  const totalValue = properties.reduce((acc, p) => acc + p.price, 0);

  const formattedTotalValue = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact',
    }).format(totalValue);
  }, [totalValue]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const matchesSearch =
        searchQuery === '' ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesListing =
        listingFilter === 'all' || prop.listingType === listingFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' ? prop.isActive : !prop.isActive);

      return matchesSearch && matchesListing && matchesStatus;
    });
  }, [properties, searchQuery, listingFilter, statusFilter]);

  // Pagination calculations
  const totalFiltered = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedProperties = useMemo(() => {
    const startIndex = (validPage - 1) * PAGE_SIZE;
    return filteredProperties.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProperties, validPage]);

  const from = totalFiltered === 0 ? 0 : (validPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(validPage * PAGE_SIZE, totalFiltered);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (listContainerRef.current) {
      listContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleListingFilterChange = (filter: 'all' | 'sale' | 'rent') => {
    setListingFilter(filter);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  // Properties are never deleted: they are toggled between active and inactive.
  const handleToggleActive = (prop: Property) => {
    const nextActive = !prop.isActive;
    const confirmKey = nextActive ? 'dashboard.activateConfirm' : 'dashboard.deactivateConfirm';
    if (confirm(t(confirmKey, { title: prop.title }))) {
      startTransition(async () => {
        const res = await setPropertyActiveAction(prop.id, nextActive);
        if (res.success) {
          setProperties((prev) =>
            prev.map((p) => (p.id === prop.id ? { ...p, isActive: nextActive } : p))
          );
          setFeedbackMessage(
            t(nextActive ? 'dashboard.activatedSuccess' : 'dashboard.deactivatedSuccess', {
              title: prop.title,
            })
          );
        } else {
          setFeedbackMessage(`${t('dashboard.statusChangeError')}: ${res.error || ''}`);
        }
        setTimeout(() => setFeedbackMessage(null), 4000);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Feedback */}
      {feedbackMessage && (
        <div className="p-4 rounded-xl bg-mosque text-white text-sm font-medium flex items-center justify-between shadow-soft animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="material-icons text-base">info</span>
            <span>{feedbackMessage}</span>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-white/80 hover:text-white"
          >
            <span className="material-icons text-sm">close</span>
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nordic-dark tracking-tight">
            {t('dashboard.myProperties')}
          </h1>
          <p className="text-nordic-dark/60 mt-1 text-sm">
            {t('dashboard.portfolioSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-nordic-dark/15 p-1 bg-white shadow-2xs">
            <button
              onClick={() => handleListingFilterChange('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                listingFilter === 'all'
                  ? 'bg-mosque text-white shadow-xs'
                  : 'text-nordic-dark/70 hover:text-nordic-dark'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleListingFilterChange('sale')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                listingFilter === 'sale'
                  ? 'bg-mosque text-white shadow-xs'
                  : 'text-nordic-dark/70 hover:text-nordic-dark'
              }`}
            >
              Venta
            </button>
            <button
              onClick={() => handleListingFilterChange('rent')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                listingFilter === 'rent'
                  ? 'bg-mosque text-white shadow-xs'
                  : 'text-nordic-dark/70 hover:text-nordic-dark'
              }`}
            >
              Renta
            </button>
          </div>

          <Link
            href="/dashboard/properties/new"
            className="bg-mosque hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-icons text-base">add</span>
            <span>{t('dashboard.addNewProperty')}</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-nordic-dark/10 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nordic-dark/50">
              {t('dashboard.totalListings')}
            </p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{totalListings}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center text-mosque">
            <span className="material-icons">apartment</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-nordic-dark/10 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nordic-dark/50">
              {t('dashboard.activeProperties')}
            </p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{activeCount}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-hint-green flex items-center justify-center text-mosque">
            <span className="material-icons">check_circle</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-nordic-dark/10 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nordic-dark/50">
              {t('dashboard.pendingSale')}
            </p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{pendingCount}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <span className="material-icons">pending</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-nordic-dark/10 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-nordic-dark/50">
              {t('dashboard.portfolioValue')}
            </p>
            <p className="text-2xl font-bold text-nordic-dark mt-1">{formattedTotalValue}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-nordic-dark/5 flex items-center justify-center text-nordic-dark">
            <span className="material-icons">attach_money</span>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-nordic-dark/40">
          <span className="material-icons text-xl">search</span>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={t('dashboard.searchPropertiesPlaceholder')}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-nordic-dark/15 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/30 shadow-2xs placeholder-nordic-dark/40"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-nordic-dark/40 hover:text-nordic-dark"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        )}
      </div>

      {/* Status Filter (active / inactive) */}
      <div className="flex items-center gap-2">
        {(['all', 'active', 'inactive'] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleStatusFilterChange(value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
              statusFilter === value
                ? 'bg-mosque text-white border-mosque shadow-xs'
                : 'bg-white text-nordic-dark/70 border-nordic-dark/15 hover:border-mosque/40 hover:text-nordic-dark'
            }`}
          >
            {t(
              value === 'all'
                ? 'dashboard.filterAll'
                : value === 'active'
                  ? 'dashboard.filterActive'
                  : 'dashboard.filterInactive'
            )}
          </button>
        ))}
      </div>

      {/* Property List Container */}
      <div
        ref={listContainerRef}
        className="bg-white rounded-xl shadow-2xs border border-nordic-dark/10 overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/70 border-b border-nordic-dark/10 text-xs font-semibold text-nordic-dark/60 uppercase tracking-wider">
          <div className="col-span-6">{t('dashboard.propertyDetails')}</div>
          <div className="col-span-2">{t('dashboard.price')}</div>
          <div className="col-span-2">{t('dashboard.status')}</div>
          <div className="col-span-2 text-right">{t('dashboard.actions')}</div>
        </div>

        {/* List Items */}
        {filteredProperties.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-icons text-4xl text-nordic-dark/30 mb-2">
              search_off
            </span>
            <p className="text-base font-semibold text-nordic-dark">
              No se encontraron propiedades
            </p>
            <p className="text-xs text-nordic-dark/60 mt-1">
              Prueba modificando tu criterio de búsqueda o filtro de listado.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-nordic-dark/10">
            {paginatedProperties.map((prop) => (
              <div
                key={prop.id}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-background-light/60 transition-colors items-center ${
                  prop.isActive ? '' : 'bg-gray-50/80'
                }`}
              >
                {/* Details */}
                <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                  <div className="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={prop.imageUrl}
                      alt={prop.imageAlt || prop.title}
                      fill
                      unoptimized
                      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                        prop.isActive ? '' : 'grayscale opacity-60'
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={prop.isActive ? `/properties/${prop.slug}` : `/dashboard/properties/${prop.id}/edit`}
                      className="text-base font-bold text-nordic-dark group-hover:text-mosque transition-colors line-clamp-1"
                    >
                      {prop.title}
                    </Link>
                    <p className="text-xs text-nordic-dark/60 line-clamp-1 mt-0.5">
                      {prop.location}
                    </p>
                    <div className="flex items-center gap-2.5 mt-2 text-xs text-nordic-dark/50">
                      <span className="flex items-center gap-1">
                        <span className="material-icons text-[14px]">bed</span>
                        {prop.beds} Beds
                      </span>
                      <span className="w-1 h-1 rounded-full bg-nordic-dark/20"></span>
                      <span className="flex items-center gap-1">
                        <span className="material-icons text-[14px]">bathtub</span>
                        {prop.baths} Baths
                      </span>
                      <span className="w-1 h-1 rounded-full bg-nordic-dark/20"></span>
                      <span>{prop.area}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-6 md:col-span-2">
                  <div className="text-sm font-bold text-nordic-dark">
                    {prop.priceFormatted}
                  </div>
                  {prop.pricePeriod && (
                    <div className="text-xs text-nordic-dark/50 capitalize">
                      {prop.pricePeriod}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-6 md:col-span-2 flex flex-col items-start gap-1">
                  {prop.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-hint-green text-mosque border border-mosque/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-mosque mr-1.5"></span>
                      {t('dashboard.active')}
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300"
                      title={t('dashboard.hiddenFromSite')}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
                      {t('dashboard.inactive')}
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-nordic-dark/60 pl-1">
                    {prop.listingType === 'sale' ? t('market.forSale') : t('market.forRent')}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-1.5">
                  {prop.isActive && (
                    <Link
                      href={`/properties/${prop.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-nordic-dark/60 hover:text-mosque hover:bg-hint-green/30 transition-all"
                      title={t('dashboard.viewOnSite')}
                    >
                      <span className="material-icons text-xl">open_in_new</span>
                    </Link>
                  )}

                  <Link
                    href={`/dashboard/properties/${prop.id}/edit`}
                    className="p-2 rounded-lg text-nordic-dark/60 hover:text-mosque hover:bg-hint-green/30 transition-all cursor-pointer"
                    title={t('dashboard.edit')}
                  >
                    <span className="material-icons text-xl">edit</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(prop)}
                    className={`p-2 rounded-lg transition-all cursor-pointer ${
                      prop.isActive
                        ? 'text-nordic-dark/60 hover:text-amber-700 hover:bg-amber-50'
                        : 'text-nordic-dark/60 hover:text-mosque hover:bg-hint-green/30'
                    }`}
                    title={t(prop.isActive ? 'dashboard.deactivate' : 'dashboard.activate')}
                    aria-label={t(prop.isActive ? 'dashboard.deactivate' : 'dashboard.activate')}
                  >
                    <span className="material-icons text-xl">
                      {prop.isActive ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalFiltered > 0 && (
          <div className="px-6 py-4 border-t border-nordic-dark/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/60">
            <div className="text-xs sm:text-sm text-nordic-dark/60 font-medium">
              {t('pagination.showing', { from, to, total: totalFiltered })}
            </div>

            {totalPages > 1 && (
              <nav aria-label="Pagination" className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePageChange(validPage - 1)}
                  disabled={validPage <= 1}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-nordic-dark/15 text-xs font-medium text-nordic-dark hover:border-mosque hover:text-mosque disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/15 disabled:hover:text-nordic-dark transition-colors bg-white shadow-2xs cursor-pointer"
                  aria-label={t('pagination.prevAria')}
                >
                  <span className="material-icons text-base sm:mr-1">chevron_left</span>
                  <span className="hidden sm:inline">{t('pagination.prev')}</span>
                </button>

                <div className="flex items-center gap-1">
                  {getPageItems(validPage, totalPages).map((item, idx) =>
                    item === null ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-8 h-8 flex items-center justify-center text-xs text-nordic-dark/40"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePageChange(item)}
                        className={`min-w-8 h-8 px-2 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          item === validPage
                            ? 'bg-mosque text-white shadow-xs'
                            : 'bg-white border border-nordic-dark/15 text-nordic-dark/70 hover:text-nordic-dark hover:border-mosque/40'
                        }`}
                        aria-current={item === validPage ? 'page' : undefined}
                        aria-label={t('pagination.pageAria', { page: item })}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(validPage + 1)}
                  disabled={validPage >= totalPages}
                  className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-nordic-dark/15 text-xs font-medium text-nordic-dark hover:border-mosque hover:text-mosque disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/15 disabled:hover:text-nordic-dark transition-colors bg-white shadow-2xs cursor-pointer"
                  aria-label={t('pagination.nextAria')}
                >
                  <span className="hidden sm:inline">{t('pagination.next')}</span>
                  <span className="material-icons text-base sm:ml-1">chevron_right</span>
                </button>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
