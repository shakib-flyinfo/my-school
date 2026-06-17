"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  AlertCircle,
  Download,
  Filter,
  Search,
  ChevronRight,
  BookOpen,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

interface Exam {
  id: number;
  subject: string;
  code: string;
  date: string;
  time: string;
  room: string;
  teacher: string;
  status: string;
  type: string;
}

const initialExams: Exam[] = [
  {
    id: 1,
    subject: "Mathematics",
    code: "MATH-401",
    date: "15 May, 2026",
    time: "10:00 AM - 01:00 PM",
    room: "Room 402 (Level 4)",
    teacher: "Dr. Ariful Islam",
    status: "Upcoming",
    type: "Final Exam",
  },
  {
    id: 2,
    subject: "General Science",
    code: "SCI-202",
    date: "18 May, 2026",
    time: "02:00 PM - 04:00 PM",
    room: "Lab B (Level 1)",
    teacher: "Ms. Farhana Pervin",
    status: "Upcoming",
    type: "Midterm",
  },
  {
    id: 3,
    subject: "English Literature",
    code: "ENG-105",
    date: "20 May, 2026",
    time: "10:00 AM - 12:30 PM",
    room: "Hall Room A",
    teacher: "Mr. Tanvir Rahman",
    status: "Upcoming",
    type: "Final Exam",
  },
];

export default function ExamSchedulePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [exams, setExams] = useState<Exam[]>(initialExams);

  const examTypes = ["All", "Final Exam", "Midterm", "Quiz", "Assignment"];

  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || exam.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDownloadPDF = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Exam Schedule</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 40px; background: white; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f5f5f5; }
          .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 Exam Schedule</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
        <table>
          <thead><tr><th>Subject</th><th>Code</th><th>Date</th><th>Time</th><th>Room</th><th>Teacher</th><th>Type</th></tr></thead>
          <tbody>
            ${filteredExams.map(exam => `
              <tr><td>${exam.subject}</td><td>${exam.code}</td><td>${exam.date}</td><td>${exam.time}</td><td>${exam.room}</td><td>${exam.teacher}</td><td>${exam.type}</td></tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer"><p>School Management System</p></div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Exam_Schedule_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteExam = (id: number) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Calendar</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Exam{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400">
                Schedule
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Total {filteredExams.length} exams scheduled
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-red-500/50 transition-all cursor-pointer"
            >
              <Download size={16} /> Get PDF
            </button>
            <button 
              onClick={() => router.push('/dashboard/results/examschedule/new')}
              className="flex items-center gap-2 bg-linear-to-r from-red-600 to-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
            >
              Add Schedule
            </button>
          </div>
        </div>

        {/* Warning/Notice Alert */}
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
            <AlertCircle size={20} />
          </div>
          <p className="text-xs text-red-200/80">
            <span className="font-bold text-red-400">Important:</span> Students
            must bring their admit cards and arrive 30 minutes before the exam
            starts.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1e1e2d] p-4 rounded-2xl border border-white/5">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by subject, code or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter size={14} className="text-gray-500" />
            {examTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedType === type
                    ? "bg-linear-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/20"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredExams.length === 0 ? (
            <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl p-12 text-center">
              <div className="inline-flex p-4 bg-white/5 rounded-full text-red-500 mb-4">
                <Calendar size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Exams Found</h3>
              <p className="text-gray-500">No exams match your search criteria.</p>
              <button
                onClick={() => router.push('/dashboard/exams/new')}
                className="mt-4 px-6 py-2.5 bg-linear-to-r from-red-600 to-orange-500 text-white rounded-xl text-sm font-bold cursor-pointer"
              >
                + Add New Schedule
              </button>
            </div>
          ) : (
            filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="group bg-[#1e1e2d] border border-white/5 rounded-3xl p-6 hover:border-red-500/30 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                  {/* Date Box */}
                  <div className="w-full lg:w-24 h-24 bg-[#232333] rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group-hover:bg-linear-to-br group-hover:from-red-600 group-hover:to-orange-500 transition-all duration-500">
                    <span className="text-xs font-bold text-gray-500 group-hover:text-white/80 uppercase">
                      {exam.date.split(" ")[1]}
                    </span>
                    <span className="text-3xl font-black text-white">
                      {exam.date.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-bold text-red-500 group-hover:text-white/90">
                      {exam.date.split(" ")[2]}
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {exam.code}
                      </p>
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {exam.subject}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-white/5 rounded text-[9px] font-bold text-gray-400 uppercase tracking-tighter border border-white/5">
                          {exam.type}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                        <Clock size={16} className="text-red-500/70" />
                        {exam.time}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                        <MapPin size={16} className="text-red-500/70" />
                        {exam.room}
                      </div>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                            Invigilator
                          </p>
                          <p className="text-xs font-bold text-gray-300">
                            {exam.teacher}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/exams/edit/${exam.id}`)}
                          className="p-2 bg-white/5 rounded-xl text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="p-2 bg-white/5 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button 
                          onClick={() => router.push(`/dashboard/exams/${exam.id}`)}
                          className="p-2 bg-white/5 rounded-xl text-gray-500 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                          title="View Details"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Calendar View Placeholder */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl p-8 text-center space-y-4">
          <div className="inline-flex p-4 bg-white/5 rounded-full text-red-500">
            <BookOpen size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              Looking for Full Calendar?
            </h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              You can switch to the monthly view to see the entire academic
              roadmap including holidays and events.
            </p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/calendar')}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black text-gray-300 transition-all border border-white/5 uppercase tracking-widest cursor-pointer"
          >
            Open Full Calendar
          </button>
        </div>
      </div>
    </div>
  );
}