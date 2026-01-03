'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { themeClasses } = useTheme();

  return (
    <footer className={`${themeClasses.footerBg} ${themeClasses.footerText} py-8 sm:py-10 md:py-16 relative`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Company Info - Always on top on mobile */}
        <div className="mb-6 sm:mb-8 lg:hidden">
          <Link href="/" className="group flex items-center gap-2.5 mb-3 inline-flex">
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ArvEdit
              </span>
              <span className={`text-[9px] sm:text-[10px] ${themeClasses.textSecondary} -mt-0.5 tracking-widest uppercase`}>Creative Studio</span>
            </div>
          </Link>
          <p className={`${themeClasses.textSecondary} text-xs sm:text-sm mb-3`}>
            Professional video editing that brings your stories to life.
          </p>
          <div className="flex gap-2.5">
            <a href="https://www.instagram.com/arvedit" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 min-w-[36px] min-h-[36px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95`}>
              <svg className={`w-4 h-4 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@arvedit" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 min-w-[36px] min-h-[36px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95`}>
              <svg className={`w-4 h-4 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links Grid - Side by side on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12 mb-6 sm:mb-8">
          {/* Company Info - Desktop only */}
          <div className="hidden lg:block">
            <Link href="/" className="group flex items-center gap-3 mb-6 inline-flex">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse shadow-lg shadow-green-400/50 group-hover:scale-125 group-hover:bg-green-300 transition-all duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ArvEdit
                </span>
                <span className={`text-xs ${themeClasses.textSecondary} -mt-0.5 tracking-widest uppercase`}>Creative Studio</span>
              </div>
            </Link>
            <p className={`${themeClasses.textSecondary} mb-6 text-base`}>
              Professional video editing services that bring your stories to life with creativity and precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/arvedit" target="_blank" rel="noopener noreferrer" className={`w-11 h-11 min-w-[44px] min-h-[44px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95 sm:hover:scale-110`}>
                <svg className={`w-5 h-5 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@arvedit" target="_blank" rel="noopener noreferrer" className={`w-11 h-11 min-w-[44px] min-h-[44px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95 sm:hover:scale-110`}>
                <svg className={`w-5 h-5 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 lg:mb-4 ${themeClasses.footerHeading}`}>Quick Links</h3>
            <ul className="space-y-1 sm:space-y-1.5 lg:space-y-3">
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 lg:mb-4 ${themeClasses.footerHeading}`}>Services</h3>
            <ul className="space-y-1 sm:space-y-1.5 lg:space-y-3">
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Short-Form Editing
                </Link>
              </li>
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Captions & Hooks
                </Link>
              </li>
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Viral Style Videos
                </Link>
              </li>
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Color & Branding
                </Link>
              </li>
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Audio & Syncing
                </Link>
              </li>
              <li>
                <Link href="/services" className={`${themeClasses.footerLink} transition-colors text-xs sm:text-sm lg:text-base py-1.5 sm:py-2 inline-block`}>
                  Event & Highlights
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${themeClasses.footerBorder} pt-6 sm:pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${themeClasses.textSecondary} text-xs sm:text-sm text-center md:text-left`}>
              © 2025 ArvEdit. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/privacy" className={`${themeClasses.footerLink} text-xs sm:text-sm transition-colors py-1`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`${themeClasses.footerLink} text-xs sm:text-sm transition-colors py-1`}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

