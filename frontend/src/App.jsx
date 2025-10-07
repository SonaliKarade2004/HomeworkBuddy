// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import SignUp from "./SignUp";
import StudentDashboard from "./StudentDashboard";
import ParentDashboard from "./ParentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import HowItWorks from "./HowItWorks";
import ParentSummary from "./ParentSummary";
import ParentProgress from "./ParentProgress";
import ParentFeedback from "./ParentFeedback";
import ParentAssistant from "./ParentAssistant";

import { auth, logout } from "./firebase";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="Student Logo"
              className="logo-img"
            />
          </Link>
          <div className="logo-text">Homework Buddy</div>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>

          {user ? (
            <>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  title={user.displayName}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    verticalAlign: "middle",
                    marginRight: "8px",
                  }}
                />
              )}
              <span style={{ marginRight: "16px" }}>
                {user.displayName || "User"}
              </span>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}

          <Link to="/contact">Contact Us</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* Parent Task Pages */}
       <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/parent/summary" element={<ParentSummary />} />
        <Route path="/parent/progress" element={<ParentProgress />} />
        <Route path="/parent/feedback" element={<ParentFeedback />} />
        <Route path="/parent/assistant" element={<ParentAssistant />} />

      </Routes>
    </div>
  );
}
