"use client";
import React, { useState } from "react";
import { Eye, Download, MoreVertical, Trash2 } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

interface FileActionsProps {
  fileId: number;
  fileTitle: string;
}

export default function FileActions({ fileId, fileTitle }: FileActionsProps) {
  const { colors, theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const handleView = () => {
    alert(`Opening Preview for: ${fileTitle}`);
    // এখানে ফাইল ভিউ করার লজিক বা ক্লাউডিনারি/এডাব্লিউএস লিঙ্ক ওপেন করতে পারেন
  };

  const handleDownload = () => {
    alert(`Starting download for: ${fileTitle}`);
    // ডাউনলোড ট্রিগার লজিক
  };

  const handleDelete = () => {
    alert(`Deleting file ID: ${fileId}`);
    setShowMenu(false);
  };

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto justify-end relative">
      {/* View Button */}
      <button
        onClick={handleView}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          borderColor: colors.border,
          color: colors.textSecondary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
          e.currentTarget.style.color = colors.text;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
          e.currentTarget.style.color = colors.textSecondary;
        }}
      >
        <Eye size={14} /> View
      </button>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer"
        style={{
          backgroundColor: colors.primary + '20',
          borderColor: colors.primary + '40',
          color: colors.primary,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary;
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary + '20';
          e.currentTarget.style.color = colors.primary;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Download size={14} /> Download
      </button>

      {/* More Options Menu */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-lg transition-colors cursor-pointer"
          style={{ color: colors.textSecondary + '80' }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary + '80'}
        >
          <MoreVertical size={18} />
        </button>

        {showMenu && (
          <div 
            className="absolute right-0 mt-2 w-40 border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
            style={{
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
              borderColor: colors.border,
            }}
          >
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              style={{ color: '#ef4444' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ef444420';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Trash2 size={14} /> Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}