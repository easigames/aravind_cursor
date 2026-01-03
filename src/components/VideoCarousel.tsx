'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import type { Video } from '@/data/projects';

interface VideoCarouselProps {
  videos: Video[];
}

// Helper function to detect platform from URL
function getPlatform(url: string, explicitPlatform?: 'instagram' | 'tiktok' | 'youtube'): 'instagram' | 'tiktok' | 'youtube' {
  if (explicitPlatform) return explicitPlatform;
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('tiktok.com')) return 'tiktok';
  return 'instagram'; // Default to Instagram
}

// Tall Video Card Component
function VideoCard({ video }: { video: Video }) {
  const { themeClasses } = useTheme();
  const platform = getPlatform(video.url, video.platform);

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full h-full rounded-lg overflow-hidden
        transition-all duration-300 ease-out
        group cursor-pointer hover:scale-105"
    >
      {/* Video Thumbnail Image - Tall Aspect Ratio */}
      <div className="relative w-full h-full aspect-[9/16]">
        {video.image ? (
          <img
            src={video.image}
            alt={video.title || 'Video thumbnail'}
            className="w-full h-full object-contain bg-black"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full ${themeClasses.cardBg} flex items-center justify-center`}>
            <svg
              className="w-16 h-16 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${themeClasses.gradient} flex items-center justify-center
            shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Platform Badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
            {platform === 'tiktok' ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="text-white text-[10px] font-medium">TikTok</span>
              </>
            ) : platform === 'youtube' ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="text-white text-[10px] font-medium">YouTube</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-white text-[10px] font-medium">Instagram</span>
              </>
            )}
          </div>
        </div>

        {/* Title Overlay */}
        {video.title && (
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className={`text-base sm:text-lg font-bold ${themeClasses.textWhite} line-clamp-2`}>
              {video.title}
            </h3>
          </div>
        )}
      </div>
    </a>
  );
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const { themeClasses } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  // Scroll functions
  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.video-card')?.clientWidth || 200;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth - 16, // card width + gap
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.video-card')?.clientWidth || 200;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 16, // card width + gap
        behavior: 'smooth',
      });
    }
  }, []);

  // Check scroll position on mount and scroll
  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [checkScrollPosition, videos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        scrollRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollLeft, scrollRight]);

  if (videos.length === 0) {
    return (
      <div className={`text-center py-16 ${themeClasses.cardBg} rounded-2xl border ${themeClasses.cardBorder}`}>
        <svg
          className="w-16 h-16 text-gray-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p className={`${themeClasses.textSecondary} text-lg`}>
          Videos coming soon
        </p>
        <p className={`${themeClasses.textSecondary} text-sm mt-2`}>
          Check back later for the full video experience
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container with Horizontal Scroll */}
      <div className="relative group">
        {/* Left Arrow */}
        {videos.length > 1 && canScrollLeft && (
          <button
            onClick={scrollLeft}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-12 sm:h-12 rounded-full
              bg-black/70 hover:bg-black/90 backdrop-blur-md
              flex items-center justify-center
              text-white transition-all duration-300
              hover:scale-110 active:scale-95
              shadow-2xl opacity-0 group-hover:opacity-100
              focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-purple-500`}
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth
            pb-4 snap-x snap-mandatory
            ${videos.length === 1 
              ? 'justify-center px-4' 
              : 'px-6 sm:px-8 md:px-12'
            }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className={`video-card flex-shrink-0 snap-start
                ${videos.length === 1
                  ? 'w-[240px] sm:w-[280px] md:w-[320px]'
                  : 'w-[180px] sm:w-[220px] md:w-[260px]'
                }`}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {videos.length > 1 && canScrollRight && (
          <button
            onClick={scrollRight}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 sm:w-12 sm:h-12 rounded-full
              bg-black/70 hover:bg-black/90 backdrop-blur-md
              flex items-center justify-center
              text-white transition-all duration-300
              hover:scale-110 active:scale-95
              shadow-2xl opacity-0 group-hover:opacity-100
              focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-purple-500`}
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Video Counter */}
      {videos.length > 1 && (
        <div className="text-center mt-6">
          <p className={`text-sm ${themeClasses.textSecondary}`}>
            {videos.length} {videos.length === 1 ? 'video' : 'videos'}
          </p>
        </div>
      )}
    </div>
  );
}
