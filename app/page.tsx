"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardStatus from "./components/DashboardStatus";
import { redirect } from 'next/navigation'
export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
redirect('/dashboard') 
  return (
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex-1">
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <DashboardStatus />
      </div>
    </div>
  );
}