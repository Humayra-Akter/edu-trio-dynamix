import React, { useState, useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { toast } from "react-toastify";

const StudentAssignment = ({ userEmail }) => {
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  console.log(appliedProjects);

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

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("pdfFile", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/uploadFile", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast.success("PDF file uploaded successfully.");
      } else {
        toast.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <h1 className="text-2xl font-bold text-center uppercase text-primary mb-7 pt-10">
        Your Applied Projects
      </h1>
      <div className="grid grid-cols-1 ml-80">
        {appliedProjects.map(
          (appliedProject) =>
            appliedProject &&
            appliedProject.project && (
              <div className="bg-gradient-to-b from-slate-100 to-blue-300 border-gray-300 rounded-lg p-4 m-6 w-2/3 shadow-md">
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
                    </strong>
                    {getRemainingDays(appliedProject.project.submitLastDate)}{" "}
                    days
                  </p>
                  <p className="capitalize">
                    <strong className="text-black font-bold">
                      Teacher Name:
                    </strong>
                    {appliedProject.project.teacherName}
                  </p>
                  <p>
                    <strong className="text-black font-bold">
                      Teacher Email:
                    </strong>
                    {appliedProject.project.teacherEmail}
                  </p>
                  <p className="capitalize">
                    <strong className="text-black font-bold">
                      Requirement:
                    </strong>
                    {appliedProject.project.requirement}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                  <h1 className="text-xl font-bold mb-2">Upload PDF</h1>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleFileUpload}
                    disabled={!selectedFile}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default StudentAssignment;
