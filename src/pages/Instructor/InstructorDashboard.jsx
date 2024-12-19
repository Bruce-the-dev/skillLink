import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["id"]); // Get the user ID from cookies
  const instructorId = cookies.id;

  // State for courses, notifications, assessments, and selection
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [assessments, setAssessments] = useState([]);
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

        // Fetch assessments
        const assessmentsResponse = await fetch(
          `http://localhost:8080/api/assessments`
        );
        if (!assessmentsResponse.ok) {
          throw new Error("Failed to fetch assessments.");
        }
        const assessmentsData = await assessmentsResponse.json();
        setAssessments(assessmentsData);

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
          marginTop: "90px",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(135deg,rgba(70, 59, 97, 0.39),rgb(26, 19, 41))", // Purple gradient
          borderRadius: "20px", // Rounded corners
          boxShadow: "0 10px 30px rgba(0, 0, 0, 1)", // 3D shadow
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#fff",
            fontSize: "36px", // Larger title
            textTransform: "uppercase",
          }}
        >
          Instructor Dashboard
        </h1>

        {/* Assessments Overview */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              marginBottom: "15px",
              color: "#fff",
              fontSize: "24px", // Slightly larger subheading
              textTransform: "uppercase",
            }}
          >
            My Assessments
          </h2>
          {assessments.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #ddd", // Subtle border
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#6a44b5",
                    color: "#fff",
                    fontSize: "16px",
                  }}
                >
                  <th style={{ padding: "12px", textAlign: "left" }}>Course</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Type</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Max Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment) => (
                  <tr
                    key={assessment.assessmentId}
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <td style={{ padding: "12px" }}>
                      {assessment.course.title}
                    </td>
                    <td style={{ padding: "12px" }}>{assessment.type}</td>
                    <td style={{ padding: "12px" }}>{assessment.maxScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No assessments found.</p>
          )}
        </section>

        {/* Courses Overview */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              marginBottom: "15px",
              color: "#fff",
              fontSize: "24px",
              textTransform: "uppercase",
            }}
          >
            My Courses
          </h2>
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
                <tr
                  style={{
                    backgroundColor: "#6a44b5",
                    color: "#fff",
                    fontSize: "16px",
                  }}
                >
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Course Title
                  </th>
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Description
                  </th>
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Category
                  </th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Price</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.courseId}
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{course.title}</td>
                    <td style={{ padding: "12px" }}>{course.description}</td>
                    <td style={{ padding: "12px" }}>{course.category.name}</td>
                    <td style={{ padding: "12px" }}>${course.price}</td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => setSelectedCourse(course.courseId)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#7a57d1",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "all 0.3s ease-in-out",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
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
          <h2
            style={{
              marginBottom: "15px",
              color: "#fff",
              fontSize: "24px",
              textTransform: "uppercase",
            }}
          >
            Notifications
          </h2>
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
                    padding: "12px",
                    borderBottom:
                      index !== notifications.length - 1
                        ? "1px solid #ddd"
                        : "none",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#e9e9e9"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#fff"}
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
          <h2
            style={{
              marginBottom: "15px",
              color: "#fff",
              fontSize: "24px",
              textTransform: "uppercase",
            }}
          >
            Quick Links
          </h2>
          <button
            onClick={() => navigate("/Course/add")}
            style={{
              marginRight: "15px",
              padding: "12px 30px",
              backgroundColor: "#7a57d1",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            Create New Course
          </button>
          <button
            onClick={() =>
              navigate(`/instructor/CreateAssessment/${selectedCourse}`)
            }
            style={{
              padding: "12px 30px",
              backgroundColor: selectedCourse ? "#28A745" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: selectedCourse ? "pointer" : "not-allowed",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
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
