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

  return (
    <div className="p-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Assignments <span className="text-red-500">Overview</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage and track student submissions efficiently.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
              />
            </div>

            <button
              onClick={() => router.push("/dashboard/courses/assignments/new")}
              className="flex items-center gap-2 bg-linear-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Assignment
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: "Total Assignments",
              val: assignments.length.toString().padStart(2, "0"),
              icon: <ClipboardList />,
              color: "text-blue-400",
            },
            {
              label: "Pending Reviews",
              val: "08",
              icon: <Clock />,
              color: "text-orange-400",
            },
            {
              label: "Completed",
              val: "112",
              icon: <CheckCircle2 />,
              color: "text-emerald-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#1e1e2d] p-5 rounded-2xl border border-white/5 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
                <h4 className="text-2xl font-bold text-white">{stat.val}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Assignments Table/List */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#232333]">
            <h3 className="font-bold text-white">Recent Assignments</h3>
            <button
              onClick={() => setIsViewAllOpen(true)}
              className="text-xs text-red-400 font-bold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] uppercase tracking-widest text-gray-500 border-b border-white/5">
                  <th className="px-8 py-4 font-bold">Assignment Name</th>
                  <th className="px-6 py-4 font-bold">Course</th>
                  <th className="px-6 py-4 font-bold">Due Date</th>
                  <th className="px-6 py-4 font-bold">Progress</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assignments.map((task) => {
                  const progress = Math.round(
                    (task.submissions / task.totalStudents) * 100,
                  );
                  return (
                    <tr
                      key={task.id}
                      className="group hover:bg-white/0.02 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                            <ClipboardList size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                              {task.title}
                            </p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                              <AlertCircle size={10} /> {task.priority} Priority
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                          {task.course}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar size={14} className="text-gray-600" />
                          {task.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-5 w-48">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-gray-500">
                            <span>{progress}%</span>
                            <span>
                              {task.submissions}/{task.totalStudents}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-red-500 to-orange-500 transition-all duration-1000"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                            task.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
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
