"use client";
import React from "react";
import {
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/components/ThemeProvider";

const applicants = [
  {
    id: "ADM-2026-001",
    name: "Sakib Ahmed",
    class: "Grade 10",
    date: "May 03, 2026",
    status: "Approved",
    payment: "Paid",
    image: "S",
  },
  {
    id: "ADM-2026-002",
    name: "Nusrat Jahan",
    class: "Grade 08",
    date: "May 02, 2026",
    status: "Pending",
    payment: "Unpaid",
    image: "N",
  },
  {
    id: "ADM-2026-003",
    name: "Tanvir Hossain",
    class: "Grade 09",
    date: "May 01, 2026",
    status: "Reviewing",
    payment: "Paid",
    image: "T",
  },
];

export default function AdmissionPage() {
  const router = useRouter();
  const { colors, theme } = useTheme();

  // Get status color based on theme
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      "Approved": {
        bg: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.15)',
        text: '#10b981',
      },
      "Pending": {
        bg: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.15)',
        text: '#f59e0b',
      },
      "Reviewing": {
        bg: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)',
        text: '#3b82f6',
      },
    };
    return statusMap[status] || statusMap["Pending"];
  };

  // Stats data with theme colors
  const stats = [
    {
      label: "Total Applied",
      val: "156",
      icon: <FileText size={18} />,
      color: colors.primary,
    },
    {
      label: "Pending Review",
      val: "42",
      icon: <Clock size={18} />,
      color: colors.secondary,
    },
    {
      label: "Confirmed",
      val: "98",
      icon: <CheckCircle size={18} />,
      color: '#10b981',
    },
    {
      label: "Rejected",
      val: "16",
      icon: <XCircle size={18} />,
      color: '#ef4444',
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              Admission{" "}
              <span style={{ color: colors.primary }}>Center</span>
            </h2>
            <p 
              className="text-sm mt-1"
              style={{ color: colors.textSecondary }}
            >
              Manage new student applications and enrollment process.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group flex-1 lg:w-72">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" 
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              />
              <input
                type="text"
                placeholder="Search by name or ID..."
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
            <button
              onClick={() => router.push("/dashboard/students/admission/new")}
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
              <UserPlus size={16} />
              New Application
            </button>
          </div>
        </div>

        {/* Admission Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border shadow-lg transition-colors"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div 
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <span 
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: '#10b981' + '20',
                    color: '#10b981',
                  }}
                >
                  +12%
                </span>
              </div>
              <h4 
                className="text-2xl font-bold"
                style={{ color: colors.text }}
              >
                {stat.val}
              </h4>
              <p 
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: colors.textSecondary }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Applicants List */}
        <div 
          className="border rounded-3xl overflow-hidden transition-colors"
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
              Recent Applications
            </h3>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  color: colors.textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.text;
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textSecondary;
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                }}
              >
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr 
                  className="text-[11px] uppercase tracking-widest border-b"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.border,
                  }}
                >
                  <th className="px-8 py-4 font-bold">Applicant Details</th>
                  <th className="px-6 py-4 font-bold">Applied For</th>
                  <th className="px-6 py-4 font-bold">Date Applied</th>
                  <th className="px-6 py-4 font-bold">Payment</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.border }}>
                {applicants.map((app) => {
                  const statusColor = getStatusColor(app.status);
                  return (
                    <tr
                      key={app.id}
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
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{
                              background: `linear-gradient(to top right, ${colors.primary}, ${colors.secondary})`,
                            }}
                          >
                            {app.image}
                          </div>
                          <div>
                            <p 
                              className="text-sm font-bold transition-colors"
                              style={{ color: colors.text }}
                              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                              onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                            >
                              {app.name}
                            </p>
                            <p 
                              className="text-[10px] uppercase tracking-tighter"
                              style={{ color: colors.textSecondary }}
                            >
                              {app.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span 
                          className="text-xs font-medium"
                          style={{ color: colors.textSecondary }}
                        >
                          {app.class}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span 
                          className="text-xs"
                          style={{ color: colors.textSecondary }}
                        >
                          {app.date}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <CreditCard
                            size={14}
                            style={{
                              color: app.payment === "Paid" ? '#10b981' : colors.textSecondary + '60',
                            }}
                          />
                          <span
                            className="text-[11px] font-bold"
                            style={{
                              color: app.payment === "Paid" ? '#10b981' : colors.textSecondary,
                            }}
                          >
                            {app.payment}
                          </span>
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
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            className="p-2 rounded-lg transition-all"
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
                            <ArrowUpRight size={16} />
                          </button>
                          <button 
                            className="p-2 transition-colors"
                            style={{ color: colors.textSecondary + '60' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
                            onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary + '60'}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div 
            className="p-4 border-t flex justify-center"
            style={{
              borderColor: colors.border,
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
            }}
          >
            <button 
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
              style={{ color: colors.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.text;
                e.currentTarget.style.gap = '12px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textSecondary;
                e.currentTarget.style.gap = '8px';
              }}
            >
              View All Applications <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}