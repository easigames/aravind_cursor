'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${themeClasses.textSecondary} px-4`}>
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Privacy Content */}
            <div className="max-w-4xl mx-auto">
              <div className={`${themeClasses.cardBg} ${themeClasses.cardBorder} border backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8`}>
                
                {/* Introduction */}
                <div>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed`}>
                    At ArvEdit, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our video editing services.
                  </p>
                </div>

                {/* Section 1 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    1. Information We Collect
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>Name, email address, and contact information</li>
                    <li>Payment and billing information</li>
                    <li>Project details and video content you submit</li>
                    <li>Communications and correspondence with us</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mt-3`}>
                    We may also automatically collect certain information when you visit our website, such as IP address, browser type, and usage data.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    2. How We Use Your Information
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We use the information we collect to:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>Provide, maintain, and improve our video editing services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices, updates, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    3. Information Sharing and Disclosure
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We do not sell your personal information. We may share your information only in the following circumstances:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>With service providers who assist us in operating our business</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                    <li>With your consent or at your direction</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    4. Data Security
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    5. Your Rights and Choices
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    You have the right to:
                  </p>
                  <ul className={`${themeClasses.textSecondary} text-sm sm:text-base space-y-2 ml-4 sm:ml-6 list-disc`}>
                    <li>Access and receive a copy of your personal information</li>
                    <li>Request correction of inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your personal information</li>
                    <li>Request restriction of processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mt-3`}>
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    6. Data Retention
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    7. Children's Privacy
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    8. International Data Transfers
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    9. Changes to This Privacy Policy
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary} mb-3 sm:mb-4`}>
                    10. Contact Us
                  </h2>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed mb-3`}>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <p className={`${themeClasses.textSecondary} text-sm sm:text-base leading-relaxed`}>
                    Email: <a href="mailto:arvind.sri2025@gmail.com" className={`${themeClasses.gradientText} hover:underline`}>arvind.sri2025@gmail.com</a>
                  </p>
                </div>

                {/* Footer Note */}
                <div className={`pt-6 sm:pt-8 border-t ${themeClasses.cardBorder}`}>
                  <p className={`${themeClasses.textSecondary} text-xs sm:text-sm italic`}>
                    By using ArvEdit's services, you acknowledge that you have read and understood this Privacy Policy.
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

