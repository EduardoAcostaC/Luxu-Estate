'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  DEFAULT_FILTERS,
  buildHomeHref,
  parseHomeParams,
  type HomeFilters,
} from '@/lib/home-params';
import { useSavedHomes } from '@/components/home/SavedHomesProvider';
import { useTranslation } from '@/lib/i18n';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  /** Current URL filters (Buy/Rent tabs keep category and search). */
  filters?: HomeFilters;
}

type NavKey = 'buy' | 'rent' | 'sell' | 'savedHomes';
const NAV_KEYS: NavKey[] = ['buy', 'rent', 'sell', 'savedHomes'];

/** Reads the URL filters on the client; must be rendered inside <Suspense>. */
export const NavbarWithSearchParams: React.FC = () => {
  const searchParams = useSearchParams();
  const filters = parseHomeParams(Object.fromEntries(searchParams.entries()));
  return <Navbar filters={filters} />;
};

export const Navbar: React.FC<NavbarProps> = ({ filters = DEFAULT_FILTERS }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { savedIds, view, setView } = useSavedHomes();
  const { t } = useTranslation();
  const savedCount = savedIds.length;

  const activeTab: NavKey =
    view === 'saved' ? 'savedHomes' : filters.listing === 'rent' ? 'rent' : 'buy';

  const hrefFor = (tabKey: NavKey): string | null => {
    if (tabKey === 'buy') return buildHomeHref(filters, { listing: 'all' });
    if (tabKey === 'rent') return buildHomeHref(filters, { listing: 'rent' });
    return null;
  };

  const handleTabClick = (tabKey: NavKey) => {
    if (tabKey === 'savedHomes') setView('saved');
    else if (tabKey === 'buy' || tabKey === 'rent') setView('browse');
    setMobileMenuOpen(false);
  };

  const renderTab = (tabKey: NavKey, className: string, label: string) => {
    const href = hrefFor(tabKey);
    return href ? (
      <Link key={tabKey} href={href} onClick={() => handleTabClick(tabKey)} className={className}>
        {label}
        {tabKey === 'savedHomes' && savedCount > 0 && (
          <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-mosque/10 text-mosque font-semibold">
            {savedCount}
          </span>
        )}
      </Link>
    ) : (
      <button key={tabKey} type="button" onClick={() => handleTabClick(tabKey)} className={className}>
        {label}
        {tabKey === 'savedHomes' && savedCount > 0 && (
          <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-mosque/10 text-mosque font-semibold">
            {savedCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-background-light/95 backdrop-blur-md border-b border-nordic-dark/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setView('browse')}
          >
            <div className="w-8 h-8 rounded-lg bg-nordic-dark flex items-center justify-center text-white shadow-sm">
              <span className="material-icons text-white text-lg">apartment</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-nordic-dark">
              LuxeEstate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_KEYS.map((tabKey) => {
              const isActive = activeTab === tabKey;
              const label = t(`nav.${tabKey}`);
              return renderTab(
                tabKey,
                `font-medium text-sm px-1 py-1 transition-all ${
                  isActive
                    ? 'text-mosque border-b-2 border-mosque'
                    : 'text-nordic-dark/70 hover:text-nordic-dark hover:border-b-2 hover:border-nordic-dark/20'
                }`,
                label
              );
            })}
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Language Selector (Desktop) */}
            <LanguageSelector variant="dropdown" />

            <button
              aria-label={t('nav.searchAria')}
              className="text-nordic-dark hover:text-mosque transition-colors"
            >
              <span className="material-icons">search</span>
            </button>

            <button
              aria-label={t('nav.notificationsAria')}
              className="text-nordic-dark hover:text-mosque transition-colors relative"
            >
              <span className="material-icons">notifications_none</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
            </button>

            <button
              aria-label={t('nav.profileAria')}
              className="flex items-center gap-2 pl-2 border-l border-nordic-dark/10"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all relative">
                <Image
                  alt="Profile"
                  width={36}
                  height={36}
                  unoptimized
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA"
                />
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label={t('nav.toggleMenuAria')}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-nordic-dark hover:text-mosque p-1 rounded-lg"
            >
              <span className="material-icons">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden border-t border-nordic-dark/5 bg-background-light overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-4 space-y-1">
          {NAV_KEYS.map((tabKey) => {
            const isActive = activeTab === tabKey;
            const label = t(`nav.${tabKey}`);
            return renderTab(
              tabKey,
              `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive ? 'text-mosque bg-mosque/10' : 'text-nordic-dark hover:bg-black/5'
              }`,
              label
            );
          })}

          <div className="pt-3 border-t border-nordic-dark/10 mt-2">
            <LanguageSelector variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
};
