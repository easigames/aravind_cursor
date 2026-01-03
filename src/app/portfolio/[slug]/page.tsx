'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProjectBySlug, projects } from '@/data/projects';
import VideoCarousel from '@/components/VideoCarousel';
import { notFound } from 'next/navigation';
import { useRef, useState, useCallback, useEffect } from 'react';

// More Work Slider Component
function MoreWorkSlider({ currentProjectId }: { currentProjectId: number }) {
  const { themeClasses } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const otherProjects = projects.filter((p) => p.id !== currentProjectId);

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
      const cardWidth = scrollContainerRef.current.querySelector('.project-card')?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth - 16,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.project-card')?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 16,
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
  }, [checkScrollPosition]);

  if (otherProjects.length === 0) {
    return null;
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {otherProjects.length > 1 && canScrollLeft && (
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
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth
          pb-4 px-6 sm:px-8 md:px-12
          snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {otherProjects.map((otherProject) => (
          <div
            key={otherProject.id}
            className="project-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]
              snap-start"
          >
            <Link
              href={`/portfolio/${otherProject.slug}`}
              className="group block relative aspect-video overflow-hidden rounded-lg"
            >
              <img
                src={otherProject.image}
                alt={otherProject.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {otherProject.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {otherProjects.length > 1 && canScrollRight && (
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
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { themeClasses } = useTheme();

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasVideos = project.videos && project.videos.length > 0;

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />

      <main className="pt-20 sm:pt-24">
        {/* Project Cover Image */}
        <div className="w-full mb-12">
          <div className="relative w-full aspect-[21/9] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Video Carousel Section */}
        <div className="container mx-auto px-4 sm:px-6 py-12">
          {hasVideos && (
            <h2 className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary} mb-8 text-center`}>
              {project.videos.length === 1 ? 'Watch the Video' : 'Watch the Videos'}
            </h2>
          )}
          <VideoCarousel videos={project.videos} />
        </div>

        {/* Navigation to Other Projects */}
        <div className="container mx-auto px-4 sm:px-6 py-12 border-t border-gray-800">
          <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-8`}>
            More Work
          </h2>
          <MoreWorkSlider currentProjectId={project.id} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
