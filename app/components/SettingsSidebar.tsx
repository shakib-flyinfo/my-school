"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Mail,
  Settings as SettingsIcon,
  Volume2,
  Eye,
  Clock,
  Database,
  Zap,
  Monitor,
  Wifi,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export default function SettingsSidebar({
  isOpen,
  onClose,
  onLogout,
}: SettingsSidebarProps) {
  const {
    theme,
    toggleTheme,
    colors,
    setPrimaryColor,
    setSecondaryColor,
    setAccentColor,
  } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>("general");

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = "/login";
    }
  };

  const settingsSections = [
    {
      id: "general",
      icon: <SettingsIcon size={18} />,
      title: "General",
      description: "Appearance, language & timezone",
      items: [
        {
          label: "Theme Mode",
          value: theme === "dark" ? "Dark" : "Light",
          action: toggleTheme,
          icon:
            theme === "dark" ? (
              <Moon size={14} className="text-blue-400" />
            ) : (
              <Sun size={14} className="text-yellow-400" />
            ),
        },
        {
          label: "Language",
          value: "English",
          action: () => {},
          icon: <Globe size={14} className="text-green-400" />,
        },
        {
          label: "Timezone",
          value: "UTC +6",
          action: () => {},
          icon: <Clock size={14} className="text-purple-400" />,
        },
      ],
    },
    {
      id: "appearance",
      icon: <Palette size={18} />,
      title: "Appearance",
      description: "Customize colors & layout",
      items: [
        {
          label: "Primary Color",
          value: colors.primary,
          isColorPicker: true,
          colors: [
            { color: "#dc2626", name: "Red" },
            { color: "#2563eb", name: "Blue" },
            { color: "#059669", name: "Green" },
            { color: "#7c3aed", name: "Purple" },
            { color: "#db2777", name: "Pink" },
            { color: "#ea580c", name: "Orange" },
          ],
        },
        {
          label: "Secondary Color",
          value: colors.secondary,
          isColorPicker: true,
          colors: [
            { color: "#ea580c", name: "Orange" },
            { color: "#06b6d4", name: "Cyan" },
            { color: "#10b981", name: "Emerald" },
            { color: "#a855f7", name: "Purple" },
            { color: "#ec4899", name: "Pink" },
            { color: "#f97316", name: "Orange" },
          ],
        },
        {
          label: "Accent Color",
          value: colors.accent || "#8b5cf6",
          isColorPicker: true,
          colors: [
            { color: "#8b5cf6", name: "Purple" },
            { color: "#3b82f6", name: "Blue" },
            { color: "#34d399", name: "Emerald" },
            { color: "#c084fc", name: "Light Purple" },
            { color: "#f472b6", name: "Pink" },
            { color: "#f59e0b", name: "Amber" },
          ],
        },
        {
          label: "Font Size",
          value: "Medium",
          action: () => {},
          icon: <Eye size={14} className="text-blue-400" />,
        },
      ],
    },
    {
      id: "notifications",
      icon: <Bell size={18} />,
      title: "Notifications",
      description: "Manage alerts & reminders",
      items: [
        {
          label: "Email Notifications",
          value: "On",
          action: () => {},
          icon: <Mail size={14} className="text-red-400" />,
        },
        {
          label: "Push Notifications",
          value: "On",
          action: () => {},
          icon: <Bell size={14} className="text-yellow-400" />,
        },
        {
          label: "Sound Alerts",
          value: "Off",
          action: () => {},
          icon: <Volume2 size={14} className="text-green-400" />,
        },
      ],
    },
    {
      id: "security",
      icon: <Shield size={18} />,
      title: "Security",
      description: "Password, 2FA & privacy",
      items: [
        {
          label: "Two-Factor Auth",
          value: "Disabled",
          action: () => {},
          icon: <Lock size={14} className="text-red-400" />,
        },
        {
          label: "Last Login",
          value: "2 hours ago",
          action: () => {},
          icon: <Clock size={14} className="text-gray-400" />,
        },
        {
          label: "Active Sessions",
          value: "3 Devices",
          action: () => {},
          icon: <Monitor size={14} className="text-blue-400" />,
        },
      ],
    },
    {
      id: "account",
      icon: <User size={18} />,
      title: "Account",
      description: "Profile, billing & apps",
      items: [
        {
          label: "Profile",
          value: "Rahat Admin",
          action: () => {},
          icon: <User size={14} className="text-blue-400" />,
        },
        {
          label: "Email",
          value: "rahat@school.com",
          action: () => {},
          icon: <Mail size={14} className="text-red-400" />,
        },
        {
          label: "Role",
          value: "Super Admin",
          action: () => {},
          icon: <Shield size={14} className="text-purple-400" />,
        },
      ],
    },
    {
      id: "system",
      icon: <Database size={18} />,
      title: "System",
      description: "Performance & storage",
      items: [
        {
          label: "System Status",
          value: "Operational",
          action: () => {},
          icon: <Zap size={14} className="text-green-400" />,
        },
        {
          label: "Storage",
          value: "45% Used",
          action: () => {},
          icon: <Database size={14} className="text-blue-400" />,
        },
        {
          label: "Network",
          value: "Connected",
          action: () => {},
          icon: <Wifi size={14} className="text-green-400" />,
        },
      ],
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 shadow-2xl overflow-y-auto"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 p-4 flex items-center justify-between z-10"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
              }}
            >
              <SettingsIcon size={20} className="text-white" />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--text)" }}
              >
                Settings
              </h2>
              <p
                className="text-[10px]"
                style={{ color: "var(--text-secondary)" }}
              >
                Manage your preferences
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "var(--text-secondary)" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4" style={{ borderColor: "var(--border)" }}>
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                icon: <Bell size={16} />,
                label: "Alerts",
                color: "text-yellow-400",
              },
              {
                icon: <HelpCircle size={16} />,
                label: "Help",
                color: "text-emerald-400",
              },
              {
                icon: <Lock size={16} />,
                label: "Privacy",
                color: "text-blue-400",
              },
              {
                icon: <LogOut size={16} />,
                label: "Logout",
                color: "text-red-400",
              },
            ].map((action, idx) => (
              <button
                key={idx}
                onClick={action.label === "Logout" ? handleLogout : undefined}
                className="p-3 rounded-xl transition-all text-center group"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "var(--text-secondary)",
                }}
              >
                <div
                  className={`${action.color} flex justify-center mb-1 group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <span
                  className="text-[9px] group-hover:text-white transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle Quick */}
        <div
          className="mx-4 mt-4 p-3 rounded-xl flex items-center justify-between"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              {theme === "dark" ? (
                <Moon size={16} className="text-blue-400" />
              ) : (
                <Sun size={16} className="text-yellow-400" />
              )}
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Dark Mode
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {theme === "dark" ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors`}
            style={{
              backgroundColor:
                theme === "dark" ? "var(--primary)" : "var(--text-secondary)",
            }}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                theme === "dark" ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* Settings Sections */}
        <div className="p-4 space-y-3">
          {settingsSections.map((section) => (
            <div
              key={section.id}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "var(--border)",
              }}
            >
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id,
                  )
                }
                className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "var(--primary)",
                    }}
                  >
                    {section.icon}
                  </div>
                  <div className="text-left">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {section.title}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {section.description}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className={`transition-transform ${
                    activeSection === section.id ? "rotate-90" : ""
                  }`}
                  style={{ color: "var(--text-secondary)" }}
                />
              </button>

              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="p-3 space-y-2">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors hover:bg-white/5"
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && (
                              <span className="opacity-60">{item.icon}</span>
                            )}
                            <span
                              className="text-xs"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {item.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.isColorPicker ? (
                              <div className="flex gap-1">
                                {(
                                  item.colors as {
                                    color: string;
                                    name: string;
                                  }[]
                                ).map((c) => (
                                  <button
                                    key={c.color}
                                    onClick={() => {
                                      if (item.label === "Primary Color")
                                        setPrimaryColor(c.color);
                                      else if (item.label === "Secondary Color")
                                        setSecondaryColor(c.color);
                                      else if (item.label === "Accent Color")
                                        setAccentColor(c.color);
                                    }}
                                    className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110"
                                    style={{
                                      backgroundColor: c.color,
                                      borderColor: "rgba(255, 255, 255, 0.2)",
                                    }}
                                    title={c.name}
                                  />
                                ))}
                              </div>
                            ) : (
                              <button
                                onClick={item.action}
                                className="text-[10px] px-2.5 py-1 rounded-lg transition-all"
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                  color: "var(--text-secondary)",
                                }}
                              >
                                {item.value}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 mt-2">
          <div
            className="p-3 rounded-xl"
            style={{
              background: `linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)`,
              borderColor: "rgba(220, 38, 38, 0.2)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  System Status
                </p>
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--text)" }}
                >
                  All systems operational
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-500">Live</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
