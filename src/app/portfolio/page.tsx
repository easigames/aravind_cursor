'use client';

import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

export default function PortfolioPage() {
  const { themeClasses } = useTheme();
  
  return (
    <div className={`min-h-screen ${themeClasses.bgPrimary}`}>
      <Header />
      <div className="pt-16 sm:pt-20 animate-fade-in-up">
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
}

