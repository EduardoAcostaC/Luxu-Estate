'use client';

import React from 'react';
import Link from 'next/link';
import { buildHomeHref, type HomeFilters } from '@/lib/home-params';
import { useTranslation } from '@/lib/i18n';

interface PaginationProps {
  filters: HomeFilters;
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}

/** Returns page numbers with `null` placeholders for ellipses, e.g. [1, null, 4, 5, 6, null, 12]. */
function getPageItems(page: number, totalPages: number): (number | null)[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const items: (number | null)[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) items.push(null);
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push(null);
  items.push(totalPages);
  return items;
}

const baseItem =
  'h-10 inline-flex items-center justify-center rounded-lg text-sm font-medium leading-none tabular-nums transition-all';
const numberItem = `${baseItem} min-w-10 px-3`;
const labelItem = `${baseItem} px-5`;

const enabledLabel =
  'bg-white border border-nordic-dark/10 text-nordic-dark hover:border-mosque hover:text-mosque hover:shadow-md';
const disabledLabel =
  'bg-white/60 border border-nordic-dark/5 text-nordic-muted/50 cursor-not-allowed';

export const Pagination: React.FC<PaginationProps> = ({
  filters,
  page,
  totalPages,
  total,
  pageSize,
}) => {
  const { t } = useTranslation();

  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const hrefFor = (p: number) => buildHomeHref(filters, { page: p }, '#market');

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <p className="text-sm text-nordic-muted">
        {t('pagination.showing', { from, to, total })}
      </p>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="w-full grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-3"
        >
          <div className="order-2 sm:order-1 justify-self-start">
            {page > 1 ? (
              <Link
                href={hrefFor(page - 1)}
                aria-label={t('pagination.prevAria')}
                className={`${labelItem} ${enabledLabel}`}
              >
                {t('pagination.prev')}
              </Link>
            ) : (
              <span aria-disabled="true" className={`${labelItem} ${disabledLabel}`}>
                {t('pagination.prev')}
              </span>
            )}
          </div>

          <div className="order-1 sm:order-2 col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 flex-wrap">
            {getPageItems(page, totalPages).map((item, idx) =>
              item === null ? (
                <span
                  key={`ellipsis-${idx}`}
                  className={`${numberItem} px-0 text-nordic-muted`}
                >
                  …
                </span>
              ) : item === page ? (
                <span
                  key={item}
                  aria-current="page"
                  className={`${numberItem} bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10`}
                >
                  {item}
                </span>
              ) : (
                <Link
                  key={item}
                  href={hrefFor(item)}
                  aria-label={t('pagination.pageAria', { page: item })}
                  className={`${numberItem} bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5`}
                >
                  {item}
                </Link>
              )
            )}
          </div>

          <div className="order-3 justify-self-end">
            {page < totalPages ? (
              <Link
                href={hrefFor(page + 1)}
                aria-label={t('pagination.nextAria')}
                className={`${labelItem} ${enabledLabel}`}
              >
                {t('pagination.next')}
              </Link>
            ) : (
              <span aria-disabled="true" className={`${labelItem} ${disabledLabel}`}>
                {t('pagination.next')}
              </span>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};
