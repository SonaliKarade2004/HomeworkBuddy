import React, { useState } from "react";
import "./Teacher_Panel.css";

export default function HomeworkBuddy() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard">
      {/* Logout button */}
      <button className="logout-btn">Logout</button>

      <header>
        <h1>Welcome back</h1>
        <p>Manage your classroom and track student progress</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="tabs">
        {["overview", "assignments", "submissions", "students", "feedback"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </nav>

      <main>
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="overview">
            <div className="stats-grid">
              <div className="card blue">
                <h3>Total Assignments</h3>
                <p>3</p>
                <small>Active assignments</small>
              </div>
              <div className="card green">
                <h3>Students</h3>
                <p>5</p>
                <small>Enrolled students</small>
              </div>
              <div className="card orange">
                <h3>Pending Reviews</h3>
                <p>2</p>
                <small>Need attention</small>
              </div>
              <div className="card purple">
                <h3>Completion Rate</h3>
                <p>84%</p>
                <small>Class average</small>
              </div>
            </div>

            <div className="two-col">
              <div className="card list-card">
                <h3>Recent Assignments</h3>
                <ul>
                  <li>
                    <b>Math Worksheet Chapter 5</b>
                    <span className="due">Due: 2025-08-07</span>
                    <span className="badge">18/25</span>
                  </li>
                  <li>
                    <b>Science Lab Report</b>
                    <span className="due">Due: 2025-08-09</span>
                    <span className="badge">12/25</span>
                  </li>
                  <li>
                    <b>Reading Comprehension</b>
                    <span className="due">Due: 2025-08-10</span>
                    <span className="badge">23/25</span>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3>Student Progress</h3>
                <div className="progress">
                  <span>Alex Chen</span>
                  <div className="bar"><div style={{ width: "85%" }}></div></div>
                  <small>85%</small>
                </div>
                <div className="progress">
                  <span>Emma Davis</span>
                  <div className="bar"><div style={{ width: "92%" }}></div></div>
                  <small>92%</small>
                </div>
                <div className="progress">
                  <span>Marcus Johnson</span>
                  <div className="bar"><div style={{ width: "78%" }}></div></div>
                  <small>78%</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignments */}
        {activeTab === "assignments" && (
          <div className="page assignments">
            <h2>Assignments</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Math Worksheet Chapter 5</td>
                  <td>2025-08-07</td>
                  <td><span className="badge blue">Open</span></td>
                </tr>
                <tr>
                  <td>Science Lab Report</td>
                  <td>2025-08-09</td>
                  <td><span className="badge orange">Pending</span></td>
                </tr>
                <tr>
                  <td>Reading Comprehension</td>
                  <td>2025-08-10</td>
                  <td><span className="badge green">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Submissions */}
        {activeTab === "submissions" && (
          <div className="page submissions">
            <h2>Submissions</h2>
            <ul>
              <li className="success">Alex Chen - Submitted Math Worksheet ✅</li>
              <li className="success">Emma Davis - Submitted Lab Report ✅</li>
              <li className="danger">Marcus Johnson - Pending ❌</li>
            </ul>
          </div>
        )}

        {/* Students */}
        {activeTab === "students" && (
          <div className="page students">
            <h2>Students</h2>
            <div className="student-grid">
              <div className="student-card">Alex Chen</div>
              <div className="student-card">Emma Davis</div>
              <div className="student-card">Marcus Johnson</div>
              <div className="student-card">Sophia Lee</div>
              <div className="student-card">Liam Brown</div>
            </div>
          </div>
        )}

        {/* Feedback */}
        {activeTab === "feedback" && (
          <div className="page feedback">
            <h2>Feedback</h2>
            <div className="feedback-list">
              <div className="feedback-item">
                <b>Alex Chen</b> <p>Great improvement in math!</p>
              </div>
              <div className="feedback-item">
                <b>Emma Davis</b> <p>Excellent lab work!</p>
              </div>
              <div className="feedback-item">
                <b>Marcus Johnson</b> <p>Needs to focus on reading.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
