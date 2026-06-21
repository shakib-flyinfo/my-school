"use client";
import React, { useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Search,
  Filter,
  Check,
  X,
  Minus,
  Download,
} from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

// Types
interface Student {
  id: string;
  name: string;
  roll: string;
  class: string;
  attendanceRate: number;
  status: string;
  image: string;
  email: string;
  phone: string;
  parentName: string;
  address: string;
  joinDate: string;
  bloodGroup: string;
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  department: string;
  attendanceRate: number;
  status: string;
  image: string;
  email: string;
  phone: string;
  qualification: string;
  joinDate: string;
  address: string;
}

// Student Data
const studentData: Student[] = [
  {
    id: "STU-101",
    name: "Abir Hossain",
    roll: "01",
    class: "Grade 10",
    attendanceRate: 95,
    status: "Present",
    image: "A",
    email: "abir.hossain@email.com",
    phone: "+880 1234 567890",
    parentName: "Mr. Karim Hossain",
    address: "Dhaka, Bangladesh",
    joinDate: "2024-01-15",
    bloodGroup: "O+",
  },
  {
    id: "STU-102",
    name: "Mariya Sultana",
    roll: "02",
    class: "Grade 10",
    attendanceRate: 88,
    status: "Absent",
    image: "M",
    email: "mariya@email.com",
    phone: "+880 2345 678901",
    parentName: "Mrs. Fatema Sultana",
    address: "Chittagong, Bangladesh",
    joinDate: "2024-01-15",
    bloodGroup: "A+",
  },
  {
    id: "STU-103",
    name: "Rahat Karim",
    roll: "03",
    class: "Grade 09",
    attendanceRate: 72,
    status: "Late",
    image: "R",
    email: "rahat@email.com",
    phone: "+880 3456 789012",
    parentName: "Mr. Karim Ahmed",
    address: "Sylhet, Bangladesh",
    joinDate: "2024-01-16",
    bloodGroup: "B+",
  },
  {
    id: "STU-104",
    name: "Nabila Islam",
    roll: "04",
    class: "Grade 10",
    attendanceRate: 98,
    status: "Present",
    image: "N",
    email: "nabila@email.com",
    phone: "+880 4567 890123",
    parentName: "Mr. Islam",
    address: "Khulna, Bangladesh",
    joinDate: "2024-01-15",
    bloodGroup: "AB+",
  },
  {
    id: "STU-105",
    name: "Fahim Rahman",
    roll: "05",
    class: "Grade 09",
    attendanceRate: 65,
    status: "Absent",
    image: "F",
    email: "fahim@email.com",
    phone: "+880 5678 901234",
    parentName: "Mr. Rahman",
    address: "Rajshahi, Bangladesh",
    joinDate: "2024-01-17",
    bloodGroup: "O-",
  },
];

// Teacher Data
const teacherData: Teacher[] = [
  {
    id: "TCH-001",
    name: "Prof. John Smith",
    subject: "Mathematics",
    department: "Science",
    attendanceRate: 98,
    status: "Present",
    image: "J",
    email: "john.smith@school.com",
    phone: "+880 1234 567890",
    qualification: "PhD in Mathematics",
    joinDate: "2020-01-15",
    address: "Dhaka, Bangladesh",
  },
  {
    id: "TCH-002",
    name: "Dr. Sarah Johnson",
    subject: "Physics",
    department: "Science",
    attendanceRate: 95,
    status: "Present",
    image: "S",
    email: "sarah@school.com",
    phone: "+880 2345 678901",
    qualification: "PhD in Physics",
    joinDate: "2019-03-10",
    address: "Chittagong, Bangladesh",
  },
  {
    id: "TCH-003",
    name: "Prof. Emily Brown",
    subject: "English",
    department: "Arts",
    attendanceRate: 88,
    status: "Late",
    image: "E",
    email: "emily@school.com",
    phone: "+880 3456 789012",
    qualification: "MA in English",
    joinDate: "2021-01-20",
    address: "Sylhet, Bangladesh",
  },
  {
    id: "TCH-004",
    name: "Dr. Michael Chen",
    subject: "Computer Science",
    department: "Technology",
    attendanceRate: 92,
    status: "Absent",
    image: "M",
    email: "michael@school.com",
    phone: "+880 4567 890123",
    qualification: "PhD in CS",
    joinDate: "2018-08-01",
    address: "Dhaka, Bangladesh",
  },
];

