'use client';

import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';

export default function PortfolioPage() {
  const { themeClasses } = useTheme();
  
  return (
    <>
      <StructuredData 
        type="breadcrumb" 
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arvedit.com' },
            { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://arvedit.com/portfolio' }
          ]
        }}
      />
      <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
        <Header />
        <div className="pt-16 sm:pt-20 animate-fade-in-up">
          <Portfolio />
        </div>
        <Footer />
      </div>
    </>
  );
}

