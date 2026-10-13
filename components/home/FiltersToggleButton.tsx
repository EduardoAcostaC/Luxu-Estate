'use client';

import React, { useState } from 'react';

/** Visual-only "Filters" toggle from the original design (kept client-side). */
export const FiltersToggleButton: React.FC = () => {
  const [filterActive, setFilterActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFilterActive(!filterActive)}
      className={`whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer ${
        filterActive ? 'bg-mosque text-white' : 'text-nordic-dark hover:bg-black/5'
      }`}
    >
      <span className="material-icons text-base">tune</span> Filters
    </button>
  );
};
