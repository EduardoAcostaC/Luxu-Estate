import React from 'react';
import { useTranslation } from '@/lib/i18n';

interface FiltersToggleButtonProps {
  onClick: () => void;
  activeCount?: number;
}

export const FiltersToggleButton: React.FC<FiltersToggleButtonProps> = ({
  onClick,
  activeCount = 0,
}) => {
  const { t } = useTranslation();
  const hasActiveFilters = activeCount > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all cursor-pointer shadow-xs ${
        hasActiveFilters
          ? 'bg-mosque text-white shadow-md shadow-mosque/20'
          : 'bg-white border border-nordic-dark/10 text-nordic-dark hover:bg-black/5 hover:border-mosque/40'
      }`}
    >
      <span className="material-icons text-base">tune</span>
      <span>{t('hero.filterButton')}</span>
      {hasActiveFilters && (
        <span className="ml-0.5 px-1.5 py-0.2 bg-white text-mosque rounded-full text-xs font-bold leading-tight">
          {activeCount}
        </span>
      )}
    </button>
  );
};

