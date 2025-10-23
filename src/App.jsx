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
          <div className="logo">BizPlanner</div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/About">About</Link>
            <Link to="/Services">Services</Link>
            <Link to="/Contact">Contact</Link>
          </nav>
          <button className="btn-primary" onClick={handleGetStarted}>
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
</Route>
      </Routes>
    </div>
  );
}

export default App;
