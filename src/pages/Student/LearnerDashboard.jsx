import React, { useState, useEffect } from "react";
import Header from "../Header";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify for notifications
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

function LearnerDashboard() {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cookies] = useCookies(["id"]);
  const learnerId = cookies.id; // Access the learner ID from cookies
  const navigate = useNavigate(); // Initialize the navigation function

  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!learnerId) {
      toast.error("Learner's ID is missing in cookies.");
      console.log("No learner ID found.");
      setIsLoading(false); // Stop loading when ID is missing
      return;
    }
  }, [learnerId]);

  useEffect(() => {
    if (learnerId) {
      console.log(learnerId);
      const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
          // Fetch Enrolled Courses
          const coursesResponse = await fetch(
            `http://localhost:8080/api/enrollments/user/${learnerId}`
          );
          if (!coursesResponse.ok) {
            throw new Error("Failed to fetch enrolled courses");
          }
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);

          // Fetch Notifications
          const notificationsResponse = await fetch(
            `http://localhost:8080/api/notifications/getUnreadNotifications/${learnerId}`
          );
          if (!notificationsResponse.ok) {
            throw new Error("Failed to fetch notifications");
          }
          const notificationsData = await notificationsResponse.json();
          setNotifications(notificationsData);

          // Fetch Achievements
          const achievementsResponse = await fetch(
            `http://localhost:8080/api/achievements/user/${learnerId}`
          );
          if (!achievementsResponse.ok) {
            throw new Error("Failed to fetch achievements");
          }
          const achievementsData = await achievementsResponse.json();
          setAchievements(achievementsData);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          toast.error("Failed to load dashboard data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [learnerId]);

  // Navigate to the "Browse Courses" page
  const handleBrowseCourses = () => {
    navigate("/student/Browsing"); // Change this to the correct path for browsing courses
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const UpdateNotification = async (notificationId) => {
    if (!notificationId) {
      toast.error("Notification ID not found.");
      console.error("Invalid notificationId:", notificationId);
      return;
    }

    const notificationPayload = {
      notificationId: notificationId,
      status: "Read",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/notifications/updateStatus/${notificationId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notificationPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update notification");
      }

      // Refresh the notifications list after a successful update
      const updatedNotifications = notifications.filter(
        (notif) => notif.notificationId !== notificationId
      );
      setNotifications(updatedNotifications);

      toast.success("Notification marked as read!");
    } catch (error) {
      console.error("Error updating notification:", error);
      toast.error("Failed to update notification. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
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
                <li key={course.enrollmentId} style={styles.card}>
                  <h3>Course name:{course.course.title}</h3>
                  {/* <p>Progress: {course.progress}%</p> */}
                  <p>Enrollment Date: {course.enrollmentDate}</p>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                  <Link to={`/student/course/${course.course.courseId}`}>
                    <button style={styles.viewButton}>View Details</button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled courses yet.</p>
          )}
        </section>

        {/* Notifications Section */}
        <section style={styles.section}>
          <h2>New Notifications</h2>
          {notifications.length > 0 ? (
            <ul style={styles.list}>
              {notifications.map((notification) => (
                <li key={notification.notificationId} style={styles.card}>
                  <p>{notification.message}</p>
                  <button
                    style={styles.viewButton}
                    onClick={() =>
                      UpdateNotification(notification.notificationId)
                    }
                  >
                    Mark as Read
                  </button>
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
                <li key={achievement.achievementId} style={styles.card}>
                  <span style={styles.badge}>{achievement.badge}</span>
                  {achievement.badge}
                  {achievement.points}
                </li>
              ))}
            </ul>
          ) : (
            <p>No achievements yet.</p>
          )}
        </section>

        {/* Browse Courses Button */}
        <section style={styles.section}>
          <button onClick={handleBrowseCourses} style={styles.browseButton}>
            Browse Available Courses
          </button>
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
  browseButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff", // Bootstrap primary color
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewButton: {
    padding: "8px 12px",
    fontSize: "14px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "flex-start",
    marginTop: "10px",
  },
};

export default LearnerDashboard;
