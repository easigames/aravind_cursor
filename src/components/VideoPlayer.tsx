'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onLoadedMetadata?: () => void;
  onError?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  setVideoRef?: (element: HTMLVideoElement | null) => void;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  objectFit?: 'contain' | 'cover';
}

/**
 * Professional Video Player Component
 * 
 * Features:
 * - Optimized loading with skeleton states
 * - Poster image support for instant visual feedback
 * - Smooth transitions between loading states
 * - Buffer progress indicator
 * - Range request support (via video API)
 * - Lazy loading with Intersection Observer
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  preload = 'metadata',
  onLoadedMetadata,
  onError,
  onPlay,
  onPause,
  setVideoRef,
  aspectRatio = 'video',
  objectFit = 'contain',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isLoading, setIsLoading] = useState(false); // Start false - let poster show immediately
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Start visible - load immediately
  const [showPoster, setShowPoster] = useState(true);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [hasLoadedFirstFrame, setHasLoadedFirstFrame] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start loading immediately - no lazy loading delay
  useEffect(() => {
    setIsVisible(true);
    
    // Cleanup timeout on unmount
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  // Expose video ref to parent component
  useEffect(() => {
    if (setVideoRef) {
      setVideoRef(videoRef.current);
    }
    return () => {
      if (setVideoRef) {
        setVideoRef(null);
      }
    };
  }, [setVideoRef]);

  // Show first frame as thumbnail when video metadata loads
  useEffect(() => {
    if (videoRef.current && hasLoadedFirstFrame && !autoPlay) {
      // Ensure video is paused and showing first frame
      videoRef.current.pause();
      videoRef.current.currentTime = 0.1;
    }
  }, [hasLoadedFirstFrame, autoPlay]);

  // Handle video loading events
  const handleLoadedMetadata = useCallback(() => {
    setIsLoading(false);
    // Show first frame as thumbnail
    if (videoRef.current && !hasLoadedFirstFrame) {
      // Pause video and show first frame
      videoRef.current.pause();
      videoRef.current.currentTime = 0.1;
      setHasLoadedFirstFrame(true);
    }
    onLoadedMetadata?.();
  }, [onLoadedMetadata, hasLoadedFirstFrame]);

  const handleLoadStart = useCallback(() => {
    // Only show loading if no poster is available
    if (!poster) {
      setIsLoading(true);
    }
    
    // Set a timeout to detect if video is stuck loading (30 seconds)
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }
    loadTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 2) {
        // Video hasn't loaded after 30 seconds - show error
        console.warn('Video load timeout - attempting retry');
        handleError();
      }
    }, 30000);
  }, [poster]);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
    setIsBuffering(false);
    // Clear loading timeout since video is ready
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  }, []);

  const handleWaiting = useCallback(() => {
    // Only show buffering if video is actually playing
    if (videoRef.current && !videoRef.current.paused) {
      setIsBuffering(true);
    }
  }, []);

  const handlePlaying = useCallback(() => {
    setIsBuffering(false);
    setShowPoster(false);
    onPlay?.();
  }, [onPlay]);

  // Hide poster when video starts playing (on play event)
  const handlePlay = useCallback(() => {
    setShowPoster(false);
    onPlay?.();
  }, [onPlay]);

  const handlePause = useCallback(() => {
    // Show poster when video is paused and at the beginning
    if (videoRef.current && poster) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      // If video is at the beginning (within 0.5 seconds) or very close to the end, show poster
      if (currentTime < 0.5 || (duration > 0 && currentTime >= duration - 0.5)) {
        setShowPoster(true);
        if (currentTime < 0.5) {
          videoRef.current.currentTime = 0;
        }
      }
    }
    onPause?.();
  }, [onPause, poster]);

  const handleError = useCallback(() => {
    // Clear loading timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    
    // Try to retry automatically up to 2 times before showing error
    if (retryCount < 2) {
      console.log(`Video load failed, retrying... (attempt ${retryCount + 1}/2)`);
      setRetryCount(prev => prev + 1);
      setIsLoading(true);
      setShowPoster(true); // Show poster while retrying
      
      // Wait a moment before retrying
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 1000);
    } else {
      // Show error after retries exhausted - keep poster visible as fallback
      console.error('Video failed to load after retries');
      setHasError(true);
      setIsLoading(false);
      setShowPoster(true); // Keep poster visible as fallback
      onError?.();
    }
  }, [onError, retryCount]);

  // Track buffer progress
  const handleProgress = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setBufferProgress((bufferedEnd / duration) * 100);
        }
      }
    }
  }, []);

  // Handle visibility change - show poster when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && videoRef.current && poster) {
        // Tab became visible - if video is paused, show poster
        if (videoRef.current.paused) {
          const currentTime = videoRef.current.currentTime;
          const duration = videoRef.current.duration;
          // If at beginning or end, show poster
          if (currentTime < 0.5 || (duration > 0 && currentTime >= duration - 0.5)) {
            setShowPoster(true);
            if (currentTime < 0.5) {
              videoRef.current.currentTime = 0;
            }
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [poster]);

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    if (aspectRatio === 'auto') {
      return ''; // No aspect ratio constraint - let parent container handle it
    }
    switch (aspectRatio) {
      case 'portrait':
        return 'aspect-[9/16]';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${getAspectRatioClass()} ${className}`}
    >
      {/* Poster/Thumbnail Image - Always show as fallback background, especially on error */}
      {poster && (
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 z-0 ${
            showPoster || hasError ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${poster})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Fallback: If no poster provided and there's an error, show a placeholder */}
      {!poster && hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0" />
      )}

      {/* Minimal Loading Indicator - Only show if no poster and loading */}
      {isLoading && !poster && !hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}

      {/* Loading spinner overlay when poster exists */}
      {isLoading && poster && !hasError && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Subtle Buffering Indicator - Only show when actually buffering during playback */}
      {isBuffering && !isLoading && !hasError && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-15 pointer-events-none">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white/70 rounded-full animate-spin" />
        </div>
      )}

      {/* Error State - Subtle overlay on top of poster/thumbnail */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4 z-20">
          <div className="bg-gray-900/90 rounded-xl p-4 sm:p-6 flex flex-col items-center max-w-xs">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-2 sm:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-300 text-xs sm:text-sm text-center mb-3">Video temporarily unavailable</p>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setRetryCount(0); // Reset retry count for manual retry
                setShowPoster(true); // Show poster while retrying
                // Add a small delay before reloading
                setTimeout(() => {
                  videoRef.current?.load();
                }, 100);
              }}
              className="px-4 py-2 min-h-[44px] bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-lg text-white text-sm font-medium transition-all shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Video Element - Show immediately to display first frame as thumbnail */}
      {isVisible && !hasError && (
        <video
          ref={videoRef}
          className={`w-full h-full relative z-10 ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${
            showPoster ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={preload}
          playsInline
          crossOrigin="anonymous"
          title={title}
          // Add key to force remount on retry
          key={`video-${retryCount}`}
          onLoadStart={handleLoadStart}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={() => {
            // Ensure first frame is shown as thumbnail when metadata loads
            if (videoRef.current && !hasLoadedFirstFrame && !autoPlay) {
              videoRef.current.currentTime = 0.1;
              setHasLoadedFirstFrame(true);
            }
          }}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={handleProgress}
          onError={handleError}
          onStalled={() => {
            console.warn('Video stalled - network may be slow');
            // Don't treat stall as error, just log it
          }}
          onSuspend={() => {
            // Video data loading has been suspended (normal for streaming)
            console.log('Video loading suspended (normal)');
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

/**
 * Thumbnail Video - Optimized for grid displays
 * Shows first frame as thumbnail, plays on hover
 */
interface ThumbnailVideoProps {
  src: string;
  alt: string;
  className?: string;
  onReady?: () => void;
  playOnHover?: boolean;
}

export function ThumbnailVideo({
  src,
  alt,
  className = '',
  onReady,
  playOnHover = true,
}: ThumbnailVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(true); // Start as loaded - show video immediately
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Start visible, no lazy loading for thumbnails
  const [hasError, setHasError] = useState(false);

  // Mark as loaded once we have enough data
  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    onReady?.();
  }, [onReady]);

  const handleLoadedData = useCallback(() => {
    // Set to first frame to show thumbnail
    if (videoRef.current) {
      videoRef.current.currentTime = 0.1;
    }
    setIsLoaded(true);
    onReady?.();
  }, [onReady]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true); // Stop spinner on error
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (playOnHover && videoRef.current && isLoaded && !hasError) {
      setIsHovered(true);
      videoRef.current.play().catch(() => {});
    }
  }, [playOnHover, isLoaded, hasError]);

  const handleMouseLeave = useCallback(() => {
    if (playOnHover && videoRef.current) {
      setIsHovered(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0.1;
    }
  }, [playOnHover]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Error state - only show if there's an actual error */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center z-10">
          <div className="text-center">
            <svg className="w-10 h-10 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400 text-xs">Video unavailable</p>
          </div>
        </div>
      )}

      {isVisible && !hasError && (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          src={src}
          muted
          playsInline
          loop
          preload="metadata" // Changed from "auto" to "metadata" for faster initial load
          title={alt}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
          onError={handleError}
        />
      )}

      {/* Hover/Touch play indicator */}
      {playOnHover && isLoaded && !hasError && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'} pointer-events-none`}>
          <div className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

