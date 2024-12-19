import React, { useState } from "react";
import Header from "../Header"; // Importing Header component

const AssessmentGradingPage = () => {
  const mockSubmissions = [
    {
      id: 1,
      learnerName: "John Doe",
      assessmentTitle: "Math Quiz",
      status: "Pending",
      feedback: "",
    },
    {
      id: 2,
      learnerName: "Jane Smith",
      assessmentTitle: "Science Project",
      status: "Graded",
      feedback: "Good work!",
    },
  ];

  const [submissions, setSubmissions] = useState(mockSubmissions);

  const handleGrade = (id, feedback) => {
    const updatedSubmissions = submissions.map((submission) =>
      submission.id === id
        ? { ...submission, status: "Graded", feedback }
        : submission
    );
    setSubmissions(updatedSubmissions);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #7a57d1, #6a44b5)", // Gradient background
        borderRadius: "10px",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)", // 3D effect
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Header /> {/* Including the Header component */}
      <h2
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "40px",
          fontSize: "36px",
          textTransform: "uppercase",
        }}
      >
        Assessment Grading
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "15px",
                backgroundColor: "#6a44b5",
                color: "#fff",
                textAlign: "left",
                fontSize: "18px",
                borderTopLeftRadius: "8px",
              }}
            >
              Learner
            </th>
            <th
              style={{
                padding: "15px",
                backgroundColor: "#6a44b5",
                color: "#fff",
                textAlign: "left",
                fontSize: "18px",
              }}
            >
              Assessment
            </th>
            <th
              style={{
                padding: "15px",
                backgroundColor: "#6a44b5",
                color: "#fff",
                textAlign: "left",
                fontSize: "18px",
              }}
            >
              Status
            </th>
            <th
              style={{
                padding: "15px",
                backgroundColor: "#6a44b5",
                color: "#fff",
                textAlign: "left",
                fontSize: "18px",
              }}
            >
              Feedback
            </th>
            <th
              style={{
                padding: "15px",
                backgroundColor: "#6a44b5",
                color: "#fff",
                textAlign: "left",
                fontSize: "18px",
                borderTopRightRadius: "8px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr
              key={submission.id}
              style={{
                backgroundColor: submission.status === "Graded" ? "#e8f5e9" : "#fff",
                borderBottom: "1px solid #ddd",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <td
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                {submission.learnerName}
              </td>
              <td
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                {submission.assessmentTitle}
              </td>
              <td
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                {submission.status}
              </td>
              <td
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                {submission.feedback}
              </td>
              <td
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {submission.status === "Pending" && (
                  <button
                    onClick={() => handleGrade(submission.id, "Well done!")}
                    style={{
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Grade
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentGradingPage;
