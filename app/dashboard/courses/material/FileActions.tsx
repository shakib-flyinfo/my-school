"use client";
import React, { useState } from "react";
import { Eye, Download, MoreVertical, Trash2 } from "lucide-react";

interface FileActionsProps {
  fileId: number;
  fileTitle: string;
}

export default function FileActions({ fileId, fileTitle }: FileActionsProps) {
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
      <button
        onClick={handleView}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-300 transition-all border border-white/5 cursor-pointer"
      >
        <Eye size={14} /> View
      </button>

      <button
        onClick={handleDownload}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-red-500/10 cursor-pointer"
      >
        <Download size={14} /> Download
      </button>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-gray-600 hover:text-white transition-colors cursor-pointer"
        >
          <MoreVertical size={18} />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-[#232333] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2.5 text-left text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
            >
              <Trash2 size={14} /> Delete File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
