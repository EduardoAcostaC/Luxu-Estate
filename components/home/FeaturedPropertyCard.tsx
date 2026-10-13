'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';

interface FeaturedPropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export const FeaturedPropertyCard: React.FC<FeaturedPropertyCardProps> = ({
  property,
  isSaved = false,
  onToggleSave,
}) => {
  const [saved, setSaved] = useState(isSaved);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    if (onToggleSave) {
      onToggleSave(property.id);
    }
  };

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block select-none"
    >
      <div className="relative rounded-xl overflow-hidden shadow-soft bg-white border border-transparent hover:border-[#D9ECC8] transition-all duration-300 group-hover:-translate-y-1">
        {/* Property Image Container */}
        <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
          <Image
            alt={property.imageAlt}
            src={property.imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Tag Badge */}
          {property.tag && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic-dark shadow-sm z-10">
              {property.tag}
            </div>
          )}

          {/* Favorite Button */}
          <button
            type="button"
            aria-label={saved ? 'Remove from saved' : 'Save property'}
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all z-10 ${
              saved
                ? 'bg-mosque text-white shadow-md'
                : 'bg-white/90 text-nordic-dark hover:bg-mosque hover:text-white'
            }`}
          >
            <span className="material-icons text-xl">
              {saved ? 'favorite' : 'favorite_border'}
            </span>
          </button>

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none"></div>
        </div>

        {/* Property Details */}
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-medium text-nordic-dark group-hover:text-mosque transition-colors">
                {property.title}
              </h3>
              <p className="text-nordic-muted text-sm flex items-center gap-1 mt-1">
                <span className="material-icons text-sm">place</span> {property.location}
              </p>
            </div>
            <span className="text-xl font-semibold text-mosque">
              {property.priceFormatted}
            </span>
          </div>

          {/* Spec Icons */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
            <div className="flex items-center gap-2 text-nordic-muted text-sm">
              <span className="material-icons text-lg">king_bed</span> {property.beds} Beds
            </div>
            <div className="flex items-center gap-2 text-nordic-muted text-sm">
              <span className="material-icons text-lg">bathtub</span> {property.baths} Baths
            </div>
            <div className="flex items-center gap-2 text-nordic-muted text-sm">
              <span className="material-icons text-lg">square_foot</span> {property.area}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
