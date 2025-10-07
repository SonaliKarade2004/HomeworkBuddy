import React from "react";
import { NavLink } from "react-router-dom";
import { House, Book, Trophy, Users, Bot } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-primary text-white vh-100 p-3" style={{ width: "240px" }}>
      <h4 className="fw-bold mb-4">📘 Buddy</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink to="/dashboard" className="nav-link text-white">
            <House size={18} className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/homework" className="nav-link text-white">
            <Book size={18} className="me-2" /> Homework
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/leaderboard" className="nav-link text-white">
            <Trophy size={18} className="me-2" /> Leaderboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/parents" className="nav-link text-white">
            <Users size={18} className="me-2" /> Parents
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/bot" className="nav-link text-white">
            <Bot size={18} className="me-2" /> Bot
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
