import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [yourCourse, setYourCourse] = useState(false);

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
    setSelectedCourse(course);
    if (loggedStudent.gradeYear === course.grade) {
      setShowModal(true);
      setModalMessage(` Are you sure You want to take the
      Course: ${course.course} in
      Batch: ${course.batch} of 
      Class: ${course.grade} at
      Time: ${course.time} ?
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

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/student/course");
      if (response.ok) {
        const files = await response.json();
        setYourCourse(files);
      }
    } catch (error) {
      console.error("Failed to fetch uploaded files:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);
  console.log(yourCourse);

  const ensureCourse = () => {
    if (!hasApplied) {
      if (courses) {
        const isCourseApplied = courses.includes(
          (course) => course.id === selectedCourse.id
        );
        if (!isCourseApplied) {
          const student = {
            student: loggedStudent,
            course: selectedCourse,
          };
          setHasApplied(true);
          fetch("http://localhost:5000/student/course", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(student),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            });
        } else {
          toast.warning("Course has already been applied.");
        }
      }
    }
  };

  const cancelCourse = () => {
    toast.warning("Cancel course clicked");
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <div className="p-4 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-blue-700 my-10">
          Courses
        </h1>
        <div className="flex items-center justify-center">
          <Link to="/myCourse">
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
                MY COURSES
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
          </Link>
        </div>
        <h1 className="text-xl font-bold text-center text-yellow-600 my-6">
          Develop Your Skills
        </h1>
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-t from-blue-200 to-blue-50 border border-gray-300 rounded-lg p-4 m-4 w-96 shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{course.course}</h2>
              <p>
                <span className="text-md font-medium text-blue-700">Batch:</span>{" "}
                {course.batch}
              </p>
              <p>
                {" "}
                <span className="text-md font-medium text-blue-700">
                  Class:
                </span>{" "}
                {course.grade}
              </p>
              <p>
                <span className="text-md font-medium text-blue-700">Time:</span>{" "}
                {course.time}
              </p>
              <p>
                 <span className="text-md font-medium text-blue-700">Teacher Name:</span>{" "}
                {course.teacherName}
              </p>
              <p>
                 <span className="text-md font-medium text-blue-700">Teacher Email:</span>{" "}
                {course.teacherEmail}
              </p>
              <div className="flex justify-center items-center mt-4">
                <button
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-4 rounded ${
                    loggedStudent.gradeYear !== course.grade || hasApplied
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleApply(course)}
                  disabled={
                    loggedStudent.gradeYear !== course.grade || hasApplied
                  }
                >
                  APPLY
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
