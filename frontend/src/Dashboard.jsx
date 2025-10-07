import React from "react";
import "./Dashboard.css";
import { FaTasks, FaExclamationCircle, FaStar, FaTrophy, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

export default function Dashboard({ role = "student" }) {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome back, {role.charAt(0).toUpperCase() + role.slice(1)} 👋
      </h1>

      {/* Role-specific dashboards */}
      {role === "student" && (
        <>
          <div className="stats-grid">
            <div className="stat-card completed">
              <FaTasks className="stat-icon" />
              <h3>Completed</h3>
              <p>6/10</p>
            </div>
            <div className="stat-card due">
              <FaExclamationCircle className="stat-icon" />
              <h3>Due Soon</h3>
              <p>3</p>
            </div>
            <div className="stat-card points">
              <FaStar className="stat-icon" />
              <h3>Points</h3>
              <p>120</p>
            </div>
            <div className="stat-card rank">
              <FaTrophy className="stat-icon" />
              <h3>Rank</h3>
              <p>#2</p>
            </div>
          </div>

          <div className="deadlines">
            <h2>📅 Upcoming Deadlines</h2>
            <ul>
              <li><span>Math Assignment</span><span className="tag urgent">Tomorrow</span></li>
              <li><span>English Essay</span><span className="tag">Next Week</span></li>
              <li><span>Science Project</span><span className="tag">Friday</span></li>
            </ul>
          </div>
        </>
      )}

      {role === "teacher" && (
        <>
          <div className="stats-grid">
            <div className="stat-card completed">
              <FaChalkboardTeacher className="stat-icon" />
              <h3>Homework Assigned</h3>
              <p>5</p>
            </div>
            <div className="stat-card due">
              <FaExclamationCircle className="stat-icon" />
              <h3>Pending Reviews</h3>
              <p>8</p>
            </div>
            <div className="stat-card points">
              <FaUsers className="stat-icon" />
              <h3>Active Students</h3>
              <p>25</p>
            </div>
          </div>

          <div className="deadlines">
            <h2>📊 Class Progress</h2>
            <ul>
              <li><span>Math - Algebra</span><span className="tag">70% completed</span></li>
              <li><span>Science - Physics</span><span className="tag urgent">45% completed</span></li>
            </ul>
          </div>
        </>
      )}

      {role === "parent" && (
        <>
          <div className="stats-grid">
            <div className="stat-card completed">
              <FaStar className="stat-icon" />
              <h3>Child’s Points</h3>
              <p>120</p>
            </div>
            <div className="stat-card due">
              <FaExclamationCircle className="stat-icon" />
              <h3>Pending Homework</h3>
              <p>2</p>
            </div>
            <div className="stat-card rank">
              <FaTrophy className="stat-icon" />
              <h3>Class Rank</h3>
              <p>#2</p>
            </div>
          </div>

          <div className="deadlines">
            <h2>👨‍👩‍👧 Upcoming Deadlines</h2>
            <ul>
              <li><span>Math Assignment</span><span className="tag urgent">Tomorrow</span></li>
              <li><span>Science Project</span><span className="tag">Friday</span></li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
