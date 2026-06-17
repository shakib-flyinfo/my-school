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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div className="bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
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
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Profile</span>
          </button>
          
          <div className="bg-linear-to-r from-red-600/20 to-orange-500/20 rounded-2xl p-6 border border-white/10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Edit <span className="text-red-500">Profile</span>
            </h1>
            <p className="text-gray-400">
              Update your personal and academic information
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="bg-[#1e1e2d] rounded-3xl border border-white/10 overflow-hidden">
            {/* Profile Image Section */}
            <div className="p-8 border-b border-white/10 bg-linear-to-r from-red-600/5 to-orange-500/5">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl bg-linear-to-br from-red-600 to-orange-500 p-1 shadow-2xl">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-[#1a1a27] flex items-center justify-center text-4xl font-black text-white">
                        {formData.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 p-2 bg-[#232333] border border-white/10 rounded-xl text-red-500 hover:text-white hover:bg-red-500 transition-all cursor-pointer shadow-lg">
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
                  <h3 className="text-xl font-bold text-white">{formData.name}</h3>
                  <p className="text-gray-500 text-sm">Student ID: STU-2026-1044</p>
                  <p className="text-xs text-gray-600 mt-2">Click the camera icon to change profile picture</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6 bg-[#232333]">
              <button
                type="button"
                onClick={() => setActiveTab("personal")}
                className={`px-6 py-4 text-sm font-medium transition-all relative cursor-pointer ${
                  activeTab === "personal" 
                    ? "text-red-500" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <User size={16} className="inline mr-2" />
                Personal Information
                {activeTab === "personal" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-600 to-orange-500 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("academic")}
                className={`px-6 py-4 text-sm font-medium transition-all relative cursor-pointer ${
                  activeTab === "academic" 
                    ? "text-red-500" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BookOpen size={16} className="inline mr-2" />
                Academic Information
                {activeTab === "academic" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-600 to-orange-500 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className={`px-6 py-4 text-sm font-medium transition-all relative cursor-pointer ${
                  activeTab === "contact" 
                    ? "text-red-500" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Mail size={16} className="inline mr-2" />
                Contact Information
                {activeTab === "contact" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-600 to-orange-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 transition-colors"
                        placeholder="Enter full name"
                      />
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
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
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
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Religion
                      </label>
                      <select
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      >
                        <option value="Islam">Islam</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                        placeholder="Enter nationality"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Bio / About
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                        placeholder="Tell us something about yourself..."
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
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="class"
                        required
                        value={formData.class}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                      >
                        <option value="Grade 09 - Section A">Grade 09 - Section A</option>
                        <option value="Grade 10 - Section A">Grade 10 - Section A</option>
                        <option value="Grade 10 - Section B">Grade 10 - Section B</option>
                        <option value="Grade 11 - Section A">Grade 11 - Section A</option>
                        <option value="Grade 12 - Section A">Grade 12 - Section A</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value="01"
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Student ID
                      </label>
                      <input
                        type="text"
                        value="STU-2026-1044"
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Guardian/Parent Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          name="guardian"
                          required
                          value={formData.guardian}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                          placeholder="Enter guardian name"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Guardian Contact
                      </label>
                      <input
                        type="tel"
                        name="guardianPhone"
                        placeholder="+880 1234 567890"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
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
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
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
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                          placeholder="+880 1234 567890"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">
                        Alternative Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="tel"
                          name="altPhone"
                          placeholder="+880 9876 543210"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
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
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
                          placeholder="Enter full address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}