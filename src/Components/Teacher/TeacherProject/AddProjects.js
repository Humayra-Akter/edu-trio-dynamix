import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddProjects = () => {
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
      {/* Left half of the screen */}
      <div className="w-1/2 p-4 my-10 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-white mb-4">
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
              className="bg-gradient-to-b from-teal-50 to-slate-300  border-gray-300 rounded-lg p-4 m-4 w-80 shadow-md"
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
                      VIEW STUDENTS
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
      {/* Right half of the screen */}
      <div className="w-1/3">
        <div className="max-w-2xl p-6 bg-gradient-to-t from-slate-100 to-teal-50 border-2 border-accent my-20">
          <h1 className="text-2xl font-semibold text-center uppercase text-accent mb-4">
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
            {/* Additional fields */}
            <div>
              <label className="block mb-1">Submit Last Date:</label>
              <input
                type="date"
                {...register("submitLastDate", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              {errors.submitLastDate && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Type:</label>
              <select
                {...register("type", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              >
                <option value="group">Group</option>
                <option value="individual">Individual</option>
              </select>
              {errors.type && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Requirement:</label>
              <input
                type="text"
                {...register("requirement", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              {errors.requirement && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Skills:</label>
              <select
                {...register("skills", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              >
                <option value="modelling">Project Modelling</option>
                <option value="debate">Debate</option>
                <option value="presentation">Presentation</option>
                <option value="documentation">Documentation</option>
              </select>
              {errors.skills && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block mb-1">Expected Outcome:</label>
              <select
                {...register("expectedOutcome", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              >
                <option value="OBE1">OBE1</option>
                <option value="co1">CO1</option>
                <option value="co2">CO2</option>
                <option value="erc">ERC</option>
              </select>
              {errors.expectedOutcome && (
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
                  ADD PROJECT
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjects;
