// src/ParentSummary.jsx
import React from "react";
import "./ParentDashboard.css";
import { Link } from "react-router-dom";
import back1Par from "./assets/backPar.png";

export default function ParentSummary() {
  return (
    <div
      className="page-container"
      style={{
        backgroundImage: `url(${back1Par})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h2 className="page-title">📘 Daily / Weekly Summary</h2>
      <p className="page-subtitle">
        View all assigned homework, upcoming deadlines, and completed tasks.
      </p>

      <div className="summary-list">
        <div className="summary-card">
          <h3>Mathematics</h3>
          <p>Chapter 5: Algebra — Due: Oct 10, 2025</p>
        </div>
        <div className="summary-card">
          <h3>Science</h3>
          <p>Project on Electricity — Due: Oct 12, 2025</p>
        </div>
      </div>

      <Link to="/parent" className="back-btn">⬅ Back to Dashboard</Link>
    </div>
  );
}
