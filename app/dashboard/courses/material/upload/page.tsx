"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud } from "lucide-react";

export default function UploadMaterialPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Resource uploaded successfully!");
    router.push("/dashboard/courses/material");
  };

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#1e1e2d] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
        <button
          onClick={() => router.push("/dashboard/courses/material")}
          className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Explorer
        </button>

        <h2 className="text-2xl font-bold text-white">Upload New Material</h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase block">
              Material Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Quantum Mechanics Chapter 3"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-red-500/40 transition-colors cursor-pointer flex flex-col items-center gap-3">
            <UploadCloud size={40} className="text-gray-500" />
            <p className="text-sm text-gray-400">
              Click or drag files here to upload
            </p>
            <span className="text-xs text-gray-600">
              Supports PDF, MP4, DOCX, ZIP up to 50MB
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
          >
            Publish Resource
          </button>
        </form>
      </div>
    </div>
  );
}
