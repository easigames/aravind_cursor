'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function Portfolio() {
  const { themeClasses } = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      id: 1,
      title: 'Brand Commercial',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
      views: '2.5M',
      aspectRatio: 'tall', // Portrait
    },
    {
      id: 2,
      title: 'Corporate Presentation',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=600&fit=crop',
      views: '850K',
      aspectRatio: 'wide', // Landscape
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      views: '3.2M',
      aspectRatio: 'square', // Square
    },
    {
      id: 4,
      title: 'Music Video',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
      views: '5.1M',
      aspectRatio: 'tall', // Portrait
    },
    {
      id: 5,
      title: 'Product Launch',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
      views: '1.8M',
      aspectRatio: 'wide', // Landscape
    },
    {
      id: 6,
      title: 'Instagram Reels',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop',
      views: '4.3M',
      aspectRatio: 'square', // Square
    },
    {
      id: 7,
      title: 'TikTok Viral',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=600&fit=crop',
      views: '8.7M',
      aspectRatio: 'tall', // Portrait
    },
    {
      id: 8,
      title: 'Event Highlight',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
      views: '1.2M',
      aspectRatio: 'wide', // Landscape
    },
  ];

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  // Get aspect ratio classes
  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case 'tall':
        return 'row-span-2'; // Portrait - takes 2 rows
      case 'wide':
        return 'col-span-2'; // Landscape - takes 2 columns
      case 'square':
      default:
        return ''; // Square - takes 1 cell
    }
  };

  return (
    <section id="portfolio" className={`py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 ${themeClasses.bgPrimary} pointer-events-none`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
            Our Portfolio
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Explore our latest video editing projects and creative work
          </p>
        </div>

        {/* Pinterest-style Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] gap-3 sm:gap-4">
          {projects.map((project, index) => {
            const isVisible = visibleItems.has(index);
            const aspectClass = getAspectRatioClass(project.aspectRatio);
            
            return (
              <div
                key={project.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                data-index={index}
                className={`group relative overflow-hidden rounded-2xl ${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm cursor-pointer
                  ${aspectClass}
                  transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'opacity-100 scale-100 rotate-0' 
                    : 'opacity-0 scale-90 rotate-3'
                  }
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Project Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className={`${themeClasses.textWhite} text-xl md:text-2xl font-bold mb-2 drop-shadow-lg`}>
                    {project.title}
                  </h3>
                  <div className={`flex items-center ${themeClasses.textWhite}/90 text-sm drop-shadow-lg`}>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {project.views} views
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <div className={`${themeClasses.gradient} w-16 h-16 rounded-full flex items-center justify-center ${themeClasses.shadowPurple} shadow-2xl`}>
                    <svg className={`w-8 h-8 ${themeClasses.textWhite} ml-1`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  style={{
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(168, 85, 247, 0.1)'
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className={`${themeClasses.buttonPrimary} px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300`}>
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

