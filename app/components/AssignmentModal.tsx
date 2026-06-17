"use client";
import React from "react";
import { X, Calendar, Users, BarChart3, AlertCircle } from "lucide-react";

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

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentsList: Assignment[];
}

export default function AssignmentModal({ isOpen, onClose, assignmentsList }: AssignmentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#1e1e2d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-[#232333] border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">All Assignments Analytics</h3>
            <p className="text-gray-500 text-xs mt-0.5">Detailed view of performance and schedules.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {assignmentsList.map((task) => {
            const progress = Math.round((task.submissions / task.totalStudents) * 100);
            return (
              <div key={task.id} className="p-5 bg-[#232333] border border-white/5 rounded-2xl space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {task.course}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{task.title}</h4>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                    task.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    {task.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-gray-400 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-600" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-gray-600" />
                    <span>{task.submissions}/{task.totalStudents} Turned In</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <AlertCircle size={14} className="text-gray-600" />
                    <span>Priority: <strong className="text-white">{task.priority}</strong></span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-red-500 to-orange-500" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-[10px] text-right font-bold text-gray-500">{progress}% Completed</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1a1a26] border-t border-white/5 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 rounded-xl transition-all">
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}