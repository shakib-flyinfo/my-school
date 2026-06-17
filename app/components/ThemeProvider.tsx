"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

interface ThemeContextType {
  theme: 'dark' | 'light';
  colors: ThemeColors;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  resetTheme: () => void;
}

const defaultDarkColors: ThemeColors = {
  primary: '#dc2626',
  secondary: '#ea580c',
  accent: '#8b5cf6',
  background: '#0a0a0f',
  card: '#1e1e2d',
  text: '#ffffff',
  textSecondary: '#9ca3af',
  border: 'rgba(255, 255, 255, 0.05)',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const defaultLightColors: ThemeColors = {
  primary: '#dc2626',
  secondary: '#ea580c',
  accent: '#8b5cf6',
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#1a1a27',
  textSecondary: '#4b5563',
  border: '#e5e5e5',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback for when ThemeProvider is not available
    console.warn('useTheme must be used within ThemeProvider. Using fallback values.');
    return {
      theme: 'dark' as const,
      colors: defaultDarkColors,
      toggleTheme: () => {},
      setPrimaryColor: () => {},
      setSecondaryColor: () => {},
      setAccentColor: () => {},
      resetTheme: () => {},
    };
  }
  return context;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [colors, setColors] = useState<ThemeColors>(defaultDarkColors);
  const [isLoaded, setIsLoaded] = useState(false);

  // CSS Variables Apply Function
  const applyTheme = (themeColors: ThemeColors, isDark: boolean) => {
    const root = document.documentElement;
    
    // Apply all colors as CSS variables
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply dark/light class
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    
    // Also set data-theme attribute
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    const newColors = newTheme === 'dark' ? defaultDarkColors : defaultLightColors;
    
    setTheme(newTheme);
    setColors(newColors);
    applyTheme(newColors, newTheme === 'dark');
    
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('themeColors', JSON.stringify(newColors));
  };

  // Set Primary Color
  const setPrimaryColor = (color: string) => {
    const newColors = { ...colors, primary: color };
    setColors(newColors);
    applyTheme(newColors, theme === 'dark');
    localStorage.setItem('themeColors', JSON.stringify(newColors));
  };

  // Set Secondary Color
  const setSecondaryColor = (color: string) => {
    const newColors = { ...colors, secondary: color };
    setColors(newColors);
    applyTheme(newColors, theme === 'dark');
    localStorage.setItem('themeColors', JSON.stringify(newColors));
  };

  // Set Accent Color
  const setAccentColor = (color: string) => {
    const newColors = { ...colors, accent: color };
    setColors(newColors);
    applyTheme(newColors, theme === 'dark');
    localStorage.setItem('themeColors', JSON.stringify(newColors));
  };

  // Reset Theme
  const resetTheme = () => {
    const defaultColors = theme === 'dark' ? defaultDarkColors : defaultLightColors;
    setColors(defaultColors);
    applyTheme(defaultColors, theme === 'dark');
    localStorage.removeItem('themeColors');
  };

  // Load Theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const savedColors = localStorage.getItem('themeColors');
    
    let initialTheme: 'dark' | 'light' = 'dark';
    let initialColors: ThemeColors = defaultDarkColors;
    
    if (savedTheme) {
      initialTheme = savedTheme;
      initialColors = savedTheme === 'dark' ? defaultDarkColors : defaultLightColors;
      
      if (savedColors) {
        try {
          const parsedColors = JSON.parse(savedColors);
          initialColors = { ...initialColors, ...parsedColors };
        } catch (e) {
          console.warn('Failed to parse saved colors');
        }
      }
    }
    
    setTheme(initialTheme);
    setColors(initialColors);
    applyTheme(initialColors, initialTheme === 'dark');
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
        setPrimaryColor,
        setSecondaryColor,
        setAccentColor,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}