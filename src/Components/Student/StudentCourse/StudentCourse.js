import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const StudentCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [details, setDetails] = useState("");

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

    fetch("http://localhost:5000/teacher/course")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleApply = (course) => {
    const modal = document.getElementById("my_modal_stu_course");
    modal.showModal();
    if (loggedStudent.gradeYear === course.grade) {
      setShowModal(true);
      setModalMessage(`
      Course: ${course.course}
      Batch: ${course.batch}
      Class: ${course.grade}
      Time: ${course.time}
      Teacher Name: ${course.teacherName}
      Teacher Email: ${course.teacherEmail}
    `);
    } else {
      setShowModal(true);
      setModalMessage("Your class doesn't match.");
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_stu_course");
    modal.close();
    setShowModal(false);
  };

  const ensureCourse = () => {
    // Handle ensuring the course here
    console.log("Ensure course clicked");
  };

  const cancelCourse = () => {
    // Handle canceling the course here
    console.log("Cancel course clicked");
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 h-screen">
      <div className="p-4 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-primary my-10">
          Courses
        </h1>
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-t from-blue-300 to-sky-100 border border-gray-300 rounded-lg p-4 m-4 w-96 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{course.course}</h2>
              <p>
                <strong className="text-black font-bold">Batch:</strong>{" "}
                {course.batch}
              </p>
              <p>
                <strong className="text-black font-bold">Class:</strong>{" "}
                {course.grade}
              </p>
              <p>
                <strong className="text-black font-bold">Time:</strong>{" "}
                {course.time}
              </p>
              <p>
                <strong className="text-black font-bold">Teacher Name:</strong>{" "}
                {course.teacherName}
              </p>
              <p>
                <strong className="text-black font-bold">Teacher Email:</strong>{" "}
                {course.teacherEmail}
              </p>
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => handleApply(course)}
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

      <dialog
        id="my_modal_stu_course"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-action">
            <form method="dialog">
              <p className="text-center font-bold text-xl">{modalMessage}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded"
                  onClick={ensureCourse}
                >
                  Ensure
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={cancelCourse}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default StudentCourse;
