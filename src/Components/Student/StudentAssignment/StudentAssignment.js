import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const StudentAssignment = ({ userEmail }) => {
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (projectId) => {
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
        // Refetch uploaded files after successful upload
        fetchUploadedFiles();
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Fetch uploaded files from the backend
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
        {appliedProjects.map((appliedProject) => (
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
                {getRemainingDays(appliedProject.project.submitLastDate)} days
              </p>
              <p className="capitalize">
                <strong className="text-black font-bold">Teacher Name:</strong>{" "}
                {appliedProject.project.teacherName}
              </p>
              <p>
                <strong className="text-black font-bold">Teacher Email:</strong>{" "}
                {appliedProject.project.teacherEmail}
              </p>
              <p className="capitalize">
                <strong className="text-black font-bold">Requirement:</strong>{" "}
                {appliedProject.project.requirement}
              </p>
            </div>
            {/* Check if any file is uploaded for this project */}
            <div className="flex flex-col items-center justify-center mt-8">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile._id}>
                  {appliedProject.project._id === uploadedFile.projectId ? (
                    <div>
                      <p>
                        <strong className="text-black font-bold">
                          Uploaded File:
                        </strong>{" "}
                        <a
                          href={uploadedFile.cloudinaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {uploadedFile.originalFileName}
                        </a>
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
              {/* Render upload PDF section */}
              {selectedFile ? (
                <button
                  onClick={() => handleFileUpload(appliedProject.project._id)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "13rem",
                    overflow: "hidden",
                    height: "3rem",
                    backgroundSize: "300% 300%",
                    backdropFilter: "blur(1rem)",
                    borderRadius: "5rem",
                    transition: "0.5s",
                    border: "double 4px transparent",
                    backgroundImage:
                      "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box, border-box",
                    animation: "gradient_301 5s ease infinite",
                  }}
                >
                  <strong
                    style={{
                      zIndex: 2,
                      fontFamily: "Avalors Personal Use",
                      fontSize: "12px",
                      letterSpacing: "5px",
                      color: "#FFFFFF",
                      textShadow: "0 0 4px white",
                    }}
                  >
                    UPLOAD
                  </strong>
                  <div
                    id="container-stars"
                    style={{
                      position: "absolute",
                      zIndex: -1,
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      transition: "0.5s",
                      backdropFilter: "blur(1rem)",
                      borderRadius: "5rem",
                    }}
                  >
                    <div
                      id="stars"
                      style={{
                        position: "relative",
                        background: "transparent",
                        width: "200rem",
                        height: "200rem",
                        animation: "animStarRotate 90s linear infinite",
                      }}
                    ></div>
                  </div>
                  <div
                    id="glow"
                    style={{
                      position: "absolute",
                      display: "flex",
                      width: "12rem",
                    }}
                  >
                    <div
                      className="circle"
                      style={{
                        width: "100%",
                        height: "30px",
                        filter: "blur(2rem)",
                        animation: "pulse_3011 4s infinite",
                        zIndex: -1,
                      }}
                    ></div>
                    <div
                      className="circle"
                      style={{
                        width: "100%",
                        height: "30px",
                        filter: "blur(2rem)",
                        animation: "pulse_3011 4s infinite",
                        zIndex: -1,
                      }}
                    ></div>
                  </div>
                </button>
              ) : (
                <div>
                  <h1 className="text-xl font-bold mb-2">Upload PDF</h1>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignment;
