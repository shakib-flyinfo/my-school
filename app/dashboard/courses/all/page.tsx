"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CourseModuleModal from "@/app/components/CourseModuleModal";
import {
  BookOpen,
  Code,
  Microscope,
  Languages,
  Music,
  Sparkles,
  ArrowRight,
  Users,
  Clock,
  LayoutGrid,
  Search,
  Filter,
  Plus,
} from "lucide-react";

interface Course {
  id: number;
  name: string;
  category: string;
  students: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
}

const courses: Course[] = [
  {
    id: 1,
    name: "Advanced Mathematics",
    category: "Science",
    students: "120+",
    duration: "10 Months",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    accent: "text-red-500",
  },
  {
    id: 2,
    name: "General Science",
    category: "Science",
    students: "85+",
    duration: "12 Months",
    icon: <Microscope className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    accent: "text-blue-500",
  },
  {
    id: 3,
    name: "Communicative English",
    category: "Language",
    students: "200+",
    duration: "8 Months",
    icon: <Languages className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    accent: "text-purple-500",
  },
  {
    id: 4,
    name: "Computer Science & ICT",
    category: "Technology",
    students: "150+",
    duration: "6 Months",
    icon: <Code className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    accent: "text-cyan-500",
  },
  {
    id: 5,
    name: "Fine Arts & Music",
    category: "Creative",
    students: "45+",
    duration: "4 Months",
    icon: <Music className="w-6 h-6" />,
    color: "from-amber-500 to-orange-500",
    accent: "text-amber-500",
  },
];

export default function AllCoursesPage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenModule = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Management</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              School{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400">
                Curriculum
              </span>
            </h2>
            <p className="text-gray-500 text-sm">
              Empowering students through diverse learning paths.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-red-500/50 transition-all"
              />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Filter className="w-5 h-5" />
            </button>
            <button  onClick={() => router.push('/dashboard/courses/all/new')}
              className="flex items-center gap-2 bg-linear-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
              >
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-[#1e1e2d] rounded-3xl p-1 border border-white/5 transition-all duration-500 hover:border-red-500/30 hover:-translate-y-2 shadow-xl"
            >
              <div className="bg-[#232333] rounded-[1.4rem] p-6 h-full">
                {/* Icon & Category */}
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={`p-4 rounded-2xl bg-linear-to-br ${course.color} bg-opacity-10 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <div className="text-white">{course.icon}</div>
                  </div>
                  <div className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-gray-500">
                    {course.category}
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-8">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {course.name}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium text-[11px] uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-red-500/70" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium text-[11px] uppercase tracking-wider">
                      <Users className="w-3.5 h-3.5 text-red-500/70" />
                      {course.students}
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-[#232333] bg-gray-700 overflow-hidden"
                      >
                        <div className="w-full h-full bg-linear-to-br from-gray-600 to-gray-800" />
                      </div>
                    ))}
                  </div>

                  {/* View Module Button with Click Event */}
                  <button
                    onClick={() => handleOpenModule(course)}
                    className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 transition-all group-hover:gap-3"
                  >
                    View Module
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Placeholder Card */}
          <div className="group border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-280px transition-all hover:bg-white/5 hover:border-red-500/40 cursor-pointer">
            <div className="p-5 bg-white/5 rounded-full text-gray-600 group-hover:bg-red-500/10 group-hover:text-red-500 transition-all mb-4">
              <LayoutGrid className="w-8 h-8" />
            </div>
            <p className="font-bold text-gray-500 group-hover:text-white transition-all">
              Create New Course
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Add modules and assignments
            </p>
          </div>
        </div>
      </div>

      {/* Global Module Pop-up Renderer */}
      <CourseModuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
}
