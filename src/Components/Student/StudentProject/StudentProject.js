import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const StudentProject = () => {
  const {
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [projects, setProjects] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("project");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSignup = (project) => {
    setSelectedProject(project);
    const modal = document.getElementById("student_project");
    modal.showModal();
  };

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
      .then((data) => setProjects(data));
  }, []);

  const handleFile = (event) => {
    const file = event.target.files[0];
    setPdfData(file);
  };

  // Filter projects based on search term and category
  const filteredProjects = projects.filter((project) => {
    if (searchTerm && searchCategory && project[searchCategory]) {
      return project[searchCategory]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    return false;
  });

  console.log(projects);

  return (
    <div>
      <div className="flex flex-wrap bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 ">
        <div className=" p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            Search for Project by name
          </h1>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-col w-full mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-2"
              />
            </div>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-b from-pink-50 to-blue-300 border-gray-300 rounded-lg p-4 m-4 w-96 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {project.project}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {project.batch}
                </p>
                <p>
                  <strong className="text-black font-bold">Class:</strong>{" "}
                  {project.grade}
                </p>
                <p>
                  <strong className="text-black font-bold">Subject:</strong>{" "}
                  {project.time}
                </p>
                <p>
                  <strong className="text-black font-bold">Type:</strong>{" "}
                  {project.type}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">
                    Expected Outcome:
                  </strong>{" "}
                  {project.expectedOutcome}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {project.submitLastDate}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Name:
                  </strong>{" "}
                  {project.teacherName}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {project.teacherEmail}
                </p>
                <div className="flex items-center justify-center mt-4">
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
                      APPLY
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
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            ALL Projects
          </h1>
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {project.project}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {project.batch}
                </p>
                <p>
                  <strong className="text-black font-bold">Class:</strong>{" "}
                  {project.grade}
                </p>
                <p>
                  <strong className="text-black font-bold">Subject:</strong>{" "}
                  {project.time}
                </p>
                <p>
                  <strong className="text-black font-bold">Type:</strong>{" "}
                  {project.type}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Expected Outcome:
                  </strong>{" "}
                  {project.expectedOutcome}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {project.submitLastDate}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Name:
                  </strong>{" "}
                  {project.teacherName}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {project.teacherEmail}
                </p>
                <div className="flex items-center justify-center mt-4">
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
                      APPLY
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="student_project"
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
                      <strong className="text-black font-bold">Batch:</strong>{" "}
                      {selectedProject.batch}
                    </p>
                    <p>
                      <strong className="text-black font-bold">Class:</strong>{" "}
                      {selectedProject.grade}
                    </p>
                    <p>
                      <strong className="text-black font-bold">Subject:</strong>{" "}
                      {selectedProject.time}
                    </p>
                    <p>
                      <strong className="text-black font-bold">Type:</strong>{" "}
                      {selectedProject.type}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Expected Outcome:
                      </strong>{" "}
                      {selectedProject.expectedOutcome}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Last day of Submit:
                      </strong>{" "}
                      {selectedProject.submitLastDate}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Teacher Name:
                      </strong>{" "}
                      {selectedProject.teacherName}
                    </p>{" "}
                    <p>
                      <strong className="text-black font-bold">
                        Teacher Email:
                      </strong>{" "}
                      {selectedProject.teacherEmail}
                    </p>{" "}
                    <p>
                      <strong className="text-black font-bold">
                        Requirement:
                      </strong>{" "}
                      {selectedProject.requirement}
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <button
                        onClick={() =>
                          document.getElementById("student_project").close()
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

export default StudentProject;
