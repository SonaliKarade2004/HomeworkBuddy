// src/Parents.jsx
import React from "react";
import back1Par from "./assets/backPar.png";
import "./ParentDashboard.css";

export default function Parents() {
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
      <h2 className="page-title">👨‍👩‍👧 Parent Portal</h2>

      <div className="overview-grid">
        <div className="overview-card">
          <h5>Progress Overview</h5>
          <p>Completed Tasks: <strong>6 / 10</strong></p>
          <p>Upcoming Deadlines: <strong>3</strong></p>
          <p>Current Rank: <strong>#2</strong></p>
        </div>
        <div className="overview-card">
          <h5>Teacher’s Note</h5>
          <p>Great consistency this week! Encourage reading 20 mins daily.</p>
        </div>
        <div className="overview-card">
          <h5>Weekly Summary</h5>
          <ul>
            <li>Homework completion rate: 80%</li>
            <li>Average time spent: 1h/day</li>
            <li>Focus areas: Algebra & Grammar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
