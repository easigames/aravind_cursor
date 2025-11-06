'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';


export default function FAQ() {
  const { themeClasses } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What types of videos do you edit?',
      answer: 'We edit all types of videos including corporate videos, commercials, social media content, music videos, documentaries, wedding videos, YouTube content, and more. Whatever your video needs, we have the expertise to deliver.',
    },
    {
      question: 'How long does the editing process take?',
      answer: 'The timeline depends on the project complexity and length. Simple edits can be completed in 2-3 days, while more complex projects may take 1-2 weeks. We always provide a detailed timeline during the planning phase and keep you updated throughout the process.',
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Our pricing is customized based on project requirements, video length, complexity, and turnaround time. We offer both per-project pricing and monthly retainer packages for ongoing needs. Contact us for a free quote tailored to your specific project.',
    },
    {
      question: 'How many revisions do I get?',
      answer: 'All our packages include up to 3 rounds of revisions to ensure you\'re completely satisfied with the final product. We work closely with you to understand your vision from the start, minimizing the need for extensive revisions.',
    },
    {
      question: 'What file formats do you deliver?',
      answer: 'We deliver videos in any format you need - MP4, MOV, AVI, or custom formats for specific platforms. We also optimize videos for different platforms like YouTube, Instagram, TikTok, Facebook, and more, ensuring the best quality for each destination.',
    },
    {
      question: 'Do you provide raw footage if needed?',
      answer: 'Yes, we can provide project files and raw footage upon request. This is especially useful if you need to make future edits or want to maintain full ownership of all project assets.',
    },
    {
      question: 'Can you work with footage from any camera?',
      answer: 'Absolutely! We work with footage from all types of cameras - smartphones, DSLRs, cinema cameras, drones, action cameras, and more. We can handle various formats including 4K, 6K, 8K, and different frame rates.',
    },
    {
      question: 'Do you offer rush/expedited services?',
      answer: 'Yes, we offer expedited services for urgent projects. Rush delivery is available for an additional fee, and we can often accommodate tight deadlines. Contact us to discuss your timeline and we\'ll do our best to meet your needs.',
    },
    {
      question: 'What if I need music or voiceover?',
      answer: 'We can source royalty-free music, license commercial tracks, or work with your provided audio. We also have partnerships with professional voiceover artists and can arrange voiceover services as part of your project.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply click the "Book a Call" button to schedule a free consultation. We\'ll discuss your project, provide recommendations, and give you a detailed quote. You can also email us your project details, and we\'ll respond within 24 hours.',
    },
  ];

  return (
    <section id="faq" className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none`}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
            Everything you need to know about our video editing services
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} ${themeClasses.cardHoverBg} backdrop-blur-sm rounded-2xl overflow-hidden ${themeClasses.cardBorder} border transition-all duration-300`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className={`text-lg font-semibold ${themeClasses.textPrimary} pr-8`}>
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full ${themeClasses.gradient} ${themeClasses.textWhite} flex items-center justify-center transition-all duration-300 ${
                      openIndex === index ? 'rotate-180 scale-110' : ''
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-6">
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

