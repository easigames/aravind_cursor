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
            </div>
          </div>
        </section>

        <OurClients />
      </div>
      <Footer />
    </div>
  );
}

