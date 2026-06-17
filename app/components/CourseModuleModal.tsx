"use client";
import React from "react";
import { X, CheckCircle2, PlayCircle, FileText, HelpCircle, Clock } from "lucide-react";

// কোর্সের ডাটার জন্য টাইপ ডিফাইন
interface Course {
  id: number;
  name: string;
  category: string;
  students: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
}

interface CourseModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

// প্রতিটি কোর্সের মডিউল ডাটা (কোর্সের ID অনুযায়ী)
const modulesData: Record<number, Array<{ id: string; title: string; duration: string; lessons: number; status: "completed" | "in-progress" | "locked" }>> = {
  1: [
    { id: "m1", title: "Algebraic Structures & Set Theory", duration: "2 Weeks", lessons: 5, status: "completed" },
    { id: "m2", title: "Advanced Calculus & Real Analysis", duration: "3 Weeks", lessons: 8, status: "in-progress" },
    { id: "m3", title: "Linear Vector Spaces", duration: "3 Weeks", lessons: 6, status: "locked" },
  ],
  2: [
    { id: "m1", title: "Introduction to Quantum Physics", duration: "4 Weeks", lessons: 10, status: "completed" },
    { id: "m2", title: "Organic Chemical Reactions", duration: "3 Weeks", lessons: 7, status: "locked" },
  ],
  4: [
    { id: "m1", title: "Next.js Architecture & Routing", duration: "2 Weeks", lessons: 6, status: "in-progress" },
    { id: "m2", title: "State Management with Context API", duration: "2 Weeks", lessons: 4, status: "locked" },
  ]
};

export default function CourseModuleModal({ isOpen, onClose, course }: CourseModuleModalProps) {
  if (!isOpen || !course) return null;

  // যদি কোনো কোর্সের ডাটা না থাকে, তবে ডিফল্ট মডিউল দেখাবে
  const modules = modulesData[course.id] || [
    { id: "def-1", title: "Introduction & Fundamental Overview", duration: "1 Week", lessons: 3, status: "in-progress" },
    { id: "def-2", title: "Advanced Core Concepts", duration: "2 Weeks", lessons: 5, status: "locked" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-all">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#1e1e2d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner with Course Gradient Theme */}
        <div className={`p-6 bg-linear-to-r ${course.color} bg-opacity-20 border-b border-white/5 relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white">
            {course.category}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2 drop-shadow-md">
            {course.name} — Curriculum
          </h3>
          <p className="text-white/70 text-xs mt-1">
            Duration: {course.duration} | Active Students: {course.students}
          </p>
        </div>

        {/* Modules List Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {modules.map((mod, index) => (
            <div 
              key={mod.id} 
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                mod.status === "locked" 
                  ? "bg-[#232333]/40 border-white/5 opacity-40" 
                  : "bg-[#232333] border-white/5 hover:border-red-500/20"
              }`}
            >
              {/* Left Column: Status Icon */}
              <div className="mt-1">
                {mod.status === "completed" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {mod.status === "in-progress" && <PlayCircle className="w-5 h-5 text-red-500 animate-pulse" />}
                {mod.status === "locked" && <Clock className="w-5 h-5 text-gray-600" />}
              </div>

              {/* Middle Column: Module Text */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                    Module 0{index + 1}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {mod.duration}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {mod.title}
                </h4>
                
                {/* Info Pills */}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {mod.lessons} Lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> 1 Assignment
                  </span>
                </div>
              </div>

              {/* Right Column: Action Button */}
              <div className="self-center">
                {mod.status !== "locked" ? (
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-red-500 text-xs font-bold text-white rounded-lg transition-all border border-white/10 hover:border-transparent">
                    {mod.status === "completed" ? "Review" : "Start"}
                  </button>
                ) : (
                  <span className="text-xs text-gray-600 font-medium italic">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#1a1a26] border-t border-white/5 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white rounded-xl transition-all"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}