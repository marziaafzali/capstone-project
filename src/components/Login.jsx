// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "./Signup.css"; // reuse same style if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("authToken", userCredential.user.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("authToken", result.user.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <h2>Don't have an account?</h2>
        <p>Create one to get started with your business planning.</p>
        <button className="btn-login" onClick={() => navigate("/signup")}>
          Create Account
        </button>
      </div>

      <div className="signup-right">
        <h2 className="signup-title">Welcome Back!</h2>
        <p className="signup-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-create">
            Login
          </button>
        </form>

        <div className="signup-divider">OR</div>

        <button className="btn-google" onClick={handleGoogleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
