'use client';

import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';

export default function ContactPage() {
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
            { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://arvedit.com/contact' }
          ]
        }}
      />
      <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
        <Header />
        <div className="pt-16 sm:pt-20 animate-fade-in-up">
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}

