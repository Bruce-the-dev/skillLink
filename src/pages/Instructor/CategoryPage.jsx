import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header";

function CategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/categories/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to save category");
        return;
      }

      const newCategory = await response.json();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setCategoryName(""); // Clear input field
      toast.success("Successfully saved category");

      // Redirect to the CreateCourse page after category is added
      navigate("/Course/add");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        background: "linear-gradient(135deg,rgba(0, 0, 0, 0.07),rgb(18, 10, 34))", // Gradient background
        borderRadius: "10px",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 1)", // 3D effect
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <nav>
        <Header />
      </nav>
      <ToastContainer />
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "40px",
          fontSize: "36px",
          textTransform: "uppercase",
        }}
      >
        Manage Categories
      </h1>

      <form
        onSubmit={handleCategorySubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "16px", marginBottom: "10px" }}>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryChange}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "rgb(40, 13, 90)",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              marginTop: "20px",
            }}
          >
            Add Category
          </button>
        </div>
      </form>

      <div style={{ marginTop: "40px" }}>
        <h2
          style={{
            color: "#fff",
            fontSize: "28px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Saved Categories
        </h2>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: "0",
            paddingRight: "0",
            color: "#fff",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          {categories.map((category) => (
            <li
              key={category.id || category.name}
              style={{
                margin: "10px 0",
                padding: "10px",
                backgroundColor: "#6a44b5",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryPage;
