// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard, AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { FcPlanner } from "react-icons/fc";
import { BsGraphUp } from "react-icons/bs";

import { MdEventNote, MdPolicy } from "react-icons/md";
import "./Sidebar.css";

// Optional: add logo if you have it
// import logo from "../assets/logo.png";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* <img src={logo} alt="BizPlanner Logo" className="sidebar-logo" /> */}
        <h2 className="sidebar-title">BizPlanner</h2>
      </div>

      <nav className="sidebar-menu">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          <AiFillDashboard className="sidebar-icon" /> Dashboard
        </Link>
        <Link to="/planner" className={location.pathname === "/planner" ? "active" : ""}>
          <FcPlanner className="sidebar-icon" /> Product Planner
        </Link>
        <Link to="/marketing" className={location.pathname === "/marketing" ? "active" : ""}>
          <BsGraphUp className="sidebar-icon" /> Marketing
        </Link>

        <hr />

        <h4 className="sidebar-section">Management</h4>
        <Link to="#" className="sidebar-link">
          <AiOutlineTeam className="sidebar-icon" /> Employee Management
        </Link>
        <Link to="#" className="sidebar-link">
          <AiOutlineHome className="sidebar-icon" /> Company
        </Link>

        <hr />

        <h4 className="sidebar-section">Leave</h4>
        <Link to="#" className="sidebar-link">
          <MdEventNote className="sidebar-icon" /> Requests
        </Link>
        <Link to="#" className="sidebar-link">
          <MdPolicy className="sidebar-icon" /> Leave Policy
        </Link>
        <Link to="/" className="sidebar-link">
          <AiOutlineHome className="sidebar-icon" /> log out
        </Link>
      </nav>
    </aside>
  );
}
