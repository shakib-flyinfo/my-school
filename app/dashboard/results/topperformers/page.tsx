"use client";
import React, { useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  ChevronRight,
  Crown,
  Search,
  Filter,
  Eye,
  Award,
} from "lucide-react";
import StudentPerformerModal from "@/app/components/StudentPerformerModal";
import { useTheme } from "@/app/components/ThemeProvider";

const topThree = [
  {
    rank: 2,
    name: "Nusrat Jahan",
    gpa: "5.00",
    marks: "94%",
    image: "NJ",
    color: "border-slate-400",
    class: "Grade 10 - Section A",
    roll: "02",
    attendance: "96%",
  },
  {
    rank: 1,
    name: "Sakib Ahmed",
    gpa: "5.00",
    marks: "98%",
    image: "SA",
    color: "border-yellow-500",
    class: "Grade 10 - Section A",
    roll: "01",
    attendance: "98%",
  },
  {
    rank: 3,
    name: "Abir Hossain",
    gpa: "4.95",
    marks: "91%",
    image: "AH",
    color: "border-orange-700",
    class: "Grade 10 - Section B",
    roll: "05",
    attendance: "95%",
  },
];

const otherPerformers = [
  {
    rank: 4,
    name: "Mariya Sultana",
    class: "Grade 10 - Section A",
    gpa: "4.90",
    status: "up",
    marks: "89%",
    roll: "03",
  },
  {
    rank: 5,
    name: "Tanvir Hossain",
    class: "Grade 10 - Section B",
    gpa: "4.88",
    status: "up",
    marks: "87%",
    roll: "08",
  },
  {
    rank: 6,
    name: "Nabila Islam",
    class: "Grade 10 - Section A",
    gpa: "4.85",
    status: "down",
    marks: "86%",
    roll: "04",
  },
  {
    rank: 7,
    name: "Rahat Karim",
    class: "Grade 10 - Section C",
    gpa: "4.80",
    status: "up",
    marks: "84%",
    roll: "12",
  },
  {
    rank: 8,
    name: "Farhana Akter",
    class: "Grade 10 - Section B",
    gpa: "4.78",
    status: "up",
    marks: "83%",
    roll: "07",
  },
  {
    rank: 9,
    name: "Shahidul Islam",
    class: "Grade 10 - Section A",
    gpa: "4.75",
    status: "down",
    marks: "82%",
    roll: "09",
  },
  {
    rank: 10,
    name: "Tahmina Begum",
    class: "Grade 10 - Section C",
    gpa: "4.72",
    status: "up",
    marks: "81%",
    roll: "15",
  },
];

