import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const StudentAssignment = () => {
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/student/project?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        const userProjects = data.filter(
          (project) => project.student.email === userEmail
        );
        const uniqueProjects = userProjects.reduce((acc, current) => {
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

  const getRemainingDays = (submissionDate) => {
    const now = new Date();
    const deadline = new Date(submissionDate);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to upload this file?"
    );
    if (!confirmed) return;

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("projectId", projectId);

    try {
      const response = await fetch("http://localhost:5000/uploadFile", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        toast.success("PDF file uploaded successfully.");
        setSelectedFile(null);
        fetchUploadedFiles();
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/uploadFile");
      if (response.ok) {
        const files = await response.json();
        setUploadedFiles(files);
      }
    } catch (error) {
      console.error("Failed to fetch uploaded files:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <h1 className="text-2xl font-bold text-center uppercase text-primary mb-7 pt-10">
        Your Applied Projects
      </h1>
      <div className="grid grid-cols-1 ml-80">
        {appliedProjects.map(
          (appliedProject) =>
            appliedProjects && (
              <div
                key={appliedProject._id}
                className="bg-gradient-to-b from-slate-100 to-blue-300 border-gray-300 rounded-lg p-4 m-6 w-2/3 shadow-md"
              >
                <div>
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
                    </strong>{" "}
                    {getRemainingDays(appliedProject.project.submitLastDate)}{" "}
                    days
                  </p>
                  <p className="capitalize">
                    <strong className="text-black font-bold">
                      Teacher Name:
                    </strong>{" "}
                    {appliedProject.project.teacherName}
                  </p>
                  <p>
                    <strong className="text-black font-bold">
                      Teacher Email:
                    </strong>{" "}
                    {appliedProject.project.teacherEmail}
                  </p>
                  <p className="capitalize">
                    <strong className="text-black font-bold">
                      Requirement:
                    </strong>{" "}
                    {appliedProject.project.requirement}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                  {/* Check if any file is uploaded for this project */}
                  {uploadedFiles.some(
                    (file) => file.projectId === appliedProject.project._id
                  ) ? (
                    uploadedFiles
                      .filter(
                        (file) => file.projectId === appliedProject.project._id
                      )
                      .map((file) => (
                        <div key={file._id}>
                          <p>
                            <strong className="text-black font-bold">
                              Uploaded File:
                            </strong>{" "}
                            <a
                              href={file.cloudinaryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.originalFileName}
                            </a>
                          </p>
                        </div>
                      ))
                  ) : (
                    // If no file is uploaded, show the upload section
                    <div>
                      <h1 className="text-xl font-bold mb-2">Upload PDF</h1>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      <button
                        onClick={() =>
                          handleFileUpload(appliedProject.project._id)
                        }
                      >
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default StudentAssignment;
