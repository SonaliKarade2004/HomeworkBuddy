import React, { useState } from "react";
import "./Bot.css";

export default function Bot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! I'm your study buddy. Ask me anything." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { from: "user", text: input };
    setMessages([
      ...messages,
      newMessage,
      { from: "bot", text: "🤖 I'm still learning, but I'll help!" },
    ]);
    setInput("");
  };

  return (
    <div className="bot-container">
      <div className="bot-header">🤖 Study Buddy</div>

      {/* Fixed size chat area */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
