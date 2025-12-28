'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
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

  // Testimonials data - 3 vertical testimonial videos
  const testimonials = [
    {
      id: 1,
      name: 'Courtney Lombardo',
      role: 'Content Creator',
      videoUrl: 'r2:courtney_testimonial.mp4', // Replace with your R2 video key or other video URL
      quote: "I am always so satisfied with his work.",
    },
    {
      id: 2,
      name: 'James Meadows',
      role: 'Influencer',
      videoUrl: 'r2:james_testimonial.mp4', // Replace with your R2 video key or other video URL
      quote: 'The services have always been AWESOME!',
    },
    {
      id: 3,
      name: 'Janice Silver',
      role: 'Brand Ambassador',
      videoUrl: 'r2:janice_testimonial.mp4', // Replace with your R2 video key or other video URL
      quote: 'He\'s done an amazing job and is really really fast!',
    },
  ];

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

      {/* Testimonials Section */}
      <section className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
        <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none opacity-30`}></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
              What Our Clients Say
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary}`}>
              Real testimonials from creators who transformed their content with ArvEdit
            </p>
          </div>

          {/* Testimonial Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
              const videoSrc = getVideoStreamUrl(testimonial.videoUrl);
              const hasVideo = videoSrc !== null;
              
              // Debug: Log video source (remove in production)
              if (typeof window !== 'undefined' && hasVideo) {
                console.log(`Testimonial ${index + 1} video source:`, videoSrc);
              }

              return (
                <div
                  key={testimonial.id}
                  className={`group relative ${themeClasses.cardBg} ${themeClasses.cardBorder} border rounded-2xl overflow-hidden ${themeClasses.shadowHover} transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                >
                  {/* Video Container - Vertical/Portrait */}
                  <div className="relative w-full aspect-[9/16] bg-black">
                    {hasVideo ? (
                      <>
                        <div className="relative w-full h-full z-0">
                          <VideoPlayer
                            src={videoSrc}
                            title={testimonial.name}
                            aspectRatio="portrait"
                            muted={false}
                            loop
                            controls={true}
                            preload="metadata"
                            className="w-full h-full"
                          />
                        </div>
                        {/* Gradient Overlay - only at bottom for text readability, doesn't block controls */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10"></div>
                      </>
                    ) : (
                      <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.bgTertiary}`}>
                        <div className="text-center p-4">
                          <svg className="w-12 h-12 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <p className={`text-sm ${themeClasses.textSecondary}`}>
                            Video coming soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Testimonial Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 pointer-events-none">
                    {/* Quote */}
                    <div className="mb-3 sm:mb-4">
                      <svg className="w-6 h-6 text-purple-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                      <p className={`text-sm sm:text-base ${themeClasses.textWhite} font-medium leading-relaxed`}>
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className={`text-sm font-bold ${themeClasses.textWhite}`}>
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className={`text-sm sm:text-base font-semibold ${themeClasses.textWhite}`}>
                          {testimonial.name}
                        </p>
                        <p className={`text-xs sm:text-sm ${themeClasses.textWhite}/70`}>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: '0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(168, 85, 247, 0.1)'
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section ref={sectionRef} className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
        <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
              Why Choose ArvEdit?
            </h2>
            <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary}`}>
              We don't just edit videos- We Build Creators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {features.map((feature, index) => {
              const isVisible = visibleCards.has(index);
              const slideDirection = feature.row === 'top' ? '-translate-y-20' : 'translate-y-20';

              const hasVideo = feature.videoUrl && feature.videoUrl.trim() !== '';
              const embedUrl = convertDriveLink(feature.videoUrl);

              return (
                <div
                  key={index}
                  onClick={() => hasVideo && setSelectedVideo(index)}
                  className={`relative group ${themeClasses.cardBg} backdrop-blur-sm border ${themeClasses.cardBorder} p-6 rounded-xl transition-all duration-700 ease-out hover:scale-105 ${themeClasses.shadowHover} overflow-hidden ${isVisible
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

                  {/* Play button overlay - only show if video exists */}
                  {hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Video Modal */}
          {selectedVideo !== null && features[selectedVideo]?.videoUrl && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
              onClick={() => setSelectedVideo(null)}
            >
              <div 
                className={`relative w-full max-w-4xl ${themeClasses.cardBg} rounded-2xl ${themeClasses.shadow} overflow-hidden animate-slide-in`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className={`absolute top-4 right-4 z-10 w-10 h-10 ${themeClasses.cardBg} rounded-full flex items-center justify-center ${themeClasses.shadow} hover:scale-110 transition-transform duration-200 ${themeClasses.textPrimary}`}
                  aria-label="Close video"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Video Title */}
                <div className={`p-4 sm:p-6 border-b ${themeClasses.border}`}>
                  <h3 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary}`}>
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
                      <p className={`${themeClasses.textSecondary} text-center px-4`}>
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