export default function TopPerformersPage() {
  const { colors, theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedRank, setSelectedRank] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showFullList, setShowFullList] = useState(false);

  const filteredPerformers = otherPerformers.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPerformers = showFullList ? filteredPerformers : filteredPerformers.slice(0, 4);

  const handleViewDetails = (student: any, rank: number) => {
    setSelectedStudent(student);
    setSelectedRank(rank);
    setShowModal(true);
  };

  return (
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
            style={{
              backgroundColor: '#f59e0b' + '20',
              border: `1px solid ${'#f59e0b' + '40'}`,
              color: '#f59e0b',
            }}
          >
            <Trophy size={14} />
            <span>Academic Excellence</span>
          </div>
          <h2 
            className="text-4xl font-black tracking-tight"
            style={{ color: colors.text }}
          >
            Hall of{" "}
            <span 
              className="text-transparent bg-clip-text"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
              }}
            >
              Fame
            </span>
          </h2>
          <p 
            className="text-sm max-w-md mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Celebrating the brightest minds and consistent achievers of our
            institution.
          </p>
        </div>

        {/* Podium Section (Top 3) */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 pt-10">
          {topThree.map((student, i) => (
            <div
              key={i}
              onClick={() => handleViewDetails(student, student.rank)}
              className={`relative flex flex-col items-center w-full md:w-64 border rounded-[2.5rem] p-8 transition-all duration-500 hover:scale-105 cursor-pointer shadow-2xl ${
                student.rank === 1
                  ? "order-2 md:-translate-y-8 z-20"
                  : student.rank === 2
                    ? "order-1 z-10"
                    : "order-3 z-10"
              }`}
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary + '50';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              {student.rank === 1 && (
                <div className="absolute -top-6 text-yellow-500 animate-pulse">
                  <Crown size={40} fill="currentColor" />
                </div>
              )}

              <div
                className={`w-20 h-20 rounded-2xl border-4 ${student.color} flex items-center justify-center text-2xl font-black mb-4 shadow-xl`}
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a27' : '#f0f0f0',
                  color: colors.text,
                }}
              >
                {student.image}
              </div>

              <h3 
                className="font-bold text-lg text-center"
                style={{ color: colors.text }}
              >
                {student.name}
              </h3>
              <p 
                className="text-xs mb-2"
                style={{ color: colors.textSecondary }}
              >
                {student.class}
              </p>
              <p 
                className="text-[10px] mb-4"
                style={{ color: colors.textSecondary + '80' }}
              >
                Roll: {student.roll}
              </p>

              <div 
                className="grid grid-cols-2 gap-4 w-full pt-4"
                style={{ borderTop: `1px solid ${colors.border}` }}
              >
                <div className="text-center">
                  <p 
                    className="text-[10px] font-bold uppercase"
                    style={{ color: colors.textSecondary + '80' }}
                  >
                    GPA
                  </p>
                  <p 
                    className="text-lg font-black"
                    style={{ color: colors.primary }}
                  >
                    {student.gpa}
                  </p>
                </div>
                <div className="text-center">
                  <p 
                    className="text-[10px] font-bold uppercase"
                    style={{ color: colors.textSecondary + '80' }}
                  >
                    Marks
                  </p>
                  <p 
                    className="text-lg font-black"
                    style={{ color: colors.text }}
                  >
                    {student.marks}
                  </p>
                </div>
              </div>

              <div 
                className="mt-3 flex items-center gap-1 text-[10px]"
                style={{ color: colors.primary }}
              >
                <Eye size={12} />
                <span>Click to view details</span>
              </div>

              <div
                className={`absolute -bottom-4 px-4 py-1 rounded-full text-[10px] font-black text-white`}
                style={{
                  background: `linear-gradient(to right, ${
                    student.rank === 1
                      ? '#f59e0b, #fbbf24'
                      : student.rank === 2
                        ? '#64748b, #94a3b8'
                        : '#ea580c, #f97316'
                  })`,
                }}
              >
                RANK #{student.rank}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard List */}
        <div 
          className="border rounded-[2.5rem] overflow-hidden shadow-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="p-8 border-b flex flex-col md:flex-row justify-between items-center gap-4"
            style={{
              borderColor: colors.border,
            }}
          >
            <h3 
              className="font-bold flex items-center gap-3"
              style={{ color: colors.text }}
            >
              <Medal style={{ color: colors.primary }} /> Global Leaderboard
              <span 
                className="text-xs font-normal"
                style={{ color: colors.textSecondary }}
              >
                (Top {otherPerformers.length} Performers)
              </span>
            </h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: colors.textSecondary }}
                />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl pl-9 pr-4 py-2 text-xs transition-all focus:outline-none"
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

          <div className="divide-y" style={{ borderColor: colors.border }}>
            {displayedPerformers.map((student) => (
              <div
                key={student.rank}
                onClick={() => handleViewDetails(student, student.rank)}
                className="p-5 px-8 flex items-center justify-between group transition-colors cursor-pointer"
                style={{ borderColor: colors.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-sm font-black w-6"
                      style={{ color: colors.textSecondary }}
                    >
                      #{student.rank}
                    </span>
                    {student.rank <= 3 && (
                      <Medal size={14} style={{ color: '#f59e0b' }} />
                    )}
                  </div>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      color: colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary + '20';
                      e.currentTarget.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                      e.currentTarget.style.color = colors.textSecondary;
                    }}
                  >
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p 
                      className="text-sm font-bold transition-colors"
                      style={{ color: colors.text }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                    >
                      {student.name}
                    </p>
                    <p 
                      className="text-[10px] uppercase font-bold"
                      style={{ color: colors.textSecondary + '80' }}
                    >
                      {student.class} • Roll: {student.roll}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p 
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: colors.textSecondary + '80' }}
                    >
                      GPA Score
                    </p>
                    <p 
                      className="text-sm font-black"
                      style={{ color: colors.text }}
                    >
                      {student.gpa}
                    </p>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: colors.textSecondary + '80' }}
                    >
                      Marks
                    </p>
                    <p 
                      className="text-sm font-black"
                      style={{ color: '#10b981' }}
                    >
                      {student.marks}
                    </p>
                  </div>
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: student.status === "up" ? '#10b98120' : '#ef444420',
                      color: student.status === "up" ? '#10b981' : '#ef4444',
                    }}
                  >
                    <TrendingUp
                      size={16}
                      className={student.status === "down" ? "rotate-180" : ""}
                    />
                  </div>
                  <button 
                    className="p-2 transition-colors"
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {otherPerformers.length > 4 && (
            <div 
              className="p-6 border-t text-center"
              style={{
                borderColor: colors.border,
                backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
              }}
            >
              <button
                onClick={() => setShowFullList(!showFullList)}
                className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mx-auto transition-colors"
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                {showFullList ? "Show Less" : "Show Full Rankings"}
                <ChevronRight 
                  size={14} 
                  className={showFullList ? "rotate-90" : ""} 
                  style={{ transition: 'transform 0.3s' }}
                />
              </button>
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Top Positions", value: "3", icon: <Trophy size={24} />, color: '#f59e0b' },
            { label: "Top Performers", value: otherPerformers.length.toString(), icon: <Award size={24} />, color: '#3b82f6' },
            { label: "Highest GPA", value: "5.00", icon: <Star size={24} />, color: '#10b981' },
            { label: "Highest Marks", value: "98%", icon: <TrendingUp size={24} />, color: '#8b5cf6' },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 text-center border transition-colors"
              style={{
                background: `linear-gradient(to bottom right, ${stat.color}20, ${stat.color}10)`,
                borderColor: stat.color + '40',
              }}
            >
              <div style={{ color: stat.color }} className="mx-auto mb-2">
                {stat.icon}
              </div>
              <p 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                {stat.value}
              </p>
              <p 
                className="text-[10px]"
                style={{ color: colors.textSecondary }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentPerformerModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          student={selectedStudent}
          rank={selectedRank}
        />
      )}
    </div>
  );
}