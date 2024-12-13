import React, { useState, useEffect } from "react";
import Header from "../Header";
import { toast } from "react-toastify"; // Import react-toastify for notifications

function CourseBrowsingPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await fetch(
          "http://localhost:8080/api/courses"
        );
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);

        // Filter categories from courses data (if you don't have a dedicated category endpoint)
        const uniqueCategories = [
          ...new Set(coursesData.map((course) => course.category)),
        ];
        setCategories(uniqueCategories);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses.");
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Update filtered courses whenever search query or selected category changes
  useEffect(() => {
    let filtered = courses;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, courses]);

  // Handle enrolling in a course
  const handleEnroll = async (courseId) => {
    const learnerId = 1; // Assuming the learner's ID is available in your app (you can get it from cookies or auth context)

    try {
      // Send enrollment request to backend
      const enrollResponse = await fetch(
        `http://localhost:8080/api/courses/api/enrollments/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: learnerId, // Assuming learnerId is available (e.g., from cookies or context)
            courseId: courseId,
            enrollmentDate: new Date().toISOString(), // Send the current date as the enrollment date
          }),
        }
      );

      if (!enrollResponse.ok) {
        throw new Error("Failed to enroll in the course");
      }

      const enrollData = await enrollResponse.json();
      toast.success("You have successfully enrolled in the course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in the course.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div style={styles.page}>
        <h1>Browse Courses</h1>

        {/* Search Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Filter by Category */}
        <div style={styles.filter}>
          <label htmlFor="category">Filter by Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Course List */}
        <section style={styles.courseList}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} style={styles.courseCard}>
                <h3>{course.title}</h3>
                <p>Category: {course.category}</p>
                <button
                  style={styles.button}
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll
                </button>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </section>
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
  searchBar: {
    marginBottom: "20px",
  },
  filter: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  courseList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  courseCard: {
    padding: "15px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
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
  },
};

export default CourseBrowsingPage;
