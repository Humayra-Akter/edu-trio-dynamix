import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TeacherProject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedTeacher, setLoggedTeacher] = useState({});
  const [projects, setProjects] = useState([]);
  const [stuProjects, setStuProjects] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("project");

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
      .then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/student/project")
      .then((res) => res.json())
      .then((data) => setStuProjects(data));
  }, []);

  const handleFile = (event) => {
    const file = event.target.files[0];
    setPdfData(file);
  };

  const handleAddProject = async (data) => {
    const { name, email } = loggedTeacher;

    const project = {
      ...data,
      teacherName: name,
      teacherEmail: email,
    };
    const projectResponse = await fetch(
      "http://localhost:5000/teacher/project",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }
    );
    const result = await projectResponse.json();
    setProjects([...projects, result]);
    toast.success(`${data.project} project created`);
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

  return (
    <div className="flex flex-wrap bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div className="p-4 my-10 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-white mb-4">
          ALL Projects
        </h1>
        <div className="flex items-center justify-center my-5">
          {" "}
          <Link to="/teacherAddProject">
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
                ADD PROJECTS
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
          </Link>
        </div>
        <div className="flex flex-wrap justify-center">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gradient-to-b from-teal-50 to-slate-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{project.project}</h2>
              <p>
                <span className="text-md font-bold text-green-800">Batch:</span>{" "}
                {project.batch}
              </p>
              <p>
                <span className="text-md font-bold text-green-800">Class:</span>{" "}
                {project.grade}
              </p>
              <p>
                <span className="text-md font-bold text-green-800">
                  Subject:
                </span>{" "}
                {project.time}
              </p>
              <p>
                <span className="text-md font-bold text-green-800">
                  Teacher Name:
                </span>{" "}
                {project.teacherName}
              </p>{" "}
              <p>
                <span className="text-md font-bold text-green-800">
                  Teacher Email:
                </span>{" "}
                {project.teacherEmail}
              </p>
              {userEmail === project.teacherEmail && (
                <div className="flex items-center justify-center mt-4">
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
                      <Link to="/teacherProjectViewStudent">
                        {" "}
                        VIEW STUDENTS
                      </Link>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherProject;
