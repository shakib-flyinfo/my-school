"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Video,
  FileArchive,
  Download,
  Eye,
  MoreVertical,
  Search,
  Plus,
  FolderOpen,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import FileActions from "./FileActions";
import { useTheme } from "@/app/components/ThemeProvider";

const materials = [
  {
    id: 1,
    title: "Intro to Quantum Physics.pdf",
    course: "General Science",
    type: "PDF",
    size: "4.2 MB",
    date: "May 02, 2026",
    icon: <FileText className="text-red-400" />,
    bg: "bg-red-500/10",
  },
  {
    id: 2,
    title: "Calculus Basics Lecture.mp4",
    course: "Advanced Mathematics",
    type: "Video",
    size: "125 MB",
    date: "Apr 28, 2026",
    icon: <Video className="text-blue-400" />,
    bg: "bg-blue-500/10",
  },
  {
    id: 3,
    title: "English Grammar Worksheet.docx",
    course: "Communicative English",
    type: "Document",
    size: "1.5 MB",
    date: "May 01, 2026",
    icon: <FileText className="text-emerald-400" />,
    bg: "bg-emerald-500/10",
  },
  {
    id: 4,
    title: "Project Assets.zip",
    course: "Technology & ICT",
    type: "Archive",
    size: "85 MB",
    date: "Apr 25, 2026",
    icon: <FileArchive className="text-amber-400" />,
    bg: "bg-amber-500/10",
  },
];

const quickFolders = [
  { name: "Lecture Notes", slug: "lecture-notes" },
  { name: "Video Lessons", slug: "video-lessons" },
  { name: "Assignments", slug: "assignments" },
  { name: "Reference Books", slug: "reference-books" },
];

export default function CourseMaterialsPage() {
  const router = useRouter();
  const { colors, theme } = useTheme();

  // Get file type color based on theme primary
  const getFileTypeColor = (type: string) => {
    const colors_map: Record<string, string> = {
      'PDF': colors.primary,
      'Video': '#3b82f6',
      'Document': '#10b981',
      'Archive': '#f59e0b',
    };
    return colors_map[type] || colors.textSecondary;
  };

  return (
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: colors.textSecondary }}
            >
              <FolderOpen size={14} style={{ color: colors.primary }} />
              <span>Resources Explorer</span>
            </div>
            <h2 
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Course{" "}
              <span style={{ color: colors.primary }}>Materials</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72 group">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" 
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              />
              <input
                type="text"
                placeholder="Find resources..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>
            {/* 👉 Upload Button Path Connected */}
            <button
              onClick={() => router.push("/dashboard/courses/material/upload")}
              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                boxShadow: `0 10px 25px -5px ${colors.primary}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 15px 30px -5px ${colors.primary}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 10px 25px -5px ${colors.primary}40`;
              }}
            >
              <Plus className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>

        {/* Quick Access Folders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickFolders.map((folder, i) => (
            <div
              key={i}
              onClick={() =>
                router.push(`/dashboard/courses/material/${folder.slug}`)
              }
              className="p-4 border rounded-2xl flex items-center justify-between group cursor-pointer transition-all"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = colors.primary + '40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.card;
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: colors.primary + '20',
                    color: colors.primary,
                  }}
                >
                  <FolderOpen size={20} />
                </div>
                <span 
                  className="text-sm font-bold transition-colors"
                  style={{ color: colors.textSecondary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                >
                  {folder.name}
                </span>
              </div>
              <ChevronRight size={16} style={{ color: colors.textSecondary + '60' }} />
            </div>
          ))}
        </div>

        {/* Materials List/Grid */}
        <div 
          className="border rounded-3xl overflow-hidden shadow-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="p-6 border-b flex justify-between items-center"
            style={{
              borderColor: colors.border,
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
            }}
          >
            <h3 
              className="font-bold flex items-center gap-2"
              style={{ color: colors.text }}
            >
              All Files{" "}
              <span 
                className="text-xs font-normal px-2 py-0.5 rounded-md"
                style={{
                  color: colors.textSecondary,
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                }}
              >
                {materials.length} files
              </span>
            </h3>
          </div>

          <div className="divide-y" style={{ borderColor: colors.border }}>
            {materials.map((file) => (
              <div
                key={file.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-colors"
                style={{ borderColor: colors.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-300`}
                    style={{
                      backgroundColor: colors.primary + '15',
                    }}
                  >
                    {file.icon}
                  </div>
                  <div>
                    <h4 
                      className="text-sm font-bold transition-colors cursor-pointer"
                      style={{ color: colors.text }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                    >
                      {file.title}
                    </h4>
                    <div 
                      className="flex items-center gap-3 mt-1 text-[11px] font-medium"
                      style={{ color: colors.textSecondary }}
                    >
                      <span style={{ color: colors.primary + 'B3' }} className="uppercase">
                        {file.course}
                      </span>
                      <span>•</span>
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                </div>

                {/* 👉 Action Buttons Handled Individually */}
                <FileActions fileId={file.id} fileTitle={file.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}