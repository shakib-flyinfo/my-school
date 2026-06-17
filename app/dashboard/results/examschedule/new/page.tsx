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

export default function NewExamSchedulePage() {
  const router = useRouter();
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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div className="bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
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
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Exam Schedule</span>
          </button>
          
          <div className="bg-linear-to-r from-red-600/20 to-orange-500/20 rounded-2xl p-6 border border-white/10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Add New <span className="text-red-500">Exam Schedule</span>
            </h1>
            <p className="text-gray-400">
              Fill in the details below to schedule a new exam
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="bg-[#1e1e2d] rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar size={20} className="text-red-500" />
                Exam Information
              </h2>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Subject Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="Enter subject name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Subject Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="e.g., MATH-401"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                  >
                    <option value="">Select Exam Type</option>
                    <option value="Final Exam">Final Exam</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Exam Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Exam Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., 10:00 AM - 01:00 PM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Room Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="room"
                      required
                      value={formData.room}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="e.g., Room 402"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Teacher/Invigilator <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="teacher"
                      required
                      value={formData.teacher}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="Enter teacher name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mx-8 mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-400 mb-1">Important Guidelines:</p>
                  <ul className="text-[11px] text-red-300/80 space-y-1">
                    <li>• Students must arrive 30 minutes before exam start time</li>
                    <li>• Admit cards are mandatory for entry</li>
                    <li>• No electronic devices allowed in exam hall</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-8 border-t border-white/10 bg-[#232333] flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
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