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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Courses</span>
          </button>
          <div className="bg-linear-to-r from-red-600/20 to-orange-500/20 rounded-2xl p-6 border border-white/10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Add New <span className="text-red-500">Course</span>
            </h1>
            <p className="text-gray-400">
              Create a new course and add all necessary information
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div className="bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
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
          <div className="bg-[#1e1e2d] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen size={20} className="text-red-500" />
                Basic Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="e.g., Mathematics, Physics"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Course Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="code"
                      required
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., MATH-101"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
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
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Teacher Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="teacher"
                      required
                      value={formData.teacher}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="Enter teacher name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="bg-[#1e1e2d] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText size={20} className="text-red-500" />
                Course Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Credits <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="credits"
                    required
                    value={formData.credits}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="e.g., 3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., 6 months"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Course Fee <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="fee"
                      required
                      value={formData.fee}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., $450"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Max Students
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      name="maxStudents"
                      value={formData.maxStudents}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., 50"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Schedule <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <textarea
                      name="schedule"
                      required
                      value={formData.schedule}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., Monday & Wednesday, 10:00 AM - 12:00 PM"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Course Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="Describe the course content, objectives, and outcomes..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Prerequisites
                  </label>
                  <textarea
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="List any prerequisites required for this course..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 sticky bottom-0 bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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