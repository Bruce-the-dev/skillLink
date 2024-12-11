import React, { useState } from "react";

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
    <div>
      <h2>Assessment Grading</h2>
      <table>
        <thead>
          <tr>
            <th>Learner</th>
            <th>Assessment</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.learnerName}</td>
              <td>{submission.assessmentTitle}</td>
              <td>{submission.status}</td>
              <td>{submission.feedback}</td>
              <td>
                {submission.status === "Pending" && (
                  <button
                    onClick={() => handleGrade(submission.id, "Well done!")}
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
