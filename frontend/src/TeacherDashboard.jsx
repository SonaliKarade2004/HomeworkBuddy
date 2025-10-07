import React, { useState } from "react";
import "./TeacherDashboard.css";
import { FaTrash, FaStar, FaUsers, FaTasks, FaCommentDots, FaBell } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import backteach from "./assets/teacher-back.jpg"; // ✅ Correct path


const TeacherDashboard = () => {
   <div
        className="dashboard-container"
        style={{
          backgroundImage: ` url(${backteach})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aarav Mehta",
      homeworks: [
        { id: 1, title: "Math Worksheet", badges: 4, feedback: "Excellent improvement!" },
        { id: 2, title: "Science Project", badges: 0, feedback: "" },
      ],
    },
    {
      id: 2,
      name: "Siya Patel",
      homeworks: [
        { id: 1, title: "Reading Practice", badges: 5, feedback: "Perfect effort!" },
      ],
    },
  ]);
  const [newStudent, setNewStudent] = useState("");
  const [newHomework, setNewHomework] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignedHomework, setAssignedHomework] = useState([]);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Add Student
  const addStudent = () => {
    if (newStudent.trim()) {
      setStudents([...students, { id: Date.now(), name: newStudent, homeworks: [] }]);
      setNewStudent("");
    }
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Assign Homework
  const assignHomework = () => {
    if (!newHomework.trim()) return;
    const hw = { title: newHomework, dueDate, file: selectedFile ? selectedFile.name : null };
    setAssignedHomework([...assignedHomework, hw]);

    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        homeworks: [...s.homeworks, { id: Date.now(), title: newHomework, badges: 0, feedback: "" }],
      }))
    );

    setNewHomework("");
    setDueDate("");
    setSelectedFile(null);
  };

  // Star Badges
  const updateBadge = (studentId, hwId, value) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              homeworks: s.homeworks.map((hw) =>
                hw.id === hwId ? { ...hw, badges: value } : hw
              ),
            }
          : s
      )
    );
  };

  // Open Feedback
  const openFeedbackModal = (studentId, hwId, existingFeedback) => {
    setFeedbackModal({ studentId, hwId });
    setFeedbackText(existingFeedback || "");
  };

  // Save Feedback
  const saveFeedback = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === feedbackModal.studentId
          ? {
              ...s,
              homeworks: s.homeworks.map((hw) =>
                hw.id === feedbackModal.hwId ? { ...hw, feedback: feedbackText } : hw
              ),
            }
          : s
      )
    );
    setFeedbackModal(null);
    setFeedbackText("");
  };

  // Overview Data
  const totalStudents = students.length;
  const totalHomework = students[0]?.homeworks?.length || 0;
  const totalFeedbacks = students.flatMap((s) => s.homeworks).filter((h) => h.feedback).length;

  const missingSubmissions = students.filter((s) =>
    s.homeworks.some((hw) => hw.badges === 0)
  );

  return (
    <div className="teacher-dashboard section-bg">
      <header className="td-header">
        <h1 className="dashboard-title">Teacher Dashboard</h1>
        <p className="dashboard-subtitle">
          Manage Students • Assign Homework • Track Progress
        </p>
      </header>

      {/* Tabs */}
      <div className="td-tabs">
        {["overview", "students", "homework", "notifications", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="overview-grid fade-in">
          <div className="overview-card">
            <FaUsers className="icon" />
            <h3>{totalStudents}</h3>
            <p>Total Students</p>
          </div>
          <div className="overview-card">
            <MdAssignmentAdd className="icon" />
            <h3>{totalHomework}</h3>
            <p>Active Homework</p>
          </div>
          <div className="overview-card">
            <FaCommentDots className="icon" />
            <h3>{totalFeedbacks}</h3>
            <p>Feedbacks Given</p>
          </div>
        </div>
      )}

      {/* Students */}
      {activeTab === "students" && (
        <div className="glass students-section fade-in">
          <h2>Students</h2>
          <div className="add-student-box">
            <input
              type="text"
              placeholder="Enter student name..."
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
            />
            <button onClick={addStudent}>Add Student</button>
          </div>

          {students.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-header">
                <h3>{student.name}</h3>
                <button className="delete-btn" onClick={() => deleteStudent(student.id)}>
                  <FaTrash />
                </button>
              </div>

              {student.homeworks.map((hw) => (
                <div key={hw.id} className="homework-item">
                  <p className="homework-title">{hw.title}</p>

                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`star ${hw.badges >= star ? "active" : ""}`}
                        onClick={() => updateBadge(student.id, hw.id, star)}
                      />
                    ))}
                  </div>

                  <button
                    className="feedback-btn"
                    onClick={() => openFeedbackModal(student.id, hw.id, hw.feedback)}
                  >
                    💬 {hw.feedback ? "Edit Feedback" : "Give Feedback"}
                  </button>

                  {hw.feedback && <p className="feedback-text">“{hw.feedback}”</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Homework */}
      {activeTab === "homework" && (
        <div className="glass homework-section fade-in">
          <h2>Assign Homework</h2>
          <div className="assign-box">
            <input
              type="text"
              placeholder="Homework title..."
              value={newHomework}
              onChange={(e) => setNewHomework(e.target.value)}
            />
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
            <button onClick={assignHomework}>Assign</button>
          </div>

          {assignedHomework.length > 0 && (
            <div className="assigned-list">
              <h3>Assigned Homeworks</h3>
              <ul>
                {assignedHomework.map((hw, i) => (
                  <li key={i}>
                    📘 {hw.title} — Due: <strong>{hw.dueDate || "N/A"}</strong>{" "}
                    {hw.file && <span>📎 {hw.file}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="notifications-section fade-in">
          <h2>Notifications</h2>
          {missingSubmissions.length === 0 ? (
            <div className="notif-card success">
              🎉 All students have completed feedbacks!
            </div>
          ) : (
            missingSubmissions.map((s) => (
              <div key={s.id} className="notif-card warning">
                <FaBell /> {s.name} has pending badges or feedback!
              </div>
            ))
          )}
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="analytics-section fade-in">
          <h2>Student Progress</h2>
          {students.map((s) => {
            const total = s.homeworks.length || 1;
            const avg = s.homeworks.reduce((a, h) => a + h.badges, 0) / (total * 5);
            return (
              <div key={s.id} className="progress-item">
                <span>{s.name}</span>
                <div className="progress-container">
                  <div className="progress-fill" style={{ width: `${avg * 100}%` }} />
                </div>
                <span className="progress-label">{Math.round(avg * 100)}%</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal && (
        <div className="modal-overlay">
          <div className="modal-box slide-up">
            <h2>Give Feedback</h2>
            <textarea
              rows="4"
              placeholder="Enter feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setFeedbackModal(null)}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveFeedback}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
