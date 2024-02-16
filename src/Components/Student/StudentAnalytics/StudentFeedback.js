import React, { useState } from "react";

const StudentFeedback = ({ course }) => {
  // State variables to store the feedback data
  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(null);

  // Check if course is defined before rendering
  if (!course) {
    return <div>No course information available</div>;
  }

  // Function to handle submission of feedback
  const handleSubmitFeedback = () => {
    // Assuming you have an API endpoint to submit feedback
    fetch("http://localhost:5000/student/submitFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: course._id,
        rating,
        remarks,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the submitted feedback
        setSubmittedFeedback(data);
      })
      .catch((error) => console.error("Error submitting feedback:", error));
  };

  return (
    <div>
      {submittedFeedback ? (
        <div>
          <h2>Feedback Submitted</h2>
          <p>Rating: {submittedFeedback.rating}</p>
          <p>Remarks: {submittedFeedback.remarks}</p>
        </div>
      ) : (
        <div>
          <h2>Give Feedback for {course.course}</h2>
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <br />
          <label>
            Remarks:
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleSubmitFeedback}>Submit Feedback</button>
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
