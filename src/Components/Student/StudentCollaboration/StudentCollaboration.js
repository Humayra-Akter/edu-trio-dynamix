import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MyCollaboration from "./MyCollaboration";

const StudentCollaboration = () => {
  const {
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [projects, setGroupProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [collabProject, setCollabProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    fetch("http://localhost:5000/teacher/project")
      .then((res) => res.json())
      .then((teacherProjects) => {
        const groupProjects = teacherProjects.filter(
          (project) => project.type === "group"
        );
        setGroupProjects(groupProjects);

        // Fetch student collaborations
        fetch("http://localhost:5000/student/collaborate")
          .then((res) => res.json())
          .then((collaborations) => {
            const matchingCollaborations = collaborations.filter((collab) =>
              teacherProjects.some(
                (project) => project._id === collab.project._id
              )
            );
            if (matchingCollaborations.length > 0) {
              setCollabProject(matchingCollaborations);
            }
          });
      });
  }, []);

  const handleSignup = (project) => {
    if (!project) {
      alert("Project data is invalid.");
      return;
    }

    if (loggedStudent.gradeYear !== project.grade) {
      toast.warning("You are not eligible for this project.");
      return;
    }

    const applicationData = {
      student: loggedStudent,
      project: project,
    };
    console.log(applicationData);

    fetch("http://localhost:5000/student/collaborate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Application successful", data);
        setSelectedProject(project);
      })
      .catch((error) => {
        console.error("Error while signing up for project:", error);
        toast.error("Failed to sign up for project. Please try again.");
      });
  };

  const handleModal = (project) => {
    setSelectedProject(project);
    const modal = document.getElementById("studentCollaboration");
    modal.showModal();
  };

  const uniqueCollaborators = new Set();

  return (
    <div>
      <div className="flex flex-wrap bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 ">
        <div className="p-4 mx-auto">
          <div className="flex items-center justify-center">
            <MyCollaboration />
          </div>{" "}
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            ALL Projects
          </h1>
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {project.project}
                </h2>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Batch:
                  </span>{" "}
                  {project.batch}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Class:
                  </span>{" "}
                  {project.grade}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Subject:
                  </span>{" "}
                  {project.time}
                </p>
                <p className="capitalize font-bold">
                  <span className="text-md font-bold text-blue-700">Type:</span>{" "}
                  {project.type}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Expected Outcome:
                  </span>{" "}
                  {project.expectedOutcome}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Skills:
                  </span>{" "}
                  {selectedProject?.skills ? selectedProject.skills : "n/a"}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Last day of Submit:
                  </span>{" "}
                  {project.submitLastDate}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Teacher Name:
                  </span>{" "}
                  {project.teacherName}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Teacher Email:
                  </span>{" "}
                  {project.teacherEmail}
                </p>
                {project.type === "group" &&
                  collabProject &&
                  collabProject.length > 0 &&
                  collabProject.map((collab) => {
                    if (
                      collab.project._id === project._id &&
                      !uniqueCollaborators.has(collab.student._id)
                    ) {
                      uniqueCollaborators.add(collab.student._id);
                      return (
                        <div key={collab._id}>
                          <p>
                            <span className="text-md font-bold text-blue-700">
                              Collaborator:
                            </span>{" "}
                            {collab.student.name}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}

                <div className="flex items-center justify-center gap-5 mt-4">
                  <button
                    onClick={() => handleModal(project)}
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
                      DETAILS
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
                  <button
                    onClick={() => handleSignup(project)}
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
                      COLLABORATE
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="studentCollaboration"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center justify-center gap-11">
                {selectedProject && (
                  <div
                    key={selectedProject.id}
                    className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      {selectedProject.project}
                    </h2>
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Batch:
                      </span>{" "}
                      {selectedProject.batch}
                    </p>
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Class:
                      </span>{" "}
                      {selectedProject.grade}
                    </p>
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Subject:
                      </span>{" "}
                      {selectedProject.time}
                    </p>{" "}
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Skills:
                      </span>{" "}
                      {selectedProject?.skills ? selectedProject.skills : "n/a"}
                    </p>
                    <p className="capitalize font-bold">
                      <span className="text-md font-bold text-blue-700">
                        Type:
                      </span>{" "}
                      {selectedProject.type}
                    </p>
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Expected Outcome:
                      </span>{" "}
                      {selectedProject.expectedOutcome}
                    </p>
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Last day of Submit:
                      </span>{" "}
                      {selectedProject.submitLastDate}
                    </p>
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Teacher Name:
                      </span>{" "}
                      {selectedProject.teacherName}
                    </p>{" "}
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Teacher Email:
                      </span>{" "}
                      {selectedProject.teacherEmail}
                    </p>{" "}
                    <p>
                      <span className="text-md font-bold text-blue-700">
                        Requirement:
                      </span>{" "}
                      {selectedProject.requirement}
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <button
                        onClick={() =>
                          document
                            .getElementById("studentCollaboration")
                            .close()
                        }
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
                          CLOSE
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
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default StudentCollaboration;
