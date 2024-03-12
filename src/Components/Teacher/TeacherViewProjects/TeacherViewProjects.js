import React, { useState, useEffect } from "react";

const TeacherViewProjects = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const teacherEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch(`http://localhost:5000/uploadFile`)
      .then((res) => res.json())
      .then((data) => {
        const filesForTeacher = data.filter(
          (file) => file.userEmail.teacherEmail === teacherEmail
        );
        setUploadedFiles(filesForTeacher);
      })
      .catch((error) => {
        console.error("Error fetching uploaded files:", error);
      });
  }, [teacherEmail]);

  return (
    <div className="p-6 bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <h1 className="text-3xl text-center text-neutral font-bold mb-7">
        Uploaded Files
      </h1>
      {uploadedFiles.length > 0 ? (
        <div className="flex flex-wrap gap-4 mx-40 md:grid-cols-2 lg:grid-cols-3 ">
          {uploadedFiles.map((file) => (
            <div
              key={file._id}
              className="border p-4  bg-gradient-to-b from-yellow-50 to-blue-300  border-gray-300 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                {file.originalFileName}
              </h2>
              <p>
                <span className="text-md font-bold text-blue-700">Batch:</span>{" "}
                {file.userEmail.batch}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">Grade:</span>{" "}
                {file.userEmail.grade}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">
                  Subject:
                </span>{" "}
                {file.userEmail.subject}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">Type:</span>{" "}
                {file.userEmail.type}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">
                  Teacher Name:
                </span>{" "}
                {file.userEmail.teacherName}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">
                  Teacher Email:
                </span>{" "}
                {file.userEmail.teacherEmail}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">
                  Expected Outcome:
                </span>{" "}
                {file.userEmail.expectedOutcome}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">
                  Requirement:
                </span>{" "}
                {file.userEmail.requirement}
              </p>
              <div className="flex my-7 items-center justify-center">
                <a
                  href={file.cloudinaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-black underline"
                >
                  View File
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl font-semibold">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default TeacherViewProjects;
