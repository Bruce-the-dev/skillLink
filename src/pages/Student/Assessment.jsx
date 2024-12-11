import React, { useState, useEffect } from "react";

function AssessmentSubmissionPage() {
  const [assessments, setAssessments] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Mock Data Initialization (replace with API calls)
  useEffect(() => {
    // Fetch assessments
    const fetchAssessments = async () => {
      // Mock API response
      const mockAssessments = [
        {
          id: 1,
          course: "React Basics",
          title: "Project: Build a Todo App",
          description: "Create a fully functional todo app using React.",
          submissionType: "file", // file or text
          isGraded: true,
          feedback: "Great work! Score: 85/100",
        },
        {
          id: 2,
          course: "React Basics",
          title: "Quiz: React Components",
          description: "Answer the following multiple-choice questions.",
          submissionType: "text",
          isGraded: false,
          feedback: null,
        },
      ];

      setAssessments(mockAssessments);
    };

    fetchAssessments();
  }, []);

  // Handle file submission
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmit = (assessmentId) => {
    if (selectedFile) {
      alert(`File submitted for assessment ID: ${assessmentId}`);
      setSelectedFile(null);
      // Add API call for file submission here
    } else {
      alert("Please select a file before submitting.");
    }
  };

  // Handle text submission
  const handleTextSubmit = (assessmentId, textValue) => {
    alert(`Text submitted for assessment ID: ${assessmentId}:\n${textValue}`);
    // Add API call for text submission here
  };

  return (
    <div style={styles.page}>
      <h1>Assessment Submissions</h1>

      {assessments.length > 0 ? (
        <div>
          {assessments.map((assessment) => (
            <div key={assessment.id} style={styles.assessmentCard}>
              <h3>{assessment.title}</h3>
              <p>
                <strong>Course:</strong> {assessment.course}
              </p>
              <p>{assessment.description}</p>

              {/* Feedback Section */}
              {assessment.isGraded ? (
                <p style={styles.feedback}>
                  <strong>Feedback:</strong> {assessment.feedback}
                </p>
              ) : (
                <p style={styles.pending}>Feedback Pending</p>
              )}

              {/* Submission Options */}
              {!assessment.isGraded && (
                <div style={styles.submissionSection}>
                  {assessment.submissionType === "file" ? (
                    <div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={styles.fileInput}
                      />
                      <button
                        style={styles.submitButton}
                        onClick={() => handleFileSubmit(assessment.id)}
                      >
                        Submit File
                      </button>
                    </div>
                  ) : (
                    <div>
                      <textarea
                        placeholder="Enter your answer here..."
                        rows="4"
                        cols="50"
                        style={styles.textArea}
                        onBlur={(e) =>
                          handleTextSubmit(assessment.id, e.target.value)
                        }
                      ></textarea>
                      <button
                        style={styles.submitButton}
                        onClick={() =>
                          alert(
                            "Please click outside the text area to submit the text."
                          )
                        }
                      >
                        Submit Text
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No assessments available.</p>
      )}
    </div>
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
  assessmentCard: {
    padding: "15px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  feedback: {
    backgroundColor: "#e8f5e9",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #c8e6c9",
    marginTop: "10px",
  },
  pending: {
    backgroundColor: "#fff3e0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ffcc80",
    marginTop: "10px",
  },
  submissionSection: {
    marginTop: "15px",
  },
  fileInput: {
    marginBottom: "10px",
  },
  textArea: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AssessmentSubmissionPage;
