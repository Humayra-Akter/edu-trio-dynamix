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
        const userProjects = data?.filter(
          (project) => project.student.email === userEmail
        );
        const uniqueProjects = userProjects?.reduce((acc, current) => {
          const x = acc.find(
            (item) => item.project?._id === current.project?._id
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

    const project = appliedProjects.find(
      (project) => project.project._id === projectId
    );

    if (!project) {
      console.error("Project not found.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("projectId", projectId);
    formData.append("userEmail", userEmail);
    formData.append("batch", project.project.batch);
    formData.append("grade", project.project.grade);
    formData.append("subject", project.project.time);
    formData.append("type", project.project.type);
    formData.append("teacherName", project.project.teacherName);
    formData.append("teacherEmail", project.project.teacherEmail);
    formData.append("expectedOutcome", project.project.expectedOutcome);
    formData.append("requirement", project.project.requirement);

    try {
      const response = await fetch("http://localhost:5000/uploadFile", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        toast.success("PDF file uploaded successfully.");
        setSelectedFile(null);
        fetchUploadedFiles();

        // Reload the window three times
        setTimeout(() => window.location.reload(), 1000); // First reload
        setTimeout(() => window.location.reload(), 2000); // Second reload
        setTimeout(() => window.location.reload(), 3000); // Third reload
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
        const userFiles = files.filter(
          (file) => file.userEmail.userEmail === userEmail
        );

        console.log(userFiles);
        setUploadedFiles(userFiles);
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
        {appliedProjects?.map(
          (appliedProject) =>
            appliedProjects && (
              <div
                key={appliedProject?._id}
                className="bg-gradient-to-b from-slate-100 to-blue-300 border-gray-300 rounded-lg p-4 m-6 w-2/3 shadow-md"
              >
                <div>
                  <h2 className="text-lg capitalize font-semibold mb-2">
                    {appliedProject.project.project}
                  </h2>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Batch:
                    </span>{" "}
                    {appliedProject.project.batch}
                  </p>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Class:
                    </span>{" "}
                    {appliedProject.project.grade}
                  </p>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Subject:
                    </span>{" "}
                    {appliedProject.project.time}
                  </p>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Type:
                    </span>{" "}
                    {appliedProject.project.type}
                  </p>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Expected Outcome:
                    </span>{" "}
                    {appliedProject.project.expectedOutcome}
                  </p>
                  <p className="text-red-600">
                    <span className="text-md font-bold text-blue-700">
                      Remaining Days to Submit:
                    </span>{" "}
                    {getRemainingDays(appliedProject.project.submitLastDate)}{" "}
                    days
                  </p>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Teacher Name:
                    </span>{" "}
                    {appliedProject.project.teacherName}
                  </p>
                  <p>
                    <span className="text-md font-bold text-blue-700">
                      Teacher Email:
                    </span>{" "}
                    {appliedProject.project.teacherEmail}
                  </p>
                  <p className="capitalize">
                    <span className="text-md font-bold text-blue-700">
                      Requirement:
                    </span>{" "}
                    {appliedProject.project.requirement}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                  {/* Check if any file is uploaded for this project */}
                  {uploadedFiles.some(
                    (file) =>
                      file.projectId === appliedProject.project._id &&
                      file.userEmail.userEmail === userEmail
                  ) ? (
                    uploadedFiles
                      .filter(
                        (file) =>
                          file.projectId === appliedProject.project._id &&
                          file.userEmail.userEmail === userEmail
                      )
                      .map((file) => (
                        <div key={file._id}>
                          <p>
                            <span className="text-md font-bold text-blue-700">
                              Uploaded File:
                            </span>{" "}
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
                    // If no file is uploaded by the current user for the project, show the upload section
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
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "2px",
                          marginTop: "4px",
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
                        <span
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
                        </span>
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
