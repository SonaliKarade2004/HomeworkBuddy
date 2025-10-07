// src/Login.jsx
import React, { useState } from "react";
import "./Login.css";
import loginImage from "./assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRoleClick = (selectedRole) => {
    setRole(selectedRole);
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const redirectToDashboard = (role) => {
    localStorage.setItem("userRole", role);
    switch (role) {
      case "student":
        navigate("/student");
        break;
      case "parent":
        navigate("/parent");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validate = () => {
    let newErrors = {};

    if (!role) newErrors.role = "Please select a role.";

    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (!strongPasswordRegex.test(password))
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";

    return newErrors;
  };

  const handleGoogleLogin = () => {
    if (!role) {
      setErrors({ role: "Please select a role before logging in." });
      return;
    }

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Login Success:", result.user);
        redirectToDashboard(role);
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        alert("Google login failed.");
      });
  };

  // ✅ Replace this function with backend login
  const handleEmailLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success:", data.user);
        redirectToDashboard(role);
      } else {
        alert(data.message); // show proper backend error
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box fade-in">
        <div className="login-left">
          <h2 className="title">Login</h2>
          <p className="subtitle">Select your role and login below</p>

          <div className="role-selection">
            <div
              className={`role-card ${role === "student" ? "selected" : ""}`}
              onClick={() => handleRoleClick("student")}
            >
              <div className="role-icon">🎓</div>
              <div className="role-label">Student</div>
            </div>
            <div
              className={`role-card ${role === "parent" ? "selected" : ""}`}
              onClick={() => handleRoleClick("parent")}
            >
              <div className="role-icon">👨‍👩‍👧‍👦</div>
              <div className="role-label">Parent</div>
            </div>
            <div
              className={`role-card ${role === "teacher" ? "selected" : ""}`}
              onClick={() => handleRoleClick("teacher")}
            >
              <div className="role-icon">👩‍🏫</div>
              <div className="role-label">Teacher</div>
            </div>
          </div>
          {errors.role && <span className="error-text">{errors.role}</span>}

          <form className="login-form" onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <div className="password-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="social-buttons">
            <button className="social-btn google" onClick={handleGoogleLogin}>
              Login with Google
            </button>
          </div>

          <p className="login-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        <div className="login-right">
          <img src={loginImage} alt="Welcome" />
        </div>
      </div>
    </div>
  );
}
