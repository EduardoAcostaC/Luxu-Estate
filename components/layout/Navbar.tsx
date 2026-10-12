'use client';

import React, { useState } from 'react';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Buy',
  onTabChange,
  savedCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navLinks = ['Buy', 'Rent', 'Sell', 'Saved Homes'];

  const handleNavClick = (tab: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentTab(tab);
    if (onTabChange) onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background-light/95 backdrop-blur-md border-b border-nordic-dark/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setCurrentTab('Buy')}
          >
            <div className="w-8 h-8 rounded-lg bg-nordic-dark flex items-center justify-center text-white shadow-sm">
              <span className="material-icons text-white text-lg">apartment</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-nordic-dark">
              LuxeEstate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((tab) => {
              const isActive = currentTab === tab;
              return (
                <button
                  key={tab}
                  onClick={(e) => handleNavClick(tab, e)}
                  className={`font-medium text-sm px-1 py-1 transition-all ${
                    isActive
                      ? 'text-mosque border-b-2 border-mosque'
                      : 'text-nordic-dark/70 hover:text-nordic-dark hover:border-b-2 hover:border-nordic-dark/20'
                  }`}
                >
                  {tab}
                  {tab === 'Saved Homes' && savedCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-mosque/10 text-mosque font-semibold">
                      {savedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center space-x-6">
            <button
              aria-label="Search"
              className="text-nordic-dark hover:text-mosque transition-colors"
            >
              <span className="material-icons">search</span>
            </button>

            <button
              aria-label="Notifications"
              className="text-nordic-dark hover:text-mosque transition-colors relative"
            >
              <span className="material-icons">notifications_none</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
            </button>

            <button
              aria-label="User Profile"
              className="flex items-center gap-2 pl-2 border-l border-nordic-dark/10 ml-2"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA"
                />
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle mobile menu"
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
          mobileMenuOpen ? 'max-h-60 opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-4 space-y-1">
          {navLinks.map((tab) => {
            const isActive = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={(e) => handleNavClick(tab, e)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'text-mosque bg-mosque/10'
                    : 'text-nordic-dark hover:bg-black/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
