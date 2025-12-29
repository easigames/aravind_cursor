'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';
import VideoPlayer from './VideoPlayer';

export default function Portfolio() {
  const { themeClasses } = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const portfolioVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const wasPlayingRefs = useRef<{ [key: number]: boolean }>({});

  /**
   * Get the streaming URL for a video
   * - R2 videos: Use the direct streaming API endpoint
   * - Local videos: Use the path directly
   */
  const getVideoStreamUrl = useCallback((videoUrl: string | undefined): string | null => {
    if (!videoUrl || videoUrl.trim() === '') return null;

    // R2 videos - use our optimized streaming API
    if (videoUrl.startsWith('r2:')) {
      const key = videoUrl.replace(/^r2:/, '');
      return `/api/video/${encodeURIComponent(key)}`;
    }

    // Local video files
    if (videoUrl.match(/\.(mp4|webm|ogg|mov)$/i)) {
      return videoUrl;
    }

    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = videoUrl.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
    const vimeoMatch = videoUrl.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    // Google Drive
    const drivePatterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /\/d\/([a-zA-Z0-9_-]+)/
    ];
    for (const pattern of drivePatterns) {
      const match = videoUrl.match(pattern);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    return null;
  }, []);

  /**
   * Check if URL is a direct video (not an embed)
   */
  const isDirectVideo = useCallback((url: string | undefined): boolean => {
    if (!url) return false;
    // R2 videos or local videos are direct
    return url.startsWith('r2:') || url.match(/\.(mp4|webm|ogg|mov)$/i) !== null;
  }, []);

  /**
   * Normalize image path for Next.js public folder
   */
  const getImageUrl = useCallback((imageUrl: string | undefined): string | undefined => {
    if (!imageUrl) return undefined;
    // If it starts with ./ convert to /
    if (imageUrl.startsWith('./')) {
      return imageUrl.replace('./', '/');
    }
    // If it doesn't start with / or http, add /
    if (!imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
      return `/${imageUrl}`;
    }
    return imageUrl;
  }, []);

  // Portfolio projects - R2 videos for fast CDN-backed streaming
  const projects = [
    {
      id: 1,
      title: 'King David',
      image: '',
      videoUrl: 'r2:king_david.mp4',
      views: '2.5M',
      aspectRatio: 'tall',
    },
    {
      id: 2,
      title: 'Kara',
      image: '',
      videoUrl: 'r2:kara.mp4',
      views: '850K',
      aspectRatio: 'tall',
    },
    {
      id: 3,
      title: 'Davida',
      image: '',
      videoUrl: 'r2:davida.mp4',
      views: '3.2M',
      aspectRatio: 'tall',
    },
    {
      id: 4,
      title: 'James',
      image: '',
      videoUrl: 'r2:james_tall_30.mp4',
      views: '5.1M',
      aspectRatio: 'tall',
    },
    {
      id: 5,
      title: 'Darline',
      image: '',
      videoUrl: 'r2:darline.mp4',
      views: '1.8M',
      aspectRatio: 'wide',
    },
  
    {
      id: 7,
      title: 'Will',
      image: '',
      videoUrl: 'r2:will.mp4',
      views: '8.7M',
      aspectRatio: 'tall',
    },
    {
      id: 8,
      title: 'Twerking TikTok',
      image: '/images/twerking_tiktok-Cover.jpg',
      videoUrl: 'r2:twerking_tiktok.mp4',
      views: '8.7M',
      aspectRatio: 'tall',
    },
    {
      id: 9,
      title: 'Yoshi',
      image: '',
      videoUrl: 'r2:yoshi_wide.mp4',
      views: '1.2M',
      aspectRatio: 'wide',
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

  // Intersection Observer to pause portfolio videos when out of view
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = Number(entry.target.getAttribute('data-project-id'));
          const video = portfolioVideoRefs.current[projectId];
          
          if (!video) return;

          if (entry.isIntersecting) {
            // Video is in view - resume if it was playing before
            if (wasPlayingRefs.current[projectId]) {
              video.play().catch(() => {});
              setPlayingVideos((prev) => new Set(prev).add(projectId));
            }
          } else {
            // Video is out of view - pause it
            wasPlayingRefs.current[projectId] = !video.paused;
            video.pause();
            setPlayingVideos((prev) => {
              const newSet = new Set(prev);
              newSet.delete(projectId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of video is visible
    );

    // Observe all portfolio items
    itemsRef.current.forEach((item) => {
      if (item && item.getAttribute('data-project-id')) {
        videoObserver.observe(item);
      }
    });

    return () => {
      videoObserver.disconnect();
    };
  }, []);


  // Get aspect ratio classes - for mobile, use consistent aspect ratio
  const getAspectRatioClass = (ratio: string) => {
    // On mobile (grid-cols-2), all items use same aspect ratio
    // On larger screens (lg), use masonry grid with spans
    switch (ratio) {
      case 'tall':
        return 'lg:row-span-2'; // Only span rows on lg and up
      case 'wide':
        return 'lg:col-span-2'; // Only span columns on lg and up
      case 'square':
      default:
        return '';
    }
  };

  return (
    <section id="portfolio" className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
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

        {/* Grid - 2 columns on mobile (matching testimonials), masonry on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:auto-rows-[280px] gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const isVisible = visibleItems.has(index);
            const aspectClass = getAspectRatioClass(project.aspectRatio);
            const hasVideo = project.videoUrl && project.videoUrl.trim() !== '';
            const videoSrc = getVideoStreamUrl(project.videoUrl);

            // Handle video play - pause all other videos
            const handleVideoPlay = () => {
              // Pause all other portfolio videos
              Object.keys(portfolioVideoRefs.current).forEach((id) => {
                const videoId = Number(id);
                if (videoId !== project.id && portfolioVideoRefs.current[videoId]) {
                  portfolioVideoRefs.current[videoId]?.pause();
                  setPlayingVideos((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(videoId);
                    return newSet;
                  });
                }
              });
              setPlayingVideoId(project.id);
              setPlayingVideos((prev) => new Set(prev).add(project.id));
            };

            // Handle video pause
            const handleVideoPause = () => {
              setPlayingVideos((prev) => {
                const newSet = new Set(prev);
                newSet.delete(project.id);
                return newSet;
              });
            };

            // Get video element ref callback
            const setVideoRef = (videoElement: HTMLVideoElement | null) => {
              if (videoElement) {
                portfolioVideoRefs.current[project.id] = videoElement;
              } else {
                delete portfolioVideoRefs.current[project.id];
              }
            };
            
            return (
              <div
                key={project.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                data-index={index}
                data-project-id={project.id}
                className={`group relative ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl overflow-hidden ${themeClasses.shadowHover} transition-all duration-500 active:scale-[0.98] sm:hover:scale-[1.02] sm:hover:shadow-2xl
                  ${aspectClass}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Project Video or Image */}
                <div className={`relative w-full overflow-hidden bg-black ${
                  project.aspectRatio === 'wide' 
                    ? 'aspect-[9/16] lg:aspect-auto lg:h-full' 
                    : 'aspect-[9/16] lg:aspect-auto lg:h-full'
                }`}>
                  {hasVideo && videoSrc ? (
                    <>
                      {/* Use VideoPlayer for inline video playback */}
                      <div className="relative w-full h-full z-0">
                        <VideoPlayer
                          src={videoSrc}
                          poster={getImageUrl(project.image)}
                          title={project.title}
                          aspectRatio="auto"
                          objectFit="cover"
                          muted={false}
                          loop
                          controls={true}
                          preload="metadata"
                          className="w-full h-full"
                          onPlay={handleVideoPlay}
                          onPause={handleVideoPause}
                          setVideoRef={setVideoRef}
                        />
                      </div>
                      {/* Gradient Overlay - only at bottom for text readability, doesn't block controls */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10"></div>
                      
                      {/* Play/Pause Button - Only visible on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const video = portfolioVideoRefs.current[project.id];
                            if (video) {
                              if (video.paused) {
                                handleVideoPlay();
                                video.play().catch(() => {});
                              } else {
                                video.pause();
                                handleVideoPause();
                              }
                            }
                          }}
                          className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 min-w-[56px] min-h-[56px] bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all duration-200 shadow-xl"
                          aria-label={playingVideos.has(project.id) ? 'Pause video' : 'Play video'}
                        >
                          {playingVideos.has(project.id) ? (
                            // Pause icon
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            // Play icon
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.bgTertiary}`}>
                      <div className="text-center p-3">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500 mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>
                          Video coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Overlay - Portfolio title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 pointer-events-none">
                  <h3 className={`${themeClasses.textWhite} text-xs sm:text-sm font-semibold drop-shadow-lg truncate`}>
                    {project.title}
                  </h3>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.25), inset 0 0 30px rgba(168, 85, 247, 0.08)'
                  }}
                ></div>
              </div>
            );
          })}
        </div>

   
      </div>
    </section>
  );
}
