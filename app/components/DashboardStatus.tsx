"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Award,
  DollarSign,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend: string;
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative overflow-hidden rounded-2xl p-6 border shadow-xl transition-all"
    style={{
      background: 'var(--card-bg)',
      borderColor: 'var(--border-color)'
    }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          {title}
        </p>
        <h3 className="text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          {value}
        </h3>
        <div className="flex items-center gap-1 mt-3" style={{ color: 'var(--success)' }}>
          <TrendingUp size={14} />
          <span className="text-xs font-medium">{trend}</span>
        </div>
      </div>
      <div 
        className="p-3 rounded-xl backdrop-blur"
        style={{ 
          background: 'rgba(220, 38, 38, 0.1)',
          color: 'var(--primary)'
        }}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div 
      className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl"
      style={{ background: 'rgba(220, 38, 38, 0.05)' }}
    />
  </motion.div>
);

export default function DashboardPage() {
  const stats = [
    { title: "Total Students", value: "1,284", icon: Users, trend: "+12% from last month" },
    { title: "Total Teachers", value: "86", icon: GraduationCap, trend: "+5% from last month" },
    { title: "Active Courses", value: "42", icon: BookOpen, trend: "+8% from last month" },
    { title: "Total Revenue", value: "$284.5K", icon: DollarSign, trend: "+23% from last month" },
  ];

  const recentActivities = [
    { icon: "👨‍🎓", title: "New student admitted - Sakib Ahmed", time: "2 minutes ago", status: "Success" },
    { icon: "💰", title: "Teacher salary paid for May", time: "1 hour ago", status: "Success" },
    { icon: "📝", title: "Exam schedule updated for Grade 10", time: "3 hours ago", status: "Pending" },
    { icon: "💳", title: "Fee collection from 45 students", time: "5 hours ago", status: "Success" },
    { icon: "📚", title: "New course added: Advanced Mathematics", time: "Yesterday", status: "Pending" },
  ];

  const upcomingEvents = [
    { title: "Mid-Term Exams", date: "May 15, 2026", time: "9:00 AM" },
    { title: "Parents Meeting", date: "May 20, 2026", time: "10:00 AM" },
    { title: "Annual Sports Day", date: "May 25, 2026", time: "8:00 AM" },
    { title: "Result Publication", date: "May 30, 2026", time: "4:00 PM" },
  ];

  const topPerformers = [
    { name: "Sakib Ahmed", class: "Grade 10", gpa: "5.00", rank: 1 },
    { name: "Nusrat Jahan", class: "Grade 10", gpa: "4.95", rank: 2 },
    { name: "Tanvir Hossain", class: "Grade 09", gpa: "4.90", rank: 3 },
  ];

  return (
    <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 
          className="text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Welcome back! Here's what's happening in your school today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activities & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div 
          className="lg:col-span-2 rounded-2xl border overflow-hidden"
          style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Clock size={18} style={{ color: 'var(--primary)' }} />
                Recent Activities
              </h3>
              <button className="text-xs transition-colors hover:text-primary" style={{ color: 'var(--text-secondary)' }}>
                View All
              </button>
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{activity.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{activity.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === "Success" ? "bg-emerald-500/20 text-emerald-400" :
                  activity.status === "Pending" ? "bg-orange-500/20 text-orange-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-5" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Award size={18} style={{ color: 'var(--primary)' }} />
            Quick Stats
          </h3>
          <div className="space-y-4">
            {[
              { label: "Attendance Today", value: "94%", color: "var(--success)" },
              { label: "Pending Applications", value: "23", color: "var(--warning)" },
              { label: "New Enrollments", value: "+45", color: "var(--primary)" },
              { label: "Graduating This Year", value: "128", color: "var(--accent)" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <span className="text-lg font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Calendar size={18} style={{ color: 'var(--primary)' }} />
              Upcoming Events
            </h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 transition-colors cursor-pointer hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220, 38, 38, 0.1)' }}>
                    <Calendar size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{event.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{event.date} • {event.time}</p>
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'var(--text-secondary)' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 text-center border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button className="text-xs transition-colors hover:text-primary" style={{ color: 'var(--text-secondary)' }}>
              View Full Calendar
            </button>
          </div>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <div className="p-5 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Award size={18} style={{ color: 'var(--warning)' }} />
              Top Performers
            </h3>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {topPerformers.map((student, index) => (
              <div key={index} className="p-4 transition-colors cursor-pointer hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                    student.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                    student.rank === 2 ? "bg-gray-500/20 text-gray-400" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>
                    #{student.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{student.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{student.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">GPA {student.gpa}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Out of 5.00</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 text-center border-t" style={{ borderColor: 'var(--border-color)' }}>
            <button className="text-xs transition-colors hover:text-primary" style={{ color: 'var(--text-secondary)' }}>
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 rounded-2xl p-6 border"
        style={{
          background: 'rgba(220, 38, 38, 0.05)',
          borderColor: 'rgba(220, 38, 38, 0.2)'
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(220, 38, 38, 0.15)' }}>
              <MessageCircle className="w-6 h-6" style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Need Help?</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Our support team is here for you 24/7</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="mailto:support@rps.edu" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:bg-white/10" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)' }}>
              <Mail size={16} />
              Email Support
            </a>
            <a href="tel:+8801234567890" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white font-bold transition-all hover:shadow-lg" style={{ background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)` }}>
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}