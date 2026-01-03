'use client';

import Header from '@/components/Header';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';

export default function ServicesPage() {
  const { themeClasses } = useTheme();
  
  return (
    <>
      <StructuredData type="service" />
      <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
        <Header />
        <div className="pt-16 sm:pt-20 animate-fade-in-up">
          <Services />
        </div>
        <Footer />
      </div>
    </>
  );
}

