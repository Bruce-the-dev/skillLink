import React, { useState } from "react";

const InstructorDashboard = () => {
  // Mock data for courses
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", status: "Published", enrollments: 30 },
    { id: 2, title: "Spring Boot Essentials", status: "Draft", enrollments: 0 },
    {
      id: 3,
      title: "Advanced JavaScript",
      status: "Published",
      enrollments: 25,
    },
  ]);

  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    "New enrollment in React Basics by John Doe.",
    "Assessment submitted for Advanced JavaScript.",
    "Feedback received for Spring Boot Essentials.",
  ]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Instructor Dashboard</h1>

      {/* Courses Overview */}
      <section style={{ marginBottom: "20px" }}>
        <h2>My Courses</h2>
        <table
          border="1"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Status</th>
              <th>Enrollments</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.status}</td>
                <td>{course.enrollments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Notifications Panel */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </section>

      {/* Quick Links */}
      <section>
        <h2>Quick Links</h2>
        <button
          onClick={() => alert("Navigate to Create Course page")}
          style={{
            marginRight: "10px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          Create New Course
        </button>
        <button
          onClick={() => alert("Navigate to Create Assessment page")}
          style={{ padding: "10px 15px", cursor: "pointer" }}
        >
          Create New Assessment
        </button>
      </section>
    </div>
  );
};

export default InstructorDashboard;
