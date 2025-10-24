// src/components/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Save user info in localStorage (optional)
      localStorage.setItem("authToken", userCredential.user.accessToken);

      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };

  // ✅ Google signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("authToken", result.user.accessToken);
      alert("Google signup successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Signup Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="signup-page">
      {/* Left side */}
      <div className="signup-left">
        <h2>Already have an account?</h2>
        <p>Sign in to continue managing your business journey.</p>
        <button className="btn-login" onClick={() => navigate("/login")}>
          Login to your Account
        </button>
      </div>

      {/* Right side */}
      <div className="signup-right">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Get started with Planner Venture</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-create">
            Create Account
          </button>
        </form>

        <div className="signup-divider">OR</div>

        <button className="btn-google" onClick={handleGoogleSignup}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
