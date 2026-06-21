"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

export default function UploadMaterialPage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [title, setTitle] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Resource uploaded successfully!");
    router.push("/dashboard/courses/material");
  };

  return (
    <div 
      className="p-8 font-sans min-h-screen flex items-center justify-center transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div 
        className="w-full max-w-xl border rounded-3xl p-8 space-y-6 shadow-2xl transition-colors"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <button
          onClick={() => router.push("/dashboard/courses/material")}
          className="flex items-center gap-2 text-xs font-bold uppercase transition-colors cursor-pointer"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
        >
          <ArrowLeft size={14} /> Back to Explorer
        </button>

        <h2 
          className="text-2xl font-bold"
          style={{ color: colors.text }}
        >
          Upload New Material
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <label 
              className="text-xs font-bold uppercase block"
              style={{ color: colors.textSecondary }}
            >
              Material Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Quantum Mechanics Chapter 3"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary + '80'}
              onBlur={(e) => e.target.style.borderColor = colors.border}
            />
          </div>

          <div 
            className="border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer flex flex-col items-center gap-3"
            style={{
              borderColor: colors.border,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary + '60';
              e.currentTarget.style.backgroundColor = colors.primary + '10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <UploadCloud 
              size={40} 
              style={{ color: colors.textSecondary }}
            />
            <p 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Click or drag files here to upload
            </p>
            <span 
              className="text-xs"
              style={{ color: colors.textSecondary + '80' }}
            >
              Supports PDF, MP4, DOCX, ZIP up to 50MB
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-bold rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
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
            Publish Resource
          </button>
        </form>
      </div>
    </div>
  );
}