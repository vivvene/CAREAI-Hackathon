import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span className="logo-icon">✚</span>
        <span>CAREAI</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/report">Report</Link>
      </div>

      <Link to="/assessment" className="navbar-button">
        Get Started
      </Link>

    </nav>
  );
}

export default Navbar;