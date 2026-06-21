"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Power, ChevronLeft } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { menuItems } from "../data/sidebarData";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { colors } = useTheme();
  const [openMenus, setOpenMenus] = useState<string | null>("Dashboard");

  const handleMenuClick = (item: any) => {
    if (item.hasSub) {
      setOpenMenus(openMenus === item.name ? null : item.name);
    } else {
      router.push(item.path);
    }
  };

  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col shadow-2xl border-r shrink-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo Section */}
      <div
        className={`relative flex flex-col items-center border-b shrink-0 transition-all ${
          isCollapsed ? "p-4" : "p-8"
        }`}
        style={{ borderColor: "var(--border)" }}
      >
        {/* <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 border rounded-full transition-all z-10 hover:scale-110"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)'
          }}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button> */}

        <motion.div animate={{ scale: isCollapsed ? 0.7 : 1 }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
            }}
          >
            <Image
              src="/rediam.png"
              alt="Logo"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </div>
        </motion.div>
        {!isCollapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center font-black text-lg uppercase whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Radium Public School
          </motion.h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-4 pb-6 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isOpen = openMenus === item.name;
          const isActive =
            pathname === item.path || pathname?.startsWith(item.path + "/");

          return (
            <div key={item.name} className="relative group">
              <div
                onClick={() => handleMenuClick(item)}
                className={`flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all ${
                  isCollapsed ? "justify-center" : "justify-between"
                }`}
                style={{
                  backgroundColor:
                    isOpen || isActive
                      ? "rgba(220, 38, 38, 0.1)"
                      : "transparent",
                  color:
                    isOpen || isActive
                      ? "var(--primary)"
                      : "var(--text-secondary)",
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    style={{
                      color:
                        isOpen || isActive
                          ? "var(--primary)"
                          : "var(--text-secondary)",
                    }}
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {item.hasSub && isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={`mt-1 space-y-1 overflow-hidden ${
                      isCollapsed
                        ? "flex flex-col items-center py-2 rounded-lg"
                        : "pl-11"
                    }`}
                    style={{
                      backgroundColor: isCollapsed
                        ? "rgba(0, 0, 0, 0.2)"
                        : "transparent",
                    }}
                  >
                    {item.subModules?.map((sub) => {
                      const isSubActive = pathname === sub.path;
                      return (
                        <li key={sub.name} className="w-full">
                          <Link
                            href={sub.path}
                            className={`flex items-center transition-all duration-200 group/sub ${
                              isCollapsed
                                ? "justify-center py-2"
                                : "gap-2 py-2 px-3 rounded-lg"
                            }`}
                            style={{
                              color: isSubActive
                                ? "var(--primary)"
                                : "var(--text-secondary)",
                              backgroundColor: isSubActive
                                ? "rgba(220, 38, 38, 0.05)"
                                : "transparent",
                            }}
                          >
                            <sub.icon
                              size={isCollapsed ? 18 : 14}
                              style={{
                                color: isSubActive
                                  ? "var(--primary)"
                                  : "var(--text-secondary)",
                              }}
                            />
                            {!isCollapsed && (
                              <span className="text-[12px] font-medium">
                                {sub.name}
                              </span>
                            )}
                            {isCollapsed && (
                              <div
                                className="absolute left-full ml-4 px-2 py-1 text-white text-[10px] rounded opacity-0 group-hover/sub:opacity-100 pointer-events-none transition-opacity z-100 whitespace-nowrap shadow-xl"
                                style={{ backgroundColor: "var(--primary)" }}
                              >
                                {sub.name}
                              </div>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div
        className={`mt-auto border-t p-4 transition-all ${
          isCollapsed ? "flex flex-col items-center gap-4" : ""
        }`}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shrink-0 transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
              }}
            >
              RA
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p
                  className="font-bold text-sm truncate transition-colors hover:text-primary"
                  style={{ color: "var(--text)" }}
                >
                  Rahat Admin
                </p>
                <span
                  className="text-[10px] uppercase font-semibold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Super Admin
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => router.push("/login")}
              className="p-2 rounded-xl transition-all group relative hover:scale-105"
              style={{
                color: "var(--text-secondary)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Power
                size={16}
                className="transition-transform group-hover:scale-110"
              />
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                style={{ backgroundColor: "var(--primary)", color: "white" }}
              >
                Logout
              </span>
            </button>
          )}
        </div>
        {isCollapsed && (
          <button
            onClick={() => router.push("/login")}
            className="p-2.5 rounded-xl transition-all hover:scale-110 relative group"
            style={{
              color: "var(--text-secondary)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <Power size={18} />
            <span
              className="absolute left-full ml-2 px-2 py-0.5 rounded text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ backgroundColor: "var(--primary)", color: "white" }}
            >
              Logout
            </span>
          </button>
        )}
      </div>
    </aside>
  );
}
