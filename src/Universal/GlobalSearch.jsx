import React, { useState } from "react";

const GlobalSearch = ({ onSearchResult }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const response = await fetch(
        `http://localhost:8080/api/search?q=${value}`
      );
      const data = await response.json();
      onSearchResult(data); // Pass results back to parent component
    } else {
      onSearchResult(null);
    }
  };

  return (
    <div style={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  searchBar: {
    margin: "10px auto",
    maxWidth: "600px",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
};

export default GlobalSearch;
