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
import { useTheme } from "@/app/components/ThemeProvider";

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
  const { colors, theme } = useTheme();
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
            <span className="text-sm">Back to Admission</span>
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
              New Student <span style={{ color: colors.primary }}>Application</span>
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Please fill in all the required information below
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
                <p className="font-bold">Application Submitted!</p>
                <p className="text-sm opacity-90">We'll review and contact you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Personal Information Section */}
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
                <User size={20} style={{ color: colors.primary }} />
                Personal Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Full Name <span style={{ color: colors.primary }}>*</span>
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
                    placeholder="Enter full name"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Gender <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
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
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Date of Birth <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Calendar 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="date"
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleInputChange}
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
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
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
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Religion
                  </label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="Enter religion"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Email Address <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Mail 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="student@example.com"
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
                    Phone Number <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <Phone 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="+880 1234 567890"
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
                    Address <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <div className="relative">
                    <MapPin 
                      className="absolute left-3 top-3 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none resize-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      placeholder="Enter full address"
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
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
                <User size={20} style={{ color: colors.primary }} />
                Parent/Guardian Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Parent/Guardian Name <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="Enter parent/guardian full name"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
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
                Academic Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Applying for Class <span style={{ color: colors.primary }}>*</span>
                  </label>
                  <select
                    name="class"
                    required
                    value={formData.class}
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
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Previous School
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      border: `1px solid ${colors.border}`,
                      color: colors.text,
                    }}
                    placeholder="Enter previous school name"
                    onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-2"
                    style={{ color: colors.textSecondary }}
                  >
                    Payment Status
                  </label>
                  <div className="relative">
                    <DollarSign 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: colors.textSecondary }}
                    />
                    <select
                      name="paymentStatus"
                      value={formData.paymentStatus}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
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
                <Upload size={20} style={{ color: colors.primary }} />
                Required Documents
              </h2>
            </div>
            <div className="p-6">
              <div 
                className="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer"
                style={{ borderColor: colors.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary + '80';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload 
                    className="w-12 h-12 mx-auto mb-3"
                    style={{ color: colors.textSecondary }}
                  />
                  <p 
                    className="text-sm mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Click to upload or drag and drop
                  </p>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary + '80' }}
                  >
                    Birth Certificate, Report Card, Passport Photo, etc. (Max 10MB)
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p 
                    className="text-xs font-bold"
                    style={{ color: colors.textSecondary }}
                  >
                    Uploaded Files:
                  </p>
                  {files.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      }}
                    >
                      <span 
                        className="text-xs"
                        style={{ color: colors.text }}
                      >
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 rounded transition-colors"
                        style={{ color: '#ef4444' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ef444420';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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