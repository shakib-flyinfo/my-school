"use client";
import React, { useState, useRef } from "react";
import {
  FileBadge,
  Download,
  Printer,
  Share2,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Eye,
} from "lucide-react";
import ResultDownloadModal from "@/app/components/ResultDownloadModal";
import { useTheme } from "@/app/components/ThemeProvider";


const marks = [
  {
    subject: "Advanced Mathematics",
    code: "MATH-401",
    total: 100,
    obtained: 88,
    grade: "A+",
    gp: 5.0,
  },
  {
    subject: "General Science",
    code: "SCI-202",
    total: 100,
    obtained: 82,
    grade: "A+",
    gp: 5.0,
  },
  {
    subject: "Communicative English",
    code: "ENG-105",
    total: 100,
    obtained: 75,
    grade: "A",
    gp: 4.0,
  },
  {
    subject: "Computer Science & ICT",
    code: "ICT-301",
    total: 100,
    obtained: 92,
    grade: "A+",
    gp: 5.0,
  },
  {
    subject: "Fine Arts & Music",
    code: "ART-102",
    total: 50,
    obtained: 42,
    grade: "A+",
    gp: 5.0,
  },
];

export default function MarksheetPage() {
  const { colors, theme } = useTheme();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const totalMarks = marks.reduce((sum, m) => sum + m.obtained, 0);
  const totalFullMarks = marks.reduce((sum, m) => sum + m.total, 0);
  const percentage = ((totalMarks / totalFullMarks) * 100).toFixed(2);
  const gpa = "4.80";

  const resultData = {
    student: {
      name: "Sakib Ahmed",
      id: "STU-2026-1044",
      class: "Grade 10 (A)",
    },
    gpa: gpa,
    percentage: percentage,
    totalMarks: totalMarks,
    totalFullMarks: totalFullMarks,
    marks: marks,
    examType: "Final Term Examination - 2026",
    date: new Date().toLocaleDateString(),
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generatePrintHTML());
      printWindow.document.close();
      printWindow.print();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${resultData.student.name} - Marksheet`,
      text: `${resultData.student.name} scored GPA ${resultData.gpa} in Final Term Examination 2026`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback - copy to clipboard
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const generatePrintHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Marksheet - ${resultData.student.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: white; }
          .container { max-width: 1000px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid ${colors.primary}; padding-bottom: 20px; }
          .header h1 { color: ${colors.primary}; margin-bottom: 5px; }
          .student-info { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
          .info-row { display: flex; margin-bottom: 8px; }
          .label { font-weight: bold; width: 120px; }
          .gpa-box { background: ${colors.primary}; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
          .gpa-box h2 { font-size: 48px; margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f3f4f6; }
          .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Academic Marksheet</h1>
            <p>${resultData.examType}</p>
          </div>
          <div class="student-info">
            <div class="info-row"><div class="label">Student Name:</div><div>${resultData.student.name}</div></div>
            <div class="info-row"><div class="label">Student ID:</div><div>${resultData.student.id}</div></div>
            <div class="info-row"><div class="label">Class:</div><div>${resultData.student.class}</div></div>
          </div>
          <div class="gpa-box">
            <p>Cumulative GPA</p>
            <h2>${resultData.gpa}</h2>
            <p>Out of 5.00</p>
          </div>
          <table>
            <thead><tr><th>Subject</th><th>Code</th><th>Full Marks</th><th>Obtained</th><th>Grade</th><th>GP</th></tr></thead>
            <tbody>
              ${resultData.marks.map((mark: any) => `
                <tr>
                  <td>${mark.subject}</td>
                  <td>${mark.code}</td>
                  <td>${mark.total}</td>
                  <td>${mark.obtained}</td>
                  <td>${mark.grade}</td>
                  <td>${mark.gp.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>School Management System</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right-5">
            <div 
              className="backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
              style={{ backgroundColor: '#10b981' + 'E6' }}
            >
              <CheckCircle2 size={24} />
              <div>
                <p className="font-bold">Success!</p>
                <p className="text-sm opacity-90">Operation completed successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 
              className="text-3xl font-black tracking-tight"
              style={{ color: colors.text }}
            >
              Academic <span style={{ color: colors.primary }}>Marksheet</span>
            </h2>
            <p style={{ color: colors.textSecondary }}>
              Final Term Examination - 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="p-2.5 border rounded-xl transition-all cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                borderColor: colors.border,
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
              title="Print"
            >
              <Printer size={18} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2.5 border rounded-xl transition-all cursor-pointer"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                borderColor: colors.border,
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
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all ml-2 cursor-pointer"
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
              <Download size={16} /> Download Result
            </button>
          </div>
        </div>

        {/* Student Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="md:col-span-2 border rounded-3xl p-6 flex items-center gap-6 shadow-xl transition-colors"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <div 
              className="w-20 h-20 rounded-2xl p-0.5 shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <div 
                className="w-full h-full rounded-[0.9rem] flex items-center justify-center text-2xl font-black"
                style={{
                  backgroundColor: theme === 'dark' ? '#1a1a27' : '#f0f0f0',
                  color: colors.text,
                }}
              >
                SA
              </div>
            </div>
            <div>
              <h3 
                className="text-xl font-bold"
                style={{ color: colors.text }}
              >
                Sakib Ahmed
              </h3>
              <p 
                className="text-xs font-medium"
                style={{ color: colors.textSecondary }}
              >
                ID: STU-2026-1044 • Class: Grade 10 (A)
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div 
                  className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: '#10b981' + '20',
                    color: '#10b981',
                  }}
                >
                  <CheckCircle2 size={12} /> PASSED
                </div>
                <div 
                  className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: '#3b82f6' + '20',
                    color: '#3b82f6',
                  }}
                >
                  <Award size={12} /> TOP 5%
                </div>
                <div 
                  className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: colors.secondary + '20',
                    color: colors.secondary,
                  }}
                >
                  <TrendingUp size={12} /> {percentage}% Score
                </div>
              </div>
            </div>
          </div>

          <div 
            className="rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl"
            style={{
              background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 20px 30px -5px ${colors.primary}30`,
            }}
          >
            <p 
              className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1"
            >
              Cumulative GPA
            </p>
            <h4 className="text-5xl font-black text-white">{gpa}</h4>
            <div 
              className="mt-2 px-3 py-1 rounded-full text-white text-[10px] font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              Excellent Performance
            </div>
          </div>
        </div>

        {/* Detailed Marksheet Table */}
        <div 
          className="border rounded-3xl overflow-hidden shadow-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="p-6 border-b flex justify-between items-center flex-wrap gap-3"
            style={{
              borderColor: colors.border,
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
            }}
          >
            <h3 
              className="font-bold flex items-center gap-2"
              style={{ color: colors.text }}
            >
              <FileBadge size={18} style={{ color: colors.primary }} /> Subject-wise Performance
            </h3>
            <span 
              className="text-[10px] font-bold uppercase"
              style={{ color: colors.textSecondary }}
            >
              Session: 2025-26
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr 
                  className="text-[10px] uppercase tracking-[0.2em] border-b"
                  style={{
                    color: colors.textSecondary,
                    borderColor: colors.border,
                  }}
                >
                  <th className="px-8 py-4 font-bold">Subject & Code</th>
                  <th className="px-6 py-4 font-bold text-center">Full Marks</th>
                  <th className="px-6 py-4 font-bold text-center">Obtained</th>
                  <th className="px-6 py-4 font-bold text-center">Grade</th>
                  <th className="px-6 py-4 font-bold text-center">GP</th>
                  <th className="px-8 py-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: colors.border }}>
                {marks.map((row, i) => (
                  <tr 
                    key={i} 
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
                      <div>
                        <p 
                          className="text-sm font-bold transition-colors"
                          style={{ color: colors.text }}
                          onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                          onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                        >
                          {row.subject}
                        </p>
                        <p 
                          className="text-[10px] font-medium tracking-wider"
                          style={{ color: colors.textSecondary + '80' }}
                        >
                          {row.code}
                        </p>
                      </div>
                    </td>
                    <td 
                      className="px-6 py-5 text-center text-xs font-bold"
                      style={{ color: colors.textSecondary }}
                    >
                      {row.total}
                    </td>
                    <td 
                      className="px-6 py-5 text-center text-sm font-black"
                      style={{ color: colors.text }}
                    >
                      {row.obtained}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span 
                        className={`text-[11px] font-black w-8 h-8 inline-flex items-center justify-center rounded-lg border`}
                        style={
                          row.grade === "A+"
                            ? {
                                backgroundColor: '#10b981' + '20',
                                color: '#10b981',
                                borderColor: '#10b981' + '40',
                              }
                            : {
                                backgroundColor: '#3b82f6' + '20',
                                color: '#3b82f6',
                                borderColor: '#3b82f6' + '40',
                              }
                        }
                      >
                        {row.grade}
                      </span>
                    </td>
                    <td 
                      className="px-6 py-5 text-center text-xs font-bold"
                      style={{ color: colors.textSecondary }}
                    >
                      {row.gp.toFixed(2)}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div 
                        className="flex items-center justify-end gap-1.5 font-bold text-[10px]"
                        style={{ color: '#10b981' }}
                      >
                        <CheckCircle2 size={14} /> Passed
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Summary */}
          <div 
            className="p-6 border-t"
            style={{
              borderColor: colors.border,
              backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div 
                className="flex items-center gap-2 text-xs italic"
                style={{ color: colors.textSecondary }}
              >
                <AlertCircle size={14} />
                Result calculated based on written, oral and practical exams.
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p 
                    className="text-[10px] font-bold uppercase tracking-tighter"
                    style={{ color: colors.textSecondary + '80' }}
                  >
                    Total Marks
                  </p>
                  <p 
                    className="text-lg font-black"
                    style={{ color: colors.text }}
                  >
                    {totalMarks} / {totalFullMarks}
                  </p>
                  <p 
                    className="text-[10px] font-bold"
                    style={{ color: '#10b981' }}
                  >
                    {percentage}%
                  </p>
                </div>
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    color: colors.primary,
                  }}
                >
                  <TrendingUp size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <ResultDownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        resultData={resultData}
      />
    </div>
  );
}