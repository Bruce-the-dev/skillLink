import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssessmentCreation = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState(""); // State for the fetched course name
  const [newAssessment, setNewAssessment] = useState({
    course: { courseId: courseId }, // Store the course ID to send to the backend
    type: "", // Quiz, Project, Peer Review
    maxScore: "",
    deadline: "",
    title: "", // Added a title field for the assessment
  });
  const navigate = useNavigate();

  // Fetch the course name when the component mounts
  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/courses/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the course name.");
        }
        const courseData = await response.json();
        setCourseName(courseData.title); // Assume the backend returns a `title` field for the course
      } catch (error) {
        toast.error(`Error fetching course name: ${error.message}`);
      }
    };

    fetchCourseName();
  }, [courseId]);

  // Handle form submission
  const handleCreateAssessment = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to the backend
    const assessmentData = {
      course: newAssessment.course, // Send course ID
      // title: newAssessment.title, // Send assessment title
      // deadline: newAssessment.deadline,
      type: newAssessment.type,
      maxScore: newAssessment.maxScore,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/assessments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assessmentData),
        }
      );

      if (response.ok) {
        toast.success("Assessment created successfully!");
        // Reset form after successful submission
        setNewAssessment({
          course: courseId,
          title: "",
          deadline: "",
          type: "",
          maxScore: "",
        });
        navigate("/instructor");
      } else {
        toast.error("Failed to create assessment. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <ToastContainer />
      <h1>Assessment Creation</h1>

      {/* Form for creating a new assessment */}
      <form onSubmit={handleCreateAssessment} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Course: </label>
          <input
            type="text"
            value={courseName}
            disabled // Make this field read-only since it's fetched
            style={{
              marginLeft: "10px",
              backgroundColor: "#f1f1f1",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Assessment Title: </label>
          <input
            type="text"
            value={newAssessment.title}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, title: e.target.value })
            }
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Deadline: </label>
          <input
            type="date"
            value={newAssessment.deadline}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, deadline: e.target.value })
            }
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Type: </label>
          <select
            value={newAssessment.type}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, type: e.target.value })
            }
            required
            style={{ marginLeft: "10px" }}
          >
            <option value="">Select Type</option>
            <option value="Quiz">Quiz</option>
            <option value="Project">Project</option>
            <option value="Peer Review">Peer Review</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Max Score: </label>
          <input
            type="number"
            value={newAssessment.maxScore}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, maxScore: e.target.value })
            }
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default AssessmentCreation;
