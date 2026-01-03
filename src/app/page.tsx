'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
  const { themeClasses } = useTheme();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playingTestimonialId, setPlayingTestimonialId] = useState<number | null>(null);
  const [playingTestimonials, setPlayingTestimonials] = useState<Set<number>>(new Set());
  const testimonialVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const testimonialContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const wasPlayingRefs = useRef<{ [key: number]: boolean }>({});

  // Helper function to convert Google Drive share link to embed URL
  const convertDriveLink = (url: string | undefined): string | null => {
    if (!url) return null;
    
    // Extract file ID from various Google Drive URL formats
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,  // Standard format
      /id=([a-zA-Z0-9_-]+)/,           // Alternative format
      /\/d\/([a-zA-Z0-9_-]+)/          // Short format
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    
    // If already a preview link, return as is
    if (url.includes('/preview')) {
      return url;
    }
    
    return null;
  };

  // Features array - Add Google Drive video links to videoUrl property
  // Google Drive link formats supported:
  // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - https://drive.google.com/file/d/FILE_ID/preview
  // - https://drive.google.com/open?id=FILE_ID
  // Make sure the video is set to "Anyone with the link can view"
  const features = [
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      title: "🎬 Animated Subtitles",
      description: "Captions that pop with clean motion and color, boosting engagement and retention.",
      row: "top",
      videoUrl: "" // Example: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "✨ Accented Keywords",
      description: "Key moments highlighted with subtle color and animation to amplify impact.",
      row: "top",
      videoUrl: "" // Add your Google Drive link here
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "🧹 Remove Filler Words",
      description: "Eliminate \"um,\" \"uh,\" stutters, and awkward pauses for a smooth, professional delivery",
      row: "top",
      videoUrl: "" // Add your Google Drive link here
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "⚡ Tighten Silences",
      description: "Remove dead air and empty gaps so your pacing stays sharp and viewers stay hooked.",
      row: "top",
      videoUrl: "" // Add your Google Drive link here
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      ),
      title: "🔍 Dynamic Zoom Effects",
      description: "Smooth zoom-ins and zoom-outs that add energy, emphasis, and cinematic movement.",
      row: "bottom",
      videoUrl: "" // Add your Google Drive link here
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "🎨 Branded Visual Themes",
      description: "Consistent colors, fonts, and layouts that reinforce your unique brand identity.",
      row: "bottom",
      videoUrl: "" // Add your Google Drive link here
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "📝 Full Video Transcripts",
      description: "SEO-friendly transcripts for repurposing, captions, blogs, and accessibility.",
      row: "bottom",
      videoUrl: "" // Add your Google Drive link here
    },
    {
      icon: (
        <svg className={`w-6 h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "🎯 Strategic Cuts & Transitions",
      description: "Precise editing that maintains flow and keeps viewers engaged from start to finish.",
      row: "bottom",
      videoUrl: "" // Add your Google Drive link here
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

  // Close video modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo !== null) {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo !== null) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  // Intersection Observer to pause testimonial videos when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Get the testimonial ID from the data attribute
          const testimonialId = Number(entry.target.getAttribute('data-testimonial-id'));
          const video = testimonialVideoRefs.current[testimonialId];
          
          if (!video) return;

          if (entry.isIntersecting) {
            // Video is in view - resume if it was playing before
            if (wasPlayingRefs.current[testimonialId]) {
              video.play().catch(() => {});
              setPlayingTestimonials((prev) => new Set(prev).add(testimonialId));
            }
          } else {
            // Video is out of view - pause it
            wasPlayingRefs.current[testimonialId] = !video.paused;
            video.pause();
            setPlayingTestimonials((prev) => {
              const newSet = new Set(prev);
              newSet.delete(testimonialId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of video is visible
    );

    // Observe all testimonial containers
    Object.values(testimonialContainerRefs.current).forEach((container) => {
      if (container) {
        observer.observe(container);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Testimonials data - 4 vertical testimonial videos
  const testimonials = [
    {
      id: 1,
      name: 'Courtney Lombardo',
      role: 'Content Creator',
      videoUrl: 'r2:courtney_testimonial.mp4', // Replace with your R2 video key or other video URL
      thumbnail: '/images/courtney.jpeg',
      quote: "I am always so satisfied with his work.",
    },
    {
      id: 2,
      name: 'James Meadows',
      role: 'Influencer',
      videoUrl: 'r2:james_testimonial.mp4', // Replace with your R2 video key or other video URL
      thumbnail: '/images/james.jpeg',
      quote: 'The services have always been AWESOME!',
    },
    {
      id: 3,
      name: 'Janice Silver',
      role: 'Brand Ambassador',
      videoUrl: 'r2:janice_testimonia.mp4', // Replace with your R2 video key or other video URL
      thumbnail: '/images/janice.jpeg',
      quote: 'He\'s done an amazing job and is really really fast!',
    },
    {
      id: 4,
      name: 'Mae',
      role: 'Content Creator',
      videoUrl: 'r2:mae_video.mp4', // Replace with your R2 video key
      thumbnail: '/images/mae.jpeg',
      quote: 'Amazing work, highly recommend!',
    },
    {
      id: 5,
      name: 'Kara',
      role: 'YouTuber',
      videoUrl: 'r2:Kara_testimonial.mp4', // Replace with your R2 video key or other video URL
      thumbnail: '/images/kara.jpeg',
      quote: 'His video creation and programming skills are FANTASTIC!',
    },
  ];

  // Netflix slider state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    const slider = sliderRef.current;
    if (slider) {
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10);
    }
  }, []);

  // Scroll slider
  const scrollSlider = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = slider.clientWidth * 0.8;
      slider.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Monitor scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }
  }, [checkScrollPosition]);

  // Helper to get video stream URL (similar to Portfolio)
  const getVideoStreamUrl = (videoUrl: string | undefined): string | null => {
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
  };

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />
      <Hero />

      {/* Testimonials Section - Netflix Style */}
      <section className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
        <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none opacity-30`}></div>
        
        <div className="relative z-10">
          {/* Section Header */}
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                What Our Clients Say
              </h2>
              <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary}`}>
                Real testimonials from creators who transformed their content with ArvEdit
              </p>
            </div>
          </div>

          {/* Netflix-Style Slider Container */}
          <div className="relative group/slider">
            {/* Left Navigation Arrow */}
            <button
              onClick={() => scrollSlider('left')}
              className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-white/10
                ${canScrollLeft ? 'opacity-0 group-hover/slider:opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={() => scrollSlider('right')}
              className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl border border-white/10
                ${canScrollRight ? 'opacity-0 group-hover/slider:opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Track */}
            <div
              ref={sliderRef}
              className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-12 lg:px-16 pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {testimonials.map((testimonial, index) => {
              const videoSrc = getVideoStreamUrl(testimonial.videoUrl);
              const hasVideo = videoSrc !== null;
              
              // Debug: Log video source (remove in production)
              if (typeof window !== 'undefined' && hasVideo) {
                console.log(`Testimonial ${index + 1} video source:`, videoSrc);
              }

              // Handle video play - pause all other videos
              const handleVideoPlay = () => {
                // Pause all other testimonial videos
                Object.keys(testimonialVideoRefs.current).forEach((id) => {
                  const videoId = Number(id);
                  if (videoId !== testimonial.id && testimonialVideoRefs.current[videoId]) {
                    testimonialVideoRefs.current[videoId]?.pause();
                    setPlayingTestimonials((prev) => {
                      const newSet = new Set(prev);
                      newSet.delete(videoId);
                      return newSet;
                    });
                  }
                });
                setPlayingTestimonialId(testimonial.id);
                setPlayingTestimonials((prev) => new Set(prev).add(testimonial.id));
              };

              // Handle video pause
              const handleVideoPause = () => {
                setPlayingTestimonials((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(testimonial.id);
                  return newSet;
                });
              };

              // Get video element ref callback
              const setVideoRef = (videoElement: HTMLVideoElement | null) => {
                if (videoElement) {
                  testimonialVideoRefs.current[testimonial.id] = videoElement;
                } else {
                  delete testimonialVideoRefs.current[testimonial.id];
                }
              };

              return (
                <div
                  key={testimonial.id}
                  ref={(el) => {
                    if (el) {
                      testimonialContainerRefs.current[testimonial.id] = el;
                    }
                  }}
                  data-testimonial-id={testimonial.id}
                  className={`group relative flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-purple-500/20`}
                >
                  {/* Video Container - Vertical/Portrait */}
                  <div className="relative w-full aspect-[9/16] bg-black">
                    {hasVideo ? (
                      <>
                        <div className="relative w-full h-full z-0 video-controls-subtle">
                          <VideoPlayer
                            src={videoSrc}
                            poster={testimonial.thumbnail}
                            title={testimonial.name}
                            aspectRatio="portrait"
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
                        {/* Gradient Overlay - only at bottom for quote readability, doesn't block controls */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10"></div>
                        
                        {/* Play/Pause Button - Only visible on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const video = testimonialVideoRefs.current[testimonial.id];
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
                            aria-label={playingTestimonials.has(testimonial.id) ? 'Pause video' : 'Play video'}
                          >
                            {playingTestimonials.has(testimonial.id) ? (
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

                  {/* Testimonial Quote Only - Positioned at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 pointer-events-none">
                    <div className="mb-2 sm:mb-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                      <p className={`text-xs sm:text-sm ${themeClasses.textWhite} font-medium leading-snug line-clamp-2 drop-shadow-lg`}>
                        "{testimonial.quote}"
                      </p>
                    </div>
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
        </div>
      </section>

      {/* Key Features Section */}
      <section ref={sectionRef} className={`py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
        <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${themeClasses.textPrimary} mb-2 sm:mb-3 lg:mb-4`}>
              Why Choose ArvEdit?
            </h2>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl ${themeClasses.textSecondary}`}>
              We don't just edit videos- We Build Creators.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 md:mb-16">
            {features.map((feature, index) => {
              const isVisible = visibleCards.has(index);
              const slideDirection = feature.row === 'top' ? '-translate-y-20' : 'translate-y-20';

              const hasVideo = feature.videoUrl && feature.videoUrl.trim() !== '';
              const embedUrl = convertDriveLink(feature.videoUrl);

              return (
                <div
                  key={index}
                  onClick={() => hasVideo && setSelectedVideo(index)}
                  className={`relative group ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl transition-all duration-700 ease-out active:scale-95 sm:hover:scale-105 ${themeClasses.shadowHover} overflow-hidden ${isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : `opacity-0 ${slideDirection} scale-95`
                    } ${hasVideo ? 'cursor-pointer' : ''}`}
                  style={{
                    transitionDelay: `${(index % 4) * 50}ms`, // Slight stagger within rows
                  }}
                >
                  {/* Ripple effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl -z-10"></div>

                  {/* Icon with rotation animation */}
                  <div className={`relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${themeClasses.gradient} rounded-lg flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 [&>svg]:w-full [&>svg]:h-full">
                    {feature.icon}
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 animate-ping"></div>
                  </div>

                  {/* Title with gradient on hover */}
                  <h3 className={`text-xs sm:text-sm lg:text-lg font-bold ${themeClasses.textPrimary} mb-1 sm:mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-[10px] sm:text-xs lg:text-sm ${themeClasses.textSecondary} leading-snug sm:leading-relaxed`}>
                    {feature.description}
                  </p>

                  {/* Progress indicator - builds narrative left to right */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  {/* Corner accent */}
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

                  {/* Play button overlay - only show if video exists */}
                  {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Video Modal - Full screen on mobile */}
          {selectedVideo !== null && features[selectedVideo]?.videoUrl && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 sm:bg-black/80 backdrop-blur-sm p-2 sm:p-4 animate-fade-in"
              onClick={() => setSelectedVideo(null)}
            >
              <div 
                className={`relative w-full max-w-4xl ${themeClasses.cardBg} rounded-xl sm:rounded-2xl ${themeClasses.shadow} overflow-hidden animate-slide-in max-h-[95vh] sm:max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button - larger on mobile */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-11 h-11 min-w-[44px] min-h-[44px] ${themeClasses.cardBg} rounded-full flex items-center justify-center ${themeClasses.shadow} active:scale-95 sm:hover:scale-110 transition-transform duration-200 ${themeClasses.textPrimary}`}
                  aria-label="Close video"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Video Title */}
                <div className={`p-3 sm:p-4 md:p-6 border-b ${themeClasses.border} pr-14 sm:pr-16`}>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${themeClasses.textPrimary}`}>
                    {features[selectedVideo].title}
                  </h3>
                </div>

                {/* Video Player */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {convertDriveLink(features[selectedVideo].videoUrl) ? (
                    <iframe
                      src={convertDriveLink(features[selectedVideo].videoUrl) || ''}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={features[selectedVideo].title}
                    />
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.bgTertiary}`}>
                      <p className={`${themeClasses.textSecondary} text-center px-4 text-sm sm:text-base`}>
                        Invalid video URL. Please check your Google Drive link.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center">
            <h3 className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary} mb-4 sm:mb-6`}>
              Ready to Transform Your Content?
            </h3>
            <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} mb-6 sm:mb-8 max-w-2xl mx-auto px-4`}>
              Join hundreds of creators who are crushing it with our editing services
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Link
                href="/services"
                className={`w-full sm:w-auto px-6 py-3.5 sm:py-3 min-h-[48px] rounded-full font-semibold inline-flex items-center justify-center text-center transition-all duration-300 active:scale-95 sm:hover:scale-105 ${themeClasses.buttonPrimary}`}
              >
                View Our Services
              </Link>
              <Link
                href="/portfolio"
                className={`w-full sm:w-auto px-6 py-3.5 sm:py-3 min-h-[48px] rounded-full font-semibold inline-flex items-center justify-center text-center transition-all duration-300 active:scale-95 sm:hover:scale-105 ${themeClasses.buttonOutline}`}
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className={`w-full sm:w-auto px-6 py-3.5 sm:py-3 min-h-[48px] rounded-full font-semibold bg-gradient-to-r from-green-600 to-emerald-600 ${themeClasses.textWhite} active:scale-95 sm:hover:scale-105 transition-all duration-300 inline-flex items-center justify-center text-center`}
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
