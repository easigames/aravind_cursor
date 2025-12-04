'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function OurClients() {
  const { themeClasses } = useTheme();
  const [activeCreator, setActiveCreator] = useState(0);

  // Creators data - Replace image URLs with real photos
  // To add real photos: Place images in public/images/ and use /images/filename.jpg
  const creators = [
    {
      name: 'Gabe',
      image: '/images/gabe.jpg', // Replace with real photo
      fallbackImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      role: 'Content Creator',
      platform: 'TikTok & Instagram',
      quote: 'The edits brought my content to the next level!',
      stats: '450K+ views',
    },
    {
      name: 'Leandra',
      image: '/images/leandra.jpg', // Replace with real photo
      fallbackImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
      role: 'Content Creator',
      platform: 'Instagram Reels',
      quote: 'My engagement skyrocketed after working together!',
      stats: '320K+ views',
    },
    {
      name: 'Danni',
      image: '/images/danni.jpg', // Replace with real photo
      fallbackImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      role: 'Content Creator',
      platform: 'YouTube Shorts',
      quote: 'Professional quality that helped me stand out!',
      stats: '280K+ views',
    },
    {
      name: 'Mae',
      image: '/images/mae.jpg', // Replace with real photo
      fallbackImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      role: 'Content Creator',
      platform: 'Multi-Platform',
      quote: 'The best editing I\'ve ever had for my content!',
      stats: '250K+ views',
    },
    {
      name: 'Ken Jeong',
      image: '/images/ken-jeong.jpg', // Replace with real photo
      fallbackImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      role: '99 To Beat Contestant',
      platform: 'TV Show',
      quote: 'Incredible highlight reels from my TV journey!',
      stats: '200K+ views',
    },
  ];

  // Handle image load error - fall back to placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallback;
  };

  return (
    <section id="our-clients" className={`py-16 sm:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Background */}
      <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-4`}>
            Creators Who Trust Us
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} mb-8`}>
            Real creators, real results. See what we've achieved together.
          </p>
          
          {/* Stats Cards */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3`}>
              <div className={`w-12 h-12 ${themeClasses.gradient} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="text-left">
                <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>25+</p>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Creators & Contestants</p>
              </div>
            </div>
            <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3`}>
              <div className={`w-12 h-12 ${themeClasses.gradient} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>1.5M+</p>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Total Views Generated</p>
              </div>
            </div>
            <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3`}>
              <div className={`w-12 h-12 ${themeClasses.gradient} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-left">
                <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>99 To Beat</p>
                <p className={`text-sm ${themeClasses.textSecondary}`}>TV Show Featured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Creator - Large Card */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className={`relative ${themeClasses.cardBg} ${themeClasses.cardBorder} border-2 backdrop-blur-xl rounded-3xl overflow-hidden`}>
            {/* Gradient Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-3xl opacity-40 -z-10"></div>
            
            <div className="grid md:grid-cols-2 gap-0">
              {/* Creator Image */}
              <div className="relative h-64 md:h-auto">
                <img
                  src={creators[activeCreator].image}
                  alt={creators[activeCreator].name}
                  onError={(e) => handleImageError(e, creators[activeCreator].fallbackImage)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                
                {/* Stats Badge */}
                <div className={`absolute bottom-4 left-4 ${themeClasses.gradient} px-4 py-2 rounded-full`}>
                  <span className="text-white font-bold text-sm">{creators[activeCreator].stats}</span>
                </div>
              </div>

              {/* Creator Info */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${themeClasses.gradient} text-white`}>
                    {creators[activeCreator].role}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${themeClasses.cardBg} ${themeClasses.textSecondary} ${themeClasses.cardBorder} border`}>
                    {creators[activeCreator].platform}
                  </span>
                </div>
                
                <h3 className={`text-3xl sm:text-4xl font-bold ${themeClasses.textPrimary} mb-4`}>
                  {creators[activeCreator].name}
                </h3>
                
                <div className="relative mb-6">
                  <svg className={`absolute -top-2 -left-2 w-8 h-8 ${themeClasses.textSecondary} opacity-30`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className={`text-xl sm:text-2xl ${themeClasses.textPrimary} italic leading-relaxed pl-6`}>
                    "{creators[activeCreator].quote}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className={`text-sm ${themeClasses.textSecondary}`}>5-star experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Selection Grid */}
        <div className="max-w-4xl mx-auto">
          <p className={`text-center ${themeClasses.textSecondary} mb-6 font-medium`}>
            Click to see more creators
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {creators.map((creator, index) => (
              <button
                key={index}
                onClick={() => setActiveCreator(index)}
                className={`group relative flex flex-col items-center transition-all duration-300 ${
                  activeCreator === index ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                {/* Profile Image */}
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  activeCreator === index 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/50' 
                    : `${themeClasses.cardBorder} border-2 group-hover:border-purple-400`
                }`}>
                  <img
                    src={creator.image}
                    alt={creator.name}
                    onError={(e) => handleImageError(e, creator.fallbackImage)}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-purple-600/60 to-transparent transition-opacity duration-300 ${
                    activeCreator === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                </div>
                
                {/* Active Indicator */}
                {activeCreator === index && (
                  <div className="absolute -bottom-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                )}
                
                {/* Name */}
                <p className={`mt-3 text-sm font-semibold transition-colors duration-300 ${
                  activeCreator === index ? themeClasses.textPrimary : themeClasses.textSecondary
                }`}>
                  {creator.name}
                </p>
                
                {/* Role Badge - Show on active */}
                {activeCreator === index && (
                  <span className={`mt-1 text-xs ${themeClasses.textSecondary}`}>
                    {creator.role}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className={`${themeClasses.textSecondary} mb-4`}>
            Want to be featured here?
          </p>
          <a
            href="/contact"
            className={`inline-flex items-center gap-2 ${themeClasses.buttonPrimary} px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300`}
          >
            Start Your Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
