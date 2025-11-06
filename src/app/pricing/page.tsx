'use client';

import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

export default function PricingPage() {
  const { themeClasses } = useTheme();
  
  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />
      <div className="pt-16 sm:pt-20 animate-fade-in-up">
        <HowItWorks />
        <BookCall />
      </div>
      <Footer />
    </div>
  );
}

