"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  User,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Hash,
  FileText,
  X,
  CheckCircle,
  Upload,
} from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

interface CourseFormData {
  name: string;
  code: string;
  teacher: string;
  credits: string;
  duration: string;
  fee: string;
  schedule: string;
  maxStudents: string;
  description: string;
  prerequisites: string;
  category: string;
}

export default function NewCoursePage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [formData, setFormData] = useState<CourseFormData>({
    name: "",
    code: "",
    teacher: "",
    credits: "",
    duration: "",
    fee: "",
    schedule: "",
    maxStudents: "",
    description: "",
    prerequisites: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/dashboard/courses');
      }, 2000);
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen p-8 transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 transition-colors mb-4"
            style={{ color: colors.textSecondary }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Courses</span>
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
              Add New <span style={{ color: colors.primary }}>Course</span>
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Create a new course and add all necessary information
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div 
              className="backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
              style={{ backgroundColor: '#10b981' + 'E6' }}
            >
              <CheckCircle size={24} />
              <div>
                <p className="font-bold">Course Created!</p>
                <p className="text-sm opacity-90">New course has been added successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Basic Information */}
          <div 
            className="rounded-2xl border overflow-hidden transition-colors"
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
                <BookOpen size={20} style={{ color: colors.primary }} />
                Basic Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Course Name <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="e.g., Mathematics, Physics"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Course Code <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Hash 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="code"
                      required
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., MATH-101"
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
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  >
                    <option value="">Select Category</option>
                    <option>Science</option>
                    <option>Mathematics</option>
                    <option>Humanities</option>
                    <option>Business</option>
                    <option>Arts</option>
                    <option>Technology</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Teacher Name <span style={{ color: colors.primary }}>*</span>
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
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
          </div>

          {/* Course Details */}
          <div 
            className="rounded-2xl border overflow-hidden transition-colors"
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
                <FileText size={20} style={{ color: colors.primary }} />
                Course Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Credits <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="credits"
                    required
                    value={formData.credits}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="e.g., 3"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Duration <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Clock 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., 6 months"
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
                    Course Fee <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <DollarSign 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="text"
                      name="fee"
                      required
                      value={formData.fee}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., $450"
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
                    Max Students
                  </label>
                  <div className="relative">
                    <Users 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="number"
                      name="maxStudents"
                      value={formData.maxStudents}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., 50"
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
                    Schedule <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Calendar 
                      className="absolute left-3 top-3 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <textarea
                      name="schedule"
                      required
                      value={formData.schedule}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none resize-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="e.g., Monday & Wednesday, 10:00 AM - 12:00 PM"
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
                    Course Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none resize-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="Describe the course content, objectives, and outcomes..."
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div className="md:col-span-2">
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Prerequisites
                  </label>
                  <textarea
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none resize-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="List any prerequisites required for this course..."
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div 
            className="flex gap-4 sticky bottom-0 p-4 rounded-2xl border transition-colors"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(17, 17, 26, 0.9)' : 'rgba(240, 240, 240, 0.9)',
              borderColor: colors.border,
              backdropFilter: 'blur(20px)',
            }}
          >
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-sm transition-all"
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
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                color: '#ffffff',
                boxShadow: `0 10px 25px -5px ${colors.primary}40`,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 15px 35px -5px ${colors.primary}60`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 10px 25px -5px ${colors.primary}40`;
                }
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Course...
                </div>
              ) : (
                "Create Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}