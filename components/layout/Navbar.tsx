'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
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
import { useAuth } from '@/lib/auth/AuthProvider';
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

const emptySubscribe = () => () => {};

export const Navbar: React.FC<NavbarProps> = ({ filters = DEFAULT_FILTERS }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const { savedIds, view, setView } = useSavedHomes();
  const { t } = useTranslation();
  const { user, avatarUrl, userName, userEmail, provider, signOut, loading } = useAuth();
  const savedCount = savedIds.length;

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

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

  const handleSignOut = async () => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    await signOut();
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

            {/* Profile / Auth Section */}
            {!mounted || loading ? (
              <div className="w-9 h-9 rounded-full bg-nordic-dark/10 animate-pulse" />
            ) : user ? (
              <div className="relative pl-2 border-l border-nordic-dark/10" ref={profileMenuRef}>
                <button
                  aria-label={t('nav.profileAria')}
                  aria-expanded={profileMenuOpen}
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-mosque/40 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all relative flex items-center justify-center">
                    {avatarUrl ? (
                      <Image
                        alt={userName || 'User avatar'}
                        width={36}
                        height={36}
                        unoptimized
                        className="w-full h-full object-cover"
                        src={avatarUrl}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-mosque text-white font-semibold text-xs">
                        {(userName || userEmail || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-soft-hover border border-nordic-dark/10 py-2 z-50 animate-in fade-in duration-150">
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-nordic-dark/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                          {avatarUrl ? (
                            <Image
                              alt={userName || 'Avatar'}
                              width={40}
                              height={40}
                              unoptimized
                              className="w-full h-full object-cover"
                              src={avatarUrl}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-mosque text-white font-semibold text-sm">
                              {(userName || userEmail || 'U').charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-nordic truncate">
                            {userName}
                          </p>
                          <p className="text-xs text-nordic/60 truncate">
                            {userEmail}
                          </p>
                        </div>
                      </div>
                      {provider && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-nordic/5 text-nordic/80 capitalize">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{provider}</span>
                        </div>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-nordic/80 hover:text-nordic hover:bg-black/5 transition-colors cursor-pointer text-left"
                      >
                        <span className="material-icons text-lg text-mosque">dashboard</span>
                        <span>{t('dashboard.title')}</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setView('saved');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-nordic/80 hover:text-nordic hover:bg-black/5 transition-colors cursor-pointer text-left"
                      >
                        <span className="material-icons text-lg text-mosque">bookmark_border</span>
                        <span>{t('nav.savedHomes')}</span>
                        {savedCount > 0 && (
                          <span className="ml-auto px-1.5 py-0.5 text-xs rounded-full bg-mosque/10 text-mosque font-semibold">
                            {savedCount}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Sign Out */}
                    <div className="pt-1 border-t border-nordic-dark/10">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer text-left font-medium"
                      >
                        <span className="material-icons text-lg text-red-600">logout</span>
                        <span>{t('nav.signOut')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="pl-2 border-l border-nordic-dark/10">
                <Link
                  href="/login"
                  id="navbar-signin-btn"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg bg-mosque text-white hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-soft"
                >
                  <span className="material-icons text-base">login</span>
                  <span>{t('nav.signIn')}</span>
                </Link>
              </div>
            )}

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
          {/* User profile banner in mobile */}
          {mounted && user && (
            <div className="mb-3 p-3 rounded-lg bg-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                  {avatarUrl ? (
                    <Image
                      alt={userName || 'Avatar'}
                      width={32}
                      height={32}
                      unoptimized
                      className="w-full h-full object-cover"
                      src={avatarUrl}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-mosque text-white font-semibold text-xs">
                      {(userName || userEmail || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-nordic truncate">{userName}</p>
                  <p className="text-xs text-nordic/60 truncate">{userEmail}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                title={t('nav.signOut')}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <span className="material-icons text-xl">logout</span>
              </button>
            </div>
          )}

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

          {mounted && user && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-mosque bg-mosque/5 hover:bg-mosque/10 transition-colors"
            >
              <span className="material-icons text-lg">dashboard</span>
              <span>{t('dashboard.title')}</span>
            </Link>
          )}

          {mounted && !user && !loading && (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block w-full text-center px-4 py-2.5 rounded-lg bg-mosque text-white font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              {t('nav.signIn')}
            </Link>
          )}

          <div className="pt-3 border-t border-nordic-dark/10 mt-2">
            <LanguageSelector variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

