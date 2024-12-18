import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "../Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["id"]); // Get the user ID from cookies
  const instructorId = cookies.id;

  // State for courses, notifications, and selection
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course

  useEffect(() => {
    if (!instructorId) {
      toast.error("No instructor ID found in cookies.");
      navigate("/login"); // Redirect to login if no ID found
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await fetch(
          `http://localhost:8080/api/courses/instructor/${instructorId}`
        );
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses.");
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Fetch notifications
        const notificationsResponse = await fetch(
          `http://localhost:8080/api/notifications/getUserNotifications/${instructorId}`
        );
        if (!notificationsResponse.ok) {
          throw new Error("Failed to fetch notifications.");
        }
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData);
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [instructorId, navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}
        >
          Instructor Dashboard
        </h1>

        {/* Courses Overview */}
        <section style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "15px", color: "#444" }}>My Courses</h2>
          {courses.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#333", color: "#fff" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Course Title
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Description
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Category
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.courseId}>
                    <td style={{ padding: "10px" }}>{course.title}</td>
                    <td style={{ padding: "10px" }}>{course.description}</td>
                    <td style={{ padding: "10px" }}>{course.category.name}</td>
                    <td style={{ padding: "10px" }}>${course.price}</td>
                    <td style={{ padding: "10px" }}>
                      <button
                        onClick={() => setSelectedCourse(course.courseId)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#007BFF",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No courses found.</p>
          )}
        </section>

        {/* Notifications Panel */}
        <section style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "15px", color: "#444" }}>Notifications</h2>
          {notifications.length > 0 ? (
            <ul
              style={{
                listStyleType: "none",
                padding: "0",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    borderBottom:
                      index !== notifications.length - 1
                        ? "1px solid #ddd"
                        : "none",
                  }}
                >
                  {notification}
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications found.</p>
          )}
        </section>

        {/* Quick Links */}
        <section>
          <h2 style={{ marginBottom: "15px", color: "#444" }}>Quick Links</h2>
          <button
            onClick={() => navigate("/Course/add")}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create New Course
          </button>
          <button
            onClick={() =>
              navigate(`/instructor/CreateAssessment/${selectedCourse}`)
            }
            style={{
              padding: "10px 20px",
              backgroundColor: selectedCourse ? "#28A745" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: selectedCourse ? "pointer" : "not-allowed",
              fontSize: "16px",
            }}
            disabled={!selectedCourse}
          >
            Create New Assessment
          </button>
        </section>
      </div>
    </>
  );
};

export default InstructorDashboard;
