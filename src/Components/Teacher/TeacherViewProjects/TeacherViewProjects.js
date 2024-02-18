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
    <div className="p-6 bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <h1 className="text-3xl text-center text-primary font-bold mb-7">
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
                <strong>Batch:</strong> {file.userEmail.batch}
              </p>
              <p>
                <strong>Grade:</strong> {file.userEmail.grade}
              </p>
              <p>
                <strong>Subject:</strong> {file.userEmail.subject}
              </p>
              <p>
                <strong>Type:</strong> {file.userEmail.type}
              </p>
              <p>
                <strong>Teacher Name:</strong> {file.userEmail.teacherName}
              </p>
              <p>
                <strong>Teacher Email:</strong> {file.userEmail.teacherEmail}
              </p>
              <p>
                <strong>Expected Outcome:</strong>{" "}
                {file.userEmail.expectedOutcome}
              </p>
              <p>
                <strong>Requirement:</strong> {file.userEmail.requirement}
              </p>
              <div className="flex my-7 items-center justify-center">
                <a
                  href={file.cloudinaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-black underline"
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
