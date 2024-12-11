import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header";

function CreateCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    level: "",
  });
  const [categories, setCategories] = useState([]); // To store categories
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
  const [isLoading, setIsLoading] = useState(false); // Loading state for course creation

  // Fetch categories when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoryList = await response.json();
        setCategories(categoryList); // Store the categories in state
      } catch (error) {
        toast.error("Error fetching categories: " + error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => String(cat.categoryId) === e.target.value
    ); // Find the selected category object
    setCourse({ ...course, category: selectedCategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data to submit:", course); // Debugging

    // Prepare the course data to be sent
    const courseData = {
      title: course.title,
      description: course.description,
      category: course.category, // Send the category ID instead of the name
      price: course.price,
      level: course.level,
    };

    setIsLoading(true); // Set the loading state for course creation

    try {
      const response = await fetch("http://localhost:8080/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(courseData), // Send data as JSON
      });

      // Check if the response is not OK
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || "Failed to create course");
      }

      const createdCourse = await response.json();
      console.log("Course created successfully:", createdCourse);

      // Reset form upon success
      setCourse({
        title: "",
        description: "",
        category: "",
        price: "",
        level: "",
      });
      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setIsLoading(false); // Reset loading state after course creation attempt
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <h1>Create a New Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <select
              name="category"
              value={course.category?.categoryId || ""} // Bind to category.id
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Level:</label>
          <input
            type="text"
            name="level"
            value={course.level}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
