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
import { useTheme } from "@/app/components/ThemeProvider";

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
  const { colors, theme } = useTheme();
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
          th { background: ${colors.primary}; color: white; }
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
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div 
              className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em] mb-1"
              style={{ color: colors.primary }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Calendar</span>
            </div>
            <h2 
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Exam{" "}
              <span 
                className="text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                }}
              >
                Schedule
              </span>
            </h2>
            <p 
              className="text-sm mt-1"
              style={{ color: colors.textSecondary }}
            >
              Total {filteredExams.length} exams scheduled
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${colors.border}`,
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
              <Download size={16} /> Get PDF
            </button>
            <button 
              onClick={() => router.push('/dashboard/results/examschedule/new')}
              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
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
              Add Schedule
            </button>
          </div>
        </div>

        {/* Warning/Notice Alert */}
        <div 
          className="p-4 rounded-2xl flex items-center gap-4"
          style={{
            backgroundColor: colors.primary + '20',
            border: `1px solid ${colors.primary}40`,
          }}
        >
          <div 
            className="p-2 rounded-lg"
            style={{
              backgroundColor: colors.primary + '30',
              color: colors.primary,
            }}
          >
            <AlertCircle size={20} />
          </div>
          <p 
            className="text-xs"
            style={{ color: colors.primary + 'CC' }}
          >
            <span 
              className="font-bold"
              style={{ color: colors.primary }}
            >
              Important:
            </span> Students
            must bring their admit cards and arrive 30 minutes before the exam
            starts.
          </p>
        </div>

        {/* Search and Filter */}
        <div 
          className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl border transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div className="relative w-full md:w-80 group">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" 
              style={{ color: colors.textSecondary }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
            />
            <input
              type="text"
              placeholder="Search by subject, code or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter size={14} style={{ color: colors.textSecondary }} />
            {examTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer`}
                style={
                  selectedType === type
                    ? {
                        background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        color: '#ffffff',
                        boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                      }
                    : {
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        color: colors.textSecondary,
                      }
                }
                onMouseEnter={(e) => {
                  if (selectedType !== type) {
                    e.currentTarget.style.color = colors.text;
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedType !== type) {
                    e.currentTarget.style.color = colors.textSecondary;
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                  }
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredExams.length === 0 ? (
            <div 
              className="border rounded-3xl p-12 text-center transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div 
                className="inline-flex p-4 rounded-full mb-4"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  color: colors.primary,
                }}
              >
                <Calendar size={48} />
              </div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: colors.text }}
              >
                No Exams Found
              </h3>
              <p style={{ color: colors.textSecondary }}>
                No exams match your search criteria.
              </p>
              <button
                onClick={() => router.push('/dashboard/exams/new')}
                className="mt-4 px-6 py-2.5 text-white rounded-xl text-sm font-bold cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                + Add New Schedule
              </button>
            </div>
          ) : (
            filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="group border rounded-3xl p-6 transition-all duration-300 shadow-xl"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary + '50';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                  {/* Date Box */}
                  <div 
                    className="w-full lg:w-24 h-24 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-500"
                    style={{
                      backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
                      borderColor: colors.border,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`;
                      e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme === 'dark' ? '#232333' : '#e8e8e8';
                      e.currentTarget.style.borderColor = colors.border;
                    }}
                  >
                    <span 
                      className="text-xs font-bold uppercase transition-colors"
                      style={{ color: colors.textSecondary }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffffCC'}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                    >
                      {exam.date.split(" ")[1]}
                    </span>
                    <span 
                      className="text-3xl font-black"
                      style={{ color: colors.text }}
                    >
                      {exam.date.split(" ")[0]}
                    </span>
                    <span 
                      className="text-[10px] font-bold transition-colors"
                      style={{ color: colors.primary }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffffCC'}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
                    >
                      {exam.date.split(" ")[2]}
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p 
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: colors.textSecondary }}
                      >
                        {exam.code}
                      </p>
                      <h3 
                        className="text-xl font-bold transition-colors"
                        style={{ color: colors.text }}
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                      >
                        {exam.subject}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter border"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: colors.textSecondary,
                            borderColor: colors.border,
                          }}
                        >
                          {exam.type}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div 
                        className="flex items-center gap-3 text-sm font-medium"
                        style={{ color: colors.textSecondary }}
                      >
                        <Clock size={16} style={{ color: colors.primary + 'B3' }} />
                        {exam.time}
                      </div>
                      <div 
                        className="flex items-center gap-3 text-sm font-medium"
                        style={{ color: colors.textSecondary }}
                      >
                        <MapPin size={16} style={{ color: colors.primary + 'B3' }} />
                        {exam.room}
                      </div>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full border flex items-center justify-center"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            borderColor: colors.border,
                            color: colors.textSecondary,
                          }}
                        >
                          <User size={18} />
                        </div>
                        <div>
                          <p 
                            className="text-[10px] font-bold uppercase tracking-tighter"
                            style={{ color: colors.textSecondary + '80' }}
                          >
                            Invigilator
                          </p>
                          <p 
                            className="text-xs font-bold"
                            style={{ color: colors.text }}
                          >
                            {exam.teacher}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/dashboard/exams/edit/${exam.id}`)}
                          className="p-2 rounded-xl transition-all cursor-pointer"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: '#3b82f6',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.backgroundColor = '#3b82f640';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#3b82f6';
                            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                          }}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="p-2 rounded-xl transition-all cursor-pointer"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: '#ef4444',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.backgroundColor = '#ef444440';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#ef4444';
                            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                          }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button 
                          onClick={() => router.push(`/dashboard/exams/${exam.id}`)}
                          className="p-2 rounded-xl transition-all cursor-pointer"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: colors.textSecondary,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = colors.text;
                            e.currentTarget.style.backgroundColor = colors.primary + '20';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = colors.textSecondary;
                            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                          }}
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
        <div 
          className="border rounded-3xl p-8 text-center space-y-4 transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="inline-flex p-4 rounded-full"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: colors.primary,
            }}
          >
            <BookOpen size={32} />
          </div>
          <div>
            <h4 
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              Looking for Full Calendar?
            </h4>
            <p 
              className="text-sm max-w-md mx-auto"
              style={{ color: colors.textSecondary }}
            >
              You can switch to the monthly view to see the entire academic
              roadmap including holidays and events.
            </p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/calendar')}
            className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border cursor-pointer"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              color: colors.textSecondary,
              borderColor: colors.border,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary + '20';
              e.currentTarget.style.color = colors.text;
              e.currentTarget.style.borderColor = colors.primary + '80';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
              e.currentTarget.style.color = colors.textSecondary;
              e.currentTarget.style.borderColor = colors.border;
            }}
          >
            Open Full Calendar
          </button>
        </div>
      </div>
    </div>
  );
}