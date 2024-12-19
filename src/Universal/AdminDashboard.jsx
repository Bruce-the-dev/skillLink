import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../pages/Header";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [userPage, setUserPage] = useState(1);
  const [coursePage, setCoursePage] = useState(1);
  const usersPerPage = 5;
  const coursesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch("http://localhost:8080/api/users");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch courses
        const coursesResponse = await fetch(
          "http://localhost:8080/api/courses"
        );
        if (!coursesResponse.ok) throw new Error("Failed to fetch courses");
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <ToastContainer />
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          Error: {error}
        </p>
      </div>
    );
  }

  // Pagination logic for users
  const indexOfLastUser = userPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination logic for courses
  const indexOfLastCourse = coursePage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

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
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
          }}
        >
          Admin Dashboard
        </h1>

        {/* Users Table */}
        <section style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "15px", color: "#444" }}>All Users</h2>
          {users.length > 0 ? (
            <>
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
                <thead style={{ position: "sticky", top: 0 }}>
                  <tr style={{ backgroundColor: "#333", color: "#fff" }}>
                    <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
                    <th style={{ padding: "10px", textAlign: "left" }}>
                      Email
                    </th>
                    <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.userId}
                      style={{
                        backgroundColor:
                          currentUsers.indexOf(user) % 2 === 0
                            ? "#f1f1f1"
                            : "#fff",
                      }}
                    >
                      <td style={{ padding: "10px" }}>{user.userId}</td>
                      <td style={{ padding: "10px" }}>{user.name}</td>
                      <td style={{ padding: "10px" }}>{user.email}</td>
                      <td style={{ padding: "10px" }}>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>
                  Page {userPage} of {Math.ceil(users.length / usersPerPage)}
                </span>
                <div>
                  <button
                    onClick={() => setUserPage((prev) => Math.max(prev - 1, 1))}
                    disabled={userPage === 1}
                    style={{
                      margin: "0 5px",
                      padding: "5px 10px",
                      backgroundColor: userPage === 1 ? "#ccc" : "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: userPage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setUserPage((prev) =>
                        prev < Math.ceil(users.length / usersPerPage)
                          ? prev + 1
                          : prev
                      )
                    }
                    disabled={
                      userPage >= Math.ceil(users.length / usersPerPage)
                    }
                    style={{
                      margin: "0 5px",
                      padding: "5px 10px",
                      backgroundColor:
                        userPage >= Math.ceil(users.length / usersPerPage)
                          ? "#ccc"
                          : "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor:
                        userPage >= Math.ceil(users.length / usersPerPage)
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No users found.</p>
          )}
        </section>

        {/* Courses Table */}
        <section style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "15px", color: "#444" }}>All Courses</h2>
          {courses.length > 0 ? (
            <>
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
                      Course ID
                    </th>
                    <th style={{ padding: "10px", textAlign: "left" }}>
                      Title
                    </th>
                    <th style={{ padding: "10px", textAlign: "left" }}>
                      Category
                    </th>
                    <th style={{ padding: "10px", textAlign: "left" }}>
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course) => (
                    <tr
                      key={course.courseId}
                      style={{
                        backgroundColor:
                          currentCourses.indexOf(course) % 2 === 0
                            ? "#f1f1f1"
                            : "#fff",
                      }}
                    >
                      <td style={{ padding: "10px" }}>{course.courseId}</td>
                      <td style={{ padding: "10px" }}>{course.title}</td>
                      <td style={{ padding: "10px" }}>
                        {course.category.name}
                      </td>
                      <td style={{ padding: "10px" }}>${course.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>
                  Page {coursePage} of{" "}
                  {Math.ceil(courses.length / coursesPerPage)}
                </span>
                <div>
                  <button
                    onClick={() =>
                      setCoursePage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={coursePage === 1}
                    style={{
                      margin: "0 5px",
                      padding: "5px 10px",
                      backgroundColor: coursePage === 1 ? "#ccc" : "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: coursePage === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCoursePage((prev) =>
                        prev < Math.ceil(courses.length / coursesPerPage)
                          ? prev + 1
                          : prev
                      )
                    }
                    disabled={
                      coursePage >= Math.ceil(courses.length / coursesPerPage)
                    }
                    style={{
                      margin: "0 5px",
                      padding: "5px 10px",
                      backgroundColor:
                        coursePage >= Math.ceil(courses.length / coursesPerPage)
                          ? "#ccc"
                          : "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor:
                        coursePage >= Math.ceil(courses.length / coursesPerPage)
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p>No courses found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
