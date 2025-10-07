// src/ParentFeedback.jsx
import React from "react";
import "./ParentDashboard.css";
import { Link } from "react-router-dom";
import back1Par from "./assets/backPar.png";

export default function ParentFeedback() {
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
      <h2 className="page-title">🧑‍🏫 Teacher Feedback</h2>
      <p className="page-subtitle">
        Review notes and feedback from teachers for your child.
      </p>

      <div className="feedback-list">
        <div className="feedback-card">
          <h3>Mathematics - Mr. Sharma</h3>
          <p>“Alen is improving steadily. Encourage her to revise formulas daily.”</p>
        </div>
        <div className="feedback-card">
          <h3>Science - Mrs. Patil</h3>
          <p>“Good understanding of concepts. Needs to focus more on diagrams.”</p>
        </div>
      </div>

      <Link to="/parent" className="back-btn">⬅ Back to Dashboard</Link>
    </div>
  );
}
