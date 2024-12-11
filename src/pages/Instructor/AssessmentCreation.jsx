import React, { useState } from "react";

const AssessmentCreation = () => {
  // Mock data for assessments
  const [assessments, setAssessments] = useState([
    { id: 1, title: "Quiz 1", course: "React Basics", deadline: "2024-12-15" },
    {
      id: 2,
      title: "Final Project",
      course: "Spring Boot Essentials",
      deadline: "2024-12-20",
    },
  ]);

  // Form state
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    course: "",
    deadline: "",
  });

  // Handle form submission
  const handleCreateAssessment = (e) => {
    e.preventDefault();
    setAssessments([
      ...assessments,
      { ...newAssessment, id: assessments.length + 1 },
    ]);
    setNewAssessment({ title: "", course: "", deadline: "" });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Assessment Creation</h1>

      {/* Form for creating a new assessment */}
      <form onSubmit={handleCreateAssessment} style={{ marginBottom: "20px" }}>
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
        <button
          type="submit"
          style={{ padding: "10px 15px", cursor: "pointer" }}
        >
          Create Assessment
        </button>
      </form>

      {/* List of existing assessments */}
      <section>
        <h2>Existing Assessments</h2>
        <table
          border="1"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment) => (
              <tr key={assessment.id}>
                <td>{assessment.title}</td>
                <td>{assessment.course}</td>
                <td>{assessment.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AssessmentCreation;
