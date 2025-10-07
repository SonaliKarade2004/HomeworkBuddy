import React, { useState } from "react";
import "./Homework.css";

export default function Homework() {
  const [tasks, setTasks] = useState([
    { subject: "Math", detail: "10 Algebra problems", time: "30 mins", done: false },
    { subject: "English", detail: "Read 2 chapters", time: "45 mins", done: false },
    { subject: "Science", detail: "Revise notes", time: "20 mins", done: false },
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [newDetail, setNewDetail] = useState("");

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newSubject || !newDetail) return;
    setTasks([...tasks, { subject: newSubject, detail: newDetail, time: "30 mins", done: false }]);
    setNewSubject("");
    setNewDetail("");
  };

  return (
    <div className="homework-container">
      <h1 className="homework-title">📘 Homework Tracker</h1>

      {/* Task List */}
      <div className="task-list">
        <h2>Today</h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`task-card ${task.done ? "completed" : ""}`}
            onClick={() => toggleTask(index)}
          >
            <input type="checkbox" checked={task.done} readOnly />
            <span>
              <b>{task.subject} –</b> {task.detail}
            </span>
            <span
              className={`task-time ${
                task.time.includes("45") ? "long" : task.time.includes("30") ? "medium" : "short"
              }`}
            >
              {task.time}
            </span>
          </div>
        ))}
      </div>

      {/* Add Homework */}
      <form className="add-task" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task details"
          value={newDetail}
          onChange={(e) => setNewDetail(e.target.value)}
        />
        <button type="submit">➕ Add</button>
      </form>
    </div>
  );
}
