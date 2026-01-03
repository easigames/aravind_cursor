'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';

export default function AboutPage() {
  const { themeClasses } = useTheme();

  return (
    <>
      <StructuredData 
        type="breadcrumb" 
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arvedit.com' },
            { '@type': 'ListItem', position: 2, name: 'About', item: 'https://arvedit.com/about' }
          ]
        }}
      />
      <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
        <Header />
        <div className="pt-16 sm:pt-20 animate-fade-in-up">
        {/* About Us Section */}
        <section className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
          <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                About Us
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
                Your trusted partner in creating viral-worthy content
              </p>
            </div>

            {/* About Content */}
            <div className="max-w-4xl mx-auto">
              {/* Meet Your Video Editors - Show First */}
              <div className="mb-12 sm:mb-16 md:mb-20">
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 md:mb-12">
                  {/* Video camera icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary}`}>
                    Meet Your Video Editors
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  {/* Arvind */}
                  <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center group active:scale-[0.98] sm:hover:scale-105 transition-all duration-300`}>
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6">
                      {/* Gradient ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1">
                        <div className={`w-full h-full ${themeClasses.cardBg} rounded-full`}></div>
                      </div>
                      {/* Photo placeholder - replace with real headshot */}
                      <img
                        src="/images/arvind_pic.jpeg"
                        alt="Arvind Srinivasaraghavan"
                        className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                        }}
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <h4 className={`text-lg sm:text-xl md:text-2xl font-bold ${themeClasses.textPrimary} mb-1 sm:mb-2`}>
                      Arvind Srinivasaraghavan
                    </h4>
                    <p className={`${themeClasses.gradientText} font-semibold mb-2 sm:mb-3 text-sm sm:text-base`}>
                      Lead Video Editor
                    </p>
                    <p className={`${themeClasses.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                      Specializing in scroll-stopping short-form content for TikTok, Reels, and YouTube Shorts.
                    </p>
                    {/* Social links */}
                    <div className="flex justify-center gap-3 mt-4">
                      <a href="https://www.instagram.com/srini24arvind/" target="_blank" rel="noopener noreferrer" className={`w-11 h-11 min-w-[44px] min-h-[44px] ${themeClasses.bgTertiary} rounded-lg flex items-center justify-center ${themeClasses.textSecondary} hover:text-purple-500 active:scale-95 transition-all`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Chris */}
                  <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center group active:scale-[0.98] sm:hover:scale-105 transition-all duration-300`}>
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6">
                      {/* Gradient ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                        <div className={`w-full h-full ${themeClasses.cardBg} rounded-full`}></div>
                      </div>
                      {/* Photo placeholder - replace with real headshot */}
                      <img
                        src="/images/chris_pic.jpeg"
                        alt="Chris Vinh"
                        className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face';
                        }}
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <h4 className={`text-lg sm:text-xl md:text-2xl font-bold ${themeClasses.textPrimary} mb-1 sm:mb-2`}>
                      Chris Vinh
                      <br />
                      <span className="text-base sm:text-lg font-normal">(Ken Jeong's son)</span>
                    </h4>
                    <p className={`${themeClasses.gradientText} font-semibold mb-2 sm:mb-3 text-sm sm:text-base`}>
                      Video Editor
                    </p>
                    <p className={`${themeClasses.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                      Expert in cinematic editing, color grading, and creating viral-worthy content.
                    </p>
                    {/* Social links */}
                    <div className="flex justify-center gap-3 mt-3 sm:mt-4">
                      <a href="https://www.instagram.com/chrisvinh/" target="_blank" rel="noopener noreferrer" className={`w-11 h-11 min-w-[44px] min-h-[44px] ${themeClasses.bgTertiary} rounded-lg flex items-center justify-center ${themeClasses.textSecondary} hover:text-purple-500 active:scale-95 transition-all`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Mission and Why Choose Us - Show After Editors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
                <div className="space-y-6">
                  <h3 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary}`}>Our Mission</h3>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed`}>
                    At ArvEdit, we're dedicated to helping content creators and brands
                    break through the noise. We understand the algorithm, the trends, and most
                    importantly—what makes viewers stop scrolling and start watching.
                  </p>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed`}>
                    Our mission is simple: deliver high-energy, platform-perfect edits that
                    boost engagement, increase watch time, and help you grow your audience.
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary}`}>Why Choose Us</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={`${themeClasses.textSecondary} text-sm sm:text-base`}>Algorithm-focused editing strategies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={`${themeClasses.textSecondary} text-sm sm:text-base`}>Fast turnaround times</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={`${themeClasses.textSecondary} text-sm sm:text-base`}>Platform-specific optimization</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={`${themeClasses.textSecondary} text-sm sm:text-base`}>Revisions Included</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stats - Show at Bottom */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <div className={`text-center p-4 sm:p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${themeClasses.gradientText} mb-1 sm:mb-2`}>50+</div>
                  <div className={`${themeClasses.textSecondary} text-xs sm:text-sm`}>Videos Edited</div>
                </div>
                <div className={`text-center p-4 sm:p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${themeClasses.gradientText} mb-1 sm:mb-2`}>30+</div>
                  <div className={`${themeClasses.textSecondary} text-xs sm:text-sm`}>Happy Clients</div>
                </div>
                <div className={`text-center p-4 sm:p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${themeClasses.gradientText} mb-1 sm:mb-2`}>1.5M+</div>
                  <div className={`${themeClasses.textSecondary} text-xs sm:text-sm`}>Total Views</div>
                </div>
                <div className={`text-center p-4 sm:p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${themeClasses.gradientText} mb-1 sm:mb-2`}>24hr</div>
                  <div className={`${themeClasses.textSecondary} text-xs sm:text-sm`}>Avg Turnaround</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
    </>
  );
}

