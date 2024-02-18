import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyCollaboration = () => {
  const {
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [collabProjects, setCollabProjects] = useState([]);

  useEffect(() => {
    if (userRole === "student" && userEmail) {
      fetch(`http://localhost:5000/student?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === userEmail
            );
            if (matchingUser) {
              setLoggedStudent(matchingUser);
            }
          }
        });
    }

    fetch("http://localhost:5000/student/collaborate")
      .then((res) => res.json())
      .then((collaborations) => {
        const userCollabs = collaborations.filter(
          (collab) => collab.student.email === userEmail
        );
        setCollabProjects(userCollabs);
      });
  }, []);

  return (
    <div>
      {collabProjects && collabProjects.length > 0 && (
        <div className="p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            Collaborated Projects
          </h1>
          <div className="flex flex-wrap justify-center">
            {collabProjects.map((collab) => (
              <div
                key={collab._id}
                className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {collab.project.project}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {collab.project.batch}
                </p>
                <p>
                  <strong className="text-black font-bold">Class:</strong>{" "}
                  {collab.project.grade}
                </p>
                <p>
                  <strong className="text-black font-bold">Subject:</strong>{" "}
                  {collab.project.time}
                </p>
                <p className="capitalize font-bold">
                  <strong className="text-black font-bold">Type:</strong>{" "}
                  {collab.project.type}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Expected Outcome:
                  </strong>{" "}
                  {collab.project.expectedOutcome}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {collab.project.submitLastDate}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Name:
                  </strong>{" "}
                  {collab.project.teacherName}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {collab.project.teacherEmail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollaboration;
