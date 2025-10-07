import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing d-flex align-items-center justify-content-center text-center">
      <div className="p-4 animate">
        <div className="display-5 fw-bolder mb-2">Homework Buddy</div>
        <p className="lead mb-4">
          Track homework, see progress, and learn smarter — built for students, parents, and teachers.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">Create Account</Link>
          <Link to="/dashboard" className="btn btn-link btn-lg text-decoration-none">Preview Dashboard →</Link>
        </div>
        <div className="mt-5 small text-muted">Cloud-based • Gamified • Mobile-friendly</div>
      </div>
    </div>
  );
}
