// src/SignUp.jsx
import React, { useState } from "react";
import "./Login.css"; 
import loginImage from "./assets/login.png";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleClick = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
    setErrors((prev) => ({ ...prev, role: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.role) newErrors.role = "Please select a role.";
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters.";

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&]).{6,}$/.test(formData.password))
      newErrors.password = "Password must be at least 6 chars and include uppercase, lowercase, number, and special character.";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});



      

      const data = await response.json();

      if (response.ok) {
        alert("✅ Account created successfully!");
        navigate("/login");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box fade-in">
        <div className="login-left">
          <h2 className="title">Sign Up</h2>
          <p className="subtitle">Create an account to join Homework Buddy. Let’s get started!</p>

          {/* Role Selection */}
          <div className="role-selection">
            {["student", "parent", "teacher"].map((role) => (
              <div
                key={role}
                className={`role-card ${formData.role === role ? "selected" : ""}`}
                onClick={() => handleRoleClick(role)}
              >
                <div className="role-icon">
                  {role === "student" ? "🎓" : role === "parent" ? "👨‍👩‍👧‍👦" : "👩‍🏫"}
                </div>
                <div className="role-label">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
              </div>
            ))}
          </div>
          {errors.role && <span className="error-text">{errors.role}</span>}

          {/* Signup Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}

            <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}

            <button type="submit" className="login-btn">Create Account</button>
          </form>

          <p className="login-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        <div className="login-right">
          <img src={loginImage} alt="Welcome illustration" />
        </div>
      </div>
    </div>
  );
}
