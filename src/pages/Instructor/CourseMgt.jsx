import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const CourseManagementPage = () => {
  const [cookies] = useCookies(["id"]);
  const instructorId = cookies.id; // Access the instructor ID from cookies

  const [courses, setCourses] = useState([]); // To store fetched courses
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    if (!instructorId) {
      toast.error("Instructor ID is missing in cookies.");
      console.log(instructorId);
      setLoading(false);
      return;
    }

    // Fetch courses from the Spring Boot backend using the instructorId
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/courses/instructor/${instructorId}`
        );

        if (!response.ok) {
          toast.error("Failed to fetch courses.");
        }

        const data = await response.json();
        setCourses(data); // Set the courses data in the state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        toast.error(error.message); // Set error if something goes wrong
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchCourses();
  }, [instructorId]); // Run when instructorId changes

  const handleUpdate = (courseId) => {
    alert(`Update course with ID: ${courseId}`);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== courseId));
    }
  };

  const handleViewLearners = (courseId) => {
    alert(`View learners for course ID: ${courseId}`);
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Course Management</h1>

      <table
        border="1"
        style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Level</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseId}>
              <td>{course.description}</td>
              <td>{course.price}</td>
              <td>{course.level}</td>
              <td>{course.category.name}</td>
              <td>
                <button
                  onClick={() => handleUpdate(course.courseId)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course.courseId)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewLearners(course.courseId)}
                  style={{ padding: "5px 10px", cursor: "pointer" }}
                >
                  View Learners
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagementPage;
