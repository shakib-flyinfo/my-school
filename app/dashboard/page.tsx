"use client";

import React from "react";
import DashboardStatus from "../components/DashboardStatus";

export default function DashboardPage() {
  return (
    <div className="p-6" style={{ background: 'var(--background)' }}>
      <DashboardStatus />
    </div>
  );
}