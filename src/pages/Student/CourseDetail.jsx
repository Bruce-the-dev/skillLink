import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have the CSS for react-toastify
import { useCookies } from "react-cookie";

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null); // State for enrollmentId
  const [cookies] = useCookies(["id"]);
  const learnerId = cookies.id; // Access the learner ID from cookies

  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/courses/${courseId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }

        const courseData = await response.json();

        // Transform the data if needed
        const transformedCourse = {
          id: courseData.courseId,
          title: courseData.title,
          description: courseData.description,
          price: courseData.price,
          level: courseData.level,
          category: courseData.category?.name,
          instructor: courseData.instructor?.name,
          // Assuming content is returned as an array, adjust if needed
          content: courseData.content,
        };

        setCourse(transformedCourse);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details.");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  useEffect(() => {
    // Check if user is enrolled in this course
    const checkEnrollmentStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/enrollments/user/${learnerId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch enrollments");
        }

        const enrollments = await response.json();

        // Assuming enrollments is an array of enrollment objects
        const enrollment = enrollments.find(
          (enroll) => enroll.course.courseId === parseInt(courseId, 10)
        );

        if (enrollment) {
          setIsEnrolled(true);
          setEnrollmentId(enrollment.enrollmentId);
        } else {
          setIsEnrolled(false);
          setEnrollmentId(null);
        }
      } catch (error) {
        console.error("Error checking enrollment status:", error);
      }
    };

    checkEnrollmentStatus();
  }, [courseId, learnerId]);

  const handleEnroll = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/enrollments/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: { userId: learnerId },
            course: { courseId: parseInt(courseId, 10) },
            enrollmentDate: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to enroll in the course");
      }

      const enrollData = await response.json();
      setIsEnrolled(true);
      setEnrollmentId(enrollData.enrollmentId); // Assuming the backend returns the enrollmentId
      toast.success("You have successfully enrolled in this course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Enrollment failed. Please try again.");
    }
  };

  const handleDropOut = async () => {
    if (!enrollmentId) {
      toast.error("Enrollment ID not found. Cannot drop out.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/enrollments/delete/${enrollmentId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to drop out of the course");
      }

      setIsEnrolled(false);
      setEnrollmentId(null);
      toast.success("You have successfully dropped out of the course.");
    } catch (error) {
      console.error("Error dropping out:", error);
      toast.error("Failed to drop out of the course.");
    }
  };

  const viewAssignments = () => {
    navigate(`/student/assessment/${courseId}`);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Header />
      <div style={styles.page}>
        <h1>{course.title}</h1>
        <p>
          <strong>Category:</strong> {course.category || "N/A"}
        </p>
        <p>
          <strong>Level:</strong> {course.level || "N/A"}
        </p>
        <p>
          <strong>Instructor:</strong> {course.instructor || "N/A"}
        </p>
        <p>{course.description || "No description available."}</p>

        {/* Enrollment / Drop Out / Assignments Buttons */}
        {!isEnrolled && (
          <button style={styles.button} onClick={handleEnroll}>
            Enroll in this Course
          </button>
        )}
        {isEnrolled && (
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={handleDropOut}>
              Drop Out
            </button>
            <button style={styles.button} onClick={viewAssignments}>
              View Assignments
            </button>
          </div>
        )}

        {/* Course Content if Enrolled */}
        {isEnrolled && (
          <section style={styles.contentSection}>
            <h2>Course Content</h2>
            {course.content && course.content.length > 0 ? (
              <ul style={styles.contentList}>
                {course.content.map((item) => (
                  <li key={item.id} style={styles.contentItem}>
                    {item.type === "video" && (
                      <>
                        🎥{" "}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </a>
                      </>
                    )}
                    {item.type === "document" && (
                      <>
                        📄{" "}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No content available for this course.</p>
            )}
          </section>
        )}
      </div>
    </>
  );
}

const styles = {
  page: {
    fontFamily: "'Arial', sans-serif",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    marginTop: "20px",
  },
  buttonGroup: {
    marginTop: "20px",
  },
  contentSection: {
    marginTop: "30px",
  },
  contentList: {
    listStyleType: "none",
    padding: 0,
  },
  contentItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default CourseDetailPage;
