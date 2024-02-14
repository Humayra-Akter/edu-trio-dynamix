import React, { useState, useEffect } from "react";

const StudentAssignment = ({ userEmail }) => {
  const [appliedProjects, setAppliedProjects] = useState([]);

  useEffect(() => {
    // Fetch applied projects for the logged-in student
    fetch(`http://localhost:5000/student/project?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out duplicate projects
        const uniqueProjects = data.reduce((acc, current) => {
          const x = acc.find(
            (item) => item.project._id === current.project._id
          );
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setAppliedProjects(uniqueProjects);
      });
  }, [userEmail]);

  // Function to calculate remaining days between two dates
  const getRemainingDays = (submissionDate) => {
    const now = new Date();
    const deadline = new Date(submissionDate);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 h-screen">
      <h1 className="text-2xl font-bold text-center uppercase text-primary mb-7 pt-10">
        Your Applied Projects
      </h1>
      <div className="flex items-center justify-center">
        {appliedProjects.map((appliedProject) => (
          <div
            key={appliedProject._id}
            className="bg-gradient-to-b from-slate-100 to-blue-300 border-gray-300 rounded-lg p-4 m-6 w-2/3 shadow-md"
          >
            <h2 className="text-lg capitalize font-semibold mb-2">
              {appliedProject.project.project}
            </h2>
            <p className="capitalize">
              <strong className="text-black font-bold">Batch:</strong>{" "}
              {appliedProject.project.batch}
            </p>
            <p className="capitalize">
              <strong className="text-black font-bold">Class:</strong>{" "}
              {appliedProject.project.grade}
            </p>
            <p className="capitalize">
              <strong className="text-black font-bold">Subject:</strong>{" "}
              {appliedProject.project.time}
            </p>
            <p className="capitalize">
              <strong className="text-black font-bold">Type:</strong>{" "}
              {appliedProject.project.type}
            </p>
            <p className="capitalize">
              <strong className="text-black font-bold">
                Expected Outcome:
              </strong>{" "}
              {appliedProject.project.expectedOutcome}
            </p>
            <p className="text-red-600">
              <strong className="text-black font-bold">
                Remaining Days to Submit:
              </strong>
              {getRemainingDays(appliedProject.project.submitLastDate)} days
            </p>
            <p className="capitalize">
              <strong className="text-black font-bold">Teacher Name:</strong>
              {appliedProject.project.teacherName}
            </p>
            <p>
              <strong className="text-black font-bold">Teacher Email:</strong>
              {appliedProject.project.teacherEmail}
            </p>
            <p className="capitalize">
              <strong className="text-black font-bold">Requirement:</strong>
              {appliedProject.project.requirement}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignment;
