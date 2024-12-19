import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header"; // Import Header component

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
    <div
      style={{
        marginTop: "80px",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        background: "linear-gradient(135deg,rgb(0, 0, 0),rgba(3, 3, 3, 0.06))", // Gradient background
        borderRadius: "10px",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 1)", // 3D effect
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Header />
      <ToastContainer />
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "40px",
          fontSize: "36px",
          textTransform: "uppercase",
        }}
      >
        Assessment Creation
      </h1>

      {/* Form for creating a new assessment */}
      <form
        onSubmit={handleCreateAssessment}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "16px", marginBottom: "10px" }}>Course: </label>
          <input
            type="text"
            value={courseName}
            disabled
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f1f1f1",
              fontSize: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "16px", marginBottom: "10px" }}>Assessment Title: </label>
          <input
            type="text"
            value={newAssessment.title}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, title: e.target.value })
            }
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "16px", marginBottom: "10px" }}>Deadline: </label>
          <input
            type="date"
            value={newAssessment.deadline}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, deadline: e.target.value })
            }
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "16px", marginBottom: "10px" }}>Type: </label>
          <select
            value={newAssessment.type}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, type: e.target.value })
            }
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <option value="">Select Type</option>
            <option value="Quiz">Quiz</option>
            <option value="Project">Project</option>
            <option value="Peer Review">Peer Review</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "16px", marginBottom: "10px" }}>Max Score: </label>
          <input
            type="number"
            value={newAssessment.maxScore}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, maxScore: e.target.value })
            }
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#3b0170",
            color: "#fff",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 15px 25px rgba(0, 0, 0, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
          }}
        >
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default AssessmentCreation;
