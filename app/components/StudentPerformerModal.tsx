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
      <div className="bg-[#1e1e2d] rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        
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
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Award size={20} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-gray-500 uppercase">GPA</p>
              <p className="text-2xl font-bold text-white">{student.gpa}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <TrendingUp size={20} className="text-emerald-500 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-gray-500 uppercase">Marks</p>
              <p className="text-2xl font-bold text-white">{student.marks || "96%"}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Clock size={20} className="text-blue-500 mx-auto mb-2" />
              <p className="text-[10px] font-bold text-gray-500 uppercase">Attendance</p>
              <p className="text-2xl font-bold text-white">{details.attendance}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white/5 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <User size={16} className="text-red-500" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gray-500" />
                <div>
                  <p className="text-[10px] text-gray-500">Email</p>
                  <p className="text-xs text-white">{details.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gray-500" />
                <div>
                  <p className="text-[10px] text-gray-500">Phone</p>
                  <p className="text-xs text-white">{details.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-gray-500" />
                <div>
                  <p className="text-[10px] text-gray-500">Date of Birth</p>
                  <p className="text-xs text-white">{details.dob}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} className="text-gray-500" />
                <div>
                  <p className="text-[10px] text-gray-500">Guardian</p>
                  <p className="text-xs text-white">{details.guardian}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award size={14} className="text-gray-500" />
                <div>
                  <p className="text-[10px] text-gray-500">Blood Group</p>
                  <p className="text-xs text-white">{details.bloodGroup}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-gray-500" />
                <div>
                  <p className="text-[10px] text-gray-500">Address</p>
                  <p className="text-xs text-white">{details.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Marks */}
          <div className="bg-white/5 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-red-500" />
              Subject-wise Performance
            </h4>
            <div className="space-y-3">
              {details.subjects.map((subject: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; marks: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; grade: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{subject.name}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-white/10 rounded-full h-1.5">
                      <div 
                        className="bg-linear-to-r from-red-500 to-orange-500 h-1.5 rounded-full"
                        style={{ width: `${subject.marks}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-white w-8">{subject.marks}%</span>
                    <span className="text-xs font-bold text-emerald-500 w-8">{subject.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-5 border border-yellow-500/20">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Trophy size={16} className="text-yellow-500" />
              Achievements & Awards
            </h4>
            <div className="space-y-2">
              {details.achievements.map((achievement: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-emerald-500" />
                  <span className="text-xs text-gray-300">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#1e1e2d] p-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-xl font-bold text-sm transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}