// Class List
const classList = ["All Classes", "Grade 09", "Grade 10", "Grade 11", "Grade 12"];

// Department List for Teachers
const departmentList = ["All Departments", "Science", "Arts", "Technology", "Business"];

export default function AttendancePage() {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"student" | "teacher">("student");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [attendanceData, setAttendanceData] = useState<Student[]>(
    studentData.map(s => ({ ...s, status: s.status }))
  );
  const [teacherAttendanceData, setTeacherAttendanceData] = useState<Teacher[]>(
    teacherData.map(t => ({ ...t, status: t.status }))
  );

  // Filter Students based on search and class
  const filteredStudents: Student[] = attendanceData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roll.includes(searchTerm) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "All Classes" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Filter Teachers based on search and department
  const filteredTeachers: Teacher[] = teacherAttendanceData.filter((teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === "All Departments" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  // Update Student Attendance Status
  const updateStudentStatus = (id: string, newStatus: string) => {
    setAttendanceData(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // Update Teacher Attendance Status
  const updateTeacherStatus = (id: string, newStatus: string) => {
    setTeacherAttendanceData(prev =>
      prev.map(teacher =>
        teacher.id === id ? { ...teacher, status: newStatus } : teacher
      )
    );
  };

  // Calculate Stats based on active tab
  const getStats = () => {
    if (activeTab === "student") {
      const total = filteredStudents.length;
      const present = filteredStudents.filter(s => s.status === "Present").length;
      const absent = filteredStudents.filter(s => s.status === "Absent").length;
      return { total, present, absent };
    } else {
      const total = filteredTeachers.length;
      const present = filteredTeachers.filter(t => t.status === "Present").length;
      const absent = filteredTeachers.filter(t => t.status === "Absent").length;
      return { total, present, absent };
    }
  };

  const stats = getStats();

  // Get status color
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; border: string }> = {
      "Present": {
        bg: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)',
        text: '#10b981',
        border: 'rgba(16, 185, 129, 0.2)',
      },
      "Absent": {
        bg: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.15)',
        text: '#ef4444',
        border: 'rgba(239, 68, 68, 0.2)',
      },
      "Late": {
        bg: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)',
        text: '#f59e0b',
        border: 'rgba(245, 158, 11, 0.2)',
      },
    };
    return statusMap[status] || statusMap["Present"];
  };

  // Get attendance rate color
  const getAttendanceColor = (rate: number) => {
    if (rate > 90) return '#10b981';
    if (rate > 75) return '#f59e0b';
    return '#ef4444';
  };

  // Download Report
  const handleDownload = () => {
    const data = activeTab === "student" ? filteredStudents : filteredTeachers;
    const headers = activeTab === "student" 
      ? ["ID", "Name", "Class/Roll", "Attendance Rate", "Status"]
      : ["ID", "Name", "Subject", "Department", "Attendance Rate", "Status"];
    
    let csvContent = headers.join(",") + "\n";
    
    data.forEach(item => {
      if (activeTab === "student" && 'roll' in item && 'class' in item) {
        const studentItem = item as Student;
        const row = [
          studentItem.id,
          studentItem.name,
          `${studentItem.class} (Roll: ${studentItem.roll})`,
          `${studentItem.attendanceRate}%`,
          studentItem.status
        ].join(",");
        csvContent += row + "\n";
      } else if (activeTab === "teacher" && 'subject' in item && 'department' in item) {
        const teacherItem = item as Teacher;
        const row = [
          teacherItem.id,
          teacherItem.name,
          teacherItem.subject,
          teacherItem.department,
          `${teacherItem.attendanceRate}%`,
          teacherItem.status
        ].join(",");
        csvContent += row + "\n";
      }
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}-attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Type guard functions
  const isStudent = (person: Student | Teacher): person is Student => {
    return 'roll' in person && 'class' in person;
  };

  const isTeacher = (person: Student | Teacher): person is Teacher => {
    return 'subject' in person && 'department' in person;
  };

  // Get status button style
  const getStatusButtonStyle = (currentStatus: string, buttonStatus: string) => {
    const isActive = currentStatus === buttonStatus;
    const colorMap: Record<string, { active: string; inactive: string }> = {
      "Present": {
        active: '#10b981',
        inactive: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)',
      },
      "Absent": {
        active: '#ef4444',
        inactive: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.15)',
      },
      "Late": {
        active: '#f59e0b',
        inactive: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)',
      },
    };
    const colors = colorMap[buttonStatus];
    return {
      backgroundColor: isActive ? colors.active : colors.inactive,
      color: isActive ? '#ffffff' : colors.active,
      boxShadow: isActive ? `0 10px 20px -5px ${colors.active}40` : 'none',
    };
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-1"
              style={{ color: colors.primary }}
            >
              <CalendarDays size={14} />
              <span>Daily Tracking</span>
            </div>
            <h2 
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Attendance{" "}
              <span 
                className="text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                }}
              >
                Management
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div 
              className="p-1 rounded-xl border"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                borderColor: colors.border,
              }}
            >
              <button
                onClick={() => {
                  setActiveTab("student");
                  setSearchTerm("");
                  setSelectedClass("All Classes");
                  setSelectedDepartment("All Departments");
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={
                  activeTab === "student"
                    ? {
                        background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        color: '#ffffff',
                        boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                      }
                    : {
                        color: colors.textSecondary,
                        backgroundColor: 'transparent',
                      }
                }
                onMouseEnter={(e) => {
                  if (activeTab !== "student") {
                    e.currentTarget.style.color = colors.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "student") {
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setActiveTab("teacher");
                  setSearchTerm("");
                  setSelectedClass("All Classes");
                  setSelectedDepartment("All Departments");
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={
                  activeTab === "teacher"
                    ? {
                        background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                        color: '#ffffff',
                        boxShadow: `0 10px 25px -5px ${colors.primary}40`,
                      }
                    : {
                        color: colors.textSecondary,
                        backgroundColor: 'transparent',
                      }
                }
                onMouseEnter={(e) => {
                  if (activeTab !== "teacher") {
                    e.currentTarget.style.color = colors.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== "teacher") {
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
              >
                Teacher
              </button>
            </div>
            <button
              onClick={handleDownload}
              className="p-2.5 rounded-xl transition-all"
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
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Attendance Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: `Total ${activeTab === "student" ? "Students" : "Teachers"}`,
              val: stats.total,
              icon: <Users size={28} />,
              color: colors.primary,
            },
            {
              label: "Today Present",
              val: stats.present,
              icon: <UserCheck size={28} />,
              color: '#10b981',
            },
            {
              label: "Today Absent",
              val: stats.absent,
              icon: <UserX size={28} />,
              color: '#ef4444',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden border p-6 rounded-3xl transition-colors"
              style={{
                background: `linear-gradient(to bottom right, ${stat.color}20, ${stat.color}05)`,
                borderColor: colors.border,
              }}
            >
              <div className="relative z-10 flex justify-between items-center">
                <div>
                  <p 
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {stat.label}
                  </p>
                  <h4 
                    className="text-3xl font-black"
                    style={{ color: colors.text }}
                  >
                    {stat.val}
                  </h4>
                </div>
                <div style={{ color: stat.color, opacity: 0.8 }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
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
              placeholder={`Search ${activeTab} by name, ID or ${activeTab === "student" ? "roll" : "subject"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs transition-all focus:outline-none"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
              onBlur={(e) => e.target.style.borderColor = colors.border}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {activeTab === "student" ? (
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-xl px-4 py-2 text-xs transition-all focus:outline-none flex-1"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.textSecondary,
                }}
                onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              >
                {classList.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="rounded-xl px-4 py-2 text-xs transition-all focus:outline-none flex-1"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.textSecondary,
                }}
                onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              >
                {departmentList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            )}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
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
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Attendance List */}
        <div 
          className="border rounded-3xl overflow-hidden shadow-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr 
                  className="text-[10px] uppercase tracking-[0.2em] border-b"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.border,
                    backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
                  }}
                >
                  <th className="px-8 py-4 font-bold">
                    {activeTab === "student" ? "Student Info" : "Teacher Info"}
                  </th>
                  {activeTab === "student" ? (
                    <>
                      <th className="px-6 py-4 font-bold">Class / Roll</th>
                      <th className="px-6 py-4 font-bold">Attendance Rate</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4 font-bold">Subject</th>
                      <th className="px-6 py-4 font-bold">Department</th>
                    </>
                  )}
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-center">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.border }}>
                {(activeTab === "student" ? filteredStudents : filteredTeachers).map((person) => {
                  const statusColor = getStatusColor(person.status);
                  const attendanceColor = getAttendanceColor(person.attendanceRate);
                  
                  return (
                    <tr
                      key={person.id}
                      className="group transition-colors"
                      style={{ borderColor: colors.border }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm shadow-inner transition-all"
                            style={{
                              background: `linear-gradient(to bottom right, ${theme === 'dark' ? '#2a2a40' : '#e8e8e8'}, ${theme === 'dark' ? '#1a1a27' : '#d1d1d1'})`,
                              borderColor: colors.border,
                              color: colors.primary,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = colors.primary + '80';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = colors.border;
                            }}
                          >
                            {person.image}
                          </div>
                          <div>
                            <p 
                              className="text-sm font-bold transition-colors"
                              style={{ color: colors.text }}
                              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                              onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                            >
                              {person.name}
                            </p>
                            <p 
                              className="text-[10px] font-medium tracking-wider"
                              style={{ color: colors.textSecondary + '80' }}
                            >
                              {person.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      {activeTab === "student" && isStudent(person) ? (
                        <>
                          <td className="px-6 py-5">
                            <div className="text-xs">
                              <p 
                                className="font-bold"
                                style={{ color: colors.text }}
                              >
                                {person.class}
                              </p>
                              <p 
                                className="text-[10px]"
                                style={{ color: colors.textSecondary }}
                              >
                                Roll: {person.roll}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="w-32">
                              <div className="flex justify-between mb-1">
                                <span 
                                  className="text-[10px] font-bold"
                                  style={{ color: colors.textSecondary }}
                                >
                                  {person.attendanceRate}%
                                </span>
                              </div>
                              <div 
                                className="w-full h-1 rounded-full overflow-hidden"
                                style={{
                                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                }}
                              >
                                <div
                                  className="h-full rounded-full transition-all duration-1000"
                                  style={{
                                    width: `${person.attendanceRate}%`,
                                    backgroundColor: attendanceColor,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        </>
                      ) : activeTab === "teacher" && isTeacher(person) ? (
                        <>
                          <td className="px-6 py-5">
                            <p 
                              className="text-xs font-bold"
                              style={{ color: colors.text }}
                            >
                              {person.subject}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <p 
                              className="text-xs"
                              style={{ color: colors.textSecondary }}
                            >
                              {person.department}
                            </p>
                          </td>
                        </>
                      ) : null}
                      
                      <td className="px-6 py-5">
                        <span
                          className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md border"
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                            borderColor: statusColor.border,
                          }}
                        >
                          {person.status}
                        </span>
                      </td>
                      
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-center gap-2">
                          {["Present", "Absent", "Late"].map((status) => {
                            const btnStyle = getStatusButtonStyle(person.status, status);
                            const Icon = status === "Present" ? Check : status === "Absent" ? X : Minus;
                            const updateStatus = () => {
                              if (activeTab === "student") {
                                updateStudentStatus(person.id, status);
                              } else {
                                updateTeacherStatus(person.id, status);
                              }
                            };
                            
                            return (
                              <button
                                key={status}
                                onClick={updateStatus}
                                className="p-1.5 rounded-lg transition-all"
                                style={btnStyle}
                                onMouseEnter={(e) => {
                                  if (person.status !== status) {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                <Icon size={14} />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}