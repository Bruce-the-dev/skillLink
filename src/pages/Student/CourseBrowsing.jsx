import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../Header";

function CourseBrowsingPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

        const uniqueCategories = [
          ...new Set(
            coursesData
              .filter((course) => course.category && course.category.name)
              .map((course) => course.category.name)
          ),
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

  useEffect(() => {
    let filtered = courses;

    if (selectedCategory) {
      filtered = filtered.filter(
        (course) =>
          course.category &&
          course.category.name &&
          course.category.name === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title &&
          course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (course) => course.title !== null && course.category !== null
    );

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, courses]);

  const handleEnroll = async (courseId) => {
    const learnerId = 1;

    try {
      const enrollResponse = await fetch(
        `http://localhost:8080/api/enrollments/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: { userId: learnerId },
            course: { courseId: courseId },
            enrollmentDate: new Date().toISOString(),
          }),
        }
      );
      console.log("Enroll button clicked for course:", courseId);


      if (!enrollResponse.ok) {
        throw new Error("Failed to enroll in the course");
      }

      await enrollResponse.json();
      toast.success("You have successfully enrolled in the course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in the course.");
    }
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div style={styles.page}>
        <h1 style={styles.heading}>Browse Courses</h1>

        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.filter}>
          <label htmlFor="category" style={styles.label}>Filter by Category: </label>
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

        <section style={styles.courseList}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.courseId} style={styles.courseCard}>
                <h3 style={styles.courseTitle}>{course.title}</h3>
                <p style={styles.courseCategory}>
                  Category: {course.category ? course.category.name : "N/A"}
                </p>
                <button
                  style={styles.button}
                  onClick={() => handleEnroll(course.courseId)}
                >
                  Enroll
                </button>
              </div>
            ))
          ) : (
            <p style={styles.noCourses}>No courses found.</p>
          )}
        </section>
      </div>
    </>
  );
}

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    margin: "0 auto",
    maxWidth: "900px",
    padding: "20px",
    backgroundColor: "#f3e8ff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(128, 0, 128, 0.3)",
  },
  heading: {
    color: "#4a0072",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  searchBar: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #9c27b0",
    outline: "none",
    transition: "box-shadow 0.3s",
    boxShadow: "0 4px 10px rgba(128, 0, 128, 0.2)",
  },
  inputFocus: {
    boxShadow: "0 0 10px rgba(128, 0, 128, 0.6)",
  },
  filter: {
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    fontSize: "18px",
    color: "#4a0072",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #9c27b0",
    backgroundColor: "#f8e1ff",
    color: "#4a0072",
  },
  courseList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  courseCard: {
    padding: "15px",
    backgroundColor: "#ffffff",
    border: "1px solid #9c27b0",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(128, 0, 128, 0.2)",
    textAlign: "center",
  },
  courseTitle: {
    fontSize: "20px",
    color: "#4a0072",
    fontWeight: "600",
  },
  courseCategory: {
    fontSize: "16px",
    color: "#6a0080",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#7b1fa2",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 6px 10px rgba(128, 0, 128, 0.3)",
  },
  buttonHover : {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 15px rgba(128, 0, 128, 0.4)",
  },
  noCourses: {
    fontSize: "18px",
    color: "#9c27b0",
    textAlign: "center",
  },
  loading: {
    fontSize: "20px",
    color: "#4a0072",
    textAlign: "center",
    marginTop: "50px",
  },
};

export default CourseBrowsingPage;
