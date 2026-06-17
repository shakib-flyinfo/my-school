"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, ChevronDown, Menu, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export default function Header({ isCollapsed, setIsCollapsed }: HeaderProps) {
  const { theme, toggleTheme, colors } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  return (
    <header 
      className="sticky top-0 z-50 border-b px-6 py-3 transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg transition-all hover:scale-105"
            style={{ 
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent'
            }}
          >
            <Menu className={`w-6 h-6 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
          </button>

          <h2 className="font-bold text-xl hidden md:block" style={{ color: 'var(--text)' }}>
            RPS<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>

          <div className="hidden sm:block relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <input
              className="pl-10 pr-4 py-2 rounded-xl outline-none transition-all text-sm"
              style={{
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              placeholder="Search..."
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              toggleTheme();
              setIsDarkMode(!isDarkMode);
            }}
            className="relative p-2 rounded-xl transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)'
            }}
          >
            <div className="relative w-5 h-5">
              <motion.div
                animate={{
                  rotate: isDarkMode ? 0 : 180,
                  scale: isDarkMode ? 1 : 0,
                  opacity: isDarkMode ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Moon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </motion.div>
              <motion.div
                animate={{
                  rotate: isDarkMode ? -180 : 0,
                  scale: isDarkMode ? 0 : 1,
                  opacity: isDarkMode ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Sun className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg transition-all"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)'
            }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary)' }} />
          </motion.button>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform"
              style={{ 
                background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`
              }}
            >
              RA
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-bold transition-colors group-hover:text-primary" style={{ color: 'var(--text)' }}>
                Rahat Admin
              </p>
              <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                Super Admin
              </p>
            </div>

            <ChevronDown className="w-4 h-4 transition-colors group-hover:text-primary" style={{ color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>
    </header>
  );
}