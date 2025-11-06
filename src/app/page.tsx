'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const { themeClasses } = useTheme();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      title: "Animated Subtitles",
      description: "Eye-catching captions that boost engagement and accessibility",
      row: "top"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Accented Words",
      description: "Highlight key words with color and animation for maximum impact",
      row: "top"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "Remove Filler Words",
      description: "Cut out \"um\", \"uh\", and awkward pauses for smooth delivery",
      row: "top"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Tidy Up Silences",
      description: "Remove dead air and keep viewers hooked from start to finish",
      row: "top"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      ),
      title: "Zoom In/Out Effects",
      description: "Dynamic camera movements that add energy and emphasis",
      row: "bottom"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Click-Worthy Thumbnails",
      description: "Custom thumbnails designed to maximize click-through rates",
      row: "bottom"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Branded Themes",
      description: "Consistent colors, fonts, and style that match your brand",
      row: "bottom"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Video Transcripts",
      description: "Full text transcripts for SEO, repurposing, and accessibility",
      row: "bottom"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger domino effect when section comes into view
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index));
              }, index * 150); // 150ms delay between each card
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />
      <Hero />
      
      {/* Key Features Section */}
      <section ref={sectionRef} className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
        <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
              Why Choose ArvindLuxEdit?
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary}`}>
              We're not just editors—we're your growth partners
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {features.map((feature, index) => {
              const isVisible = visibleCards.has(index);
              const slideDirection = feature.row === 'top' ? '-translate-y-20' : 'translate-y-20';
              
              return (
                <div
                  key={index}
                  className={`relative group ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} p-6 rounded-xl transition-all duration-700 ease-out hover:scale-105 ${themeClasses.shadowHover} overflow-hidden ${
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : `opacity-0 ${slideDirection} scale-95`
                  }`}
                  style={{
                    transitionDelay: `${(index % 4) * 50}ms`, // Slight stagger within rows
                  }}
                >
                  {/* Ripple effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl -z-10"></div>
                  
                  {/* Icon with rotation animation */}
                  <div className={`relative w-12 h-12 ${themeClasses.gradient} rounded-lg flex items-center justify-center mb-4 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                    {feature.icon}
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 animate-ping"></div>
                  </div>
                  
                  {/* Title with gradient on hover */}
                  <h3 className={`text-lg font-bold ${themeClasses.textPrimary} mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                    {feature.description}
                  </p>
                  
                  {/* Progress indicator - builds narrative left to right */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary} mb-4 sm:mb-6`}>
              Ready to Transform Your Content?
            </h3>
            <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} mb-6 sm:mb-8 max-w-2xl mx-auto px-4`}>
              Join hundreds of creators who are crushing it with our editing services
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/services"
                className={`px-6 py-3 rounded-full font-semibold inline-block text-center transition-all duration-300 hover:scale-105 ${themeClasses.buttonPrimary}`}
              >
                View Our Services
              </Link>
              <Link
                href="/portfolio"
                className={`px-6 py-3 rounded-full font-semibold inline-block text-center transition-all duration-300 hover:scale-105 ${themeClasses.buttonOutline}`}
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className={`px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-green-600 to-emerald-600 ${themeClasses.textWhite} hover:scale-105 transition-all duration-300 inline-block text-center`}
              >
                Start Your Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
