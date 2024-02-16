import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ViewAllassignment = () => {
  const {
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [assignments, setassignments] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("assignment");
  const [selectedassignment, setSelectedassignment] = useState(null);

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

    fetch("http://localhost:5000/teacher/assignment")
      .then((res) => res.json())
      .then((data) => setassignments(data));
  }, []);

  const handleModal = (assignment) => {
    setSelectedassignment(assignment);
    const modal = document.getElementById("student_assignment");
    modal.showModal();
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    setPdfData(file);
  };

  // Filter assignments based on search term and category
  const filteredassignments = assignments.filter((assignment) => {
    if (searchTerm && searchCategory && assignment[searchCategory]) {
      return assignment[searchCategory]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div>
      <div className="flex flex-wrap bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 ">
        <div className=" p-4 my-10 mx-auto">
          <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
            Search for assignment by name
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
            {filteredassignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-gradient-to-b from-pink-50 to-blue-300 border-gray-300 rounded-lg p-4 m-4 w-96 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {assignment.title}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {assignment.batchName}
                </p>
                <p>
                  <strong className="text-black font-bold">Study year:</strong>{" "}
                  {assignment.yearOfStudy}
                </p>
                <p>
                  <strong className="text-black font-bold">Expertise:</strong>{" "}
                  {assignment.expertise}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Additional Expertise:
                  </strong>{" "}
                  {assignment.additionalExpertise}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">Deadline:</strong>{" "}
                  {assignment.deadline}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {assignment.deadline}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {assignment.teacherEmail}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleModal(assignment)}
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
                      DETAILS
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
            ALL assignments
          </h1>
          <div className="flex flex-wrap justify-center">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {assignment.title}
                </h2>
                <p>
                  <strong className="text-black font-bold">Batch:</strong>{" "}
                  {assignment.batchName}
                </p>
                <p>
                  <strong className="text-black font-bold">Study year:</strong>{" "}
                  {assignment.yearOfStudy}
                </p>
                <p>
                  <strong className="text-black font-bold">Expertise:</strong>{" "}
                  {assignment.expertise}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Additional Expertise:
                  </strong>{" "}
                  {assignment.additionalExpertise}
                </p>{" "}
                <p>
                  <strong className="text-black font-bold">Deadline:</strong>{" "}
                  {assignment.deadline}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Last day of Submit:
                  </strong>{" "}
                  {assignment.deadline}
                </p>
                <p>
                  <strong className="text-black font-bold">
                    Teacher Email:
                  </strong>{" "}
                  {assignment.teacherEmail}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => handleModal(assignment)}
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
                      DETAILS
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
        id="student_assignment"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center justify-center gap-11">
                {selectedassignment && (
                  <div
                    key={selectedassignment.id}
                    className="bg-gradient-to-b from-slate-100 to-blue-300  border-gray-300 rounded-lg p-4 m-6 w-96 shadow-md"
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      {selectedassignment.title}
                    </h2>
                    <p>
                      <strong className="text-black font-bold">Batch:</strong>{" "}
                      {selectedassignment.batchName}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Study year:
                      </strong>{" "}
                      {selectedassignment.yearOfStudy}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Expertise:
                      </strong>{" "}
                      {selectedassignment.expertise}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Additional Expertise:
                      </strong>{" "}
                      {selectedassignment.additionalExpertise}
                    </p>{" "}
                    <p>
                      <strong className="text-black font-bold">
                        Deadline:
                      </strong>{" "}
                      {selectedassignment.deadline}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Last day of Submit:
                      </strong>{" "}
                      {selectedassignment.submitLastDate}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Teacher Email:
                      </strong>{" "}
                      {selectedassignment.teacherEmail}
                    </p>
                    <p>
                      <strong className="text-black font-bold">
                        Description:
                      </strong>{" "}
                      {selectedassignment.description}
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <button
                        onClick={() =>
                          document.getElementById("student_assignment").close()
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

export default ViewAllassignment;
