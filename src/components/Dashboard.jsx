import React from "react";
import { UsersIcon, SalaryIcon, AverageIcon, HighestIcon } from "./Icons";
import "./Dashboard.css";

function Dashboard({
  totalEmployees,
  totalSalary,
  averageSalary,
  highestSalary,
}) {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-card employees">
        <div className="card-icon-wrapper">
          <UsersIcon size={26} />
        </div>
        <div className="card-content">
          <p className="card-label">Total Employees</p>
          <h2 className="card-value">{totalEmployees}</h2>
        </div>
      </div>

      <div className="dashboard-card salary">
        <div className="card-icon-wrapper">
          <SalaryIcon size={26} />
        </div>
        <div className="card-content">
          <p className="card-label">Total Payroll</p>
          <h2 className="card-value">₹ {totalSalary.toLocaleString("en-IN")}</h2>
        </div>
      </div>

      <div className="dashboard-card average">
        <div className="card-icon-wrapper">
          <AverageIcon size={26} />
        </div>
        <div className="card-content">
          <p className="card-label">Average Salary</p>
          <h2 className="card-value">₹ {averageSalary.toLocaleString("en-IN")}</h2>
        </div>
      </div>

      <div className="dashboard-card highest">
        <div className="card-icon-wrapper">
          <HighestIcon size={26} />
        </div>
        <div className="card-content">
          <p className="card-label">Highest Salary</p>
          <h2 className="card-value">₹ {highestSalary.toLocaleString("en-IN")}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;