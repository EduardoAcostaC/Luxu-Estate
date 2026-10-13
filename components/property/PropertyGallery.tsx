'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { PropertyImage } from '@/types/property';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
  tag?: string;
  listingType: 'sale' | 'rent';
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  title,
  tag,
  listingType,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  return (
    <section className="space-y-4">
      {/* Hero / Main Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group bg-slate-200">
        <Image
          key={activeImage.id}
          alt={activeImage.altText || title}
          src={activeImage.imageUrl}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {tag && (
            <span className="bg-mosque text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {tag}
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-md text-nordic-dark text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        {/* View All Photos Button */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-nordic-dark px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-md transition-all flex items-center gap-2 z-10 hover:shadow-xl active:scale-95"
        >
          <span className="material-icons text-sm text-mosque">grid_view</span>
          View All Photos ({images.length})
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto hide-scroll pb-2 snap-x">
          {images.map((image, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex-none w-44 sm:w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer snap-start relative transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-mosque ring-offset-2 ring-offset-clear-day opacity-100 shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  alt={image.altText || `${title} photo ${idx + 1}`}
                  src={image.imageUrl}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-sm animate-fade-in"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white z-10">
            <div className="text-sm font-medium tracking-wide">
              {title} &mdash; <span className="text-white/70">{activeIndex + 1} of {images.length}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo gallery"
            >
              <span className="material-icons text-2xl">close</span>
            </button>
          </div>

          {/* Main Photo View */}
          <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
              <Image
                alt={activeImage.altText || title}
                src={activeImage.imageUrl}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <span className="material-icons text-3xl">chevron_left</span>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm"
              aria-label="Next photo"
            >
              <span className="material-icons text-3xl">chevron_right</span>
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto hide-scroll py-2 z-10 max-w-4xl mx-auto">
            {images.map((image, idx) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-opacity ${
                  idx === activeIndex ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  alt={image.caption || `Thumbnail ${idx + 1}`}
                  src={image.imageUrl}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
