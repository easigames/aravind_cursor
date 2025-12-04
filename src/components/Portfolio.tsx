'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function Portfolio() {
  const { themeClasses } = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  // Portfolio projects - Videos are loaded from public/video/ folder
  // Video thumbnails are automatically generated from the first frame of each video
  // To add more videos: Place .mp4 files in public/video/ and reference them as /video/filename.mp4
  // Supported formats:
  // - Local videos: /video/filename.mp4 (files in public/video/ folder)
  // - Google Drive: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // - YouTube: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
  // - Vimeo: https://vimeo.com/VIDEO_ID
  // - Direct video URL: https://example.com/video.mp4
  // Note: The 'image' property is only used as fallback for projects without videos
  const projects = [
    {
      id: 1,
      title: 'King David',
      image: '', // Not needed - video thumbnail will be used
      videoUrl: '/video/Video-361.mp4', // Local video from public/video/ folder
      views: '2.5M',
      aspectRatio: 'tall', // Portrait
    },
    {
      id: 2,
      title: 'Arvind and James',
      image: '', // Not needed - video thumbnail will be used
      videoUrl: '/video/arvind-and-james.mp4',
       // Local video from public/video/ folder
      views: '850K',
      aspectRatio: 'wide', // Landscape
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', // Fallback image if no video
      videoUrl: '', // Add your video URL here (or add more videos to public/video/ folder)
      views: '3.2M',
      aspectRatio: 'square', // Square
    },
    {
      id: 4,
      title: 'Music Video',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop', // Fallback image if no video
      videoUrl: '', // Add your video URL here (or add more videos to public/video/ folder)
      views: '5.1M',
      aspectRatio: 'tall', // Portrait
    },
    {
      id: 5,
      title: 'Product Launch',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop', // Fallback image if no video
      videoUrl: '', // Add your video URL here (or add more videos to public/video/ folder)
      views: '1.8M',
      aspectRatio: 'wide', // Landscape
    },
    {
      id: 6,
      title: 'Instagram Reels',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop', // Fallback image if no video
      videoUrl: '', // Add your video URL here (or add more videos to public/video/ folder)
      views: '4.3M',
      aspectRatio: 'square', // Square
    },
    {
      id: 7,
      title: 'TikTok Viral',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=600&fit=crop', // Fallback image if no video
      videoUrl: '', // Add your video URL here (or add more videos to public/video/ folder)
      views: '8.7M',
      aspectRatio: 'tall', // Portrait
    },
    {
      id: 8,
      title: 'Event Highlight',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop', // Fallback image if no video
      videoUrl: '', // Add your video URL here (or add more videos to public/video/ folder)
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

  // Close video modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo !== null) {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  // Helper to get video embed URL (supports local videos, Google Drive, YouTube, Vimeo)
  const getVideoEmbedUrl = (url: string | undefined): string | null => {
    if (!url || url.trim() === '') return null;

    // Local video files (from public/video/ folder) - e.g., /video/filename.mp4
    // These are returned as-is for HTML5 video player
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
      return url;
    }

    // Google Drive
    const driveUrl = convertDriveLink(url);
    if (driveUrl) return driveUrl;

    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return null;
  };

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
                onClick={() => project.videoUrl && project.videoUrl.trim() !== '' && setSelectedVideo(index)}
                className={`group relative overflow-hidden rounded-2xl ${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm ${project.videoUrl && project.videoUrl.trim() !== '' ? 'cursor-pointer' : 'cursor-default'}
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
              {/* Project Video Thumbnail or Image */}
                <div className="relative w-full h-full overflow-hidden">
                {project.videoUrl && project.videoUrl.trim() !== '' ? (
                  // Use video thumbnail (first frame) if video exists
                  <video
                    src={project.videoUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    preload="metadata"
                    muted
                    playsInline
                    onLoadedMetadata={(e) => {
                      // Seek to first frame to show as thumbnail
                      const video = e.currentTarget;
                      video.currentTime = 0.1;
                    }}
                  />
                ) : (
                  // Fallback to image if no video
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                )}
                  
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

              {/* Play Button - Only show if video exists */}
              {project.videoUrl && project.videoUrl.trim() !== '' && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <div className={`${themeClasses.gradient} w-16 h-16 rounded-full flex items-center justify-center ${themeClasses.shadowPurple} shadow-2xl`}>
                    <svg className={`w-8 h-8 ${themeClasses.textWhite} ml-1`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              )}

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

      {/* Video Modal - Sophisticated Cinema Style */}
      {selectedVideo !== null && projects[selectedVideo]?.videoUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Backdrop with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-purple-950/30 to-black/95 backdrop-blur-xl"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Close button - Floating top right */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 group"
            aria-label="Close video"
          >
            <div className="relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:border-white/40">
              <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>

          {/* Navigation Arrows */}
          {(() => {
            const videosWithContent = projects.filter(p => p.videoUrl && p.videoUrl.trim() !== '');
            const currentVideoIndex = videosWithContent.findIndex(p => p.id === projects[selectedVideo].id);
            const hasPrev = currentVideoIndex > 0;
            const hasNext = currentVideoIndex < videosWithContent.length - 1;
            
            return (
              <>
                {/* Previous Button */}
                {hasPrev && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevVideo = videosWithContent[currentVideoIndex - 1];
                      const prevIndex = projects.findIndex(p => p.id === prevVideo.id);
                      setSelectedVideo(prevIndex);
                    }}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 group"
                    aria-label="Previous video"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:-translate-x-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </button>
                )}
                
                {/* Next Button */}
                {hasNext && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextVideo = videosWithContent[currentVideoIndex + 1];
                      const nextIndex = projects.findIndex(p => p.id === nextVideo.id);
                      setSelectedVideo(nextIndex);
                    }}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 group"
                    aria-label="Next video"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:translate-x-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                )}
              </>
            );
          })()}

          {/* Main Modal Container */}
          <div 
            className="relative w-full max-w-5xl z-10 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cinema Frame */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-60"></div>
              
              {/* Inner Container */}
              <div className={`relative ${themeClasses.cardBg} rounded-2xl sm:rounded-3xl overflow-hidden`}>
                {/* Video Header - Minimal */}
                <div className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                        {projects[selectedVideo].title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center text-white/80 text-xs sm:text-sm">
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {projects[selectedVideo].views}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-white/60 text-xs sm:text-sm">Now Playing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Player Container */}
                <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                  {getVideoEmbedUrl(projects[selectedVideo].videoUrl) ? (
                    (() => {
                      const embedUrl = getVideoEmbedUrl(projects[selectedVideo].videoUrl);
                      if (embedUrl && embedUrl.match(/\.(mp4|webm|ogg|mov)$/i)) {
                        return (
                          <video
                            className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                            controls
                            autoPlay
                            src={embedUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        );
                      } else {
                        return (
                          <iframe
                            src={embedUrl || ''}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="autoplay; encrypted-media; fullscreen"
                            allowFullScreen
                            title={projects[selectedVideo].title}
                          />
                        );
                      }
                    })()
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${themeClasses.bgTertiary}`}>
                      <div className="text-center">
                        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className={`${themeClasses.textSecondary} text-center px-4`}>
                          Unable to load video
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Footer - Controls & Info */}
                <div className={`p-4 sm:p-5 border-t ${themeClasses.border} bg-gradient-to-b ${themeClasses.cardBg}`}>
                  <div className="flex items-center justify-between">
                    {/* Video Info */}
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${themeClasses.bgTertiary}`}>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"></div>
                        <span className={`text-xs sm:text-sm font-medium ${themeClasses.textSecondary}`}>
                          HD Quality
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button className={`p-2 sm:p-2.5 rounded-full ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} transition-colors duration-200`} title="Share">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      <button className={`p-2 sm:p-2.5 rounded-full ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:text-red-500 transition-colors duration-200`} title="Like">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setSelectedVideo(null)}
                        className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full ${themeClasses.gradient} text-white font-medium text-sm hover:opacity-90 transition-opacity duration-200`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Counter */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                {projects.filter(p => p.videoUrl && p.videoUrl.trim() !== '').map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      const projectIndex = projects.findIndex(p => p.id === project.id);
                      setSelectedVideo(projectIndex);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      project.id === projects[selectedVideo].id 
                        ? 'w-6 bg-gradient-to-r from-purple-500 to-blue-500' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

