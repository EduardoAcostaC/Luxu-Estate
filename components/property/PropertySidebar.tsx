'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PropertyDetail } from '@/types/property';
import { useSavedHomes } from '@/components/home/SavedHomesProvider';
import { useTranslation, translatePricePeriod } from '@/lib/i18n';
import { PropertyMapWrapper } from './PropertyMapWrapper';
import { ScheduleVisitModal } from './ScheduleVisitModal';

interface PropertySidebarProps {
  property: PropertyDetail;
}

export const PropertySidebar: React.FC<PropertySidebarProps> = ({ property }) => {
  const { t } = useTranslation();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const { isSaved, toggleSave } = useSavedHomes();
  const saved = isSaved(property.id);

  // WhatsApp pre-filled message URL localized
  const rawMessage = t('propertyDetail.whatsappInterest', {
    title: property.title,
    price: property.priceFormatted,
    location: property.location,
    slug: property.slug,
  });
  const whatsappMessage = encodeURIComponent(rawMessage);
  const whatsappUrl = `https://wa.me/15552345678?text=${whatsappMessage}`;

  return (
    <>
      <div className="sticky top-28 space-y-6">
        {/* Main Price & Agent Card */}
        <div className="bg-white p-6 sm:p-7 rounded-xl shadow-sm border border-mosque/5">
          {/* Price & Address Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-nordic-dark tracking-tight mb-2">
                {property.priceFormatted}
                {property.pricePeriod && (
                  <span className="text-base text-nordic-muted font-normal">
                    {translatePricePeriod(property.pricePeriod, t)}
                  </span>
                )}
              </h1>
              <p className="text-nordic-muted text-sm font-medium flex items-center gap-1.5">
                <span className="material-icons text-mosque text-base">location_on</span>
                {property.location}
              </p>
            </div>

            {/* Favorite / Save Toggle */}
            <button
              type="button"
              aria-label={saved ? t('propertyDetail.removePropertyAria') : t('propertyDetail.savePropertyAria')}
              onClick={() => toggleSave(property.id)}
              className={`p-2.5 rounded-full border transition-all ${
                saved
                  ? 'bg-mosque text-white border-mosque shadow-md'
                  : 'bg-white text-nordic-dark border-slate-200 hover:border-mosque hover:text-mosque'
              }`}
            >
              <span className="material-icons text-xl">
                {saved ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>

          <div className="h-px bg-slate-100 my-6" />

          {/* Agent Information */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-slate-100">
              <Image
                alt={property.agentName}
                src={property.agentAvatarUrl}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-nordic-dark text-base">
                {property.agentName}
              </h3>
              <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                <span className="material-icons text-[14px]">star</span>
                <span>{property.agentTitle || t('propertyDetail.topRatedAgent')}</span>
              </div>
            </div>

            {/* Agent Quick Contact Action Buttons */}
            <div className="ml-auto flex gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('sidebar.chatWhatsApp')}
                className="p-2.5 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors"
                title={t('sidebar.chatWhatsApp')}
              >
                <span className="material-icons text-lg">chat</span>
              </a>
              <a
                href={`tel:${property.agentPhone}`}
                aria-label={t('sidebar.callAgent')}
                className="p-2.5 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors"
                title={t('sidebar.callAgent')}
              >
                <span className="material-icons text-lg">call</span>
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setScheduleModalOpen(true)}
              className="w-full bg-mosque hover:bg-[#005544] text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <span className="material-icons text-xl group-hover:scale-110 transition-transform">
                calendar_today
              </span>
              {t('propertyDetail.scheduleVisit')}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-transparent border border-nordic-dark/15 hover:border-mosque text-nordic-dark/85 hover:text-mosque py-3.5 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span className="material-icons text-xl text-mosque">chat</span>
              {t('propertyDetail.contactWhatsApp')}
            </a>
          </div>
        </div>

        {/* Leaflet Map Card */}
        <div className="bg-white p-3 rounded-xl shadow-sm border border-mosque/5">
          <PropertyMapWrapper
            latitude={property.latitude}
            longitude={property.longitude}
            title={property.title}
            address={property.location}
          />
        </div>
      </div>

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        propertyTitle={property.title}
        propertyLocation={property.location}
      />
    </>
  );
};
