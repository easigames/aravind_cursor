'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { themes, ThemeName } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeName;
  themeClasses: typeof themes.dark.colors;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  themeClasses: themes.dark.colors,
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    
    // Default to dark mode if no saved theme
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: ThemeName) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update CSS classes on body
    if (newTheme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const themeClasses = themes[theme].colors;

  return (
    <ThemeContext.Provider value={{ theme, themeClasses, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

