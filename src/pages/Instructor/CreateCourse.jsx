import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    level: "",
    instructor: "",
  });
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [cookies] = useCookies(["id"]);
  const instructorId = cookies.id;

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
        setCategories(categoryList);

        // Navigate to the "Create Category" page if the list is empty
        if (categoryList.length === 0) {
          toast.info(
            "No categories found. Redirecting to create category page."
          );
          setTimeout(() => navigate("Course/category"), 1000); // Add slight delay for toast visibility
        }
      } catch (error) {
        toast.error("Error fetching categories: " + error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  useEffect(() => {
    if (!instructorId) {
      toast.error("Instructor ID is missing in cookies.");
      setIsLoading(false);
      return;
    }
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${instructorId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch The instructor");
        }
        const instructorList = await response.json();
        setInstructors(instructorList);
      } catch (error) {
        toast.error("Error fetching instructor: " + error.message);
      } finally {
        setLoadingInstructors(false);
      }
    };

    fetchInstructors();
  }, [instructorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => String(cat.categoryId) === e.target.value
    );
    setCourse({ ...course, category: selectedCategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data to submit:", course);

    const courseData = {
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
      level: course.level,
      instructor: instructorId,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.message || "Failed to create course");
      }

      const createdCourse = await response.json();
      console.log("Course created successfully:", createdCourse);
      setTimeout(() => {
        navigate("/instructor");
      });

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
      setIsLoading(false);
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
              value={course.category?.categoryId || ""}
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
        <div>
          <label>Instructor:</label>
          {loadingInstructors ? (
            <p>Loading instructors...</p>
          ) : (
            <p>{instructors.name}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Course..." : "Create Course"}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => navigate("/Course/category")} // Use a function reference
        >
          {isLoading ? "Redirecting to category page..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
