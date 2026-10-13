'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface PropertyMapWrapperProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

const DynamicPropertyMap = dynamic(
  () => import('./PropertyMap').then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center animate-pulse">
        <div className="flex flex-col items-center gap-2 text-nordic-muted">
          <span className="material-icons text-mosque text-3xl animate-bounce">location_on</span>
          <span className="text-xs font-medium">Loading interactive map...</span>
        </div>
      </div>
    ),
  }
);

export const PropertyMapWrapper: React.FC<PropertyMapWrapperProps> = (props) => {
  return <DynamicPropertyMap {...props} />;
};
