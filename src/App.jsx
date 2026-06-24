import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const [editId, setEditId] = useState(null);

 
  const API_URL = "https://ems-backend-cgyt.onrender.com";

  // FETCH EMPLOYEES
  const getEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD EMPLOYEE
  const addEmployee = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    resetForm();
    getEmployees();
  };

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    getEmployees();
  };

  // EDIT EMPLOYEE
  const editEmployee = (employee) => {
    setEditId(employee.id);

    setFormData({
      name: employee.name,
      department: employee.department,
      salary: employee.salary,
    });
  };

  // UPDATE EMPLOYEE
  const updateEmployee = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    resetForm();
    getEmployees();
  };

  // Employee Count 
const count = ()=>{
  employee.count 
}

  // RESET FORM
  const resetForm = () => {
    setFormData({
      name: "",
      department: "",
      salary: "",
    });

    setEditId(null);
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <h2> Total Students : {employees.length} </h2>

      <form
        onSubmit={editId ? updateEmployee : addEmployee}
        className="form"
      >
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="employee-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="card">
            <h3>{employee.name}</h3>

            <p>Department: {employee.department}</p>

            <p>Salary: ₹{employee.salary}</p>

            <button
              onClick={() => editEmployee(employee)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteEmployee(employee.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
