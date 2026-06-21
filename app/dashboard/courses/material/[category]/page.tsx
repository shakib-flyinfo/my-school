"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

export default function CategoryMaterialsPage() {
  const params = useParams();
  const router = useRouter();
  const { colors, theme } = useTheme();

  // URL থেকে ক্যাটাগরি স্লাগ ফরম্যাট করা (যেমন: lecture-notes -> Lecture Notes)
  const categoryName =
    typeof params.category === "string"
      ? params.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Folder";

  return (
    <div 
      className="p-8 font-sans min-h-screen transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/dashboard/courses/material")}
          className="flex items-center gap-2 text-xs font-bold uppercase transition-colors cursor-pointer"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
        >
          <ArrowLeft size={14} /> Back to Explorer
        </button>

        <div 
          className="flex items-center gap-3 border p-6 rounded-2xl transition-colors"
          style={{
            backgroundColor: colors.card,
            borderColor: colors.border,
          }}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: colors.primary + '20',
              color: colors.primary,
            }}
          >
            <FolderOpen size={24} />
          </div>
          <div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              {categoryName}
            </h2>
            <p 
              className="text-xs"
              style={{ color: colors.textSecondary }}
            >
              Viewing filtered items in this directory.
            </p>
          </div>
        </div>

        {/* এখানে নির্দিষ্ট ক্যাটাগরির ফাইল ফিল্টার করে লিস্ট দেখাতে পারেন */}
        <div 
          className="text-center py-20 border border-dashed rounded-3xl transition-colors"
          style={{
            color: colors.textSecondary,
            borderColor: colors.border,
          }}
        >
          No files found in {categoryName} yet.
        </div>
      </div>
    </div>
  );
}