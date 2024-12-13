import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For dynamic routing
import Header from "../Header";
import { toast, ToastContainer } from "react-toastify"; // Importing react-toastify for notifications

function CourseDetailPage() {
  const { courseId } = useParams(); // Assuming courseId is passed via the route
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

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
        // Transform the data if needed (e.g., category, instructor details)

        const transformedCourse = {
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          price: courseData.price,
          level: courseData.level,
          category: courseData.category?.name, // Assuming category has a 'name' property
          instructor: courseData.instructor?.name, // Assuming instructor has a 'name' property
          content: courseData.content, // Assuming the content is fetched as part of the course data
        };

        setCourse(transformedCourse);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details.");
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      // Simulate an enrollment process
      const response = await fetch(
        `http://localhost:8080/api/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to enroll in the course");
      }

      setIsEnrolled(true);
      toast.success("You have successfully enrolled in this course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Enrollment failed. Please try again.");
    }
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
          <strong>Category:</strong> {course.category}
        </p>
        <p>
          <strong>Level:</strong> {course.level}
        </p>
        <p>
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p>{course.description}</p>

        {/* Enroll Button */}
        {!isEnrolled && (
          <button style={styles.enrollButton} onClick={handleEnroll}>
            Enroll in this Course
          </button>
        )}

        {/* Course Content */}
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

// Inline styles for basic styling
const styles = {
  page: {
    fontFamily: "'Arial', sans-serif",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  enrollButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
