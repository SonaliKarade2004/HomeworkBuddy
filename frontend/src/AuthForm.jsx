import React, { useState } from "react";
import "./App.css";

export default function AuthForm({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ role }); // mock login
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"} as {role}</h2>

        <div className="role-select">
          {["student", "teacher", "parent"].map(r => (
            <button key={r} className={role === r ? "active" : ""} onClick={() => setRole(r)}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="Name" required />}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {!isLogin && <input type="password" placeholder="Confirm Password" required />}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
