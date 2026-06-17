"use client";
import React, { useState } from "react";
import {
  X,
  Download,
  FileText,
  FileJson,
  Image,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ResultDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultData: any;
}

export default function ResultDownloadModal({ isOpen, onClose, resultData }: ResultDownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState("html");
  const [isDownloading, setIsDownloading] = useState(false);

  const formats = [
    { id: "html", label: "HTML Document", icon: <FileText size={18} />, color: "text-blue-400" },
    { id: "pdf", label: "PDF Document", icon: <FileText size={18} />, color: "text-red-400" },
    { id: "json", label: "JSON Data", icon: <FileJson size={18} />, color: "text-emerald-400" },
    { id: "csv", label: "CSV Format", icon: <FileText size={18} />, color: "text-orange-400" },
  ];

  const generateHTML = () => {
    const totalMarks = resultData.marks.reduce((sum: number, m: any) => sum + m.obtained, 0);
    const totalFullMarks = resultData.marks.reduce((sum: number, m: any) => sum + m.total, 0);
    const percentage = ((totalMarks / totalFullMarks) * 100).toFixed(2);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Student Marksheet - ${resultData.student.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
          }
          .container { max-width: 1000px; margin: 0 auto; }
          .marksheet {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .header {
            background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 { font-size: 28px; margin-bottom: 5px; }
          .header p { opacity: 0.9; }
          .student-info {
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 2px solid #e5e7eb;
          }
          .info-row { display: flex; margin-bottom: 10px; }
          .label { font-weight: bold; width: 120px; color: #555; }
          .value { color: #333; }
          .gpa-box {
            background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 15px;
            margin-top: 20px;
          }
          .gpa-box h3 { font-size: 48px; margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          th { background: #f3f4f6; color: #374151; font-weight: 600; }
          .grade-Aplus { color: #10b981; font-weight: bold; }
          .grade-A { color: #3b82f6; font-weight: bold; }
          .footer {
            padding: 20px;
            text-align: center;
            background: #f8f9fa;
            color: #6b7280;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="marksheet">
            <div class="header">
              <h1>📋 Academic Marksheet</h1>
              <p>Final Term Examination - 2026</p>
            </div>
            <div class="student-info">
              <div class="info-row"><div class="label">Student Name:</div><div class="value">${resultData.student.name}</div></div>
              <div class="info-row"><div class="label">Student ID:</div><div class="value">${resultData.student.id}</div></div>
              <div class="info-row"><div class="label">Class:</div><div class="value">${resultData.student.class}</div></div>
              <div class="info-row"><div class="label">Session:</div><div class="value">2025-26</div></div>
              <div class="gpa-box">
                <p>Cumulative GPA</p>
                <h3>${resultData.gpa}</h3>
                <p>Excellent Performance</p>
              </div>
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
                    <td class="grade-${mark.grade === 'A+' ? 'Aplus' : 'A'}">${mark.grade}</td>
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
        </div>
      </body>
      </html>
    `;
  };

  const generateCSV = () => {
    const headers = ["Subject", "Code", "Full Marks", "Obtained", "Grade", "GP"];
    const rows = resultData.marks.map((mark: any) => [
      mark.subject, mark.code, mark.total, mark.obtained, mark.grade, mark.gp.toFixed(2)
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    return csvContent;
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      let content = "";
      let filename = `${resultData.student.name.replace(/\s/g, "_")}_Marksheet`;
      let mimeType = "";

      switch (selectedFormat) {
        case "html":
          content = generateHTML();
          mimeType = "text/html";
          filename += ".html";
          break;
        case "json":
          content = JSON.stringify(resultData, null, 2);
          mimeType = "application/json";
          filename += ".json";
          break;
        case "csv":
          content = generateCSV();
          mimeType = "text/csv";
          filename += ".csv";
          break;
        case "pdf":
          // For PDF, we'll use the HTML version since browser print can save as PDF
          content = generateHTML();
          mimeType = "text/html";
          filename += ".html";
          break;
        default:
          content = generateHTML();
          mimeType = "text/html";
          filename += ".html";
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        setIsDownloading(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateHTML());
      printWindow.document.close();
      printWindow.print();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e2d] rounded-3xl border border-white/10 max-w-md w-full animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Download Result</h3>
            <p className="text-gray-500 text-sm mt-1">Choose your preferred format</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Format Options */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Select Download Format
          </p>
          <div className="grid grid-cols-2 gap-3">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedFormat === format.id
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className={format.color}>{format.icon}</div>
                <span className="text-sm font-medium text-white">{format.label}</span>
                {selectedFormat === format.id && (
                  <CheckCircle size={16} className="text-red-500 ml-auto" />
                )}
              </button>
            ))}
          </div>

          {/* Info Note */}
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-2">
            <AlertCircle size={16} className="text-blue-400 mt-0.5" />
            <p className="text-[11px] text-blue-300/80">
              PDF format will open in a new window. You can save it using the print dialog.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-sm transition-all cursor-pointer"
          >
            Cancel
          </button>
          {selectedFormat === "pdf" ? (
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Print / Save PDF
            </button>
          ) : (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}