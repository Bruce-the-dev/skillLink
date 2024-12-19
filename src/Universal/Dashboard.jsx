import React, { useEffect, useRef, useState } from "react";
import GlobalSearch from "./GlobalSearch";

const Dashboard = () => {
  const [results, setResults] = useState(null);
  const [filter, setFilter] = useState("all"); // Filter state: all, courses, assessments, users
  const [activeResultIndex, setActiveResultIndex] = useState(-1); // For keyboard navigation
  const resultRefs = useRef([]); // To focus on results

  // Filtered results based on the filter selection
  const getFilteredResults = () => {
    if (!results) return null;

    switch (filter) {
      case "courses":
        return results.courses || [];
      case "assessments":
        return results.assessments || [];
      case "users":
        return results.users || [];
      default:
        return [
          ...(results.courses || []),
          ...(results.assessments || []),
          ...(results.users || []),
        ];
    }
  };

  const filteredResults = getFilteredResults();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!filteredResults || filteredResults.length === 0) return;

      if (e.key === "ArrowDown") {
        setActiveResultIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredResults.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setActiveResultIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && activeResultIndex >= 0) {
        const selectedResult = filteredResults[activeResultIndex];
        handleResultClick(selectedResult.type, selectedResult.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredResults, activeResultIndex]);

  // Handle result click
  const handleResultClick = (type, id) => {
    switch (type) {
      case "course":
        window.location.href = `/courses/${id}`;
        break;
      case "assessment":
        window.location.href = `/assessments/${id}`;
        break;
      case "user":
        window.location.href = `/users/${id}`;
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.page}>
      {/* Search Bar */}
      <GlobalSearch onSearchResult={setResults} />

      {/* Filters */}
      <div style={styles.filters}>
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="courses"
            checked={filter === "courses"}
            onChange={() => setFilter("courses")}
          />
          Courses
        </label>
        <label>
          <input
            type="radio"
            value="assessments"
            checked={filter === "assessments"}
            onChange={() => setFilter("assessments")}
          />
          Assessments
        </label>
        <label>
          <input
            type="radio"
            value="users"
            checked={filter === "users"}
            onChange={() => setFilter("users")}
          />
          Users
        </label>
      </div>

      {/* Search Results */}
      {filteredResults && filteredResults.length > 0 ? (
        <div style={styles.results}>
          {filteredResults.map((result, index) => {
            const type =
              result.type ||
              (result.title ? "course" : result.name ? "user" : "UNKNOWN");

            return (
              <div
                key={result.id || `result-${index}`}
                ref={(el) => (resultRefs.current[index] = el)}
                onClick={() => handleResultClick(type, result.id)}
                style={{
                  ...styles.resultItem,
                  backgroundColor:
                    activeResultIndex === index ? "#3d2c59" : "#fff",
                  color: activeResultIndex === index ? "#fff" : "#000",
                }}
              >
                <strong>{type.toUpperCase()}:</strong>{" "}
                {result.title || result.name}
              </div>
            );
          })}
        </div>
      ) : (
        <p style={styles.emptyState}>No results found.</p>
      )}
    </div>
  );
};

// Styling
const styles = {
  page: {
    margin: "20px auto",
    maxWidth: "800px",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f3f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  filters: {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  results: {
    margin: "20px auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  resultItem: {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    transition: "all 0.3s",
    borderRadius: "5px",
  },
  emptyState: {
    textAlign: "center",
    marginTop: "20px",
    color: "#888",
  },
};

export default Dashboard;
