import React, { useState } from "react";
import "./StudentDashboard.css";
import back1Stud from "./assets/back2Stud.jpeg"; // ✅ Correct path

export default function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [points, setPoints] = useState(120);
  const [badge, setBadge] = useState("🥈 Silver Scholar");

  const [homeworkList] = useState([
    { id: 1, title: "Math Worksheet", due: "Today" },
    { id: 2, title: "Science Notes", due: "This Week" },
    { id: 3, title: "English Essay", due: "This Week" },
  ]);

  const [uploadList, setUploadList] = useState([
    { id: 1, title: "Math Worksheet", due: "Today", uploaded: false, fileName: "" },
    { id: 2, title: "Science Notes", due: "This Week", uploaded: false, fileName: "" },
    { id: 3, title: "English Essay", due: "This Week", uploaded: false, fileName: "" },
  ]);

  const [reminders] = useState([
    "📢 Submit Math Worksheet today!",
    "⏰ Science Notes due Friday",
    "💡 Keep your reading habit!",
  ]);

  // ✅ Upload file
  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadList((prev) =>
      prev.map((hw) =>
        hw.id === id ? { ...hw, uploaded: true, fileName: file.name } : hw
      )
    );
    const newPoints = points + 5;
    setPoints(newPoints);
    setBadge(newPoints >= 200 ? "🥇 Gold Achiever" : "🥈 Silver Scholar");
  };

  // ✅ Actions
  const handleView = (fileName) => {
    if (!fileName) return alert("❌ No file uploaded yet!");
    alert(`👀 Viewing file: ${fileName}`);
  };

  const handleEdit = (id) => {
    const input = document.getElementById(`file-${id}`);
    if (input) input.click();
  };

  const handleDelete = (id) => {
    if (window.confirm("🗑️ Are you sure to remove this file?")) {
      setUploadList((prev) =>
        prev.map((hw) =>
          hw.id === id ? { ...hw, uploaded: false, fileName: "" } : hw
        )
      );
    }
  };

  // 🏠 Dashboard
  const renderDashboard = () => (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: ` url(${back1Stud})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="dashboard-title">🎓 Student Dashboard</h1>
      <p className="dashboard-subtitle">
        Track your homework, earn rewards, and stay ahead with reminders!
      </p>

      <div className="feature-grid">
        <Card title="📜 Homework List" desc="View your assignments." onClick={() => setActiveSection("homework")} />
        <Card title="🕹️ Gamified Progress" desc="Track your points & badges." onClick={() => setActiveSection("progress")} />
        <Card title="🔔 Reminders & Alerts" desc="View important alerts." onClick={() => setActiveSection("reminders")} />
        <Card title="📸 Upload Work" desc="Submit your assignments." onClick={() => setActiveSection("upload")} />
      </div>
    </div>
  );

  // 📋 Homework
  const renderHomework = () => (
    <div className="section section-bg">
      <h2>📜 Homework List</h2>
      <ul className="homework-list">
        {homeworkList.map((hw) => (
          <li key={hw.id}>
            {hw.title} <small>({hw.due})</small>
          </li>
        ))}
      </ul>
      <button className="back-btn" onClick={() => setActiveSection("dashboard")}>← Back</button>
    </div>
  );

  // 🏆 Progress
  const renderProgress = () => (
    <div className="section section-bg">
      <h2>🕹️ Gamified Progress</h2>
      <div className="progress-box glass-box">
        <h3>Total Points: <span className="points">{points}</span></h3>
        <h4>Current Badge: <span className="badge">{badge}</span></h4>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${(points / 200) * 100}%` }}></div>
        </div>
      </div>
      <button className="back-btn" onClick={() => setActiveSection("dashboard")}>← Back</button>
    </div>
  );

  // 🔔 Reminders
  const renderReminders = () => (
    <div className="section section-bg">
      <h2>🔔 Reminders & Alerts</h2>
      <ul className="reminder-list">
        {reminders.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <button className="back-btn" onClick={() => setActiveSection("dashboard")}>← Back</button>
    </div>
  );

  // 📤 Upload Work
  const renderUpload = () => (
    <div className="section section-bg">
      <h2>📸 Upload Work</h2>
      <div className="table-container glass-box">
        <table className="hw-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due</th>
              <th>Upload</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadList.map((hw) => (
              <tr key={hw.id}>
                <td>{hw.title}</td>
                <td>{hw.due}</td>
                <td>
                  <input
                    id={`file-${hw.id}`}
                    type="file"
                    onChange={(e) => handleFileUpload(hw.id, e)}
                    style={{ display: "none" }}
                  />
                  <button
                    className="upload-btn-mini"
                    onClick={() => document.getElementById(`file-${hw.id}`).click()}
                  >
                    {hw.uploaded ? "Replace File" : "Choose File"}
                  </button>
                  {hw.fileName && <span className="file-name">{hw.fileName}</span>}
                </td>
                <td className={hw.uploaded ? "uploaded" : "pending"}>
                  {hw.uploaded ? "✅ Uploaded" : "⏳ Pending"}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn" onClick={() => handleView(hw.fileName)} disabled={!hw.uploaded}>🔍</button>
                    <button className="edit-btn" onClick={() => handleEdit(hw.id)} disabled={!hw.uploaded}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(hw.id)} disabled={!hw.uploaded}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-btn" onClick={() => setActiveSection("dashboard")}>← Back</button>
    </div>
  );

  return (
    <>
      {activeSection === "dashboard" && renderDashboard()}
      {activeSection === "homework" && renderHomework()}
      {activeSection === "progress" && renderProgress()}
      {activeSection === "reminders" && renderReminders()}
      {activeSection === "upload" && renderUpload()}
    </>
  );
}

// ✅ Card Component
function Card({ title, desc, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="feature-text">
        <h2>{title}</h2>
        <p>{desc}</p>
        <button>Explore</button>
      </div>
    </div>
  );
}
