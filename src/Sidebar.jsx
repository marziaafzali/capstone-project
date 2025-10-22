// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

// If you have a logo file place it in src/assets/logo.png and uncomment below:
// import logo from "../assets/logo.png";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* If you imported a logo, uncomment the <img> line below */}
        {/* <img src={logo} alt="BizPlanner Logo" className="sidebar-logo" /> */}
        <h2 className="sidebar-title">BizPlanner</h2>
      </div>

      <nav className="sidebar-menu">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          📊 Dashboard
        </Link>
        <Link to="/planner" className={location.pathname === "/planner" ? "active" : ""}>
          🧾 Product Planner
        </Link>
        <Link to="/marketing" className={location.pathname === "/marketing" ? "active" : ""}>
          📈 Marketing
        </Link>

        <hr />

        <h4 className="sidebar-section">Management</h4>
        <Link to="#">🧍 Employee Management</Link>
        <Link to="#">🏢 Company</Link>
        <Link to="#">📦 Warehouse</Link>

        <hr />

        <h4 className="sidebar-section">Leave</h4>
        <Link to="#">🗓️ Requests</Link>
        <Link to="#">📃 Leave Policy</Link>
      </nav>
    </aside>
  );
}
