// src/App.jsx
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Planner from "./pages/Planner.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Marketing from "./pages/Marketing.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { isAuthenticated } from "./auth.js";
import GetStarted from "./pages/GetStarted.jsx";
import DailyPlanner from "./pages/DailyPlanner.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import "./index.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate("/getstarted");
  };

  // Hide navbar on dashboard & auth-related pages
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/DailyPlanner") ||
    location.pathname.startsWith("/planner") ||
    location.pathname.startsWith("/marketing") ||
    location.pathname.startsWith("/getstarted") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  return (
    <div>
{/* Public Navbar */}
{!hideNavbar && (
  <header className="navbar">
    <div className="nav-left">
      <div className="logo">BizPlanner</div>

      {/* Hamburger / Close Icon */}
      <button
        className="menu-toggle"
        onClick={() => document.body.classList.toggle("nav-open")}
        aria-label="Toggle menu"
      >
        <span className="menu-icon">☰</span>
        <span className="close-icon">×</span>
      </button>
    </div>

    {/* Nav Links */}
    <nav className="nav-links">
      <Link to="/" onClick={() => document.body.classList.remove("nav-open")}>
        Home
      </Link>
      <Link to="/About" onClick={() => document.body.classList.remove("nav-open")}>
        About
      </Link>
      <Link to="/Services" onClick={() => document.body.classList.remove("nav-open")}>
        Services
      </Link>
      <Link to="/Contact" onClick={() => document.body.classList.remove("nav-open")}>
        Contact
      </Link>
     
      {/* Get Started for mobile */}
      <button
        className="btn-primary mobile-btn"
        onClick={() => {
          document.body.classList.remove("nav-open");
          handleGetStarted();
        }}
      >
        Get Started
      </button>
    </nav>

    {/* Get Started for desktop */}
    <button className="btn-primary desktop-btn" onClick={handleGetStarted}>
      Get Started
    </button>
  </header>
)}


      {/* Page Routes */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Pages (with sidebar) */}
      <Route
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/planner" element={<Planner />} />
  <Route path="/marketing" element={<Marketing />} />
  <Route path="/DailyPlanner" element={<DailyPlanner />} />
</Route>
  
      </Routes>
       
    </div>
  );
}

export default App;
