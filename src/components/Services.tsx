'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Services() {
  const { themeClasses } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Scroll-Stopping Short-Form Editing',
      description: 'High-impact, retention-optimized edits for TikTok, Instagram Reels, and Youtube Shorts. Fast pacing, dopamine-level timing, and storytelling that keeps viewers watching past the first 3 seconds and all the way through.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      title: 'High-Retention Captions & On-Screen Hooks',
      description: 'Dynamic subtitles, animated text, and strategic hook lines engineered to boost view duration, accessibility, and engagement on every platform.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Algorithm-Boosted Viral Style Videos',
      description: 'Platform-perfect edits using trending sounds, seamless transitions, crisp captions, and thumb-stopping visuals. Designed to maximize watch time and boost your chances of going viral.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Cinematic Color & Brand Consistency',
      description: 'Vibrant color grading, exposure fixes, and lighting correction that make every clip look clean, premium, and on-brand no matter the original footage.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: 'Audio Design + Beat-Perfect Syncing',
      description: 'Trending music perfectly timed to your footage, punchy sound effects, background noise removal, and a polished soundscape that elevates every moment of your video.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Contest, Event & Highlight Edits',
      description: "Need a cinematic recap, a personal highlight reel, or edits tailored to competitions and events? I'll craft fast-turnaround custom videos designed to stand out and tell your story.",
    },
  ];

  return (
    <section id="services" className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
            Our Services
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Edits that get attention. Retention that gets results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            // Calculate neighbor relationship
            const isHovered = hoveredIndex === index;
            const isLeftNeighbor = hoveredIndex === index + 1;
            const isRightNeighbor = hoveredIndex === index - 1;
            const isTopNeighbor = hoveredIndex === index + 3;
            const isBottomNeighbor = hoveredIndex === index - 3;
            const isNeighbor = isLeftNeighbor || isRightNeighbor || isTopNeighbor || isBottomNeighbor;
            const isDimmed = hoveredIndex !== null && !isHovered && !isNeighbor;

            // Calculate tilt direction for neighbors
            let tiltClass = '';
            if (isLeftNeighbor) tiltClass = 'rotate-[-2deg]';
            if (isRightNeighbor) tiltClass = 'rotate-[2deg]';
            if (isTopNeighbor) tiltClass = 'rotate-[-1deg]';
            if (isBottomNeighbor) tiltClass = 'rotate-[1deg]';

            return (
            <div
              key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative ${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 ease-out cursor-pointer
                  ${isHovered ? `scale-105 ${themeClasses.cardHoverBg} shadow-2xl z-20 rotate-0` : ''}
                  ${isNeighbor ? `scale-95 ${tiltClass}` : ''}
                  ${isDimmed ? 'scale-90 opacity-40 blur-[1px]' : 'opacity-100'}
                `}
                style={{
                  transformOrigin: 'center',
                  filter: isDimmed ? 'saturate(0.3)' : 'saturate(1)',
                }}
              >
                {/* Glow effect on hover */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 animate-pulse"></div>
                )}

                {/* Icon */}
                <div className={`${themeClasses.gradient} mb-6 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500
                  ${isHovered ? 'scale-110 rotate-6 shadow-lg' : 'scale-100 rotate-0'}
                  ${isNeighbor ? 'scale-90' : ''}
                `}>
                  <div className={`${themeClasses.textWhite} transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
                  {service.icon}
                </div>
              </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold ${themeClasses.textPrimary} mb-4 transition-all duration-300
                  ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600' : ''}
                `}>
                {service.title}
              </h3>

                {/* Description */}
                <p className={`${themeClasses.textSecondary} leading-relaxed transition-all duration-300
                  ${isHovered ? 'text-opacity-90' : ''}
                `}>
                {service.description}
              </p>

                {/* Hover indicator */}
                {isHovered && (
                  <div className={`mt-6 flex items-center ${themeClasses.textPrimary} font-semibold animate-fade-in`}>
                    <span>Learn More</span>
                    <svg className="w-5 h-5 ml-2 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

