"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  BookOpen,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

export default function NewExamSchedulePage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    code: "",
    date: "",
    time: "",
    room: "",
    teacher: "",
    type: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/dashboard/exams');
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen p-8 transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div 
              className="backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
              style={{
                backgroundColor: '#10b981' + 'E6',
              }}
            >
              <CheckCircle size={24} />
              <div>
                <p className="font-bold">Exam Schedule Added!</p>
                <p className="text-sm opacity-90">New exam has been scheduled successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 transition-colors mb-4 group"
            style={{ color: colors.textSecondary }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Exam Schedule</span>
          </button>
          
          <div 
            className="rounded-2xl p-6 border transition-colors"
            style={{
              background: `linear-gradient(to right, ${colors.primary}30, ${colors.secondary}30)`,
              borderColor: colors.border,
            }}
          >
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: colors.text }}
            >
              Add New <span style={{ color: colors.primary }}>Exam Schedule</span>
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Fill in the details below to schedule a new exam
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div 
            className="rounded-3xl border overflow-hidden transition-colors"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <div 
              className="p-6 border-b flex items-center gap-2"
              style={{
                borderColor: colors.border,
                backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
              }}
            >
              <h2 
                className="text-lg font-bold flex items-center gap-2"
                style={{ color: colors.text }}
              >
                <Calendar size={20} style={{ color: colors.primary }} />
                Exam Information
              </h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Subject Name <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <BookOpen 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="Enter subject name"
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Subject Code <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="e.g., MATH-401"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Exam Type <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  >
                    <option value="">Select Exam Type</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Exam Date <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Calendar 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Exam Time <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Clock 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., 10:00 AM - 01:00 PM"
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Room Number <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <MapPin 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="room"
                      required
                      value={formData.room}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., Room 402"
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Teacher/Invigilator <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <User 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="teacher"
                      required
                      value={formData.teacher}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="Enter teacher name"
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div 
              className="mx-8 mb-6 p-4 rounded-xl"
              style={{
                backgroundColor: colors.primary + '20',
                border: `1px solid ${colors.primary}40`,
              }}
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={18} style={{ color: colors.primary }} className="mt-0.5" />
                <div>
                  <p 
                    className="text-xs font-bold mb-1"
                    style={{ color: colors.primary }}
                  >
                    Important Guidelines:
                  </p>
                  <ul 
                    className="text-[11px] space-y-1"
                    style={{ color: colors.primary + 'CC' }}
                  >
                    <li>• Students must arrive 30 minutes before exam start time</li>
                    <li>• Admit cards are mandatory for entry</li>
                    <li>• No electronic devices allowed in exam hall</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div 
              className="p-8 border-t flex gap-4"
              style={{
                borderColor: colors.border,
                backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
              }}
            >
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
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
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                  color: '#ffffff',
                  boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 15px 35px -5px ${colors.primary}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 10px 25px -5px ${colors.primary}40`;
                }}
              >
                <Save size={18} />
                Schedule Exam
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}