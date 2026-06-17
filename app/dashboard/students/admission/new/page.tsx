"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  DollarSign,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  parentName: string;
  class: string;
  previousSchool: string;
  paymentStatus: string;
  bloodGroup: string;
  religion: string;
  gender: string;
}

interface FileWithName extends File {
  name: string;
}

export default function NewApplicationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    parentName: "",
    class: "",
    previousSchool: "",
    paymentStatus: "Unpaid",
    bloodGroup: "",
    religion: "",
    gender: "",
  });
  const [files, setFiles] = useState<FileWithName[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as FileWithName[];
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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
        router.push('/dashboard/admission');
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
            <span className="text-sm">Back to Admission</span>
          </button>
          <div className="bg-linear-to-r from-red-600/20 to-orange-500/20 rounded-2xl p-6 border border-white/10">
            <h1 className="text-3xl font-bold text-white mb-2">
              New Student <span className="text-red-500">Application</span>
            </h1>
            <p className="text-gray-400">
              Please fill in all the required information below
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div className="bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <CheckCircle size={24} />
              <div>
                <p className="font-bold">Application Submitted!</p>
                <p className="text-sm opacity-90">We'll review and contact you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Personal Information Section */}
          <div className="bg-[#1e1e2d] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User size={20} className="text-red-500" />
                Personal Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="date"
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                  >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Religion
                  </label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="Enter religion"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="student@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="+880 1234 567890"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-[#1e1e2d] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <User size={20} className="text-red-500" />
                Parent/Guardian Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Parent/Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="Enter parent/guardian full name"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-[#1e1e2d] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen size={20} className="text-red-500" />
                Academic Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Applying for Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="class"
                    required
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                  >
                    <option value="">Select Class</option>
                    <option>Grade 01</option>
                    <option>Grade 02</option>
                    <option>Grade 03</option>
                    <option>Grade 04</option>
                    <option>Grade 05</option>
                    <option>Grade 06</option>
                    <option>Grade 07</option>
                    <option>Grade 08</option>
                    <option>Grade 09</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Previous School
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    placeholder="Enter previous school name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2">
                    Payment Status
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      name="paymentStatus"
                      value={formData.paymentStatus}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Upload */}
          <div className="bg-[#1e1e2d] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-[#232333]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Upload size={20} className="text-red-500" />
                Required Documents
              </h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-red-500/50 transition-all cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-400 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Birth Certificate, Report Card, Passport Photo, etc. (Max 10MB)
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-gray-400">Uploaded Files:</p>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                      <span className="text-xs text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-red-500/20 rounded"
                      >
                        <X size={14} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                  Submitting...
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}