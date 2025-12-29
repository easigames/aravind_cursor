'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Contact() {
  const { themeClasses } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 ${themeClasses.bgPrimary} pointer-events-none`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
            Let's Create Something Amazing
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-2`}>
            Ready to bring your vision to life? Get in touch with us today
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10`}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className={`block ${themeClasses.textPrimary} font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-3 min-h-[48px] rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all text-base`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block ${themeClasses.textPrimary} font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-3 min-h-[48px] rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all text-base`}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className={`block ${themeClasses.textPrimary} font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-3 min-h-[48px] rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all text-base`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="service" className={`block ${themeClasses.textPrimary} font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base`}>
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-3 min-h-[48px] rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all appearance-none cursor-pointer text-base`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="">Select a service</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="motion-graphics">Motion Graphics</option>
                  <option value="color-grading">Color Grading</option>
                  <option value="sound-design">Sound Design</option>
                  <option value="social-media">Social Media Content</option>
                  <option value="post-production">Post-Production</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={`block ${themeClasses.textPrimary} font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base`}>
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.inputBorder} border ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all resize-none text-base`}
                  placeholder="Tell us about your project..."
                />
              </div>

              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${themeClasses.buttonPrimary} w-full py-3.5 sm:py-3 px-6 min-h-[48px] rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 sm:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-base`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Contact Cards */}
            <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8`}>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${themeClasses.gradient} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${themeClasses.textWhite}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-base sm:text-lg font-bold ${themeClasses.textPrimary} mb-1`}>Email Us</h3>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base break-all`}>arvind.sri2025@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8`}>
              <div className="relative">
                <div className="relative">
                  <h3 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>Follow Us</h3>
                  <p className={`mb-4 sm:mb-6 ${themeClasses.textSecondary} text-sm sm:text-base`}>Stay connected on social media</p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <a href="#" className={`w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95 sm:hover:scale-110`}>
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className={`w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95 sm:hover:scale-110`}>
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className={`w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95 sm:hover:scale-110`}>
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className={`w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] ${themeClasses.gradient} rounded-lg flex items-center justify-center transition-all active:scale-95 sm:hover:scale-110`}>
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${themeClasses.textWhite}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

