import React from "react";
import "./Leaderboard.css";

export default function Leaderboard() {
  const students = [
    { rank: 1, name: "Alice", points: 150, badge: "Gold" },
    { rank: 2, name: "Bob", points: 120, badge: "Silver" },
    { rank: 3, name: "Charlie", points: 100, badge: "Bronze" },
    { rank: 4, name: "David", points: 90, badge: "Participant" },
  ];

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard</h1>
      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Points</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.rank} className={`rank-${s.rank}`}>
                <td>{s.rank}</td>
                <td>{s.name}</td>
                <td>{s.points}</td>
                <td>
                  <span className={`badge ${s.badge.toLowerCase()}`}>
                    {s.badge === "Gold" ? "🥇 Gold" : 
                     s.badge === "Silver" ? "🥈 Silver" :
                     s.badge === "Bronze" ? "🥉 Bronze" :
                     "🎖 Participant"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
