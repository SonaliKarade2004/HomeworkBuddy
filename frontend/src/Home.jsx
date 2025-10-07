import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import heroImg from "./assets/back.png"; // make sure this path is correct

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        {/* Background image */}
        <img src={heroImg} alt="Hero" className="hero-image" />

        {/* Overlay content */}
        <div className="hero-content">
          <h1>
            Welcome to <span>Homework Buddy</span>
          </h1>
          <p>
            Your Smart Assistant for <b>Students</b>, <b>Parents</b>, and{" "}
            <b>Teachers</b>.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn start-btn">
              Get Started
            </Link>
            <Link to="/about" className="btn learn-btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
