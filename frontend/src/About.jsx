// src/HowItWorks.jsx
import React, { useEffect, useRef } from "react";
import "./HowItWorks.css";

export default function HowItWorks() {
  const stepRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      stepRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="howitworks-container">
      <section className="howitworks-hero">
        <h1>How Homework Buddy Works</h1>
        <p>
          Homework Buddy makes learning easy, interactive, and personalized with our AI-powered platform.
        </p>
      </section>

      <section className="howitworks-steps">
        <div className="step-card" ref={stepRefs[0]}>
          <div className="step-icon">
            <i className="fas fa-file-upload"></i>
          </div>
          <div className="step-content">
            <h2>Upload or Enter Homework</h2>
            <p>Students can upload homework problems or enter them manually through our intuitive interface.</p>
          </div>
          <div className="step-animation">
            <div className="floating-upload"></div>
          </div>
        </div>

        <div className="step-card" ref={stepRefs[1]}>
          <div className="step-icon">
            <i className="fas fa-robot"></i>
          </div>
          <div className="step-content">
            <h2>Get Smart Assistance</h2>
            <p>Our AI analyzes the problem and provides step-by-step solutions, helpful hints, and detailed explanations.</p>
          </div>
          <div className="step-animation">
            <div className="pulsing-ai"></div>
          </div>
        </div>

        <div className="step-card" ref={stepRefs[2]}>
          <div className="step-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="step-content">
            <h2>Track Progress</h2>
            <p>Parents and teachers can monitor learning progress in real-time with detailed analytics and reports.</p>
          </div>
          <div className="step-animation">
            <div className="growing-chart"></div>
          </div>
        </div>
      </section>
    </div>
  );
}