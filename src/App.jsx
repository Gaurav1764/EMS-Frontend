import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EmployeeCard from "./components/EmployeeCard";
import Dashboard from "./components/Dashboard";
import SearchFilter from "./components/SearchFilter";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import { PlusIcon } from "./components/Icons";
import "./App.css";

function App() {
  const API_URL = "https://ems-backend-2-q2o5.onrender.com/api/employees";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [department, setDepartment] = useState("");
  
  // Modals and Toasts States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [toast, setToast] = useState(null); // { message: '', type: 'success'|'error'|'warning' }

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  // ==========================
  // FETCH EMPLOYEES
  // ==========================
  const getEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        showToast("Failed to fetch employees list", "error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      showToast("Cannot connect to server. Ensure backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Helper to show toasts
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // ==========================
  // INPUT HANDLER
  // ==========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // ADD EMPLOYEE
  // ==========================
  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Employee Added Successfully", "success");
        setIsFormOpen(false);
        resetForm();
        getEmployees();
      } else {
        showToast("Failed to add employee", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Could not add employee.", "error");
    }
  };

  // ==========================
  // DELETE DIALOG TRIGGER
  // ==========================
  const triggerDeleteConfirm = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteOpen(true);
  };

  // ==========================
  // CONFIRM DELETE
  // ==========================
  const confirmDeleteEmployee = async () => {
    if (!employeeToDelete) return;
    try {
      const response = await fetch(`${API_URL}/${employeeToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showToast(`Employee "${employeeToDelete.name}" deleted`, "success");
        setIsDeleteOpen(false);
        setEmployeeToDelete(null);
        getEmployees();
      } else {
        showToast("Failed to delete employee", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Could not delete employee.", "error");
    }
  };

  // ==========================
  // EDIT TRIGGER
  // ==========================
  const editEmployee = (employee) => {
    setEditId(employee._id);
    setFormData({
      name: employee.name,
      department: employee.department,
      salary: employee.salary,
    });
    setIsFormOpen(true);
  };

  // ==========================
  // UPDATE EMPLOYEE
  // ==========================
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Employee Updated Successfully", "success");
        setIsFormOpen(false);
        resetForm();
        getEmployees();
      } else {
        showToast("Failed to update employee", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Could not update employee.", "error");
    }
  };

  // ==========================
  // RESET FILTERS
  // ==========================
  const resetFilters = () => {
    setSearch("");
    setDepartment("");
    showToast("Filters reset successfully", "info");
  };

  // ==========================
  // SEARCH & FILTER LOGIC
  // ==========================
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  const departments = [
    ...new Set(employees.map((emp) => emp.department)),
  ];

  // ==========================
  // SORTING EMPLOYEES
  // ==========================
  const sortEmployees = (type) => {
    const sorted = [...employees];
    if (type === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      showToast("Sorted alphabetically by Name", "info");
    } else if (type === "salary") {
      sorted.sort((a, b) => b.salary - a.salary);
      showToast("Sorted descending by Salary", "info");
    }
    setEmployees(sorted);
  };

  // ==========================
  // DASHBOARD CALCULATIONS
  // ==========================
  const totalSalary = employees.reduce(
    (total, emp) => total + Number(emp.salary),
    0
  );

  const averageSalary =
    employees.length > 0 ? Math.round(totalSalary / employees.length) : 0;

  const highestSalary =
    employees.length > 0 ? Math.max(...employees.map((emp) => emp.salary)) : 0;

  // ==========================
  // RESET FORM
  // ==========================
  const resetForm = () => {
    setFormData({
      name: "",
      department: "",
      salary: "",
    });
    setEditId(null);
  };

  // Trigger Form Modal for Adding
  const triggerAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  return (
    <div className="container">
      {/* Top Navbar Component */}
      <Navbar />

      {/* Page Header Area */}
      <div className="page-header">
        <div className="page-header-text">
          <h1>Employee Directory</h1>
          <p>Manage corporate workforce profiles, payrolls, and departments.</p>
        </div>
        <button className="add-employee-btn" onClick={triggerAddForm}>
          <PlusIcon size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Analytics Dashboard Grid */}
      <Dashboard
        totalEmployees={employees.length}
        totalSalary={totalSalary}
        averageSalary={averageSalary}
        highestSalary={highestSalary}
      />

      {/* Advanced search and filter controls */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        departments={departments}
        department={department}
        setDepartment={setDepartment}
        sortEmployees={sortEmployees}
        resetFilters={resetFilters}
      />

      {/* Employees Grid list */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Fetching database profiles...</p>
        </div>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.length === 0 ? (
            <div className="no-data-card">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6M9 9l6 6" />
              </svg>
              <h3>No Employees Found</h3>
              <p>Try modifying your search queries or selecting another department.</p>
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                editEmployee={editEmployee}
                deleteEmployee={triggerDeleteConfirm}
              />
            ))
          )}
        </div>
      )}

      {/* Add / Edit Employee Dialog Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editId ? "Update Employee Profile" : "Add New Employee"}
      >
        <form onSubmit={editId ? updateEmployee : addEmployee} className="employee-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Gaurav Sharma"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              name="department"
              placeholder="e.g. Engineering"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary (INR)</label>
            <input
              id="salary"
              type="number"
              name="salary"
              placeholder="e.g. 75000"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editId ? "Save Changes" : "Create Profile"}
            </button>
            <button type="button" className="cancel-btn" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirm Delete"
      >
        <div className="confirm-dialog">
          <p>
            Are you sure you want to delete employee <strong>{employeeToDelete?.name}</strong>?
            This action is permanent and cannot be undone.
          </p>
          <div className="confirm-actions">
            <button className="delete-confirm-btn" onClick={confirmDeleteEmployee}>
              Yes, Delete
            </button>
            <button className="cancel-confirm-btn" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification HUD */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
