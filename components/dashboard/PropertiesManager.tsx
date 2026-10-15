'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/types/property';
import { useLanguage } from '@/lib/i18n';

interface PropertiesManagerProps {
  initialProperties: Property[];
}

export function PropertiesManager({ initialProperties }: PropertiesManagerProps) {
  const { t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [listingFilter, setListingFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Stats calculation
  const totalListings = properties.length;
  const activeCount = properties.filter((p) => p.listingType === 'sale').length;
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

      return matchesSearch && matchesListing;
    });
  }, [properties, searchQuery, listingFilter]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la propiedad "${title}"?`)) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setFeedbackMessage(`Propiedad "${title}" archivada del panel.`);
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  const handleAddNew = () => {
    alert(
      'Formulario de creación de propiedad disponible en la versión completa de administración.'
    );
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
              onClick={() => setListingFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                listingFilter === 'all'
                  ? 'bg-mosque text-white shadow-xs'
                  : 'text-nordic-dark/70 hover:text-nordic-dark'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setListingFilter('sale')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                listingFilter === 'sale'
                  ? 'bg-mosque text-white shadow-xs'
                  : 'text-nordic-dark/70 hover:text-nordic-dark'
              }`}
            >
              Venta
            </button>
            <button
              onClick={() => setListingFilter('rent')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                listingFilter === 'rent'
                  ? 'bg-mosque text-white shadow-xs'
                  : 'text-nordic-dark/70 hover:text-nordic-dark'
              }`}
            >
              Renta
            </button>
          </div>

          <button
            onClick={handleAddNew}
            className="bg-mosque hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <span className="material-icons text-base">add</span>
            <span>{t('dashboard.addNewProperty')}</span>
          </button>
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
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('dashboard.searchPropertiesPlaceholder')}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-nordic-dark/15 text-sm text-nordic-dark focus:outline-none focus:ring-2 focus:ring-mosque/30 shadow-2xs placeholder-nordic-dark/40"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-nordic-dark/40 hover:text-nordic-dark"
          >
            <span className="material-icons text-lg">close</span>
          </button>
        )}
      </div>

      {/* Property List Container */}
      <div className="bg-white rounded-xl shadow-2xs border border-nordic-dark/10 overflow-hidden">
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
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-background-light/60 transition-colors items-center"
              >
                {/* Details */}
                <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                  <div className="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={prop.imageUrl}
                      alt={prop.imageAlt || prop.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/properties/${prop.slug}`}
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
                <div className="col-span-6 md:col-span-2">
                  {prop.listingType === 'sale' ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-hint-green text-mosque border border-mosque/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-mosque mr-1.5"></span>
                      Activo (Venta)
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
                      Renta
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-1.5">
                  <Link
                    href={`/properties/${prop.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-nordic-dark/60 hover:text-mosque hover:bg-hint-green/30 transition-all"
                    title={t('dashboard.viewOnSite')}
                  >
                    <span className="material-icons text-xl">open_in_new</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      alert(`Edición de la propiedad "${prop.title}" en desarrollo.`)
                    }
                    className="p-2 rounded-lg text-nordic-dark/60 hover:text-mosque hover:bg-hint-green/30 transition-all cursor-pointer"
                    title={t('dashboard.edit')}
                  >
                    <span className="material-icons text-xl">edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(prop.id, prop.title)}
                    className="p-2 rounded-lg text-nordic-dark/60 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                    title={t('dashboard.delete')}
                  >
                    <span className="material-icons text-xl">delete_outline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
