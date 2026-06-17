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
    <div className="p-8 font-sans text-gray-200 min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em]">
            <Trophy size={14} />
            <span>Academic Excellence</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">
            Hall of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-500">
              Fame
            </span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
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
              className={`relative flex flex-col items-center w-full md:w-64 bg-[#1e1e2d] border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-red-500/30 hover:scale-105 cursor-pointer shadow-2xl ${
                student.rank === 1
                  ? "order-2 md:-translate-y-8 z-20"
                  : student.rank === 2
                    ? "order-1 z-10"
                    : "order-3 z-10"
              }`}
            >
              {student.rank === 1 && (
                <div className="absolute -top-6 text-yellow-500 animate-pulse">
                  <Crown size={40} fill="currentColor" />
                </div>
              )}

              <div
                className={`w-20 h-20 rounded-2xl border-4 ${student.color} bg-[#1a1a27] flex items-center justify-center text-2xl font-black text-white mb-4 shadow-xl`}
              >
                {student.image}
              </div>

              <h3 className="font-bold text-white text-lg text-center">
                {student.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{student.class}</p>
              <p className="text-[10px] text-gray-600 mb-4">Roll: {student.roll}</p>

              <div className="grid grid-cols-2 gap-4 w-full border-t border-white/5 pt-4">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-600 uppercase">
                    GPA
                  </p>
                  <p className="text-lg font-black text-red-500">
                    {student.gpa}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-600 uppercase">
                    Marks
                  </p>
                  <p className="text-lg font-black text-white">
                    {student.marks}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-400">
                <Eye size={12} />
                <span>Click to view details</span>
              </div>

              <div
                className={`absolute -bottom-4 px-4 py-1 rounded-full text-[10px] font-black text-white bg-linear-to-r ${
                  student.rank === 1
                    ? "from-yellow-600 to-yellow-400"
                    : student.rank === 2
                      ? "from-slate-500 to-slate-300"
                      : "from-orange-700 to-orange-500"
                }`}
              >
                RANK #{student.rank}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-white flex items-center gap-3">
              <Medal className="text-red-500" /> Global Leaderboard
              <span className="text-xs text-gray-500 font-normal">
                (Top {otherPerformers.length} Performers)
              </span>
            </h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-300 outline-none focus:border-red-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {displayedPerformers.map((student) => (
              <div
                key={student.rank}
                onClick={() => handleViewDetails(student, student.rank)}
                className="p-5 px-8 flex items-center justify-between group hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gray-500 w-6">
                      #{student.rank}
                    </span>
                    {student.rank <= 3 && (
                      <Medal size={14} className="text-yellow-500" />
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-red-500/10 group-hover:text-red-500 transition-all">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                      {student.name}
                    </p>
                    <p className="text-[10px] text-gray-600 uppercase font-bold">
                      {student.class} • Roll: {student.roll}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                      GPA Score
                    </p>
                    <p className="text-sm font-black text-white">
                      {student.gpa}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                      Marks
                    </p>
                    <p className="text-sm font-black text-emerald-400">
                      {student.marks}
                    </p>
                  </div>
                  <div
                    className={`p-2 rounded-lg ${
                      student.status === "up"
                        ? "text-emerald-500 bg-emerald-500/10"
                        : "text-red-500 bg-red-500/10"
                    }`}
                  >
                    <TrendingUp
                      size={16}
                      className={student.status === "down" ? "rotate-180" : ""}
                    />
                  </div>
                  <button className="p-2 text-gray-500 group-hover:text-red-500 transition-colors">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {otherPerformers.length > 4 && (
            <div className="p-6 bg-[#232333] border-t border-white/5 text-center">
              <button
                onClick={() => setShowFullList(!showFullList)}
                className="text-[10px] font-black text-gray-500 hover:text-red-500 transition-colors uppercase tracking-[0.2em] flex items-center gap-2 mx-auto"
              >
                {showFullList ? "Show Less" : "Show Full Rankings"}
                <ChevronRight size={14} className={showFullList ? "rotate-90" : ""} />
              </button>
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl p-5 text-center border border-yellow-500/20">
            <Trophy size={24} className="text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-[10px] text-gray-400">Top Positions</p>
          </div>
          <div className="bg-linear-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-5 text-center border border-blue-500/20">
            <Award size={24} className="text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{otherPerformers.length}</p>
            <p className="text-[10px] text-gray-400">Top Performers</p>
          </div>
          <div className="bg-linear-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-5 text-center border border-emerald-500/20">
            <Star size={24} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">5.00</p>
            <p className="text-[10px] text-gray-400">Highest GPA</p>
          </div>
          <div className="bg-linear-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-5 text-center border border-purple-500/20">
            <TrendingUp size={24} className="text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-[10px] text-gray-400">Highest Marks</p>
          </div>
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