// src/ParentDashboard.jsx
import React from "react";
import "./ParentDashboard.css";
import { useNavigate } from "react-router-dom";

import back1Par from "./assets/backPar.png";
import summaryImg from "./assets/summary_attractive.svg";
import progressImg from "./assets/progress_attractive.svg";
import feedbackImg from "./assets/feedback_attractive.svg";
import botImg from "./assets/bot_attractive.svg";

export default function ParentDashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Daily/Weekly Summary",
      description: "View all assigned homework and deadlines at a glance.",
      icon: "📘",
      img: summaryImg,
      route: "/parent/summary",
    },
    {
      title: "Child’s Progress",
      description: "Track submissions, completion rates, and performance.",
      icon: "📊",
      img: progressImg,
      route: "/parent/progress",
    },
    {
      title: "Teacher Feedback",
      description: "Receive notes and important updates from teachers.",
      icon: "📝",
      img: feedbackImg,
      route: "/parent/feedback",
    },
    {
      title: "Assistant Bot",
      description: "Get insights, reminders, and helpful tips for your child.",
      icon: "🤖",
      img: botImg,
      route: "/parent/assistant",
    },
  ];

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${back1Par})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <h1 className="dashboard-title">Parent Dashboard</h1>
      <p className="dashboard-subtitle">
        Monitor your child’s progress and support better learning habits.
      </p>

      {/* Feature Cards */}
      <div className="feature-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-text">
              <h2>
                {f.icon} {f.title}
              </h2>
              <p>{f.description}</p>
              <button onClick={() => navigate(f.route)}>Explore</button>
            </div>
            <div className="feature-img">
              <img src={f.img} alt={f.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
