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
  ShieldCheck,
  Camera,
  Save,
  Award,
  BookOpen,
  CheckCircle,
  Upload,
  X,
} from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  guardian: string;
  class: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  bio: string;
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "academic" | "contact">("personal");
  const [formData, setFormData] = useState<ProfileData>({
    name: "Sakib Ahmed",
    email: "sakib.edu@gmail.com",
    phone: "+880 1712-345678",
    dob: "2010-08-12",
    address: "Dhatiya Para, Dhaka",
    guardian: "Md. Rafiqul Islam",
    class: "Grade 10 - Section A",
    bloodGroup: "O+",
    nationality: "Bangladeshi",
    religion: "Islam",
    bio: " passionate about mathematics and physics. Loves to read books.",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/dashboard/profile');
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
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div 
              className="backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
              style={{ backgroundColor: '#10b981' + 'E6' }}
            >
              <CheckCircle size={24} />
              <div>
                <p className="font-bold">Profile Updated!</p>
                <p className="text-sm opacity-90">Your changes have been saved successfully.</p>
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
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.text;
              e.currentTarget.querySelector('svg')?.classList.add('-translate-x-1');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.textSecondary;
              e.currentTarget.querySelector('svg')?.classList.remove('-translate-x-1');
            }}
          >
            <ArrowLeft size={20} className="transition-transform" />
            <span className="text-sm">Back to Profile</span>
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
              Edit <span style={{ color: colors.primary }}>Profile</span>
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Update your personal and academic information
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div 
            className="rounded-3xl border overflow-hidden transition-colors"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            {/* Profile Image Section */}
            <div 
              className="p-8 border-b flex flex-col md:flex-row items-center gap-8"
              style={{
                borderColor: colors.border,
                background: `linear-gradient(to right, ${colors.primary}10, ${colors.secondary}10)`,
              }}
            >
              <div className="relative group">
                <div 
                  className="w-32 h-32 rounded-2xl p-1 shadow-2xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
                  }}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full rounded-xl flex items-center justify-center text-4xl font-black"
                      style={{
                        backgroundColor: theme === 'dark' ? '#1a1a27' : '#f0f0f0',
                        color: colors.text,
                      }}
                    >
                      {formData.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                </div>
                <label 
                  className="absolute -bottom-2 -right-2 p-2 border rounded-xl transition-all cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
                    borderColor: colors.border,
                    color: colors.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#232333' : '#e8e8e8';
                  }}
                >
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: colors.text }}
                >
                  {formData.name}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Student ID: STU-2026-1044
                </p>
                <p 
                  className="text-xs mt-2"
                  style={{ color: colors.textSecondary + '80' }}
                >
                  Click the camera icon to change profile picture
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div 
              className="flex border-b px-6"
              style={{
                borderColor: colors.border,
                backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
              }}
            >
              {[
                { id: "personal", label: "Personal Information", icon: <User size={16} /> },
                { id: "academic", label: "Academic Information", icon: <BookOpen size={16} /> },
                { id: "contact", label: "Contact Information", icon: <Mail size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-6 py-4 text-sm font-medium transition-all relative cursor-pointer`}
                  style={{
                    color: activeTab === tab.id ? colors.primary : colors.textSecondary,
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = colors.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.color = colors.textSecondary;
                    }
                  }}
                >
                  <span className="inline mr-2">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
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
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
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
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
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
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Religion
                      </label>
                      <select
                        name="religion"
                        value={formData.religion}
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
                        <option value="Islam">Islam</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          border: `1px solid ${colors.border}`,
                          color: colors.text,
                        }}
                        placeholder="Enter nationality"
                        onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                        onBlur={(e) => e.target.style.borderColor = colors.border}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Bio / About
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          border: `1px solid ${colors.border}`,
                          color: colors.text,
                        }}
                        placeholder="Tell us something about yourself..."
                        onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                        onBlur={(e) => e.target.style.borderColor = colors.border}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Information Tab */}
              {activeTab === "academic" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Class <span style={{ color: colors.primary }}>*</span>
                      </label>
                      <select
                        name="class"
                        required
                        value={formData.class}
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
                        <option value="Grade 09 - Section A">Grade 09 - Section A</option>
                        <option value="Grade 10 - Section A">Grade 10 - Section A</option>
                        <option value="Grade 10 - Section B">Grade 10 - Section B</option>
                        <option value="Grade 11 - Section A">Grade 11 - Section A</option>
                        <option value="Grade 12 - Section A">Grade 12 - Section A</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value="01"
                        disabled
                        className="w-full px-4 py-3 rounded-xl text-sm cursor-not-allowed"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          border: `1px solid ${colors.border}`,
                          color: colors.textSecondary + '80',
                        }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Student ID
                      </label>
                      <input
                        type="text"
                        value="STU-2026-1044"
                        disabled
                        className="w-full px-4 py-3 rounded-xl text-sm cursor-not-allowed"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          border: `1px solid ${colors.border}`,
                          color: colors.textSecondary + '80',
                        }}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Guardian/Parent Name <span style={{ color: colors.primary }}>*</span>
                      </label>
                      <div className="relative">
                        <ShieldCheck 
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: colors.textSecondary }}
                        />
                        <input
                          type="text"
                          name="guardian"
                          required
                          value={formData.guardian}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            border: `1px solid ${colors.border}`,
                            color: colors.text,
                          }}
                          placeholder="Enter guardian name"
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
                        Guardian Contact
                      </label>
                      <input
                        type="tel"
                        name="guardianPhone"
                        placeholder="+880 1234 567890"
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
                  </div>
                </div>
              )}

              {/* Contact Information Tab */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
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
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
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
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
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

                    <div>
                      <label 
                        className="block text-xs font-bold mb-2"
                        style={{ color: colors.textSecondary }}
                      >
                        Alternative Phone
                      </label>
                      <div className="relative">
                        <Phone 
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: colors.textSecondary }}
                        />
                        <input
                          type="tel"
                          name="altPhone"
                          placeholder="+880 9876 543210"
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
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none"
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
              )}
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
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}