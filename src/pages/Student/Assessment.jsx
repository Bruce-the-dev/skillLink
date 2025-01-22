import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AssessmentSubmissionPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingAssessment, setLoadingAssessment] = useState(null);
  const { courseId } = useParams();
  const [cookies] = useCookies(["id"]);
  const userId = cookies.id; // Replace with actual user ID logic
  const navigate = useNavigate();

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

  // Handle assessment submission
  const handleSubmitAssessment = async (assessmentId) => {
    setLoadingAssessment(assessmentId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/assessment-submissions/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assessment: { assessmentId },
            user: { userId },
            submissionDate: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Assessment submission failed.");
      }

      toast.success("Assessment submitted successfully!");
      navigate(`/student`);
    } catch (err) {
      console.error("Error submitting assessment:", err);
      toast.error("Failed to submit assessment.");
    }
    setLoadingAssessment(null);
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

            {/* Submission Button */}
            {!assessment.isGraded && (
              <div style={styles.submissionSection}>
                <button
                  disabled={loadingAssessment === assessment.id}
                  style={styles.submitButton}
                  onClick={() => handleSubmitAssessment(assessment.id)}
                >
                  {loadingAssessment === assessment.id
                    ? "Submitting Assessment..."
                    : "Submit Assessment"}
                </button>
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
    display: "flex",
    justifyContent: "center",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default AssessmentSubmissionPage;
