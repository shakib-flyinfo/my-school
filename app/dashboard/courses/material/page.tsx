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

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              <FolderOpen size={14} className="text-red-500" />
              <span>Resources Explorer</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Course <span className="text-red-500">Materials</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Find resources..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 transition-all"
              />
            </div>
            {/* 👉 Upload Button Path Connected */}
            <button
              onClick={() => router.push("/dashboard/courses/material/upload")}
              className="flex items-center gap-2 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95 text-sm cursor-pointer"
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
              } // 👉 Dynamic Category Route
              className="p-4 bg-[#1e1e2d] border border-white/5 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  <FolderOpen size={20} />
                </div>
                <span className="text-sm font-bold text-gray-300">
                  {folder.name}
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </div>
          ))}
        </div>

        {/* Materials List/Grid */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#232333]">
            <h3 className="font-bold text-white flex items-center gap-2">
              All Files{" "}
              <span className="text-xs font-normal text-gray-500 px-2 py-0.5 bg-white/5 rounded-md">
                {materials.length} files
              </span>
            </h3>
          </div>

          <div className="divide-y divide-white/5">
            {materials.map((file) => (
              <div
                key={file.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-white/0.02 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-2xl ${file.bg} flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-300`}
                  >
                    {file.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors cursor-pointer">
                      {file.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 font-medium">
                      <span className="text-red-500/70 uppercase">
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
