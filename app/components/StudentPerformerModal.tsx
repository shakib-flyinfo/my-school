"use client";
import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
  Medal,
  Crown,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface StudentPerformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
  rank: number;
}

export default function StudentPerformerModal({ 
  isOpen, 
  onClose, 
  student, 
  rank 
}: StudentPerformerModalProps) {
  const { colors, theme } = useTheme();

  if (!isOpen) return null;

  const getRankIcon = () => {
    if (rank === 1) return <Crown size={24} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={24} className="text-slate-400" />;
    if (rank === 3) return <Medal size={24} className="text-orange-500" />;
    return <Star size={24} className="text-blue-500" />;
  };

  const getRankColor = () => {
    if (rank === 1) return "from-yellow-600 to-yellow-500";
    if (rank === 2) return "from-slate-500 to-slate-400";
    if (rank === 3) return "from-orange-600 to-orange-500";
    return "from-blue-600 to-blue-500";
  };

  // Mock detailed data for each student
  const studentDetails = {
    "Sakib Ahmed": {
      email: "sakib.ahmed@school.edu",
      phone: "+880 1712-345678",
      dob: "15 March, 2010",
      address: "Dhanmondi, Dhaka",
      guardian: "Mr. Karim Ahmed",
      bloodGroup: "O+",
      attendance: "98%",
      subjects: [
        { name: "Mathematics", marks: 98, grade: "A+" },
        { name: "Physics", marks: 96, grade: "A+" },
        { name: "Chemistry", marks: 97, grade: "A+" },
        { name: "English", marks: 95, grade: "A+" },
        { name: "Biology", marks: 99, grade: "A+" },
      ],
      achievements: [
        "1st Position in National Math Olympiad 2025",
        "Best Student Award - 2025",
        "Perfect Attendance Certificate",
      ],
    },
    "Nusrat Jahan": {
      email: "nusrat.jahan@school.edu",
      phone: "+880 1812-345678",
      dob: "22 July, 2010",
      address: "Gulshan, Dhaka",
      guardian: "Mrs. Fatema Begum",
      bloodGroup: "A+",
      attendance: "96%",
      subjects: [
        { name: "Mathematics", marks: 94, grade: "A+" },
        { name: "Physics", marks: 95, grade: "A+" },
        { name: "Chemistry", marks: 93, grade: "A+" },
        { name: "English", marks: 96, grade: "A+" },
        { name: "Biology", marks: 94, grade: "A+" },
      ],
      achievements: [
        "2nd Position in Science Fair 2025",
        "Best in Physics Award",
      ],
    },
    "Abir Hossain": {
      email: "abir.hossain@school.edu",
      phone: "+880 1912-345678",
      dob: "05 January, 2010",
      address: "Uttara, Dhaka",
      guardian: "Mr. Rashed Hossain",
      bloodGroup: "B+",
      attendance: "95%",
      subjects: [
        { name: "Mathematics", marks: 92, grade: "A+" },
        { name: "Physics", marks: 91, grade: "A+" },
        { name: "Chemistry", marks: 90, grade: "A+" },
        { name: "English", marks: 93, grade: "A+" },
        { name: "Biology", marks: 91, grade: "A+" },
      ],
      achievements: [
        "3rd Position in Debate Competition",
        "Best Team Player Award",
      ],
    },
  };

  const details = studentDetails[student.name as keyof typeof studentDetails] || studentDetails["Sakib Ahmed"];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="rounded-3xl border max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        
        {/* Modal Header with Rank Badge */}
        <div className={`sticky top-0 bg-linear-to-r ${getRankColor()} p-6 text-white`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold">
                {student.image}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {getRankIcon()}
                  <span className="text-sm font-bold opacity-90">Rank #{rank}</span>
                </div>
                <h3 className="text-2xl font-bold mt-1">{student.name}</h3>
                <p className="text-sm opacity-90">{student.class || "Grade 10 - Section A"}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Academic Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              }}
            >
              <Award size={20} className="text-yellow-500 mx-auto mb-2" />
              <p 
                className="text-[10px] font-bold uppercase"
                style={{ color: colors.textSecondary }}
              >
                GPA
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                {student.gpa}
              </p>
            </div>
            <div 
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              }}
            >
              <TrendingUp size={20} className="text-emerald-500 mx-auto mb-2" />
              <p 
                className="text-[10px] font-bold uppercase"
                style={{ color: colors.textSecondary }}
              >
                Marks
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                {student.marks || "96%"}
              </p>
            </div>
            <div 
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              }}
            >
              <Clock size={20} className="text-blue-500 mx-auto mb-2" />
              <p 
                className="text-[10px] font-bold uppercase"
                style={{ color: colors.textSecondary }}
              >
                Attendance
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                {details.attendance}
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div 
            className="rounded-xl p-5"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }}
          >
            <h4 
              className="text-sm font-bold flex items-center gap-2 mb-4"
              style={{ color: colors.text }}
            >
              <User size={16} style={{ color: colors.primary }} />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail size={14} style={{ color: colors.textSecondary }} />
                <div>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary }}
                  >
                    Email
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text }}
                  >
                    {details.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} style={{ color: colors.textSecondary }} />
                <div>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary }}
                  >
                    Phone
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text }}
                  >
                    {details.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={14} style={{ color: colors.textSecondary }} />
                <div>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary }}
                  >
                    Date of Birth
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text }}
                  >
                    {details.dob}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} style={{ color: colors.textSecondary }} />
                <div>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary }}
                  >
                    Guardian
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text }}
                  >
                    {details.guardian}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award size={14} style={{ color: colors.textSecondary }} />
                <div>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary }}
                  >
                    Blood Group
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text }}
                  >
                    {details.bloodGroup}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} style={{ color: colors.textSecondary }} />
                <div>
                  <p 
                    className="text-[10px]"
                    style={{ color: colors.textSecondary }}
                  >
                    Address
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: colors.text }}
                  >
                    {details.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Marks */}
          <div 
            className="rounded-xl p-5"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            }}
          >
            <h4 
              className="text-sm font-bold flex items-center gap-2 mb-4"
              style={{ color: colors.text }}
            >
              <BookOpen size={16} style={{ color: colors.primary }} />
              Subject-wise Performance
            </h4>
            <div className="space-y-3">
              {details.subjects.map((subject: any, idx: React.Key | null | undefined) => (
                <div key={idx} className="flex items-center justify-between">
                  <span 
                    className="text-xs"
                    style={{ color: colors.textSecondary }}
                  >
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-32 rounded-full h-1.5"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      }}
                    >
                      <div 
                        className="h-1.5 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                          width: `${subject.marks}%`,
                        }}
                      />
                    </div>
                    <span 
                      className="text-xs font-bold w-8"
                      style={{ color: colors.text }}
                    >
                      {subject.marks}%
                    </span>
                    <span 
                      className="text-xs font-bold w-8"
                      style={{ color: '#10b981' }}
                    >
                      {subject.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div 
            className="rounded-xl p-5 border"
            style={{
              background: `linear-gradient(to right, ${colors.primary}15, ${colors.secondary}15)`,
              borderColor: '#f59e0b40',
            }}
          >
            <h4 
              className="text-sm font-bold flex items-center gap-2 mb-3"
              style={{ color: colors.text }}
            >
              <Trophy size={16} className="text-yellow-500" />
              Achievements & Awards
            </h4>
            <div className="space-y-2">
              {details.achievements.map((achievement: any, idx: React.Key | null | undefined) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={12} style={{ color: '#10b981' }} />
                  <span 
                    className="text-xs"
                    style={{ color: colors.textSecondary }}
                  >
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div 
          className="sticky bottom-0 p-4 border-t flex justify-end"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
}