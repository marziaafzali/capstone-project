// src/components/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <h2>Already have an account?</h2>
        <p>Sign in to continue managing your business journey.</p>
        <button className="btn-login" onClick={() => navigate("/login")}>
          Login to your Account
        </button>
      </div>

      <div className="signup-right">
        <h2 className="signup-title">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
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
