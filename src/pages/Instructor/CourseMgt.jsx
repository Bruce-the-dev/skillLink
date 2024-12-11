import React, { useState } from "react";

const CourseManagementPage = () => {
  // Mock data for courses
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", learners: 30 },
    { id: 2, title: "Spring Boot Essentials", learners: 15 },
    { id: 3, title: "Advanced JavaScript", learners: 25 },
  ]);

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
            <th>Learners</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.learners}</td>
              <td>
                <button
                  onClick={() => handleUpdate(course.id)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewLearners(course.id)}
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
