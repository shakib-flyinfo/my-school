"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderOpen } from "lucide-react";

export default function CategoryMaterialsPage() {
  const params = useParams();
  const router = useRouter();

  // URL থেকে ক্যাটাগরি স্লাগ ফরম্যাট করা (যেমন: lecture-notes -> Lecture Notes)
  const categoryName =
    typeof params.category === "string"
      ? params.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Folder";

  return (
    <div className="p-8 font-sans text-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/dashboard/courses/material")}
          className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Explorer
        </button>

        <div className="flex items-center gap-3 bg-[#1e1e2d] border border-white/5 p-6 rounded-2xl">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
            <FolderOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{categoryName}</h2>
            <p className="text-xs text-gray-500">
              Viewing filtered items in this directory.
            </p>
          </div>
        </div>

        {/* এখানে নির্দিষ্ট ক্যাটাগরির ফাইল ফিল্টার করে লিস্ট দেখাতে পারেন */}
        <div className="text-center py-20 text-gray-600 border border-dashed border-white/5 rounded-3xl">
          No files found in {categoryName} yet.
        </div>
      </div>
    </div>
  );
}
