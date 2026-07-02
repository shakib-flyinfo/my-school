"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, Menu, Sun, Moon, Settings, User, LogOut, Shield, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import SettingsSidebar from "./SettingsSidebar";

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export default function Header({ isCollapsed, setIsCollapsed }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  // Click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userInfo = {
    name: "Rahat Admin",
    email: "rahat@school.com",
    role: "Super Admin",
    avatar: "RA",
    lastLogin: "Today, 10:30 AM"
  };

  return (
    <>
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
            {/* Sidebar Toggle - Mobile */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg transition-all hover:scale-105 hover:bg-white/5"
              style={{ 
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              }}
            >
              <Menu className={`w-6 h-6 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
            </button>

         
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
              className="relative p-2 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)'
              }}
            >
            
            </motion.button>

         

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform"
                  style={{ 
                    background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`
                  }}
                >
                  {userInfo.avatar}
                </div>

    

          
              </button>

              {/* Profile Popup */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 rounded-2xl shadow-2xl overflow-hidden z-50"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {/* Profile Header */}
                    <div 
                      className="p-4 text-center"
                      style={{
                        background: `linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(234, 88, 12, 0.15) 100%)`,
                        borderBottom: '1px solid var(--border)'
                      }}
                    >
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`
                        }}
                      >
                        {userInfo.avatar}
                      </div>
                      <h3 className="mt-2 font-bold" style={{ color: 'var(--text)' }}>{userInfo.name}</h3>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{userInfo.role}</p>
                    </div>

                    {/* Profile Info */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <Mail size={14} style={{ color: 'var(--text-secondary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text)' }}>{userInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <Shield size={14} style={{ color: 'var(--text-secondary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text)' }}>{userInfo.role}</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <Phone size={14} style={{ color: 'var(--text-secondary)' }} />
                        <span className="text-sm" style={{ color: 'var(--text)' }}>+880 1234 567890</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ borderColor: 'var(--border)', borderTop: '1px solid var(--border)' }} />

                    {/* Actions */}
                    <div className="p-2 space-y-1">
                      <button 
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <User size={16} />
                        <span className="text-sm">View Profile</span>
                      </button>
                      <button 
                        onClick={() => {
                          setIsProfileOpen(false);
                          setIsSettingsOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Settings size={16} />
                        <span className="text-sm">Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          setIsProfileOpen(false);
                          window.location.href = '/login';
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-red-500/10"
                        style={{ color: '#ef4444' }}
                      >
                        <LogOut size={16} />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>

                    {/* Footer */}
                    <div 
                      className="p-3 text-center text-[10px]"
                      style={{ 
                        color: 'var(--text-secondary)',
                        borderTop: '1px solid var(--border)',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      Last login: {userInfo.lastLogin}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Sidebar */}
      <SettingsSidebar
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLogout={() => {
          window.location.href = '/login';
        }}
      />
    </>
  );
}