'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from '@/lib/i18n';

export interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  zoom?: number;
  editable?: boolean;
  onCoordinatesChange?: (lat: number, lng: number) => void;
  className?: string;
  showGoogleMapsButton?: boolean;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  latitude,
  longitude,
  title = '',
  address = '',
  zoom = 14,
  editable = false,
  onCoordinatesChange,
  className,
  showGoogleMapsButton = true,
}) => {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerInstanceRef = useRef<L.Marker | null>(null);
  const isInternalUpdateRef = useRef(false);

  // Initialize Map once on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (isNaN(lat) || isNaN(lng)) return;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: zoom,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    // OpenStreetMap standard tiles (100% free, no API key required, no watermarks)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom LuxeEstate Mosque marker pin
    const customIcon = L.divIcon({
      className: 'custom-luxe-marker !bg-transparent !border-0',
      html: `
        <div style="
          width: 36px;
          height: 36px;
          background-color: #006655;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 4px 14px rgba(0, 102, 85, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: ${editable ? 'grab' : 'pointer'};
          transition: transform 0.15s ease;
        ">
          <span style="font-family: 'Material Icons'; font-size: 20px; line-height: 1;">home</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20],
    });

    const marker = L.marker([lat, lng], {
      icon: customIcon,
      draggable: Boolean(editable),
    }).addTo(map);

    if (title || address) {
      marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px; color: #19322F;">
          ${title ? `<strong style="display: block; font-size: 14px; margin-bottom: 2px;">${title}</strong>` : ''}
          ${address ? `<span style="font-size: 12px; color: #5C706D;">${address}</span>` : ''}
        </div>
      `);
    }

    if (editable && onCoordinatesChange) {
      marker.on('dragend', (e) => {
        const markerPos = e.target.getLatLng();
        isInternalUpdateRef.current = true;
        onCoordinatesChange(markerPos.lat, markerPos.lng);
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        map.panTo(e.latlng);
        isInternalUpdateRef.current = true;
        onCoordinatesChange(e.latlng.lat, e.latlng.lng);
      });
    }

    mapInstanceRef.current = map;
    markerInstanceRef.current = marker;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markerInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync center and marker when external coordinates change
  useEffect(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);
    if (isNaN(lat) || isNaN(lng)) return;

    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }

    if (mapInstanceRef.current && markerInstanceRef.current) {
      const currentPos = markerInstanceRef.current.getLatLng();
      if (
        Math.abs(currentPos.lat - lat) > 0.00001 ||
        Math.abs(currentPos.lng - lng) > 0.00001
      ) {
        markerInstanceRef.current.setLatLng([lat, lng]);
        mapInstanceRef.current.panTo([lat, lng]);
      }
    }
  }, [latitude, longitude]);

  // Update popup if title or address changes
  useEffect(() => {
    if (markerInstanceRef.current && (title || address)) {
      markerInstanceRef.current.setPopupContent(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px; color: #19322F;">
          ${title ? `<strong style="display: block; font-size: 14px; margin-bottom: 2px;">${title}</strong>` : ''}
          ${address ? `<span style="font-size: 12px; color: #5C706D;">${address}</span>` : ''}
        </div>
      `);
    }
  }, [title, address]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div
      className={
        className ||
        'relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 z-0'
      }
    >
      <div ref={mapContainerRef} className="w-full h-full" />
      {showGoogleMapsButton && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 z-[400] bg-white/95 hover:bg-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm text-nordic hover:text-mosque transition-all backdrop-blur-sm cursor-pointer border border-gray-200/80 flex items-center gap-1"
        >
          <span className="material-icons text-xs text-mosque">open_in_new</span>
          {t('map.viewOnGoogleMaps')}
        </a>
      )}
    </div>
  );
};
