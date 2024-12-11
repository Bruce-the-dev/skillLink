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
    <div>
      <nav>
        <Header />
      </nav>
      <ToastContainer />
      <h1>Manage Categories</h1>
      <form onSubmit={handleCategorySubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryChange}
            required
          />
          <button type="submit">Add Category</button>
        </div>
      </form>
      <div>
        <h2>Saved Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id || category.name}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryPage;
