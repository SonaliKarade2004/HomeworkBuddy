// src/ParentProgress.jsx
import React from "react";
import "./ParentDashboard.css";
import { Link } from "react-router-dom";
import back1Par from "./assets/backPar.png";

export default function ParentProgress() {
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
      <h2 className="page-title">📊 Child’s Progress</h2>
      <p className="page-subtitle">
        Track your child’s performance and completion rates across subjects.
      </p>

      <div className="progress-chart">
        <div className="subject-progress">
          <h3>Mathematics</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "85%" }}></div>
          </div>
          <span>85% Completed</span>
        </div>

        <div className="subject-progress">
          <h3>Science</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <span>70% Completed</span>
        </div>

        <div className="subject-progress">
          <h3>English</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "90%" }}></div>
          </div>
          <span>90% Completed</span>
        </div>
      </div>

      <Link to="/parent" className="back-btn">
        ⬅ Back to Dashboard
      </Link>
    </div>
  );
}
