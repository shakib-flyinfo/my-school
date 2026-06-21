import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Phone,
  LucideIcon,
  GraduationCap,
  ClipboardCheck,
  FolderOpen,
  UserPlus,
  UserCheck,
  Contact2,
  CalendarDays,
  FileSpreadsheet,
  Trophy,
  ListTodo
} from "lucide-react";

export interface SubModule {
  name: string;
  path: string;
  icon: LucideIcon;
}

export interface SidebarModule {
  name: string;
  icon: LucideIcon;
  path: string;
  hasSub: boolean;
  subModules?: SubModule[];
}

export const menuItems: SidebarModule[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    hasSub: false,
  },
  {
    name: "Courses",
    icon: BookOpen,
    path: "/dashboard/courses",
    hasSub: true,
    subModules: [
      { name: "All Courses", path: "/dashboard/courses/all", icon: GraduationCap },
      { name: "Assignments", path: "/dashboard/courses/assignments", icon: ListTodo },
      { name: "Course Material", path: "/dashboard/courses/material", icon: FolderOpen },
    ],
  },
  {
    name: "Students",
    icon: Users,
    path: "/dashboard/students",
    hasSub: true,
    subModules: [
      { name: "Admission", path: "/dashboard/students/admission", icon: UserPlus },
      { name: "Attendance", path: "/dashboard/students/attendance", icon: UserCheck },
      { name: "Student Profile", path: "/dashboard/students/profile", icon: Contact2 },
    ],
  },
  {
    name: "Results",
    icon: BarChart3,
    path: "/dashboard/results",
    hasSub: true,
    subModules: [
      { name: "Exam Schedule", path: "/dashboard/results/examschedule", icon: CalendarDays },
      { name: "Marksheet", path: "/dashboard/results/marksheet", icon: FileSpreadsheet },
      { name: "Top Performers", path: "/dashboard/results/topperformers", icon: Trophy },
    ],
  },
  {
    name: "Contact",
    icon: Phone,
    path: "/dashboard/contact",
    hasSub: false,
  },
];