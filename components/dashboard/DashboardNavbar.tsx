'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useLanguage } from '@/lib/i18n';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { RoleBadge } from './RoleBadge';
import type { AppRole } from '@/lib/supabase/database.types';

interface DashboardNavbarProps {
  currentUserRole?: AppRole | null;
}

export function DashboardNavbar({ currentUserRole = 'admin' }: DashboardNavbarProps) {
  const pathname = usePathname();
  const { user, userName, userEmail, avatarUrl, signOut } = useAuth();
  const { t } = useLanguage();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  const navLinks = [
    {
      href: '/dashboard',
      label: t('dashboard.propertiesTab'),
      active: pathname === '/dashboard' || pathname.startsWith('/dashboard/properties'),
      icon: 'apartment',
    },
    {
      href: '/dashboard/users',
      label: t('dashboard.usersTab'),
      active: pathname.startsWith('/dashboard/users'),
      icon: 'group',
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-nordic-dark/10 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8 md:gap-12">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 select-none group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-mosque flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <span className="material-icons text-lg">apartment</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-lg text-nordic-dark tracking-tight">
                  LuxeEstate
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-mosque bg-mosque/10 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-2 px-1 py-1 text-sm font-medium border-b-2 transition-all ${
                    link.active
                      ? 'border-mosque text-mosque font-semibold'
                      : 'border-transparent text-nordic-dark/60 hover:text-nordic-dark hover:border-nordic-dark/20'
                  }`}
                >
                  <span className="material-icons text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Area: View Site, Language, Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Link back to public site */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-nordic-dark/70 hover:text-nordic-dark hover:bg-black/5 border border-nordic-dark/10 transition-colors"
            >
              <span className="material-icons text-sm">open_in_new</span>
              <span>{t('dashboard.backToSite')}</span>
            </Link>

            {/* Language Selector */}
            <LanguageSelector variant="dropdown" />

            {/* Notifications */}
            <button
              type="button"
              aria-label="Notifications"
              className="p-2 rounded-full text-nordic-dark/60 hover:text-mosque hover:bg-black/5 transition-colors relative"
            >
              <span className="material-icons text-xl">notifications_none</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-mosque rounded-full"></span>
            </button>

            {/* Profile Menu */}
            <div className="relative pl-2 border-l border-nordic-dark/10" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-mosque/30 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-nordic-dark/10 relative flex items-center justify-center">
                  {avatarUrl ? (
                    <Image
                      alt={userName || 'User'}
                      src={avatarUrl}
                      width={32}
                      height={32}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-mosque text-white font-semibold text-xs">
                      {(userName || userEmail || 'A').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="hidden lg:flex flex-col items-start text-left">
                  <span className="text-xs font-bold text-nordic-dark leading-tight truncate max-w-[120px]">
                    {userName || 'Administrator'}
                  </span>
                  <span className="text-[10px] text-nordic-dark/60 capitalize leading-tight">
                    {currentUserRole || 'admin'}
                  </span>
                </div>
                <span className="material-icons text-nordic-dark/40 text-sm hidden lg:block">
                  expand_more
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-soft border border-nordic-dark/10 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-nordic-dark/10">
                    <p className="text-xs font-bold text-nordic-dark truncate">
                      {userName || 'Admin'}
                    </p>
                    <p className="text-[11px] text-nordic-dark/60 truncate mt-0.5">
                      {userEmail || user?.email}
                    </p>
                    <div className="mt-2">
                      <RoleBadge role={currentUserRole || 'admin'} />
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-nordic-dark/80 hover:text-nordic-dark hover:bg-black/5 transition-colors"
                    >
                      <span className="material-icons text-sm text-mosque">home</span>
                      <span>{t('dashboard.backToSite')}</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-nordic-dark/10">
                    <button
                      type="button"
                      onClick={async () => {
                        setProfileOpen(false);
                        await signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
                    >
                      <span className="material-icons text-sm">logout</span>
                      <span>{t('nav.signOut')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-nordic-dark/70 hover:text-nordic-dark rounded-lg hover:bg-black/5"
            >
              <span className="material-icons text-xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-nordic-dark/10 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  link.active
                    ? 'bg-mosque text-white font-semibold'
                    : 'text-nordic-dark hover:bg-black/5'
                }`}
              >
                <span className="material-icons text-base">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-nordic-dark/70 hover:bg-black/5"
            >
              <span className="material-icons text-base">open_in_new</span>
              <span>{t('dashboard.backToSite')}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
