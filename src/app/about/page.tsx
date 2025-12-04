'use client';

import Header from '@/components/Header';
import OurClients from '@/components/OurClients';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

export default function AboutPage() {
  const { themeClasses } = useTheme();

  return (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Our Mission</h3>
                  <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                    At ArvEdit, we're dedicated to helping content creators and brands
                    break through the noise. We understand the algorithm, the trends, and most
                    importantly—what makes viewers stop scrolling and start watching.
                  </p>
                  <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                    Our mission is simple: deliver high-energy, platform-perfect edits that
                    boost engagement, increase watch time, and help you grow your audience.
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Why Choose Us</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={themeClasses.textSecondary}>Algorithm-focused editing strategies</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={themeClasses.textSecondary}>Fast turnaround times</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={themeClasses.textSecondary}>Platform-specific optimization</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={themeClasses.textSecondary}>Unlimited revisions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                <div className={`text-center p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-4xl font-bold ${themeClasses.gradientText} mb-2`}>500+</div>
                  <div className={`${themeClasses.textSecondary} text-sm`}>Videos Edited</div>
                </div>
                <div className={`text-center p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-4xl font-bold ${themeClasses.gradientText} mb-2`}>100+</div>
                  <div className={`${themeClasses.textSecondary} text-sm`}>Happy Clients</div>
                </div>
                <div className={`text-center p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-4xl font-bold ${themeClasses.gradientText} mb-2`}>50M+</div>
                  <div className={`${themeClasses.textSecondary} text-sm`}>Total Views</div>
                </div>
                <div className={`text-center p-6 ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl`}>
                  <div className={`text-4xl font-bold ${themeClasses.gradientText} mb-2`}>24hr</div>
                  <div className={`${themeClasses.textSecondary} text-sm`}>Avg Turnaround</div>
                </div>
              </div>

              {/* Meet Your Video Editors */}
              <div className="mt-16 sm:mt-20">
                <h3 className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary} text-center mb-8 sm:mb-12`}>
                  Meet Your Video Editors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  {/* Arvind */}
                  <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300`}>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6">
                      {/* Gradient ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1">
                        <div className={`w-full h-full ${themeClasses.cardBg} rounded-full`}></div>
                      </div>
                      {/* Photo placeholder - replace with real headshot */}
                      <img
                        src="/images/arvind.jpg"
                        alt="Arvind Srinivasaraghavan"
                        className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                        }}
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <h4 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>
                      Arvind Srinivasaraghavan
                    </h4>
                    <p className={`${themeClasses.gradientText} font-semibold mb-3`}>
                      Lead Video Editor
                    </p>
                    <p className={`${themeClasses.textSecondary} text-sm leading-relaxed`}>
                      Specializing in scroll-stopping short-form content for TikTok, Reels, and YouTube Shorts.
                    </p>
                    {/* Social links */}
                    <div className="flex justify-center gap-3 mt-4">
                      <a href="#" className={`w-10 h-10 ${themeClasses.bgTertiary} rounded-lg flex items-center justify-center ${themeClasses.textSecondary} hover:text-purple-500 transition-colors`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a href="#" className={`w-10 h-10 ${themeClasses.bgTertiary} rounded-lg flex items-center justify-center ${themeClasses.textSecondary} hover:text-purple-500 transition-colors`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Chris */}
                  <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300`}>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6">
                      {/* Gradient ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                        <div className={`w-full h-full ${themeClasses.cardBg} rounded-full`}></div>
                      </div>
                      {/* Photo placeholder - replace with real headshot */}
                      <img
                        src="/images/chris.jpg"
                        alt="Chris Vinh"
                        className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face';
                        }}
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <h4 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-2`}>
                      Chris Vinh
                    </h4>
                    <p className={`${themeClasses.gradientText} font-semibold mb-3`}>
                      Video Editor
                    </p>
                    <p className={`${themeClasses.textSecondary} text-sm leading-relaxed`}>
                      Expert in cinematic editing, color grading, and creating viral-worthy content.
                    </p>
                    {/* Social links */}
                    <div className="flex justify-center gap-3 mt-4">
                      <a href="#" className={`w-10 h-10 ${themeClasses.bgTertiary} rounded-lg flex items-center justify-center ${themeClasses.textSecondary} hover:text-purple-500 transition-colors`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a href="#" className={`w-10 h-10 ${themeClasses.bgTertiary} rounded-lg flex items-center justify-center ${themeClasses.textSecondary} hover:text-purple-500 transition-colors`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OurClients />
      </div>
      <Footer />
    </div>
  );
}

