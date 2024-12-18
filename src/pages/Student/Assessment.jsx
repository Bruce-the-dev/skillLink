import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AssessmentSubmissionPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState({});
  const { courseId } = useParams();
  // const userId = 42; // Replace with actual user ID logic

  // Fetch assessments from the backend
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/assessments/course/${courseId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch assessments.");
        }

        const data = await response.json();

        // Transform data for frontend usage
        const transformedAssessments = data.map((assessment) => ({
          id: assessment.assessmentId,
          course: assessment.course.title,
          title: `${assessment.type}: Assessment ${assessment.assessmentId}`,
          description: `This is a ${assessment.type.toLowerCase()} assessment.`,
          submissionType: assessment.type === "Project" ? "file" : "text",
          isGraded: false,
          feedback: null,
        }));

        setAssessments(transformedAssessments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assessments:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [courseId]);

  // Handle file selection
  const handleFileChange = (e, assessmentId) => {
    setSelectedFile((prevState) => ({
      ...prevState,
      [assessmentId]: e.target.files[0],
    }));
  };

  // Handle file submission
  const handleFileSubmit = async (assessmentId) => {
    const file = selectedFile[assessmentId];
    if (!file) {
      toast.error("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "submission",
      JSON.stringify({
        assessment: { assessmentId },
        user: { userId },
        submissionDate: new Date().toISOString(),
      })
    );

    try {
      const response = await fetch(
        `http://localhost:8080/api/assessment-submissions/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("File submission failed.");
      }

      toast.success("File submitted successfully!");
      setSelectedFile((prevState) => ({
        ...prevState,
        [assessmentId]: null,
      }));
    } catch (err) {
      console.error("Error submitting file:", err);
      toast.error("File submission failed.");
    }
  };

  if (loading) {
    return <div>Loading assessments...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.page}>
      <ToastContainer />
      <h1>Assessment Submissions</h1>
      {assessments.length > 0 ? (
        assessments.map((assessment) => (
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
                      onChange={(e) => handleFileChange(e, assessment.id)}
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
                        toast.info(
                          "Text submission for assessments is not yet implemented."
                        )
                      }
                    ></textarea>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
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
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default AssessmentSubmissionPage;
