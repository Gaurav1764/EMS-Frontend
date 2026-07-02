import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect width="18" height="14" x="3" y="6" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>
        <span>EMS Pro</span>
      </div>

      <ul className="nav-links">
        <li className="active">Dashboard</li>
        <li>Employees</li>
        <li>Departments</li>
        <li>Reports</li>
      </ul>

      <div className="profile-section">
        <div className="avatar-wrapper">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
            alt="Admin profile"
            className="profile-avatar"
          />
          <span className="status-indicator"></span>
        </div>

        <div className="profile-info">
          <h4>Admin User</h4>
          <small>HR Manager</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;