import React from "react";
import { SearchIcon, ResetIcon, SortIcon } from "./Icons";
import "./SearchFilter.css";

function SearchFilter({
  search,
  setSearch,
  departments,
  department,
  setDepartment,
  sortEmployees,
  resetFilters,
}) {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <SearchIcon className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-actions">
        <div className="select-wrapper">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <button
            className="sort-btn"
            onClick={() => sortEmployees("name")}
            title="Sort alphabetically by Name"
          >
            <SortIcon size={14} />
            <span>Sort Name</span>
          </button>

          <button
            className="sort-btn"
            onClick={() => sortEmployees("salary")}
            title="Sort highest to lowest Salary"
          >
            <SortIcon size={14} />
            <span>Sort Salary</span>
          </button>
        </div>

        <button
          className="reset-btn"
          onClick={resetFilters}
          title="Reset search and filters"
        >
          <ResetIcon size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;