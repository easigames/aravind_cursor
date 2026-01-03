'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { themeClasses } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key or when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', name: 'Home', href: '/' },
    { id: 'services', name: 'Services', href: '/services' },
    { id: 'portfolio', name: 'Portfolio', href: '/portfolio' },
    { id: 'pricing', name: 'Pricing', href: '/pricing' },
    { id: 'about', name: 'About Us', href: '/about' },
    { id: 'contact', name: 'Contact', href: '/contact' },
  ];

  // Determine active tab based on current pathname
  const isActiveTab = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? `${themeClasses.headerScrolled} ${themeClasses.shadow}`
          : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with Creative Design */}
          <Link href="/" className="group flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ArvEdit
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 -mt-1 tracking-wider hidden xs:block">CREATIVE STUDIO</span>
            </div>
          </Link>

          {/* Desktop Navigation - Creative Tab Style */}
          <div className={`hidden lg:flex items-center transition-all duration-300 ${isScrolled
              ? `${themeClasses.glassEffectDark} ${themeClasses.borderLight}`
              : `${themeClasses.glassEffect} ${themeClasses.border}`
            } rounded-full px-2 py-2 border`}>
            {navItems.map((item) => {
              const isActive = isActiveTab(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative px-5 py-2.5 rounded-full transition-all duration-500 ease-out ${isActive
                      ? themeClasses.textWhite
                      : `${themeClasses.headerTextSecondary} hover:${themeClasses.textPrimary}`
                    }`}
                >
                  {/* Active Tab Background */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-full ${themeClasses.gradient} ${themeClasses.shadowPurple} animate-slide-in`}></div>
                  )}

                  {/* Content */}
                  <span className="text-sm font-semibold whitespace-nowrap relative z-10">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className={`group relative px-6 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 ${isScrolled
                  ? `${themeClasses.buttonPrimary} ${themeClasses.shadowPurple}`
                  : themeClasses.buttonSecondary
                }`}
            >
              <div className="relative flex items-center space-x-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span>Start Your Project</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu - Theme Toggle & Hamburger */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className={`relative w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${isScrolled
                  ? `${themeClasses.cardBg} ${themeClasses.cardHoverBg}`
                  : `${themeClasses.glassEffect} ${themeClasses.border} border`
                }`}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-purple-600' : isScrolled ? 'bg-purple-600' : 'bg-gray-600 dark:bg-gray-300'
                    } ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                ></span>
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-purple-600' : isScrolled ? 'bg-purple-600' : 'bg-gray-600 dark:bg-gray-300'
                    } ${isMenuOpen ? 'opacity-0' : ''}`}
                ></span>
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-purple-600' : isScrolled ? 'bg-purple-600' : 'bg-gray-600 dark:bg-gray-300'
                    } ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu - Slide from Right */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] z-50 transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${themeClasses.cardBg} shadow-2xl`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ArvEdit
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95`}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-180px)]">
          {navItems.map((item, index) => {
            const isActive = isActiveTab(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex items-center px-4 py-4 min-h-[48px] rounded-xl transition-all duration-300 ease-out overflow-hidden active:scale-95 ${
                  isActive
                    ? `${themeClasses.textWhite} shadow-lg`
                    : `${themeClasses.headerTextSecondary} hover:bg-gray-100 dark:hover:bg-gray-800`
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                  opacity: isMenuOpen ? 1 : 0,
                  transitionDelay: isMenuOpen ? `${index * 50 + 100}ms` : '0ms'
                }}
              >
                {isActive && (
                  <div className={`absolute inset-0 ${themeClasses.gradient} rounded-xl`}></div>
                )}

                {/* Icon indicator for active item */}
                {isActive && (
                  <div className="absolute left-2 w-1 h-6 bg-white/50 rounded-full"></div>
                )}

                <span className="text-sm font-semibold relative z-10 flex-1">{item.name}</span>

                {/* Arrow for navigation */}
                <svg
                  className={`w-4 h-4 relative z-10 transition-transform ${isActive ? 'text-white' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* CTA Button at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/contact"
            className={`flex items-center justify-center space-x-2 px-4 py-4 min-h-[48px] rounded-xl ${themeClasses.gradient} ${themeClasses.textWhite} ${themeClasses.shadow} hover:shadow-xl transition-all duration-300 active:scale-95 font-semibold w-full`}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Start Your Project</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

