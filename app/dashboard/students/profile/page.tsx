"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  ShieldCheck,
  Edit3,
  Download,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

export default function StudentProfilePage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sakib Ahmed",
    email: "sakib.edu@gmail.com",
    phone: "+880 1712-345678",
    dob: "12 August, 2010",
    address: "Dhatiya Para, Dhaka",
    guardian: "Md. Rafiqul Islam",
    class: "Grade 10 - Section A",
    bloodGroup: "O+",
    nationality: "Bangladeshi",
    religion: "Islam",
  });

  const stats = [
    { 
      label: "Attendance", 
      value: "94%", 
      icon: <Clock />, 
      color: '#3b82f6' 
    },
    { 
      label: "Avg. Grade", 
      value: "A+", 
      icon: <TrendingUp />, 
      color: '#10b981' 
    },
    { 
      label: "Courses", 
      value: "06", 
      icon: <BookOpen />, 
      color: '#8b5cf6' 
    },
    { 
      label: "Rank", 
      value: "#04", 
      icon: <Award />, 
      color: colors.secondary 
    },
  ];

  const handleDownloadProfile = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Profile - ${profileData.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
            padding: 40px;
          }
          .container { max-width: 800px; margin: 0 auto; }
          .profile-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .header {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          .header h1 { font-size: 28px; margin-bottom: 10px; }
          .content { padding: 30px; }
          .section { margin-bottom: 30px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
          .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; border-left: 4px solid ${colors.primary}; padding-left: 10px; }
          .info-row { display: flex; padding: 12px; border-bottom: 1px solid #f0f0f0; }
          .label { font-weight: bold; width: 180px; color: #666; }
          .value { color: #333; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="profile-card">
            <div class="header">
              <h1>🎓 Student Profile</h1>
              <p>${profileData.name} - STU-2026-1044</p>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">📋 Personal Information</div>
                <div class="info-row"><div class="label">Full Name:</div><div class="value">${profileData.name}</div></div>
                <div class="info-row"><div class="label">Date of Birth:</div><div class="value">${profileData.dob}</div></div>
                <div class="info-row"><div class="label">Blood Group:</div><div class="value">${profileData.bloodGroup}</div></div>
                <div class="info-row"><div class="label">Religion:</div><div class="value">${profileData.religion}</div></div>
              </div>
              <div class="section">
                <div class="section-title">📚 Academic Information</div>
                <div class="info-row"><div class="label">Class:</div><div class="value">${profileData.class}</div></div>
                <div class="info-row"><div class="label">Guardian:</div><div class="value">${profileData.guardian}</div></div>
                <div class="info-row"><div class="label">Attendance:</div><div class="value">94%</div></div>
              </div>
              <div class="section">
                <div class="section-title">📞 Contact Information</div>
                <div class="info-row"><div class="label">Email:</div><div class="value">${profileData.email}</div></div>
                <div class="info-row"><div class="label">Phone:</div><div class="value">${profileData.phone}</div></div>
                <div class="info-row"><div class="label">Address:</div><div class="value">${profileData.address}</div></div>
              </div>
            </div>
            <div class="footer">
              <p>Generated on: ${new Date().toLocaleString()}</p>
              <p>School Management System</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profileData.name.replace(/\s/g, "_")}_Profile.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <div 
          className="relative overflow-hidden border rounded-[2.5rem] shadow-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-32"
            style={{
              background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              opacity: 0.2,
            }}
          />

          <div className="relative z-10 p-8 flex flex-col md:flex-row items-end md:items-center gap-6 pt-16">
            <div className="relative group">
              <div 
                className="w-32 h-32 rounded-3xl p-1 shadow-2xl"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                <div 
                  className="w-full h-full rounded-[1.4rem] flex items-center justify-center text-4xl font-black"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1a1a27' : '#f0f0f0',
                    color: colors.text,
                  }}
                >
                  {profileData.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
              <button 
                onClick={() => router.push('/dashboard/profile/update')}
                className="absolute -bottom-2 -right-2 p-2 border rounded-xl transition-all shadow-lg cursor-pointer"
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
                <Edit3 size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 
                  className="text-3xl font-black"
                  style={{ color: colors.text }}
                >
                  {profileData.name}
                </h2>
                <span 
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                  style={{
                    backgroundColor: '#10b981' + '20',
                    color: '#10b981',
                    borderColor: '#10b981' + '40',
                  }}
                >
                  Active Student
                </span>
              </div>
              <p 
                className="font-medium flex items-center gap-2"
                style={{ color: colors.textSecondary }}
              >
                ID: STU-2026-1044 •{" "}
                <span 
                  className="uppercase font-bold"
                  style={{ color: colors.primary + 'CC' }}
                >
                  {profileData.class}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleDownloadProfile}
                className="p-3 border rounded-2xl transition-all cursor-pointer"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  borderColor: colors.border,
                  color: colors.textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.text;
                  e.currentTarget.style.borderColor = colors.primary + '80';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textSecondary;
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <Download size={20} />
              </button>
              <button 
                onClick={() => router.push('/dashboard/students/profile/new')}
                className="flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                  boxShadow: `0 20px 30px -5px ${colors.primary}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 25px 40px -5px ${colors.primary}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 20px 30px -5px ${colors.primary}40`;
                }}
              >
                Update Profile
              </button>
            </div>
          </div>

          <div 
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderTop: `1px solid ${colors.border}` }}
          >
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-6 text-center border-r last:border-0"
                style={{ 
                  borderColor: colors.border,
                }}
              >
                <div 
                  className="flex justify-center mb-2 opacity-80"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <p 
                  className="text-xl font-black"
                  style={{ color: colors.text }}
                >
                  {stat.value}
                </p>
                <p 
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal Info */}
          <div className="space-y-6">
            <div 
              className="border rounded-2xl p-6 space-y-6 shadow-xl transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <h3 
                className="text-sm font-black uppercase tracking-widest flex items-center gap-2"
                style={{ color: colors.text }}
              >
                <User size={16} style={{ color: colors.primary }} /> Personal Details
              </h3>

              <div className="space-y-4">
                {[
                  { icon: <Mail size={16} />, label: "Email Address", val: profileData.email },
                  { icon: <Phone size={16} />, label: "Phone Number", val: profileData.phone },
                  { icon: <Calendar size={16} />, label: "Date of Birth", val: profileData.dob },
                  { icon: <MapPin size={16} />, label: "Address", val: profileData.address },
                  { icon: <ShieldCheck size={16} />, label: "Guardian", val: profileData.guardian },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div 
                      className="mt-1 p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: colors.textSecondary,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p 
                        className="text-[10px] font-bold uppercase tracking-tighter"
                        style={{ color: colors.textSecondary + '80' }}
                      >
                        {item.label}
                      </p>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: colors.text }}
                      >
                        {item.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Academic & Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              className="border rounded-2xl p-6 shadow-xl transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 
                  className="text-sm font-black uppercase tracking-widest flex items-center gap-2"
                  style={{ color: colors.text }}
                >
                  <TrendingUp size={16} style={{ color: colors.primary }} /> Learning Progress
                </h3>
                <select 
                  className="border rounded-xl px-3 py-1.5 text-[10px] font-bold outline-none cursor-pointer transition-colors"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    borderColor: colors.border,
                    color: colors.textSecondary,
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                  onBlur={(e) => e.target.style.borderColor = colors.border}
                >
                  <option>Last 6 Months</option>
                </select>
              </div>

              <div className="flex items-end gap-3 h-48 px-2">
                {[65, 80, 45, 90, 75, 85, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer">
                    <div 
                      className="w-full rounded-t-xl relative overflow-hidden transition-all duration-500 group-hover:bg-white/10"
                      style={{ 
                        height: `${h}%`,
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      }}
                    >
                      <div 
                        className="absolute inset-0 transition-opacity group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(to top, ${colors.primary}60, transparent)`,
                          opacity: 0,
                        }}
                      />
                    </div>
                    <span 
                      className="text-[10px] font-bold uppercase"
                      style={{ color: colors.textSecondary }}
                    >
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="border rounded-2xl p-6 shadow-xl transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <h3 
                className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2"
                style={{ color: colors.text }}
              >
                <Clock size={16} style={{ color: colors.primary }} /> Recent Activities
              </h3>

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5" style={{ '--before-bg': colors.border } as React.CSSProperties}>
                {[
                  { title: "Submitted Math Assignment", time: "2 hours ago", color: "#3b82f6" },
                  { title: "Completed English Quiz", time: "Yesterday", color: "#10b981" },
                  { title: "Late Attendance - Grade 10", time: "3 days ago", color: colors.primary },
                ].map((act, i) => (
                  <div key={i} className="relative pl-10 group">
                    <div 
                      className="absolute left-1 top-1.5 w-4 h-4 rounded-full border-4 group-hover:scale-125 transition-transform"
                      style={{
                        backgroundColor: act.color,
                        borderColor: colors.card,
                      }}
                    />
                    <div 
                      className="p-4 rounded-2xl border transition-all cursor-pointer"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        borderColor: colors.border,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = colors.primary + '40';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = colors.border;
                      }}
                    >
                      <p 
                        className="text-sm font-bold"
                        style={{ color: colors.text }}
                      >
                        {act.title}
                      </p>
                      <p 
                        className="text-[10px] font-medium mt-1"
                        style={{ color: colors.textSecondary + '80' }}
                      >
                        {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}