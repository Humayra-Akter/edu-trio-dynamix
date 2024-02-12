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
              className="bg-gradient-to-l from-neutral to-accent border border-gray-300 rounded-lg p-4 m-4 w-96 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{course.course}</h2>
              <p>
                <strong>Batch:</strong> {course.batch}
              </p>
              <p>
                <strong>Class:</strong> {course.grade}
              </p>
              <p>
                <strong>Time:</strong> {course.time}
              </p>
              <p>
                <strong>Teacher Name:</strong> {course.teacherName}
              </p>{" "}
              <p>
                <strong>Teacher Email:</strong> {course.teacherEmail}
              </p>
              <div className="flex justify-center items-center mt-4">
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
  );
};

export default StudentCourse;
