'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import type { Video } from '@/data/projects';

interface VideoCarouselProps {
  videos: Video[];
}

// Instagram Embed Component
function InstagramEmbed({ url }: { url: string }) {
  const getInstagramPostId = (instagramUrl: string): string | null => {
    const patterns = [
      /instagram\.com\/p\/([A-Za-z0-9_-]+)/,
      /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
      /instagram\.com\/tv\/([A-Za-z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = instagramUrl.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const postId = getInstagramPostId(url);

  if (!postId) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 rounded-lg">
        <p className="text-gray-400">Invalid Instagram URL</p>
      </div>
    );
  }

  const embedUrl = `https://www.instagram.com/p/${postId}/embed/captioned`;

  return (
    <div className="w-full">
      <iframe
        src={embedUrl}
        className="w-full border-0 rounded-lg"
        style={{ minHeight: '600px' }}
        allowFullScreen
        scrolling="no"
        title="Instagram Post"
      />
    </div>
  );
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const { themeClasses } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < videos.length) {
      setCurrentIndex(index);
    }
  }, [videos.length]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? videos.length - 1 : currentIndex - 1);
  }, [currentIndex, goToSlide, videos.length]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex === videos.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goToSlide, videos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Touch handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

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
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Video Title (if available) */}
      {videos[currentIndex]?.title && (
        <h3 className={`text-lg sm:text-xl font-semibold ${themeClasses.textPrimary} text-center mb-4`}>
          {videos[currentIndex].title}
        </h3>
      )}

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videos.map((video, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
            >
              <InstagramEmbed url={video.url} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Only show if more than 1 video */}
        {videos.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 sm:w-12 sm:h-12 rounded-full
                bg-black/50 hover:bg-black/70 backdrop-blur-sm
                flex items-center justify-center
                text-white transition-all duration-200
                opacity-70 hover:opacity-100
                focus:outline-none focus:ring-2 focus:ring-purple-500`}
              aria-label="Previous video"
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
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 sm:w-12 sm:h-12 rounded-full
                bg-black/50 hover:bg-black/70 backdrop-blur-sm
                flex items-center justify-center
                text-white transition-all duration-200
                opacity-70 hover:opacity-100
                focus:outline-none focus:ring-2 focus:ring-purple-500`}
              aria-label="Next video"
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
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators - Only show if more than 1 video */}
      {videos.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-purple-500 scale-110'
                  : 'bg-gray-500 hover:bg-gray-400'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {videos.length > 1 && (
        <p className={`text-center mt-4 text-sm ${themeClasses.textSecondary}`}>
          {currentIndex + 1} / {videos.length}
        </p>
      )}
    </div>
  );
}

