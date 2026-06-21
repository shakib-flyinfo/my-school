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
import { useTheme } from "@/app/components/ThemeProvider";

export default function NewAssignmentPage() {
  const router = useRouter();
  const { colors, theme } = useTheme();

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
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Top Navigation & Header */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard/assignments")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors w-fit cursor-pointer"
            style={{ color: colors.textSecondary }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
          >
            <ArrowLeft size={14} /> Back to Assignments
          </button>

          <div className="flex items-center justify-between">
            <div>
              <div 
                className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em] mb-1"
                style={{ color: colors.primary }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curriculum Creator</span>
              </div>
              <h2 
                className="text-3xl font-bold tracking-tight"
                style={{ color: colors.text }}
              >
                Create New{" "}
                <span 
                  className="text-transparent bg-clip-text"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                  }}
                >
                  Assignment
                </span>
              </h2>
              <p 
                className="text-sm mt-1"
                style={{ color: colors.textSecondary }}
              >
                Publish new tasks, quizzes or lab reports for students.
              </p>
            </div>
            <div 
              className="p-4 rounded-2xl hidden sm:block"
              style={{
                backgroundColor: colors.primary + '20',
                color: colors.primary,
              }}
            >
              <FileText size={32} />
            </div>
          </div>
        </div>

        {/* Form Container Card */}
        <div 
          className="border rounded-3xl overflow-hidden shadow-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="p-6 border-b"
            style={{
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
              borderColor: colors.border,
            }}
          >
            <h3 
              className="font-bold text-base"
              style={{ color: colors.text }}
            >
              Assignment Specifications
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label 
                className="text-xs font-bold uppercase tracking-wider block"
                style={{ color: colors.textSecondary }}
              >
                Assignment Title <span style={{ color: colors.primary }}>*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Advanced Calculus Terminal Exam"
                className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary + '80';
                  e.target.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                }}
              />
            </div>

            {/* Course & Priority Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label 
                  className="text-xs font-bold uppercase tracking-wider block"
                  style={{ color: colors.textSecondary }}
                >
                  Select Course
                </label>
                <div className="relative">
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none appearance-none cursor-pointer"
                    style={{
                      backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
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
                <label 
                  className="text-xs font-bold uppercase tracking-wider block"
                  style={{ color: colors.textSecondary }}
                >
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none appearance-none cursor-pointer"
                  style={{
                    backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                  onBlur={(e) => e.target.style.borderColor = colors.border}
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
                <label 
                  className="text-xs font-bold uppercase tracking-wider block"
                  style={{ color: colors.textSecondary }}
                >
                  Due Date <span style={{ color: colors.primary }}>*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                  onBlur={(e) => e.target.style.borderColor = colors.border}
                />
              </div>

              <div 
                className="p-4 rounded-xl flex items-start gap-3 text-xs self-end h-[52px]"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${colors.border}`,
                  color: colors.textSecondary,
                }}
              >
                <AlertTriangle
                  className="shrink-0 mt-0.5"
                  style={{ color: colors.secondary }}
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
              <label 
                className="text-xs font-bold uppercase tracking-wider block"
                style={{ color: colors.textSecondary }}
              >
                Instructions (Optional)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add assignment details, links, or guidelines for students..."
                className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary + '80';
                  e.target.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6" style={{ borderTop: `1px solid ${colors.border}` }}>
              <button
                type="button"
                onClick={() => router.push("/dashboard/assignments")}
                className="px-6 py-3 border text-xs font-bold rounded-xl transition-all cursor-pointer"
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
                Discard
              </button>
              <button
                type="submit"
                className="px-8 py-3 text-white text-xs font-bold rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
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
                Publish Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}