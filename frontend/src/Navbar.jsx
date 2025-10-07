// src/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleProfileDropdown = () => {
    setProfileOpen(!isProfileOpen);
  };

  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Homework Buddy</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/how-it-works">How It Works</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      {/* User Profile Section */}
      <div className="profile-section" ref={profileRef}>
        <button className="profile-button" onClick={toggleProfileDropdown}>
          <div className="profile-initial">S</div>
          <span className="profile-name">Sonali Karade</span>
          <i className={`fas fa-chevron-${isProfileOpen ? 'up' : 'down'}`}></i>
        </button>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <Link to="/profile" className="dropdown-item">
              <i className="fas fa-user"></i> View Profile
            </Link>
            <Link to="/change-password" className="dropdown-item">
              <i className="fas fa-key"></i> Change Password
            </Link>
            <Link to="/logout" className="dropdown-item">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
