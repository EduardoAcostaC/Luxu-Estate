'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  latitude,
  longitude,
  title,
  address,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: 14,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    // Beautiful, clean basemap tiles (CartoDB Positron - matches LuxeEstate clean palette)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Custom LuxeEstate Mosque marker pin
    const customIcon = L.divIcon({
      className: 'custom-luxe-marker',
      html: `
        <div style="
          width: 34px;
          height: 34px;
          background-color: #006655;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 102, 85, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        ">
          <span style="font-family: 'Material Icons'; font-size: 18px; line-height: 1;">home</span>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18],
    });

    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

    // Marker popup with property card
    marker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 4px; color: #19322F;">
        <strong style="display: block; font-size: 14px; margin-bottom: 2px;">${title}</strong>
        <span style="font-size: 12px; color: #5C706D;">${address}</span>
      </div>
    `);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, title, address]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 z-0">
      <div ref={mapContainerRef} className="w-full h-full" />
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 z-[400] bg-white/90 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md text-nordic-dark hover:text-mosque transition-all backdrop-blur-sm"
      >
        View on Google Maps
      </a>
    </div>
  );
};
