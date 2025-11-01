// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`dashboard-layout ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
