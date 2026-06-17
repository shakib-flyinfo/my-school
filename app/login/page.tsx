"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  School,
  ShieldCheck,
} from "lucide-react";

// Inline SVG icons for the 5 school elements (can also be separate files)
const classroomIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Crect x='15' y='30' width='70' height='50' fill='%23ffcc80' stroke='%235d4037' stroke-width='2'/%3E%3Crect x='35' y='50' width='30' height='30' fill='%23ffe0b2'/%3E%3Crect x='20' y='35' width='15' height='15' fill='%234caf50'/%3E%3Crect x='65' y='35' width='15' height='15' fill='%234caf50'/%3E%3Ctext x='50' y='90' text-anchor='middle' font-size='10' fill='%23333'%3EClassroom%3C/text%3E%3C/svg%3E";
const fieldIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23a5d6a7'/%3E%3Crect x='10' y='40' width='80' height='40' fill='%23689f38'/%3E%3Ccircle cx='50' cy='60' r='15' fill='%23f9a825' stroke='%23fff' stroke-width='2'/%3E%3Ctext x='50' y='90' text-anchor='middle' font-size='10' fill='%23333'%3EField%3C/text%3E%3C/svg%3E";
const buildingIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Crect x='20' y='30' width='60' height='50' fill='%23bdbdbd' stroke='%23454545' stroke-width='2'/%3E%3Crect x='40' y='45' width='20' height='35' fill='%238d6e63'/%3E%3Crect x='25' y='35' width='10' height='10' fill='%234caf50'/%3E%3Crect x='65' y='35' width='10' height='10' fill='%234caf50'/%3E%3Ctext x='50' y='90' text-anchor='middle' font-size='10' fill='%23333'%3EBuilding%3C/text%3E%3C/svg%3E";
const gateIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23d7ccc8'/%3E%3Crect x='20' y='50' width='60' height='30' fill='%238d6e63'/%3E%3Crect x='45' y='55' width='10' height='25' fill='%23ffe0b2'/%3E%3Crect x='30' y='50' width='5' height='30' fill='%235d4037'/%3E%3Crect x='65' y='50' width='5' height='30' fill='%235d4037'/%3E%3Ctext x='50' y='90' text-anchor='middle' font-size='10' fill='%23333'%3EGate%3C/text%3E%3C/svg%3E";
const studentIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='15' fill='%23ffb74d'/%3E%3Crect x='38' y='50' width='24' height='30' fill='%231e88e5'/%3E%3Crect x='30' y='65' width='40' height='15' fill='%23156cbf'/%3E%3Ctext x='50' y='90' text-anchor='middle' font-size='10' fill='%23333'%3EStudent%3C/text%3E%3C/svg%3E";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#13131a] flex flex-col md:flex-row overflow-hidden">
      {/* --- Left Side: Branding & Image --- */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#1a1a27] relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-500px h-500px bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-500px h-500px bg-orange-600/5 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* School Identity */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-600/10 rounded-2xl border border-red-500/20">
                <Image
                  src="/rediam.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                  Radium <span className="text-red-500">Public</span> School
                </h1>
                <p className="text-gray-500 font-medium mt-1 tracking-[0.2em] uppercase text-xs">
                  Excellence in Education
                </p>
              </div>
            </div>

            {/* School Main Image / Illustration */}
            <div className="relative h-400px w-full rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
              <Image
                src="/school.jpg"
                alt="School Image"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#13131a] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 w-8 bg-red-500/50 rounded-full"
                    />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Empowering the next generation
                </h3>
                <p className="text-gray-400 text-sm max-w-md">
                  Access your academic records, attendance, and administrative
                  tools through our secure portal.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Right Side: Login System --- */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-400px"
        >
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <Image src="/rediam.png" alt="Logo" width={70} height={70} />
            <h2 className="mt-4 text-xl font-bold text-white uppercase tracking-tight">
              Radium Public School
            </h2>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Please enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-red-500 transition-colors">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-red-500 transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="e.g. rahat_admin"
                  className="w-full bg-white/5 border border-white/10 text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-focus-within:text-red-500 transition-colors">
                  Security Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-red-500 hover:underline"
                >
                  Forgot Access?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-red-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white py-4 pl-12 pr-12 rounded-2xl focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-4 rounded-2xl shadow-2xl shadow-red-600/20 flex items-center justify-center gap-3 transition-all mt-4 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="tracking-widest text-xs">
                    AUTHORIZE LOGIN
                  </span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* 5 School Theme Images (Classroom, Field, Building, Gate, Student) */}
          <div className="mt-12 pt-6 border-t border-white/10">
            <p className="text-center text-[10px] text-gray-500 uppercase tracking-wider mb-4">
              Our Campus
            </p>
            <div className="flex justify-around items-center gap-2 flex-wrap">
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <img
                  src={classroomIcon}
                  alt="Classroom"
                  className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] text-gray-400">Classroom</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <img
                  src={fieldIcon}
                  alt="Field"
                  className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] text-gray-400">Field</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <img
                  src={buildingIcon}
                  alt="Building"
                  className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] text-gray-400">Building</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <img
                  src={gateIcon}
                  alt="Gate"
                  className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] text-gray-400">Gate</span>
              </div>
              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <img
                  src={studentIcon}
                  alt="Student"
                  className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
                />
                <span className="text-[10px] text-gray-400">Student</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-white" />
              <span className="text-[10px] text-white font-bold uppercase tracking-tighter">
                Secure SSL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <School size={16} className="text-white" />
              <span className="text-[10px] text-white font-bold uppercase tracking-tighter">
                Portal v2.4
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
