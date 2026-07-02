import React from "react";
import { EditIcon, TrashIcon, CalendarIcon, BriefcaseIcon } from "./Icons";
import "./EmployeeCard.css";

function EmployeeCard({ employee, editEmployee, deleteEmployee }) {
  // Generate a premium gradient avatar from user's name initials
  const getInitials = (name) => {
    if (!name) return "EM";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getGradientIndex = (name) => {
    if (!name) return 0;
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 5;
  };

  const gradients = [
    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", // indigo to purple
    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)", // cyan to blue
    "linear-gradient(135deg, #10b981 0%, #059669 100%)", // emerald to green
    "linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)", // amber to rose
    "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)", // pink to violet
  ];

  const avatarGradient = gradients[getGradientIndex(employee.name)];

  return (
    <div className="employee-card">
      <div className="card-header">
        <div className="avatar-container" style={{ background: avatarGradient }}>
          <span>{getInitials(employee.name)}</span>
        </div>
        <div className="employee-info">
          <h3>{employee.name}</h3>
          <div className="department-badge">
            <BriefcaseIcon size={12} />
            <span>{employee.department}</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="detail-row">
          <span className="detail-label">Employee ID</span>
          <span className="detail-value id-code" title={employee._id}>
            {employee._id}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Joined Date</span>
          <span className="detail-value date-val">
            <CalendarIcon size={13} className="detail-icon" />
            {new Date(employee.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="salary-box">
          <span className="salary-label">Monthly Salary</span>
          <h3 className="salary-amount">
            ₹ {Number(employee.salary).toLocaleString("en-IN")}
          </h3>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="edit-action-btn"
          onClick={() => editEmployee(employee)}
          title="Edit employee details"
        >
          <EditIcon size={16} />
          <span>Edit</span>
        </button>

        <button
          className="delete-action-btn"
          onClick={() => deleteEmployee(employee)}
          title="Delete employee profile"
        >
          <TrashIcon size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;