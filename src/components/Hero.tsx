'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';
import VideoPlayer from './VideoPlayer';

interface FloatPosition {
  left: number;
  top: number;
  duration: number;
}

export default function Hero() {
  const { themeClasses } = useTheme();
  const [floatPositions, setFloatPositions] = useState<FloatPosition[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const wasPlayingRef = useRef(false);

  // Callback to get video element reference
  const setHeroVideoRef = useCallback((element: HTMLVideoElement | null) => {
    heroVideoRef.current = element;
  }, []);

  // Handle video play
  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Handle video pause
  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Generate random positions only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const positions: FloatPosition[] = Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 4,
    }));
    setFloatPositions(positions);
  }, []);

  // Intersection Observer to pause video when out of view
  useEffect(() => {
    const videoContainer = videoContainerRef.current;
    if (!videoContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = heroVideoRef.current;
          if (!video) return;

          if (entry.isIntersecting) {
            // Video is in view - resume if it was playing before
            if (wasPlayingRef.current) {
              video.play().catch(() => {});
            }
          } else {
            // Video is out of view - pause it
            wasPlayingRef.current = !video.paused;
            video.pause();
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of video is visible
    );

    observer.observe(videoContainer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={`relative min-h-fit lg:min-h-[85vh] flex items-center overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12 ${themeClasses.bgPrimary}`}>
      {/* Dynamic Gradient Background */}
      <div className={`absolute inset-0 ${themeClasses.heroBg}`}></div>

      {/* Film Strip Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {/* Vertical Film Strips */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-16"
            style={{ left: `${i * 20}%` }}
          >
            {/* Film perforations */}
            {[...Array(20)].map((_, j) => (
              <div
                key={j}
                className={`absolute w-3 h-3 ${themeClasses.bgPrimary === 'bg-gray-900' ? 'bg-purple-500' : 'bg-purple-400'} rounded-sm`}
                style={{ top: `${j * 5}%`, left: '2px' }}
              />
            ))}
            {[...Array(20)].map((_, j) => (
              <div
                key={`r-${j}`}
                className={`absolute w-3 h-3 ${themeClasses.bgPrimary === 'bg-gray-900' ? 'bg-blue-500' : 'bg-blue-400'} rounded-sm`}
                style={{ top: `${j * 5}%`, right: '2px' }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Timeline/Waveform Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,50 L50,30 L100,60 L150,20 L200,70 L250,40 L300,80 L350,30 L400,60 L450,25 L500,75 L550,35 L600,65 L650,30 L700,70 L750,40 L800,60 L850,30 L900,70 L950,40 L1000,60 L1050,30 L1100,65 L1150,40 L1200,50"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Play Button Icons Floating */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          {floatPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${pos.duration}s`,
              }}
            >
              <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 flex flex-col justify-center text-center lg:text-left">
            {/* Badge */}
            <div className="relative mb-4 sm:mb-6 animate-fade-in">
              <div className={`inline-flex items-center px-4 py-2 ${themeClasses.cardBg} border ${themeClasses.cardBorder} ${themeClasses.shadowHover} text-xs font-semibold ${themeClasses.textPrimary} transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="tracking-wide">CREATOR-FOCUSED EDITING</span>
                  <svg className="w-3 h-3 ml-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full opacity-40"></div>
            </div>

            {/* Main Heading */}
            <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold ${themeClasses.heroText} mb-3 sm:mb-4 leading-tight animate-fade-in-up`}>
              Edits That Make People Watch. 🎬
              <span className={`block ${themeClasses.gradientText}`}>
                Turn Views Into Followers. 👥
              </span>
            </h1>

            {/* Subheading */}
            <p className={`text-sm sm:text-base md:text-lg ${themeClasses.heroSubtext} mb-4 sm:mb-6 animate-fade-in-up animation-delay-200`}>
              High-energy edits designed to hook viewers in 3 seconds. Algorithm-crushing short-form videos for TikTok, Reels & Shorts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 mb-4 sm:mb-6 animate-fade-in-up animation-delay-400 items-center lg:items-start w-full sm:w-auto">
              <Link
                href="/contact"
                className={`group relative w-full sm:w-auto px-6 py-3 sm:py-2.5 min-h-[48px] sm:min-h-0 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 active:scale-95 sm:hover:scale-105 ${themeClasses.shadowPurple} flex items-center justify-center ${themeClasses.buttonPrimary}`}
              >
                <span className={`relative ${themeClasses.textWhite} flex items-center`}>
                  Start Your Project
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="https://calendly.com/arvedit"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-full sm:w-auto px-6 py-3 sm:py-2.5 min-h-[48px] sm:min-h-0 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105 overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl flex items-center justify-center`}
              >
                <span className="relative flex items-center">
                  Book a Call
                  <svg
                    className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="/portfolio"
                className={`group relative w-full sm:w-auto px-6 py-3 sm:py-2.5 min-h-[48px] sm:min-h-0 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95 sm:hover:scale-105 overflow-hidden ${themeClasses.buttonOutline} flex items-center justify-center`}
              >
                <span className="relative">See Our Work</span>
              </Link>
            </div>

            {/* Video Editing Creative Elements */}
            <div className="flex flex-wrap gap-2 animate-fade-in-up animation-delay-600 justify-center lg:justify-start">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 ${themeClasses.badgePurple} border rounded-lg`}>
                <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span className={`text-xs ${themeClasses.textSecondary}`}>4K Ready</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 ${themeClasses.badgeBlue} border rounded-lg`}>
                <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span className={`text-xs ${themeClasses.textSecondary}`}>24hr Turnaround</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 ${themeClasses.badgePink} border rounded-lg`}>
                <svg className="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className={`text-xs ${themeClasses.textSecondary}`}>Unlimited Revisions</span>
              </div>
            </div>
          </div>

          {/* Right Video Demo Section - Visible on all screens */}
          <div className="relative animate-fade-in-up animation-delay-400 mt-6 lg:mt-0">
            {/* Video Container with Film Frame Effect */}
            <div className="relative max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
              {/* Film Frame Border - Hidden on mobile for cleaner look */}
              <div className={`absolute -inset-2 sm:-inset-3 ${themeClasses.cardBg} rounded-xl opacity-50 hidden sm:block`}>
                {/* Top perforations */}
                <div className="absolute top-0 left-0 right-0 flex justify-around px-4 sm:px-6 py-1 sm:py-1.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={`top-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-sm" />
                  ))}
                </div>
                {/* Bottom perforations */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4 sm:px-6 py-1 sm:py-1.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={`bottom-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-sm" />
                  ))}
                </div>
                {/* Left perforations */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around py-4 sm:py-6 px-1 sm:px-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={`left-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-sm" />
                  ))}
                </div>
                {/* Right perforations */}
                <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around py-4 sm:py-6 px-1 sm:px-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={`right-${i}`} className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-sm" />
                  ))}
                </div>
              </div>

              {/* Video Player */}
              <div 
                ref={videoContainerRef}
                className={`group relative aspect-video ${themeClasses.cardBg} rounded-xl sm:rounded-2xl overflow-hidden border sm:border-2 ${themeClasses.cardBorder} shadow-lg sm:shadow-xl`}
              >
                <div className="relative w-full h-full">
                  <VideoPlayer
                    src="/api/video/arvedit_homepage.mp4"
                    title="ArvEdit Demo"
                    aspectRatio="video"
                    muted={false}
                    loop
                    controls={true}
                    preload="metadata"
                    className="w-full h-full rounded-xl sm:rounded-2xl"
                    setVideoRef={setHeroVideoRef}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                  />
                </div>

                {/* Play/Pause Button - Only visible on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = heroVideoRef.current;
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
                    className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 min-w-[56px] min-h-[56px] bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all duration-200 shadow-xl"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      // Pause icon
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      // Play icon
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Floating Elements - Smaller on mobile */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600/30 to-pink-600/30 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on very small mobile screens */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className={`${themeClasses.statBg} backdrop-blur-sm rounded-full p-2 border ${themeClasses.statBorder} hover:border-purple-400 transition-all`}>
          <svg
            className="w-4 h-4 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

