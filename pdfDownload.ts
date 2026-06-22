export interface Exam {
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

export const downloadExamSchedulePDF = (exams: Exam[], title: string = "Exam Schedule") => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f5f5f5;
          padding: 40px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
          color: white;
          padding: 40px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .header p {
          opacity: 0.9;
          font-size: 14px;
        }
        
        .info-box {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px 20px;
          margin: 20px;
          border-radius: 10px;
        }
        
        .info-box p {
          color: #92400e;
          font-size: 13px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px;
          width: calc(100% - 40px);
        }
        
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        th {
          background: #f9fafb;
          color: #374151;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        td {
          color: #4b5563;
          font-size: 14px;
        }
        
        .badge {
          display: inline-block;
          padding: 4px 10px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
        
        .footer {
          background: #f9fafb;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          border-top: 1px solid #e5e7eb;
        }
        
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .header {
            background: #dc2626;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 ${title}</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="info-box">
          <p>⚠️ <strong>Important:</strong> Students must bring their admit cards and arrive 30 minutes before the exam starts.</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Code</th>
              <th>Date</th>
              <th>Time</th>
              <th>Room</th>
              <th>Teacher</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            ${exams.map(exam => `
              <tr>
                <td><strong>${exam.subject}</strong></td>
                <td>${exam.code}</td>
                <td>${formatDate(exam.date)}</td>
                <td>${exam.time}</td>
                <td>${exam.room}</td>
                <td>${exam.teacher}</td>
                <td><span class="badge">${exam.type}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer">
          <p>School Management System | Academic Year 2026</p>
          <p>This is a computer-generated document. No signature is required.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s/g, "_")}_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};