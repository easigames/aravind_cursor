'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function HowItWorks() {
  const { themeClasses } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  
  const steps = [
    {
      number: '01',
      title: 'Step 1',
      description: 'Simply upload your raw footage (via Dropbox, Drive, etc.) and tell us your goal: The style, platform (TikTok/Reel), and any trending sound you want to use.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Step 2',
      description: 'I will quickly review your footage and requirements and send you a fast, fixed-price quote and confirm the exact delivery date so we can get started immediately.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Step 3',
      description: 'I will get to work by using trending techniques, engaging captions, and tight syncing to create an algorithm-crushing video.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Step 4',
      description: "I send the first draft your way. You get up to 2 rounds of quick revisions to ensure it's exactly what you need to hit publish.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'Step 5',
      description: 'Receive your high-resolution video optimized and ready-to-upload for Instagram, TikTok, YouTube, IMdb, Facebook etc. All that\'s left is to hit that Publish button.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const cardStart = sectionTop + (index * windowHeight * 0.4);
        
        // Calculate which card should be active
        const activeCard = Math.floor((scrollY - sectionTop + 200) / (windowHeight * 0.4));
        
        // Set z-index so newer cards are always on top
        card.style.zIndex = (index + 1).toString();
        
        // Keep all cards stable - no movement
        card.style.transform = 'translateY(0px)';
        card.style.opacity = '1';
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className={`py-12 sm:py-16 md:py-20 relative ${themeClasses.bgPrimary}`}
      style={{ minHeight: `${steps.length * 60}vh` }}
    >
      {/* Background Elements */}
      <div className={`absolute inset-0 ${themeClasses.bgSecondary} pointer-events-none`}>
        <div className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-b ${themeClasses.bgPrimary} to-transparent`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t ${themeClasses.bgPrimary} to-transparent`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header - Fixed at top */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 pt-6 sm:pt-8">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
            How It Works
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            From upload to viral—our simple 5-step process gets you results fast
          </p>
        </div>

        {/* Stacked Cards */}
        <div className="max-w-4xl mx-auto relative" style={{ minHeight: `${steps.length * 50}vh` }}>
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="sticky mb-8"
              style={{
                top: `${140 + (index * 8)}px`,
                transformOrigin: 'center top',
              }}
            >
              <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border-2 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl`}>
                {/* Step Number Badge */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${themeClasses.gradient} rounded-2xl mb-6 ${themeClasses.shadowPurple}`}>
                  <span className={`text-2xl font-bold ${themeClasses.textWhite}`}>{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`mb-6 ${themeClasses.textPrimary}`}>
                      {step.icon}
                </div>

                {/* Content */}
                <h3 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-4`}>
                    {step.title}
                  </h3>
                <p className={`${themeClasses.textSecondary} text-lg md:text-xl leading-relaxed`}>
                    {step.description}
                  </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/contact"
            className={`${themeClasses.buttonPrimary} px-8 py-4 rounded-full font-semibold inline-flex items-center hover:scale-105 transition-all duration-300`}
          >
            Start Your Project Today
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

