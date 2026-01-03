'use client';

import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';

export default function PricingPage() {
  const { themeClasses } = useTheme();
  
  return (
    <>
      <StructuredData type="faq" />
      <StructuredData 
        type="breadcrumb" 
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arvedit.com' },
            { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://arvedit.com/pricing' }
          ]
        }}
      />
      <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
        <Header />
        <div className="pt-16 sm:pt-20 animate-fade-in-up">
          <HowItWorks />
          <FAQ />
        </div>
        <Footer />
      </div>
    </>
  );
}

