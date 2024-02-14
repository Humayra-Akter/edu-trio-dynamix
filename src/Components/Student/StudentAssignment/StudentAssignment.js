import React, { useState, useEffect } from "react";

const StudentAssignment = ({ userEmail }) => {
  const [appliedProjects, setAppliedProjects] = useState([]);

  useEffect(() => {
    // Fetch applied projects for the logged-in student
    fetch(`http://localhost:5000/student/project?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setAppliedProjects(data));
  }, [userEmail]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
        Your Applied Projects
      </h1>
      <div className=" flex justify-center items-center ">
        {appliedProjects.map((appliedProject) => (
          <div
            key={appliedProject._id}
            className="bg-gradient-to-b from-slate-100 to-blue-300 border-gray-300 rounded-lg p-4 m-6 w-2/3 shadow-md"
          >
            <h2 className="text-lg font-semibold mb-2">
              {appliedProject.project.project}
            </h2>
            <p>
              <strong className="text-black font-bold">Batch:</strong>{" "}
              {appliedProject.project.batch}
            </p>
            <p>
              <strong className="text-black font-bold">Class:</strong>{" "}
              {appliedProject.project.grade}
            </p>
            <p>
              <strong className="text-black font-bold">Subject:</strong>{" "}
              {appliedProject.project.time}
            </p>
            <p>
              <strong className="text-black font-bold">Type:</strong>{" "}
              {appliedProject.project.type}
            </p>
            <p>
              <strong className="text-black font-bold">
                Expected Outcome:
              </strong>{" "}
              {appliedProject.project.expectedOutcome}
            </p>
            <p>
              <strong className="text-black font-bold">
                Last day of Submit:
              </strong>{" "}
              {appliedProject.project.submitLastDate}
            </p>
            <p>
              <strong className="text-black font-bold">Teacher Name:</strong>{" "}
              {appliedProject.project.teacherName}
            </p>
            <p>
              <strong className="text-black font-bold">Teacher Email:</strong>{" "}
              {appliedProject.project.teacherEmail}
            </p>
            <p>
              <strong className="text-black font-bold">Requirement:</strong>{" "}
              {appliedProject.project.requirement}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignment;
