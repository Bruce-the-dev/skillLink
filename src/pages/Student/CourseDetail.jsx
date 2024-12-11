import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For dynamic routing
import Header from "../Header";

function CourseDetailPage() {
  const { courseId } = useParams(); // Assuming courseId is passed via the route
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock Data Initialization (replace with API calls)
  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      // Mock API response
      const mockCourse = {
        id: courseId,
        title: "React Basics",
        description:
          "Learn the fundamentals of React, including components, state, and props.",
        category: "Programming",
        content: [
          {
            id: 1,
            type: "video",
            title: "Introduction to React",
            link: "https://example.com/video1",
          },
          {
            id: 2,
            type: "document",
            title: "React Cheatsheet",
            link: "https://example.com/doc1",
          },
        ],
      };

      setCourse(mockCourse);

      // Mock enrollment status
      setIsEnrolled(courseId === "1"); // Assume user is enrolled in course 1
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = () => {
    alert("You have enrolled in this course!");
    setIsEnrolled(true);

    // Add API call to enroll in the course here
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div style={styles.page}>
        <h1>{course.title}</h1>
        <p>
          <strong>Category:</strong> {course.category}
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
