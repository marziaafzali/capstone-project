import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";

// ✅ Firebase imports (make sure you have src/firebase.js configured)
import { auth, provider, signInWithPopup } from "../firebase";

const GetStarted = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  // ✅ Email validator
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Handle Google Sign In
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user:", user.displayName);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-in failed. Please try again.");
    }
  };

  // ✅ Handle Manual Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!isLogin && !name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    // ✅ Simulate login/signup logic (you can connect your backend here)
    console.log(
      isLogin
        ? `Logging in with: ${email}`
        : `Creating account for ${name} (${email})`
    );

    // Navigate after successful form submit
    navigate("/dashboard");
  };

  return (
    <div className="getstarted-container">
      <div className={`auth-wrapper ${isLogin ? "" : "signup-mode"}`}>
        {/* Left Side */}
        <div className="auth-left">
          <div className="left-content">
            {isLogin ? (
              <>
                <h2>Don't have an account?</h2>
                <p>Create one to plan and grow your business!</p>
                <button className="toggle-btn" onClick={toggleMode}>
                  Create Account & Get Started
                </button>
              </>
            ) : (
              <>
                <h2>Already have an account?</h2>
                <p>Login and continue managing your business journey.</p>
                <button className="toggle-btn" onClick={toggleMode}>
                  Login to Your Account
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          {isLogin ? (
            <div className="form-container">
              <h2>
                Existing <strong>User Login</strong>
              </h2>
              <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="btn-main">
                  Login
                </button>

                <div className="or">Or</div>

                <button
                  type="button"
                  className="btn-google"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                  />
                  Sign in with Google
                </button>
              </form>
            </div>
          ) : (
            <div className="form-container">
              <h2>
                Create <strong>Your Account</strong>
              </h2>
              <form onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label>Email</label>
                <input
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="btn-main">
                  Create Account
                </button>

                <div className="or">Or</div>

                <button
                  type="button"
                  className="btn-google"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                  />
                  Sign up with Google
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
