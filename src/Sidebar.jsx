import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard, AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { FcPlanner } from "react-icons/fc";
import { BsGraphUp } from "react-icons/bs";
import { MdEventNote, MdPolicy } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setExpanded(!expanded);

  return (
    <>
      <aside
        className={`sidebar ${isMobile ? "mobile" : ""} ${
          expanded ? "expanded" : ""
        }`}
      >
        <div className="sidebar-header">
          {!isMobile && <h2 className="sidebar-title">BizPlanner</h2>}

          {isMobile && (
            <button className="collapse-btn" onClick={toggleSidebar}>
              {expanded ? <FiChevronLeft /> : <FiChevronRight />}
            </button>
          )}
        </div>

        <nav className="sidebar-menu">
          {/* Always show icons — text appears only when expanded or desktop */}
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            <AiFillDashboard className="sidebar-icon" />
            {(!isMobile || expanded) && "Dashboard"}
          </Link>

          <Link
            to="/planner"
            className={location.pathname === "/planner" ? "active" : ""}
          >
            <FcPlanner className="sidebar-icon" />
            {(!isMobile || expanded) && "Product Planner"}
          </Link>

          <Link
            to="/marketing"
            className={location.pathname === "/marketing" ? "active" : ""}
          >
            <BsGraphUp className="sidebar-icon" />
            {(!isMobile || expanded) && "Marketing"}
          </Link>

          <hr />

          {/* MANAGEMENT */}
          {(!isMobile || expanded) && (
            <h4 className="sidebar-section">Management</h4>
          )}
          <Link to="#" className="sidebar-link">
            <AiOutlineTeam className="sidebar-icon" />
            {(!isMobile || expanded) && "Employee Management"}
          </Link>
          <Link to="#" className="sidebar-link">
            <AiOutlineHome className="sidebar-icon" />
            {(!isMobile || expanded) && "Company"}
          </Link>

          <hr />

          {/* LEAVE */}
          {(!isMobile || expanded) && (
            <h4 className="sidebar-section">Leave</h4>
          )}
          <Link to="#" className="sidebar-link">
            <MdEventNote className="sidebar-icon" />
            {(!isMobile || expanded) && "Requests"}
          </Link>
          <Link to="#" className="sidebar-link">
            <MdPolicy className="sidebar-icon" />
            {(!isMobile || expanded) && "Leave Policy"}
          </Link>
          <Link to="/" className="sidebar-link">
            <AiOutlineHome className="sidebar-icon" />
            {(!isMobile || expanded) && "Logout"}
          </Link>
        </nav>
      </aside>

      {isMobile && expanded && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
