'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { PropertyImageUploader } from './PropertyImageUploader';
import { PropertyMapWrapper } from '@/components/property/PropertyMapWrapper';
import {
  savePropertyAction,
  type PropertyFormData,
  type PropertyImageInput,
} from '@/lib/property-actions';
import type { PropertyDetail } from '@/types/property';

interface PropertyFormProps {
  mode: 'create' | 'edit';
  initialData?: PropertyDetail | null;
}

const DEFAULT_AMENITIES = [
  'Swimming Pool',
  'Garden',
  'Air Conditioning',
  'Smart Home',
  'Gym',
  'High-speed Wifi',
  'Patio / Terrace',
  'Wine Cellar',
];

export function PropertyForm({ mode, initialData }: PropertyFormProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [price, setPrice] = useState<number | string>(initialData?.price ?? '');
  const [pricePeriod, setPricePeriod] = useState(initialData?.pricePeriod || '/mo');
  const [status, setStatus] = useState<'sale' | 'rent'>(
    initialData?.listingType === 'rent' ? 'rent' : 'sale'
  );
  const [propertyType, setPropertyType] = useState<
    'House' | 'Apartment' | 'Villa' | 'Penthouse'
  >(initialData?.propertyType || 'Apartment');
  const [tag, setTag] = useState(initialData?.tag || '');
  const [isFeatured, setIsFeatured] = useState(Boolean(initialData?.isFeatured));

  // Description
  const [description, setDescription] = useState(initialData?.description || '');

  // Gallery
  const [images, setImages] = useState<PropertyImageInput[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images.map((img, i) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          altText: img.altText,
          caption: img.caption,
          displayOrder: img.displayOrder ?? i,
        }))
      : initialData?.imageUrl
      ? [
          {
            imageUrl: initialData.imageUrl,
            altText: initialData.imageAlt || initialData.title,
            caption: 'Main View',
            displayOrder: 0,
          },
        ]
      : []
  );

  // Location
  const [location, setLocation] = useState(initialData?.location || '');
  const [latitude, setLatitude] = useState<number | string>(
    initialData?.latitude !== undefined && initialData?.latitude !== null
      ? initialData.latitude
      : ''
  );
  const [longitude, setLongitude] = useState<number | string>(
    initialData?.longitude !== undefined && initialData?.longitude !== null
      ? initialData.longitude
      : ''
  );
  const [showCoords, setShowCoords] = useState(true);

  // Details
  const [areaM2, setAreaM2] = useState<number | string>(
    initialData?.area ? parseInt(initialData.area.replace(/\D/g, ''), 10) || 120 : 120
  );
  const [yearBuilt, setYearBuilt] = useState<number | string>('2022');
  const [beds, setBeds] = useState<number>(initialData?.beds ?? 3);
  const [baths, setBaths] = useState<number>(initialData?.baths ?? 2);
  const [parking, setParking] = useState<number>(initialData?.garage ?? 1);
  const [amenities, setAmenities] = useState<string[]>(
    initialData?.amenities && initialData.amenities.length > 0
      ? initialData.amenities
      : ['Garden']
  );

  // Agent Information
  const [agentName, setAgentName] = useState(initialData?.agentName || 'Sarah Jenkins');
  const [agentTitle, setAgentTitle] = useState(
    initialData?.agentTitle || 'Senior Real Estate Agent'
  );
  const [agentPhone, setAgentPhone] = useState(
    initialData?.agentPhone || '+1 (555) 234-5678'
  );
  const [agentEmail, setAgentEmail] = useState(
    initialData?.agentEmail || 'sarah.jenkins@luxeestate.com'
  );

  // Error & Feedback state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleToolbarFormat = (type: 'bold' | 'italic' | 'list') => {
    if (type === 'bold') {
      setDescription((prev) => `${prev} **texto en negrita** `);
    } else if (type === 'italic') {
      setDescription((prev) => `${prev} *texto en cursiva* `);
    } else if (type === 'list') {
      setDescription((prev) => `${prev}\n• Elemento de lista\n• Segundo elemento\n`);
    }
  };

  const hasCoordinates =
    latitude !== '' &&
    longitude !== '' &&
    !isNaN(Number(latitude)) &&
    !isNaN(Number(longitude)) &&
    Number(latitude) >= -90 &&
    Number(latitude) <= 90 &&
    Number(longitude) >= -180 &&
    Number(longitude) <= 180;

  const handleUseCurrentLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(6)));
          setLongitude(Number(pos.coords.longitude.toFixed(6)));
        },
        (err) => {
          console.warn('Geolocation unavailable, setting default location:', err);
          setLatitude(34.07362);
          setLongitude(-118.400356);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setLatitude(34.07362);
      setLongitude(-118.400356);
    }
  };

  const handleSubmit = (isDraft = false) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setErrorMessage(
        t('dashboard.form.titleLabel') + ' es obligatorio.'
      );
      return;
    }
    if (price === '' || Number(price) < 0) {
      setErrorMessage(
        t('dashboard.form.priceLabel') + ' es obligatorio y debe ser mayor o igual a 0.'
      );
      return;
    }

    const payload: PropertyFormData = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      location: location.trim() || 'Unspecified Location',
      price: Number(price),
      price_period: status === 'rent' ? pricePeriod : null,
      listing_type: status,
      property_type: propertyType,
      beds: Number(beds),
      baths: Number(baths),
      area_m2: Number(areaM2) || 50,
      image_url: images[0]?.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      image_alt: images[0]?.altText || title.trim(),
      tag: tag.trim() || null,
      is_featured: isDraft ? false : isFeatured,
      description: description.trim() || null,
      garage: Number(parking),
      amenities,
      latitude: latitude !== '' ? Number(latitude) : null,
      longitude: longitude !== '' ? Number(longitude) : null,
      agent_name: agentName.trim(),
      agent_title: agentTitle.trim(),
      agent_phone: agentPhone.trim(),
      agent_email: agentEmail.trim(),
      images,
    };

    startTransition(async () => {
      const res = await savePropertyAction(payload, initialData?.id);
      if (!res.success) {
        setErrorMessage(res.error || t('dashboard.form.saveError'));
      } else {
        setSuccessMessage(
          mode === 'create'
            ? t('dashboard.form.createSuccess')
            : t('dashboard.form.updateSuccess')
        );
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-24 md:pb-10 font-display">
      {/* Toast Feedback */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-mosque text-white text-sm font-medium flex items-center justify-between shadow-soft animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="material-icons text-base">check_circle</span>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-600 text-white text-sm font-medium flex items-center justify-between shadow-soft animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="material-icons text-base">error</span>
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-white/80 hover:text-white">
            <span className="material-icons text-sm">close</span>
          </button>
        </div>
      )}

      {/* Header & Breadcrumb */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
        <div className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 font-medium font-sf-pro">
              <li>
                <Link href="/dashboard" className="hover:text-mosque transition-colors">
                  {t('dashboard.form.breadcrumbProperties')}
                </Link>
              </li>
              <li>
                <span className="material-icons text-xs text-gray-400">chevron_right</span>
              </li>
              <li aria-current="page" className="text-nordic font-semibold">
                {mode === 'create'
                  ? t('dashboard.form.breadcrumbAddNew')
                  : t('dashboard.form.breadcrumbEdit')}
              </li>
            </ol>
          </nav>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-nordic tracking-tight mb-2">
              {mode === 'create'
                ? t('dashboard.form.addNewTitle')
                : `${t('dashboard.form.editTitle')}: ${initialData?.title || ''}`}
            </h1>
            <p className="text-base text-gray-500 max-w-2xl font-normal font-sf-pro">
              {mode === 'create'
                ? t('dashboard.form.addNewSubtitle')
                : t('dashboard.form.editSubtitle')}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex gap-3">
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-nordic hover:bg-gray-50 transition-colors font-medium font-sf-pro text-sm cursor-pointer disabled:opacity-60"
          >
            {t('dashboard.form.saveDraft')}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg bg-mosque hover:bg-nordic text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-sf-pro text-sm cursor-pointer disabled:opacity-60"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('dashboard.form.saving')}</span>
              </>
            ) : (
              <>
                <span className="material-icons text-sm">save</span>
                <span>{t('dashboard.form.saveProperty')}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(false);
        }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column (8 cols) */}
        <div className="xl:col-span-8 space-y-8">
          {/* 1. Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
              <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
                <span className="material-icons text-lg">info</span>
              </div>
              <h2 className="text-xl font-bold text-nordic">
                {t('dashboard.form.basicInfo')}
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="title">
                  {t('dashboard.form.titleLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (mode === 'create' && !slug) {
                      // Optionally leave slug auto-fill
                    }
                  }}
                  placeholder={t('dashboard.form.titlePlaceholder')}
                  className="w-full text-base px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro"
                />
              </div>

              {/* Price, Status, Property Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="price">
                    {t('dashboard.form.priceLabel')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-sf-pro text-sm">
                      $
                    </span>
                    <input
                      id="price"
                      type="number"
                      required
                      min="0"
                      step="any"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-7 pr-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-medium font-sf-pro"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="status">
                    {t('dashboard.form.statusLabel')}
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'sale' | 'rent')}
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro cursor-pointer"
                  >
                    <option value="sale">{t('market.forSale')}</option>
                    <option value="rent">{t('market.forRent')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="type">
                    {t('dashboard.form.typeLabel')}
                  </label>
                  <select
                    id="type"
                    value={propertyType}
                    onChange={(e) =>
                      setPropertyType(e.target.value as 'House' | 'Apartment' | 'Villa' | 'Penthouse')
                    }
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro cursor-pointer"
                  >
                    <option value="Apartment">{t('categories.Apartment')}</option>
                    <option value="House">{t('categories.House')}</option>
                    <option value="Villa">{t('categories.Villa')}</option>
                    <option value="Penthouse">{t('categories.Penthouse')}</option>
                  </select>
                </div>
              </div>

              {/* Extended Fields: Rent Period, Slug, Tag & Featured */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-gray-100">
                {status === 'rent' ? (
                  <div>
                    <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="pricePeriod">
                      {t('dashboard.form.pricePeriodLabel')}
                    </label>
                    <input
                      id="pricePeriod"
                      type="text"
                      value={pricePeriod}
                      onChange={(e) => setPricePeriod(e.target.value)}
                      placeholder="/mo"
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="tag">
                      {t('dashboard.form.tagLabel')}
                    </label>
                    <select
                      id="tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro cursor-pointer"
                    >
                      <option value="">{t('dashboard.form.tagNone')}</option>
                      <option value="Exclusive">{t('tags.exclusive')}</option>
                      <option value="New Arrival">{t('tags.newArrival')}</option>
                      <option value="New Listing">{t('tags.newListing')}</option>
                      <option value="Popular">{t('tags.popular')}</option>
                      <option value="Luxury">{t('tags.luxury')}</option>
                    </select>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="slug">
                    {t('dashboard.form.slugLabel')}
                  </label>
                  <input
                    id="slug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="modern-penthouse-ocean-view"
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-mosque border-gray-300 rounded focus:ring-mosque cursor-pointer"
                  />
                  <span className="text-sm font-medium text-nordic font-sf-pro group-hover:text-mosque transition-colors">
                    {t('dashboard.form.featuredLabel')}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* 2. Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
              <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
                <span className="material-icons text-lg">description</span>
              </div>
              <h2 className="text-xl font-bold text-nordic">
                {t('dashboard.form.description')}
              </h2>
            </div>
            <div className="p-8">
              <div className="mb-3 flex gap-2 border-b border-gray-100 pb-2">
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('bold')}
                  className="p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  title="Bold"
                >
                  <span className="material-icons text-lg">format_bold</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('italic')}
                  className="p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  title="Italic"
                >
                  <span className="material-icons text-lg">format_italic</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToolbarFormat('list')}
                  className="p-1.5 text-gray-400 hover:text-nordic hover:bg-gray-50 rounded transition-colors cursor-pointer"
                  title="Bullet list"
                >
                  <span className="material-icons text-lg">format_list_bulleted</span>
                </button>
              </div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={2000}
                placeholder={t('dashboard.form.descriptionPlaceholder')}
                className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-base font-sf-pro leading-relaxed resize-y min-h-[200px]"
              />
              <div className="mt-2 text-right text-xs text-gray-400 font-sf-pro">
                {description.length} / 2000 {t('dashboard.form.charLimit')}
              </div>
            </div>
          </div>

          {/* 3. Gallery (with Supabase Bucket upload) */}
          <PropertyImageUploader
            images={images}
            onChange={setImages}
            propertyId={initialData?.id}
          />
        </div>

        {/* Right Column (4 cols) */}
        <div className="xl:col-span-4 space-y-8">
          {/* 4. Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
              <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
                <span className="material-icons text-lg">place</span>
              </div>
              <h2 className="text-lg font-bold text-nordic">
                {t('dashboard.form.location')}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-nordic mb-1.5 font-sf-pro" htmlFor="location">
                  {t('dashboard.form.addressLabel')}
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t('dashboard.form.addressPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-md border border-gray-200 bg-white text-nordic placeholder-gray-400 focus:ring-1 focus:ring-mosque focus:border-mosque transition-all text-sm font-sf-pro"
                />
              </div>

              {/* Map Preview / Leaflet Map */}
              {hasCoordinates ? (
                <div className="space-y-2">
                  <div className="relative h-60 w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm z-0">
                    <PropertyMapWrapper
                      latitude={Number(latitude)}
                      longitude={Number(longitude)}
                      title={title || t('dashboard.form.mapPreview')}
                      address={location || t('dashboard.form.addressPlaceholder')}
                      editable={true}
                      onCoordinatesChange={(newLat, newLng) => {
                        setLatitude(Number(newLat.toFixed(6)));
                        setLongitude(Number(newLng.toFixed(6)));
                      }}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-sf-pro px-0.5">
                    <span className="flex items-center gap-1 text-nordic">
                      <span className="material-icons text-mosque text-xs">touch_app</span>
                      {t('dashboard.form.mapHelp')}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setLatitude('');
                        setLongitude('');
                      }}
                      className="text-red-500 hover:text-red-700 hover:underline cursor-pointer transition-colors"
                    >
                      {t('dashboard.form.clearCoordinates')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 w-full rounded-lg overflow-hidden bg-slate-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-5 text-center transition-all">
                  <div className="w-10 h-10 rounded-full bg-hint-green/50 flex items-center justify-center text-mosque mb-2 shadow-sm">
                    <span className="material-icons text-xl">map</span>
                  </div>
                  <p className="text-xs font-semibold text-nordic mb-1 font-sf-pro">
                    {t('dashboard.form.mapNoCoordsTitle')}
                  </p>
                  <p className="text-[11px] text-gray-500 max-w-xs mb-3 font-sf-pro leading-relaxed">
                    {t('dashboard.form.mapNoCoordsSubtitle')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-hint-green/20 border border-gray-200 hover:border-mosque text-nordic rounded-md text-xs font-medium shadow-sm transition-all cursor-pointer"
                    >
                      <span className="material-icons text-xs text-mosque">my_location</span>
                      <span>{t('dashboard.form.useCurrentLocation')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLatitude(34.07362);
                        setLongitude(-118.400356);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-all cursor-pointer"
                    >
                      <span className="material-icons text-xs">place</span>
                      <span>{t('dashboard.form.sampleCoordinates')}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Optional Coordinates Toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowCoords(!showCoords)}
                    className="text-xs text-nordic/70 hover:text-mosque font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-icons text-sm">
                      {showCoords ? 'expand_less' : 'expand_more'}
                    </span>
                    <span>{t('dashboard.form.coordinates')}</span>
                  </button>

                  {hasCoordinates && (
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      className="text-[11px] text-mosque hover:underline flex items-center gap-1 cursor-pointer"
                      title={t('dashboard.form.useCurrentLocation')}
                    >
                      <span className="material-icons text-xs">my_location</span>
                      <span>{t('dashboard.form.useCurrentLocation')}</span>
                    </button>
                  )}
                </div>

                {showCoords && (
                  <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t border-gray-100">
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        {t('dashboard.form.latitudeLabel')}
                      </label>
                      <input
                        type="number"
                        step="any"
                        placeholder="ej. 34.07362"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded border border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        {t('dashboard.form.longitudeLabel')}
                      </label>
                      <input
                        type="number"
                        step="any"
                        placeholder="ej. -118.400356"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded border border-gray-200 bg-white text-nordic focus:ring-1 focus:ring-mosque focus:border-mosque transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 5. Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="px-6 py-4 border-b border-hint-green/30 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 to-transparent">
              <div className="w-8 h-8 rounded-full bg-hint-green flex items-center justify-center text-nordic">
                <span className="material-icons text-lg">straighten</span>
              </div>
              <h2 className="text-lg font-bold text-nordic">
                {t('dashboard.form.details')}
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Area & Year Built */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-xs text-gray-500 font-medium font-sf-pro mb-1 block" htmlFor="area">
                    {t('dashboard.form.areaLabel')}
                  </label>
                  <input
                    id="area"
                    type="number"
                    min="1"
                    value={areaM2}
                    onChange={(e) => setAreaM2(e.target.value)}
                    placeholder="0"
                    className="w-full text-left px-3 py-2 rounded border border-gray-200 bg-gray-50 text-nordic focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro text-sm"
                  />
                </div>
                <div className="group">
                  <label className="text-xs text-gray-500 font-medium font-sf-pro mb-1 block" htmlFor="year">
                    {t('dashboard.form.yearLabel')}
                  </label>
                  <input
                    id="year"
                    type="number"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    placeholder="YYYY"
                    className="w-full text-left px-3 py-2 rounded border border-gray-200 bg-gray-50 text-nordic focus:bg-white focus:ring-1 focus:ring-mosque focus:border-mosque transition-all font-sf-pro text-sm"
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Steppers: Bedrooms, Bathrooms, Parking */}
              <div className="space-y-4">
                {/* Bedrooms */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-nordic font-sf-pro flex items-center gap-2">
                    <span className="material-icons text-gray-400 text-sm">bed</span>
                    {t('dashboard.form.bedroomsLabel')}
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setBeds((b) => Math.max(0, b - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={beds}
                      className="w-10 text-center border-none bg-transparent text-nordic p-0 focus:ring-0 text-sm font-medium font-sf-pro"
                    />
                    <button
                      type="button"
                      onClick={() => setBeds((b) => b + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-nordic font-sf-pro flex items-center gap-2">
                    <span className="material-icons text-gray-400 text-sm">shower</span>
                    {t('dashboard.form.bathroomsLabel')}
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setBaths((b) => Math.max(0, b - 0.5))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={baths}
                      className="w-10 text-center border-none bg-transparent text-nordic p-0 focus:ring-0 text-sm font-medium font-sf-pro"
                    />
                    <button
                      type="button"
                      onClick={() => setBaths((b) => b + 0.5)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-nordic font-sf-pro flex items-center gap-2">
                    <span className="material-icons text-gray-400 text-sm">directions_car</span>
                    {t('dashboard.form.parkingLabel')}
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => setParking((p) => Math.max(0, p - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-r border-gray-100 cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={parking}
                      className="w-10 text-center border-none bg-transparent text-nordic p-0 focus:ring-0 text-sm font-medium font-sf-pro"
                    />
                    <button
                      type="button"
                      onClick={() => setParking((p) => p + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors border-l border-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Amenities */}
              <div>
                <h3 className="font-bold text-nordic mb-3 font-sf-pro uppercase tracking-wider text-xs text-gray-500">
                  {t('dashboard.form.amenities')}
                </h3>
                <div className="space-y-2.5">
                  {DEFAULT_AMENITIES.map((item) => (
                    <label key={item} className="flex items-center gap-2.5 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={amenities.includes(item)}
                        onChange={() => toggleAmenity(item)}
                        className="w-4 h-4 text-mosque border-gray-300 rounded focus:ring-mosque cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 font-sf-pro group-hover:text-nordic transition-colors">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Assigned Agent Details */}
              <div className="space-y-3">
                <h3 className="font-bold text-nordic font-sf-pro uppercase tracking-wider text-xs text-gray-500">
                  {t('dashboard.form.agentInfo')}
                </h3>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    {t('dashboard.form.agentNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded border border-gray-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    {t('dashboard.form.agentTitleLabel')}
                  </label>
                  <input
                    type="text"
                    value={agentTitle}
                    onChange={(e) => setAgentTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded border border-gray-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      {t('dashboard.form.agentPhoneLabel')}
                    </label>
                    <input
                      type="text"
                      value={agentPhone}
                      onChange={(e) => setAgentPhone(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      {t('dashboard.form.agentEmailLabel')}
                    </label>
                    <input
                      type="email"
                      value={agentEmail}
                      onChange={(e) => setAgentEmail(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded border border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl md:hidden z-40 flex gap-3">
          <Link
            href="/dashboard"
            className="flex-1 py-3 rounded-lg border border-gray-300 bg-white text-nordic font-medium font-sf-pro text-center text-sm"
          >
            {t('dashboard.form.cancel')}
          </Link>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isPending}
            className="flex-1 py-3 rounded-lg bg-mosque text-white font-medium font-sf-pro flex justify-center items-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
          >
            {isPending ? t('dashboard.form.saving') : t('dashboard.form.saveProperty')}
          </button>
        </div>
      </form>
    </div>
  );
}
