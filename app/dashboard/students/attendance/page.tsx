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

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-1">
              <CalendarDays size={14} />
              <span>Daily Tracking</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Attendance{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400">
                Management
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
  <button
    onClick={() => {
      setActiveTab("student");
      setSearchTerm("");
      setSelectedClass("All Classes");
      setSelectedDepartment("All Departments");
    }}
    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
      activeTab === "student"
        ? "bg-linear-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/20"
        : "text-gray-500 hover:text-white"
    }`}
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
    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
      activeTab === "teacher"
        ? "bg-linear-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/20"
        : "text-gray-500 hover:text-white"
    }`}
  >
    Teacher
  </button>
</div>
            <button
              onClick={handleDownload}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-red-500/50 transition-all"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Attendance Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden bg-linear-to-br from-blue-500/20 to-blue-600/5 border border-white/5 p-6 rounded-3xl">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Total {activeTab === "student" ? "Students" : "Teachers"}
                </p>
                <h4 className="text-3xl font-black text-white">{stats.total}</h4>
              </div>
              <div className="text-blue-400 opacity-80">
                <Users size={28} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-linear-to-br from-emerald-500/20 to-emerald-600/5 border border-white/5 p-6 rounded-3xl">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Today Present
                </p>
                <h4 className="text-3xl font-black text-white">{stats.present}</h4>
              </div>
              <div className="text-emerald-400 opacity-80">
                <UserCheck size={28} />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-linear-to-br from-red-500/20 to-red-600/5 border border-white/5 p-6 rounded-3xl">
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Today Absent
                </p>
                <h4 className="text-3xl font-black text-white">{stats.absent}</h4>
              </div>
              <div className="text-red-400 opacity-80">
                <UserX size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1e1e2d] p-4 rounded-2xl border border-white/5">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder={`Search ${activeTab} by name, ID or ${activeTab === "student" ? "roll" : "subject"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-red-500/50"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {activeTab === "student" ? (
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 focus:outline-none focus:border-red-500/50 flex-1"
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
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 focus:outline-none focus:border-red-500/50 flex-1"
              >
                {departmentList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-red-500/50 transition-all"
            >
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/5 bg-[#232333]">
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
              <tbody className="divide-y divide-white/5">
                {(activeTab === "student" ? filteredStudents : filteredTeachers).map((person) => (
                  <tr
                    key={person.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#2a2a40] to-[#1a1a27] border border-white/10 flex items-center justify-center text-red-500 font-bold text-sm shadow-inner group-hover:border-red-500/30 transition-all">
                          {person.image}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                            {person.name}
                          </p>
                          <p className="text-[10px] text-gray-600 font-medium tracking-wider">
                            {person.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    {activeTab === "student" && isStudent(person) ? (
                      <>
                        <td className="px-6 py-5">
                          <div className="text-xs">
                            <p className="text-gray-300 font-bold">
                              {person.class}
                            </p>
                            <p className="text-gray-500 text-[10px]">
                              Roll: {person.roll}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="w-32">
                            <div className="flex justify-between mb-1">
                              <span className="text-[10px] font-bold text-gray-500">
                                {person.attendanceRate}%
                              </span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  person.attendanceRate > 90
                                    ? "bg-emerald-500"
                                    : person.attendanceRate > 75
                                      ? "bg-orange-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${person.attendanceRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </>
                    ) : activeTab === "teacher" && isTeacher(person) ? (
                      <>
                        <td className="px-6 py-5">
                          <p className="text-xs text-gray-300 font-bold">
                            {person.subject}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-xs text-gray-400">
                            {person.department}
                          </p>
                        </td>
                      </>
                    ) : null}
                    
                    <td className="px-6 py-5">
                      <span
                        className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md border ${
                          person.status === "Present"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : person.status === "Absent"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        }`}
                      >
                        {person.status}
                      </span>
                    </td>
                    
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            if (activeTab === "student") {
                              updateStudentStatus(person.id, "Present");
                            } else {
                              updateTeacherStatus(person.id, "Present");
                            }
                          }}
                          className={`p-1.5 rounded-lg transition-all ${
                            person.status === "Present"
                              ? "bg-emerald-500 text-white"
                              : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                          } shadow-lg hover:shadow-emerald-500/20`}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (activeTab === "student") {
                              updateStudentStatus(person.id, "Absent");
                            } else {
                              updateTeacherStatus(person.id, "Absent");
                            }
                          }}
                          className={`p-1.5 rounded-lg transition-all ${
                            person.status === "Absent"
                              ? "bg-red-500 text-white"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                              
                          } shadow-lg hover:shadow-red-500/20`}
                        >
                          <X size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (activeTab === "student") {
                              updateStudentStatus(person.id, "Late");
                            } else {
                              updateTeacherStatus(person.id, "Late");
                            }
                          }}
                          className={`p-1.5 rounded-lg transition-all ${
                            person.status === "Late"
                              ? "bg-orange-500 text-white"
                              : "bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white"
                          } shadow-lg hover:shadow-orange-500/20`}
                        >
                          <Minus size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}