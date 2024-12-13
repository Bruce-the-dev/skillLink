import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Initialize React-Toastify

const AssessmentCreation = () => {
  // Form state
  const [newAssessment, setNewAssessment] = useState({
    course: "",
    // deadline: "",
    type: "", // Quiz, Project, Peer Review
    maxScore: "",
  });
  const navigate = useNavigate();
  // Handle form submission
  const handleCreateAssessment = async (e) => {
    e.preventDefault();

    // Prepare data to be sent to backend
    const assessmentData = {
      course: newAssessment.course,
      // deadline: newAssessment.deadline,
      type: newAssessment.type,
      maxScore: newAssessment.maxScore,
    };

    try {
      // Send POST request to backend
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
        const data = await response.json();
        // If the request was successful, show success toast
        toast.success("Assessment created successfully!");
        // Reset form after successful submission
        setNewAssessment({
          course: "",
          // deadline: "",
          type: "",
          maxScore: "",
        });
        navigate("/instructor");
      } else {
        // If the request failed, show error toast
        toast.error("Failed to create assessment. Please try again.");
      }
    } catch (error) {
      // Handle network errors or other issues
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
            value={newAssessment.course}
            onChange={(e) =>
              setNewAssessment({ ...newAssessment, course: e.target.value })
            }
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Assessment Title: </label>
          <input
            type="text"
            // value={newAssessment.title}
            // onChange={(e) =>
            //   setNewAssessment({ ...newAssessment, title: e.target.value })
            // }
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
          style={{ padding: "10px 15px", cursor: "pointer" }}
        >
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default AssessmentCreation;
