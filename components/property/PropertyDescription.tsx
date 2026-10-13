'use client';

import React, { useState } from 'react';

interface PropertyDescriptionProps {
  description: string;
}

export const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  // If description is long, we can truncate
  const shouldTruncate = description.length > 280;
  const displayText = !expanded && shouldTruncate ? `${description.slice(0, 280)}...` : description;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-mosque/5">
      <h2 className="text-lg font-semibold mb-4 text-nordic-dark">About this home</h2>
      <div className="prose prose-slate max-w-none text-nordic-dark/75 leading-relaxed text-sm sm:text-base">
        <p className="whitespace-pre-line">{displayText}</p>
      </div>

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-mosque font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
        >
          {expanded ? 'Read less' : 'Read more'}
          <span className="material-icons text-sm">
            {expanded ? 'keyboard_arrow_up' : 'arrow_forward'}
          </span>
        </button>
      )}
    </div>
  );
};
