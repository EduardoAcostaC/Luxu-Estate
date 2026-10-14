'use client';

import React from 'react';
import type { Locale } from '@/locales/config';

interface FlagIconProps {
  locale: Locale;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * High-definition vector SVG flags for supported languages (es, en, fr).
 * Ensures crisp, pixel-perfect rendering across all operating systems and browsers,
 * including Windows where Unicode country flag emojis often do not render.
 */
export const FlagIcon: React.FC<FlagIconProps> = ({
  locale,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-5 h-3.5',
    lg: 'w-6 h-4',
  }[size];

  if (locale === 'es') {
    // Flag of Spain: Red, Yellow (double width), Red horizontal stripes with crest emblem
    return (
      <svg
        className={`inline-block shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] ${sizeClasses} ${className}`}
        viewBox="0 0 750 500"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="750" height="500" fill="#c60b1e" />
        <rect width="750" height="250" y="125" fill="#ffc400" />
        {/* Simplified Spanish coat of arms */}
        <g transform="translate(200, 250) scale(0.9)">
          {/* Left Pillar */}
          <rect x="-95" y="-70" width="8" height="140" rx="3" fill="#ffffff" stroke="#c60b1e" strokeWidth="2" />
          <circle cx="-91" cy="-75" r="7" fill="#ffc400" stroke="#c60b1e" strokeWidth="2" />
          {/* Right Pillar */}
          <rect x="87" y="-70" width="8" height="140" rx="3" fill="#ffffff" stroke="#c60b1e" strokeWidth="2" />
          <circle cx="91" cy="-75" r="7" fill="#ffc400" stroke="#c60b1e" strokeWidth="2" />
          {/* Shield */}
          <path
            d="M -50 -60 L 50 -60 L 50 20 Q 50 80 0 100 Q -50 80 -50 20 Z"
            fill="#c60b1e"
            stroke="#ffc400"
            strokeWidth="6"
          />
          {/* Shield Inner Quarters */}
          <rect x="-42" y="-52" width="40" height="48" fill="#c60b1e" />
          <rect x="2" y="-52" width="40" height="48" fill="#ffffff" />
          <rect x="-42" y="0" width="40" height="48" fill="#ffc400" />
          <rect x="2" y="0" width="40" height="48" fill="#c60b1e" />
          {/* Crown */}
          <path
            d="M -45 -65 L -35 -90 L -15 -72 L 0 -95 L 15 -72 L 35 -90 L 45 -65 Z"
            fill="#ffc400"
            stroke="#c60b1e"
            strokeWidth="3"
          />
          <circle cx="0" cy="-98" r="4" fill="#ffc400" />
        </g>
      </svg>
    );
  }

  if (locale === 'en') {
    // Flag of the United States: 13 stripes + Canton with stars
    return (
      <svg
        className={`inline-block shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] ${sizeClasses} ${className}`}
        viewBox="0 0 741 390"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="741" height="390" fill="#b22234" />
        {/* 6 white stripes */}
        <path
          d="M0 30h741v30H0zM0 90h741v30H0zM0 150h741v30H0zM0 210h741v30H0zM0 270h741v30H0zM0 330h741v30H0z"
          fill="#ffffff"
        />
        {/* Blue Canton */}
        <rect width="296" height="210" fill="#3c3b6e" />
        {/* Star Grid representation */}
        <g fill="#ffffff">
          {[
            [35, 25], [85, 25], [135, 25], [185, 25], [235, 25],
            [60, 50], [110, 50], [160, 50], [210, 50],
            [35, 75], [85, 75], [135, 75], [185, 75], [235, 75],
            [60, 100], [110, 100], [160, 100], [210, 100],
            [35, 125], [85, 125], [135, 125], [185, 125], [235, 125],
            [60, 150], [110, 150], [160, 150], [210, 150],
            [35, 175], [85, 175], [135, 175], [185, 175], [235, 175],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="6" />
          ))}
        </g>
      </svg>
    );
  }

  if (locale === 'fr') {
    // Flag of France: Blue, White, Red vertical tricolor
    return (
      <svg
        className={`inline-block shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] ${sizeClasses} ${className}`}
        viewBox="0 0 900 600"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="300" height="600" fill="#002654" />
        <rect x="300" width="300" height="600" fill="#ffffff" />
        <rect x="600" width="300" height="600" fill="#ce1126" />
      </svg>
    );
  }

  return null;
};
