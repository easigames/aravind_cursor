'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Testimonials() {
  const { themeClasses } = useTheme();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp Inc.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      content: 'The team delivered exceptional results! Our brand video exceeded all expectations and helped us increase engagement by 300%. Their attention to detail and creative vision is unmatched.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'StartupHub',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      content: 'Working with this team was a game-changer for our company. They transformed our raw footage into a compelling story that resonated with our audience. Highly professional and creative!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      company: 'Creative Studios',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      content: 'I\'ve worked with many video editors, but this team stands out. They understand the nuances of social media content and always deliver on time. My engagement rates have never been better!',
      rating: 5,
    },
    {
      name: 'David Thompson',
      role: 'Brand Manager',
      company: 'Fashion Forward',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      content: 'Absolutely phenomenal work! They took our vision and elevated it beyond what we imagined. The final product was stunning and perfectly captured our brand essence.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
            What Our Clients Say
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-2`}>
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12`}>
            <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8">
              {/* Client Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 theme-gradient rounded-full blur-lg opacity-50"></div>
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white/20"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Stars */}
                <div className="flex justify-center md:justify-start mb-3 sm:mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed italic">
                  "{testimonials[activeTestimonial].content}"
                </p>

                {/* Client Info */}
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400">
                    {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`transition-all duration-300 cursor-pointer rounded-full min-w-[12px] min-h-[12px] ${
                activeTestimonial === index
                  ? 'w-8 h-3 theme-gradient'
                  : 'w-3 h-3 bg-[#151825] hover:bg-[#1a1d2d]'
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-10 sm:mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 active:scale-95 ${
                activeTestimonial === index
                  ? 'theme-gradient'
                  : 'theme-card bg-[#151825]/50 backdrop-blur-sm hover:bg-[#1a1d2d]'
              }`}
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-lg opacity-50 ${
                  activeTestimonial === index ? 'bg-white' : 'theme-gradient'
                }`}></div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mb-2 sm:mb-4 border-2 border-white/20"
                />
              </div>
              <h4 className={`font-bold mb-0.5 sm:mb-1 text-sm sm:text-base ${
                activeTestimonial === index ? 'text-white' : 'text-gray-300'
              }`}>{testimonial.name}</h4>
              <p className={`text-xs sm:text-sm ${
                activeTestimonial === index ? 'text-white/80' : 'text-gray-500'
              }`}>{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

