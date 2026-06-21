"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AssignmentModal from "@/app/components/AssignmentModal";
import {
  ClipboardList,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  submissions: number;
  totalStudents: number;
  priority: string;
}

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Advanced Algebra Quiz",
    course: "Mathematics",
    dueDate: "2026-05-15",
    status: "Active",
    submissions: 85,
    totalStudents: 120,
    priority: "High",
  },
  {
    id: 2,
    title: "Physics Lab Report",
    course: "General Science",
    dueDate: "2026-05-12",
    status: "Pending",
    submissions: 40,
    totalStudents: 85,
    priority: "Medium",
  },
  {
    id: 3,
    title: "English Essay: Global Warming",
    course: "Communicative English",
    dueDate: "2026-05-20",
    status: "Active",
    submissions: 150,
    totalStudents: 200,
    priority: "Low",
  },
];

export default function AssignmentsPage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  // LocalStorage থেকে ডাটা লোড করা
  useEffect(() => {
    const saved = localStorage.getItem("dashboard_assignments");
    if (saved) {
      setAssignments(JSON.parse(saved));
    } else {
      localStorage.setItem(
        "dashboard_assignments",
        JSON.stringify(initialAssignments),
      );
      setAssignments(initialAssignments);
    }
  }, []);

  // Get status color based on theme
  const getStatusColor = (status: string) => {
    if (status === "Active") {
      return {
        bg: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)',
        text: '#10b981',
      };
    }
    return {
      bg: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)',
      text: '#f59e0b',
    };
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return colors.primary;
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return colors.textSecondary;
    }
  };

  // Stats data with theme colors
  const stats = [
    {
      label: "Total Assignments",
      val: assignments.length.toString().padStart(2, "0"),
      icon: <ClipboardList />,
      color: colors.primary,
    },
    {
      label: "Pending Reviews",
      val: "08",
      icon: <Clock />,
      color: colors.secondary,
    },
    {
      label: "Completed",
      val: "112",
      icon: <CheckCircle2 />,
      color: '#10b981',
    },
  ];

  return (
    <div 
      className="p-8 font-sans transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Assignments{" "}
              <span style={{ color: colors.primary }}>Overview</span>
            </h2>
            <p 
              className="text-sm mt-1"
              style={{ color: colors.textSecondary }}
            >
              Manage and track student submissions efficiently.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors group-focus-within:text-red-500" 
                style={{ color: colors.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>

            <button
              onClick={() => router.push("/dashboard/courses/assignments/new")}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
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
              <Plus className="w-4 h-4" />
              New Assignment
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border flex items-center gap-4 transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div 
                className="p-3 rounded-xl transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: colors.textSecondary }}
                >
                  {stat.label}
                </p>
                <h4 
                  className="text-2xl font-bold"
                  style={{ color: colors.text }}
                >
                  {stat.val}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Assignments Table/List */}
        <div 
          className="border rounded-3xl overflow-hidden shadow-xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="p-6 border-b flex justify-between items-center"
            style={{
              borderColor: colors.border,
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
            }}
          >
            <h3 
              className="font-bold"
              style={{ color: colors.text }}
            >
              Recent Assignments
            </h3>
            <button
              onClick={() => setIsViewAllOpen(true)}
              className="text-xs font-bold hover:underline cursor-pointer transition-colors"
              style={{ color: colors.primary }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr 
                  className="text-[11px] uppercase tracking-widest border-b"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.border,
                  }}
                >
                  <th className="px-8 py-4 font-bold">Assignment Name</th>
                  <th className="px-6 py-4 font-bold">Course</th>
                  <th className="px-6 py-4 font-bold">Due Date</th>
                  <th className="px-6 py-4 font-bold">Progress</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.border }}>
                {assignments.map((task) => {
                  const progress = Math.round(
                    (task.submissions / task.totalStudents) * 100,
                  );
                  const statusColor = getStatusColor(task.status);
                  const priorityColor = getPriorityColor(task.priority);
                  
                  return (
                    <tr
                      key={task.id}
                      className="group transition-colors"
                      style={{ 
                        borderColor: colors.border,
                        backgroundColor: 'transparent'
                      }}
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
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: colors.primary + '20',
                              color: colors.primary,
                            }}
                          >
                            <ClipboardList size={20} />
                          </div>
                          <div>
                            <p 
                              className="text-sm font-bold transition-colors"
                              style={{ color: colors.text }}
                              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                              onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                            >
                              {task.title}
                            </p>
                            <p 
                              className="text-[10px] flex items-center gap-1"
                              style={{ color: colors.textSecondary }}
                            >
                              <AlertCircle size={10} style={{ color: priorityColor }} /> 
                              {task.priority} Priority
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span 
                          className="text-xs font-medium px-3 py-1 rounded-full border transition-colors"
                          style={{
                            color: colors.textSecondary,
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            borderColor: colors.border,
                          }}
                        >
                          {task.course}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div 
                          className="flex items-center gap-2 text-xs"
                          style={{ color: colors.textSecondary }}
                        >
                          <Calendar size={14} style={{ color: colors.textSecondary + '60' }} />
                          {task.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-5 w-48">
                        <div className="space-y-1.5">
                          <div 
                            className="flex justify-between text-[10px] font-bold"
                            style={{ color: colors.textSecondary }}
                          >
                            <span>{progress}%</span>
                            <span>
                              {task.submissions}/{task.totalStudents}
                            </span>
                          </div>
                          <div 
                            className="w-full h-1.5 rounded-full overflow-hidden"
                            style={{
                              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            }}
                          >
                            <div
                              className="h-full transition-all duration-1000"
                              style={{
                                width: `${progress}%`,
                                background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md"
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          className="p-2 rounded-lg transition-all"
                          style={{ 
                            color: colors.textSecondary,
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                            e.currentTarget.style.color = colors.text;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.textSecondary;
                          }}
                        >
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AssignmentModal
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        assignmentsList={assignments}
      />
    </div>
  );
}