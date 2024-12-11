import React, { useState, useEffect } from "react";
import Header from "../Header";
import DashboardSidebar from "../../Universal/Dashboard";

function LearnerDashboard() {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // Mock data for demo purposes
  useEffect(() => {
    // Fetch enrolled courses
    setCourses([
      { id: 1, title: "React Basics", progress: 75 },
      { id: 2, title: "Spring Boot Essentials", progress: 50 },
    ]);

    // Fetch notifications
    setNotifications([
      { id: 1, message: "New assignment available for React Basics" },
      {
        id: 2,
        message:
          "Course update: Additional resources added to Spring Boot Essentials",
      },
    ]);

    // Fetch achievements
    setAchievements([
      { id: 1, title: "React Basics Completion", badge: "🏆" },
      { id: 2, title: "Top Scorer in Spring Boot", badge: "🥇" },
    ]);
  }, []);

  return (
    <>
      <DashboardSidebar />
      <nav>
        <Header />
      </nav>
      <div style={styles.dashboard}>
        <h1>Welcome to Your Dashboard</h1>

        {/* Enrolled Courses Section */}
        <section style={styles.section}>
          <h2>Enrolled Courses</h2>
          {courses.length > 0 ? (
            <ul style={styles.list}>
              {courses.map((course) => (
                <li key={course.id} style={styles.card}>
                  <h3>{course.title}</h3>
                  <p>Progress: {course.progress}%</p>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled courses yet.</p>
          )}
        </section>

        {/* Notifications Section */}
        <section style={styles.section}>
          <h2>Notifications</h2>
          {notifications.length > 0 ? (
            <ul style={styles.list}>
              {notifications.map((notification) => (
                <li key={notification.id} style={styles.card}>
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications.</p>
          )}
        </section>

        {/* Achievements Section */}
        <section style={styles.section}>
          <h2>Achievements</h2>
          {achievements.length > 0 ? (
            <ul style={styles.list}>
              {achievements.map((achievement) => (
                <li key={achievement.id} style={styles.card}>
                  <span style={styles.badge}>{achievement.badge}</span>{" "}
                  {achievement.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No achievements yet.</p>
          )}
        </section>
      </div>
    </>
  );
}

// Inline styles for basic styling
const styles = {
  dashboard: {
    fontFamily: "'Arial', sans-serif",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  section: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  card: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
    marginTop: "5px",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  badge: {
    fontSize: "1.5rem",
    marginRight: "10px",
  },
};

export default LearnerDashboard;
