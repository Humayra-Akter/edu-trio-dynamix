import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ViewStudents = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const userEmail = localStorage.getItem("userEmail");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [loggedTeacherProjects, setLoggedTeacherProjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const teacherEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch("http://localhost:5000/teacher/project")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });

    fetch("http://localhost:5000/student/collaborate")
      .then((res) => res.json())
      .then((data) => {
        setCollaborators(data);
      });
  }, []);

  useEffect(() => {
    if (teacherEmail) {
      const filteredProjects = projects.filter(
        (project) => project.teacherEmail === teacherEmail
      );
      setLoggedTeacherProjects(filteredProjects);
    }
  }, [teacherEmail, projects]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const getCollaboratorsForProject = (projectId) => {
    return collaborators.filter((collab) => collab.project._id === projectId);
  };

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/teacher/project?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setLoggedTeacherProjects(data);
        });
    }
  }, [userEmail]);

  const handleCreateAssignment = (data) => {
    if (selectedCourse) {
      const newAssignment = {
        ...data,
        teacherEmail: userEmail,
        course: selectedCourse._id, // Assign course ID
        batch: selectedCourse.batch,
        grade: selectedCourse.grade,
      };
      fetch("http://localhost:5000/teacher/assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssignment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error creating assignment:", error));
    } else {
      toast.error("Selected course is null.");
    }
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setValue("batchName", course.batch);
    setValue("grade", course.grade);
    setValue("subject", course.subject);
  };

  return (
    <div className="flex bg-gradient-to-r from-neutral via-blue-100 to-neutral">
      <div className="p-8">
        <div className="bg-gradient-to-r from-neutral via-blue-100 to-neutral px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-primary capitalize font-bold">
              Student List
            </h2>
          </div>
          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex flex-wrap justify-center">
            {loggedTeacherProjects.map((project) => (
              <div
                key={project._id}
                className="card max-w-2xl bg-gradient-to-b from-yellow-50 to-blue-300 shadow-xl m-4 p-4"
                onClick={() => {
                  handleOpenModal(project);
                  handleCourseSelect(project);
                }}
              >
                <h2 className="text-lg font-bold">{project.project}</h2>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Teacher Name:
                  </span>{" "}
                  {project.teacherName}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Batch:
                  </span>{" "}
                  {project.batch}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Grade:
                  </span>{" "}
                  {project.grade}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">Type:</span>{" "}
                  {project.type}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Submit Last Date:
                  </span>{" "}
                  {project.submitLastDate}
                </p>
                <div className="flex justify-center items-center mt-2">
                  {project.type === "group" && (
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
                        COLLABORATORS
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
                  )}
                </div>
              </div>
            ))}

            {loggedTeacherProjects.length === 0 && (
              <p>No projects available for the logged-in teacher.</p>
            )}
          </div>
        </div>
      </div>
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md max-w-md">
            <h2 className="text-2xl text-primary font-bold mb-4">
              Collaborators for {selectedProject.project}
            </h2>
            {/* <ul className="text-center">
              {getCollaboratorsForProject(selectedProject._id).map(
                (collaborator) => (
                  <li key={collaborator.student._id}>
                    {collaborator.student.name}
                  </li>
                )
              )}
            </ul> */}
            {getCollaboratorsForProject(selectedProject._id).length > 0 ? (
              <ul className="text-center">
                {getCollaboratorsForProject(selectedProject._id).map(
                  (collaborator) => (
                    <li key={collaborator.student._id}>
                      {collaborator.student.name}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-center text-red-600 text-md font-bold text-blue-700">
                No collaboration so far.
              </p>
            )}
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handleCloseModal}
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
                  CLOSE
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
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
