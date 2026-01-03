'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { projects } from '@/data/projects';

export default function Portfolio() {
  const { themeClasses } = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Normalize image path for Next.js public folder
   */
  const getImageUrl = (imageUrl: string | undefined): string | undefined => {
    if (!imageUrl) return undefined;
    if (imageUrl.startsWith('./')) {
      return imageUrl.replace('./', '/');
    }
    if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
      return `/${imageUrl}`;
    }
    return imageUrl;
  };

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
        rootMargin: '100px',
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

  // Get aspect ratio for full-width layout - shorter images
  const getAspectRatio = (ratio: string) => {
    switch (ratio) {
      case 'tall':
        return 'aspect-[30/9]';
      case 'wide':
        return 'aspect-[7/2]';
      case 'square':
        return 'aspect-[21/9]';
      default:
        return 'aspect-[21/9]';
    }
  };

  return (
    <section id="portfolio" className={`relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Full-Width Vertical Stack - No spacing */}
      <div className="space-y-0">
        {projects.map((project, index) => {
          const isVisible = visibleItems.has(index);
          const aspectClass = getAspectRatio(project.aspectRatio);

          return (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="block"
            >
              <div
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                data-index={index}
                data-project-id={project.id}
                className={`group relative cursor-pointer transition-opacity duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Full-Width Image Container */}
                <div className={`relative w-full ${aspectClass} overflow-hidden bg-black`}>
                  {project.image && getImageUrl(project.image) ? (
                    <>
                      <img
                        src={getImageUrl(project.image)!}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          project.id === 1 ? 'object-bottom' : 'object-center'
                        }`}
                      />
                      {/* Hover overlay with title */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <h3 className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg`}>
                          {project.title}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.bgSecondary}`}>
                      <p className={`${themeClasses.textSecondary} text-sm sm:text-base`}>
                        Coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
