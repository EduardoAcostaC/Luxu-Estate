'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { useTranslation } from '@/lib/i18n';

interface PropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved = false,
  onToggleSave,
  className = '',
}) => {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(isSaved);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    if (onToggleSave) {
      onToggleSave(property.id);
    }
  };

  const isRent = property.listingType === 'rent';

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={`group block h-full select-none ${className}`}
    >
      <article className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            alt={property.imageAlt}
            src={property.imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Favorite Button */}
          <button
            type="button"
            aria-label={saved ? t('propertyDetail.removePropertyAria') : t('propertyDetail.savePropertyAria')}
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-10 ${
              saved
                ? 'bg-mosque text-white shadow-md'
                : 'bg-white/90 hover:bg-mosque hover:text-white text-nordic-dark'
            }`}
          >
            <span className="material-icons text-lg">
              {saved ? 'favorite' : 'favorite_border'}
            </span>
          </button>

          {/* Status Badge */}
          <div
            className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm z-10 ${
              isRent ? 'bg-mosque/90' : 'bg-nordic-dark/90'
            }`}
          >
            {isRent ? t('market.forRent') : t('market.forSale')}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-lg text-nordic-dark group-hover:text-mosque transition-colors">
              {property.priceFormatted}
              {property.pricePeriod && (
                <span className="text-sm font-normal text-nordic-muted">
                  {property.pricePeriod}
                </span>
              )}
            </h3>
          </div>

          <h4 className="text-nordic-dark font-medium truncate mb-1">
            {property.title}
          </h4>

          <p className="text-nordic-muted text-xs mb-4">{property.location}</p>

          {/* Specs footer */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-nordic-muted text-xs">
              <span className="material-icons text-sm text-mosque/80">king_bed</span>{' '}
              {property.beds}
            </div>
            <div className="flex items-center gap-1 text-nordic-muted text-xs">
              <span className="material-icons text-sm text-mosque/80">bathtub</span>{' '}
              {property.baths}
            </div>
            <div className="flex items-center gap-1 text-nordic-muted text-xs">
              <span className="material-icons text-sm text-mosque/80">
                square_foot
              </span>{' '}
              {property.area}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
