import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewStudents = () => {
  const { id } = useParams();
  const [studentProjects, setStudentProjects] = useState([]);
  const loggedInTeacherEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchStudentProjects();
  }, [id]); // Fetch projects whenever the project ID changes

  const fetchStudentProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/student/project/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch student projects");
      }
      const data = await response.json();
      // Filter projects by teacher email
      const filteredProjects = data.filter(
        (project) => project.project.teacherEmail === loggedInTeacherEmail
      );
      setStudentProjects(filteredProjects);
    } catch (error) {
      console.error("Error fetching student projects:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 h-screen">
      <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
        Student Projects
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2  bg-gradient-to-b from-yellow-50 to-blue-300 mx-20">
        {studentProjects.map((studentProject, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">
              {studentProject.project.project}
            </h2>
            <p>
              <strong className="text-black">Student Name:</strong>{" "}
              {studentProject.student.name}
            </p>
            <p>
              <strong className="text-black">Student Email:</strong>{" "}
              {studentProject.student.email}
            </p>
            <p className="capitalize">
              <strong className="text-black">Grade:</strong>{" "}
              {studentProject.student.gradeYear}
            </p>
            <p className="capitalize">
              <strong className="text-black">Institution:</strong>{" "}
              {studentProject.student.institution}
            </p>
            <p>
              <strong className="text-black">Project Details:</strong>{" "}
              {studentProject.project.requirement}
            </p>
            <p className="capitalize">
              <strong className="text-black">Teacher Name:</strong>{" "}
              {studentProject.project.teacherName}
            </p>
            <p>
              <strong className="text-black">Batch:</strong>{" "}
              {studentProject.project.batch}
            </p>
            <p className="capitalize">
              <strong className="text-black">Subject:</strong>{" "}
              {studentProject.project.time}
            </p>
            <p className="capitalize">
              <strong className="text-black">Type:</strong>{" "}
              {studentProject.project.type}
            </p>
            <p>
              <strong className="text-black">Teacher Email:</strong>{" "}
              {studentProject.project.teacherEmail}
            </p>
            <p className="text-red-600">
              <strong className="text-black">Submission Deadline:</strong>{" "}
              {studentProject.project.submitLastDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudents;
