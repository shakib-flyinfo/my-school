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
  
  return (
    <div className="p-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Admission <span className="text-red-500">Center</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage new student applications and enrollment process.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative group flex-1 lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50"
              />
            </div>
            <button  onClick={() => router.push("/dashboard/students/admission/new")}
              className="flex items-center gap-2 bg-linear-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
              >
              <UserPlus size={16} />
              New Application
            </button>
          </div>
        </div>

        {/* Admission Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Applied",
              val: "156",
              icon: <FileText size={18} />,
              color: "text-blue-400",
            },
            {
              label: "Pending Review",
              val: "42",
              icon: <Clock size={18} />,
              color: "text-orange-400",
            },
            {
              label: "Confirmed",
              val: "98",
              icon: <CheckCircle size={18} />,
              color: "text-emerald-400",
            },
            {
              label: "Rejected",
              val: "16",
              icon: <XCircle size={18} />,
              color: "text-red-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#1e1e2d] p-5 rounded-2xl border border-white/5 shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  +12%
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white">{stat.val}</h4>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Applicants List */}
        <div className="bg-[#1e1e2d] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#232333]">
            <h3 className="font-bold text-white">Recent Applications</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all">
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-widest text-gray-500 border-b border-white/5">
                  <th className="px-8 py-4 font-bold">Applicant Details</th>
                  <th className="px-6 py-4 font-bold">Applied For</th>
                  <th className="px-6 py-4 font-bold">Date Applied</th>
                  <th className="px-6 py-4 font-bold">Payment</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-8 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applicants.map((app) => (
                  <tr
                    key={app.id}
                    className="group hover:bg-white/0.02 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {app.image}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                            {app.name}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                            {app.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-medium text-gray-400">
                        {app.class}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-gray-500">{app.date}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <CreditCard
                          size={14}
                          className={
                            app.payment === "Paid"
                              ? "text-emerald-500"
                              : "text-gray-600"
                          }
                        />
                        <span
                          className={`text-[11px] font-bold ${app.payment === "Paid" ? "text-emerald-500" : "text-gray-500"}`}
                        >
                          {app.payment}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                          app.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : app.status === "Pending"
                              ? "bg-orange-500/10 text-orange-500"
                              : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-lg transition-all">
                          <ArrowUpRight size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#232333] border-t border-white/5 flex justify-center">
            <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest">
              View All Applications <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
