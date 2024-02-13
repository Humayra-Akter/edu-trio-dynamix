import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Document, Page } from "react-pdf";

const TeacherProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedTeacher, setLoggedTeacher] = useState({});
  const [projects, setProjects] = useState([]);
  const [file, setFile] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (userRole === "teacher" && userEmail) {
      fetch(`http://localhost:5000/teacher?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === userEmail
            );
            if (matchingUser) {
              setLoggedTeacher(matchingUser);
            }
          }
        });
    }

    fetch("http://localhost:5000/teacher/project")
      .then((res) => res.json())
      .then((data) => data);
  }, []);

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  const handleAddProject = async (data) => {
    const { name, email } = loggedTeacher;
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5000/teacher/project", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const project = {
            ...data,
            teacherName: name,
            teacherEmail: email,
            fileUrl: imgData.data.url,
          };
          fetch("http://localhost:5000/teacher/project", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(project),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.project} welcome to EdiTrio Dynamos`);
              setProjects([...projects, result]);
            })
            .catch((error) => {
              console.error("Error adding project:", error);
              toast.error("Error adding project");
            });
        } else {
          toast.error("Failed to upload file");
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file");
      });
  };

  console.log(projects);

  return (
    <div className="flex flex-wrap bg-gradient-to-r from-neutral via-blue-100 to-neutral">
      {/* Left half of the screen */}
      <div className="w-1/2 p-4 my-10 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
          Project
        </h1>
        <div className="flex flex-wrap justify-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-l from-neutral to-accent border border-gray-300 rounded-lg p-4 m-4 w-80 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{project.project}</h2>
              <p>
                <strong>Batch:</strong> {project.batch}
              </p>
              <p>
                <strong>Class:</strong> {project.grade}
              </p>
              <p>
                <strong>Time:</strong> {project.time}
              </p>
              <p>
                <strong>Teacher Name:</strong> {project.teacherName}
              </p>{" "}
              <p>
                <strong>Teacher Email:</strong> {project.teacherEmail}
              </p>
              {userEmail === project.teacherEmail && (
                <div className="flex mt-4">
                  <button
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
                      VIEW STUDENTS
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Right half of the screen */}
      <div className="w-1/3">
        <div className="w-full p-6 bg-gradient-to-t from-yellow-500 to-yellow-100 my-20">
          <h1 className="text-2xl font-semibold text-center uppercase text-primary mb-4">
            Add Project
          </h1>
          <form onSubmit={handleSubmit(handleAddProject)} className="space-y-4">
            <div>
              <label className="block mb-1">Project Title:</label>
              <input
                type="text"
                {...register("project", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              {errors.project && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Batch:</label>
              <input
                type="text"
                {...register("batch", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              {errors.batch && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {/* <div>
              <label className="block mb-1">Upload file:</label>
              <input
                type="file"
                onChange={handleFile}
                {...register("file", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              {errors.file && (
                <span className="text-red-500">This field is required</span>
              )}
            </div> */}
            <div>
              <label className="block mb-1">Class:</label>
              <select
                {...register("grade", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              >
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </select>
              {errors.grade && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Category:</label>
              <select
                {...register("time", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              >
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="math">Math</option>
                <option value="biology">Biology</option>
              </select>
              {errors.time && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
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
                  ADD PROJECT MATERIAL
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
            </div>
          </form>
        </div>

        <div className="w-full p-6 bg-gradient-to-t from-yellow-500 to-yellow-100 my-20">
          <h1 className="text-2xl font-semibold text-center uppercase text-primary mb-4">
            View PDF
          </h1>
          <PDFViewer />
        </div>
      </div>
    </div>
  );
};

class PDFViewer extends React.Component {
  state = {
    selectedFile: null,
    numPages: null,
    pageNumber: 1,
    pdfData: null,
  };

  onFileLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ pdfData: e.target.result });
    };
    reader.readAsArrayBuffer(file);
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages, pdfData } = this.state;
    return (
      <>
        <input type="file" accept=".pdf" onChange={this.onFileLoad} />

        {pdfData && (
          <Document file={pdfData} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        )}

        {pdfData && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
      </>
    );
  }
}

export default TeacherProject;
