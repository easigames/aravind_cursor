'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

export default function TermsPage() {
  const { themeClasses } = useTheme();

  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />
      <div className="pt-16 sm:pt-20 animate-fade-in-up">
        <section className={`py-12 sm:py-16 md:py-20 relative overflow-hidden ${themeClasses.bgPrimary}`}>
          <div className={`absolute inset-0 ${themeClasses.bgGradient} pointer-events-none opacity-30`}></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                Terms of Service
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Terms Content */}
            <div className="max-w-4xl mx-auto">
              <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8`}>
                
                {/* Introduction */}
                <div>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed`}>
                    Welcome to ArvEdit. These Terms of Service ("Terms") govern your access to and use of our video editing services. By using our services, you agree to be bound by these Terms.
                  </p>
                </div>

                {/* Section 1 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    1. Acceptance of Terms
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    By accessing or using ArvEdit's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our services.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    2. Services Description
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    ArvEdit provides professional video editing services, including but not limited to:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>Video editing and post-production</li>
                    <li>Color correction and grading</li>
                    <li>Motion graphics and animations</li>
                    <li>Sound design and audio editing</li>
                    <li>Platform-specific optimization</li>
                    <li>Caption and subtitle creation</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    3. User Responsibilities
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    You agree to:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>Provide accurate and complete information when using our services</li>
                    <li>Ensure you have all necessary rights and permissions for any content you submit</li>
                    <li>Not submit content that is illegal, offensive, or violates any third-party rights</li>
                    <li>Respect intellectual property rights and not infringe upon copyrights or trademarks</li>
                    <li>Use our services in compliance with all applicable laws and regulations</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    4. Payment and Billing
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    Payment terms:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>All fees are due as specified in your service agreement or invoice</li>
                    <li>Payment is required before or upon delivery of completed work, as agreed</li>
                    <li>Refunds are handled on a case-by-case basis and subject to our refund policy</li>
                    <li>Late payments may result in suspension of services</li>
                    <li>All prices are subject to change with notice</li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    5. Intellectual Property
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    Upon full payment, you will receive a license to use the edited content. You retain ownership of your original content. ArvEdit retains the right to use completed work in our portfolio and for promotional purposes unless otherwise agreed in writing.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    6. Revisions and Turnaround Time
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We offer revisions as specified in your service package. Turnaround times are estimates and may vary based on project complexity and current workload. Rush orders may be available for an additional fee.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    7. Limitation of Liability
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    ArvEdit shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    8. Termination
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    Either party may terminate services with written notice. Upon termination, you are responsible for payment of all services rendered up to the termination date.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    9. Changes to Terms
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the modified Terms.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    10. Contact Information
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    If you have questions about these Terms, please contact us at:
                  </p>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed`}>
                    Email: <a href="mailto:thearvedit@gmail.com" className={`${themeClasses.gradientText} hover:underline`}>thearvedit@gmail.com</a>
                  </p>
                </div>

                {/* Footer Note */}
                <div className={`pt-6 sm:pt-8 border-t ${themeClasses.cardBorder}`}>
                  <p className={`${themeClasses.textSecondary} text-xs sm:text-sm italic`}>
                    By using ArvEdit's services, you acknowledge that you have read and understood these Terms of Service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

