"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  AlertTriangle,
  FileText,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function NewAssignmentPage() {
  const router = useRouter();

  // ফর্ম স্টেটসমূহ
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("Mathematics");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return alert("Please fill all required fields!");

    // ডাটা প্রিপারেশন
    const newAssignment = {
      id: Date.now(), // ইউনিক আইডি জেনারেশন
      title,
      course,
      dueDate,
      priority,
      status: "Active",
      submissions: 0,
      totalStudents: 100,
    };

    // লোকাল স্টোরেজ থেকে আগের ডাটা এনে নতুনটি পুশ করা
    const existingData = localStorage.getItem("dashboard_assignments");
    const currentAssignments = existingData ? JSON.parse(existingData) : [];

    localStorage.setItem(
      "dashboard_assignments",
      JSON.stringify([newAssignment, ...currentAssignments]),
    );

    // সফলভাবে সেভ করার পর মেইন অ্যাসাইনমেন্ট পেজে রিডাইরেক্ট
    router.push("/dashboard/assignments");
    router.refresh(); // স্টেট রিফ্রেশ নিশ্চিত করার জন্য
  };

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Top Navigation & Header */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard/assignments")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-500 transition-colors w-fit cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Assignments
          </button>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curriculum Creator</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Create New{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400">
                  Assignment
                </span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Publish new tasks, quizzes or lab reports for students.
              </p>
            </div>
            <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 hidden sm:block">
              <FileText size={32} />
            </div>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 bg-[#232333] border-b border-white/5">
            <h3 className="font-bold text-white text-base">
              Assignment Specifications
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Assignment Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Advanced Calculus Terminal Exam"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            {/* Course & Priority Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Select Course
                </label>
                <div className="relative">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 bg-[#232333] border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="General Science">General Science</option>
                    <option value="Communicative English">
                      Communicative English
                    </option>
                    <option value="Computer Science & ICT">
                      Computer Science & ICT
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 bg-[#232333] border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
              </div>
            </div>

            {/* Due Date & Extra Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 scheme-dark transition-all"
                />
              </div>

              <div className="bg-[#232333]/50 border border-white/5 p-4 rounded-xl flex items-start gap-3 text-xs text-gray-500 self-end h-52px">
                <AlertTriangle
                  className="text-orange-500 shrink-0 mt-0.5"
                  size={16}
                />
                <p>
                  Publishing this will instantly notify all active students
                  enrolled in this course.
                </p>
              </div>
            </div>

            {/* Optional Description / Instructions */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Instructions (Optional)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add assignment details, links, or guidelines for students..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.07] transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
              <button
                type="button"
                onClick={() => router.push("/dashboard/assignments")}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 rounded-xl transition-all cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95 cursor-pointer"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
