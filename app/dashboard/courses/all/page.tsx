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
import { useTheme } from "@/app/components/ThemeProvider";

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

// Course data with dynamic color classes
const getCourseColors = (primary: string, secondary: string) => ({
  science: {
    from: `from-[${primary}] to-[${secondary}]`,
    accent: `text-[${primary}]`,
    border: `hover:border-[${primary}]/30`,
    iconBg: `bg-[${primary}]/10`,
  },
  technology: {
    from: "from-cyan-500 to-blue-500",
    accent: "text-cyan-500",
    border: "hover:border-cyan-500/30",
    iconBg: "bg-cyan-500/10",
  },
  language: {
    from: "from-purple-500 to-pink-500",
    accent: "text-purple-500",
    border: "hover:border-purple-500/30",
    iconBg: "bg-purple-500/10",
  },
  creative: {
    from: "from-amber-500 to-orange-500",
    accent: "text-amber-500",
    border: "hover:border-amber-500/30",
    iconBg: "bg-amber-500/10",
  },
});

const courses: Course[] = [
  {
    id: 1,
    name: "Advanced Mathematics",
    category: "Science",
    students: "120+",
    duration: "10 Months",
    icon: <BookOpen className="w-6 h-6" />,
    color: "science",
    accent: "science",
  },
  {
    id: 2,
    name: "General Science",
    category: "Science",
    students: "85+",
    duration: "12 Months",
    icon: <Microscope className="w-6 h-6" />,
    color: "science",
    accent: "science",
  },
  {
    id: 3,
    name: "Communicative English",
    category: "Language",
    students: "200+",
    duration: "8 Months",
    icon: <Languages className="w-6 h-6" />,
    color: "language",
    accent: "language",
  },
  {
    id: 4,
    name: "Computer Science & ICT",
    category: "Technology",
    students: "150+",
    duration: "6 Months",
    icon: <Code className="w-6 h-6" />,
    color: "technology",
    accent: "technology",
  },
  {
    id: 5,
    name: "Fine Arts & Music",
    category: "Creative",
    students: "45+",
    duration: "4 Months",
    icon: <Music className="w-6 h-6" />,
    color: "creative",
    accent: "creative",
  },
];

export default function AllCoursesPage() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleOpenModule = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  // Dynamic styles using theme colors
  const dynamicStyles = {
    primaryGradient: `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}]`,
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    borderColor: colors.border,
    cardBg: colors.card,
    textColor: colors.text,
    textSecondary: colors.textSecondary,
    background: colors.background,
  };

  // Get color scheme for course
  const getCourseStyle = (courseType: string) => {
    const colorMap = {
      science: {
        gradient: `bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}]`,
        text: `text-[${colors.primary}]`,
        border: `hover:border-[${colors.primary}]/30`,
        iconBg: `bg-[${colors.primary}]/10`,
      },
      technology: {
        gradient: "bg-gradient-to-br from-cyan-500 to-blue-500",
        text: "text-cyan-500",
        border: "hover:border-cyan-500/30",
        iconBg: "bg-cyan-500/10",
      },
      language: {
        gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
        text: "text-purple-500",
        border: "hover:border-purple-500/30",
        iconBg: "bg-purple-500/10",
      },
      creative: {
        gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
        text: "text-amber-500",
        border: "hover:border-amber-500/30",
        iconBg: "bg-amber-500/10",
      },
    };
    return colorMap[courseType as keyof typeof colorMap] || colorMap.science;
  };

  return (
    <div 
      className="p-8 font-sans transition-colors duration-300"
      style={{ 
        color: colors.text,
        backgroundColor: colors.background 
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1">
            <div 
              className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-[0.3em]"
              style={{ color: colors.primary }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Management</span>
            </div>
            <h2 
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.text }}
            >
              School{" "}
              <span 
                className="text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
                }}
              >
                Curriculum
              </span>
            </h2>
            <p 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              Empowering students through diverse learning paths.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72 group">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors group-focus-within:text-red-500" 
                style={{ color: colors.textSecondary }}
              />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all focus:outline-none"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
                onFocus={(e) => e.target.style.borderColor = colors.primary}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>
            <button 
              className="p-2.5 rounded-xl transition-all"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${colors.border}`,
                color: colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.text;
                e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.textSecondary;
                e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
              }}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push('/dashboard/courses/all/new')}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 cursor-pointer"
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
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => {
            const style = getCourseStyle(course.color);
            return (
              <div
                key={course.id}
                className="group relative rounded-3xl p-1 border transition-all duration-500 hover:-translate-y-2 shadow-xl"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary + '40';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                }}
              >
                <div 
                  className="rounded-[1.4rem] p-6 h-full"
                  style={{
                    backgroundColor: theme === 'dark' ? '#232333' : '#e8e8e8',
                  }}
                >
                  {/* Icon & Category */}
                  <div className="flex justify-between items-start mb-8">
                    <div
                      className={`p-4 rounded-2xl shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500 ${style.gradient}`}
                    >
                      <div className="text-white">{course.icon}</div>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.textSecondary,
                      }}
                    >
                      {course.category}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3 mb-8">
                    <h3 
                      className="text-xl font-bold transition-colors"
                      style={{ color: colors.text }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.text}
                    >
                      {course.name}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div 
                        className="flex items-center gap-1.5 font-medium text-[11px] uppercase tracking-wider"
                        style={{ color: colors.textSecondary }}
                      >
                        <Clock className="w-3.5 h-3.5" style={{ color: colors.primary + '70' }} />
                        {course.duration}
                      </div>
                      <div 
                        className="flex items-center gap-1.5 font-medium text-[11px] uppercase tracking-wider"
                        style={{ color: colors.textSecondary }}
                      >
                        <Users className="w-3.5 h-3.5" style={{ color: colors.primary + '70' }} />
                        {course.students}
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${colors.border}` }}>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 overflow-hidden"
                          style={{
                            borderColor: colors.card,
                            backgroundColor: theme === 'dark' ? '#374151' : '#d1d5db',
                          }}
                        >
                          <div 
                            className="w-full h-full"
                            style={{
                              background: `linear-gradient(to bottom right, ${theme === 'dark' ? '#4b5563' : '#9ca3af'}, ${theme === 'dark' ? '#1f2937' : '#6b7280'})`
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenModule(course)}
                      className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-all group-hover:gap-3"
                      style={{ color: colors.primary }}
                      onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary}
                      onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
                    >
                      View Module
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Placeholder Card */}
          <div 
            className="group border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center min-h-[280px] transition-all cursor-pointer"
            style={{ borderColor: colors.border }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary + '60';
              e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div 
              className="p-5 rounded-full transition-all mb-4"
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: colors.textSecondary 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary + '20';
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              <LayoutGrid className="w-8 h-8" />
            </div>
            <p 
              className="font-bold transition-colors"
              style={{ color: colors.textSecondary }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.text}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
            >
              Create New Course
            </p>
            <p 
              className="text-xs mt-1"
              style={{ color: colors.textSecondary + '80' }}
            >
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