// src/ParentAssistant.jsx
import React, { useState } from "react";
import "./ParentDashboard.css";
import { FaRobot, FaUser } from "react-icons/fa";


export default function ParentAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! I'm your learning assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user's message
    const newMessages = [...messages, { sender: "user", text: input }];

    // Simulate bot reply (you can integrate real AI or backend later)
    let reply = "🤖 I’ll check that for you!";
    if (input.toLowerCase().includes("progress"))
      reply = "📈 You can view your child’s progress under ‘Child’s Progress’ section.";
    else if (input.toLowerCase().includes("homework"))
      reply = "🗓️ Check the ‘Daily/Weekly Summary’ for homework deadlines.";
    else if (input.toLowerCase().includes("teacher"))
      reply = "🧑‍🏫 You can see teacher notes in the ‘Teacher Feedback’ section.";
    else if (input.toLowerCase().includes("tip"))
      reply = "💡 Tip: Encourage daily study habits and reward consistency!";

    setMessages([...newMessages, { sender: "bot", text: reply }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    
    <div className="bot-container">
      <h2 className="bot-title">🤖 Assistant Bot</h2>
      <p className="bot-subtitle">
        Get insights, reminders, and helpful tips for your child’s learning journey.
      </p>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
          >
            {msg.sender === "user" ? <FaUser className="chat-icon" /> : <FaRobot className="chat-icon" />}
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chat-input"
        />
        <button className="chat-send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
