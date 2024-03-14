import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../Shared/Button";

const TeacherCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedTeacher, setLoggedTeacher] = useState({});
  const [courses, setCourses] = useState([]);

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

    fetch("http://localhost:5000/teacher/course")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="flex flex-wrap bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div className="p-4 my-10 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-white mb-4">
          Courses
        </h1>{" "}
        <div className="flex items-center justify-center my-5">
          <Link to="/teacherAddCourse">
            <Button>ADD COURSE</Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-b from-teal-50 to-slate-400  border-2 rounded-lg p-4 m-4 w-80 shadow-md"
            >
              <h2 className="text-lg capitalize font-semibold mb-2">
                {course.course}
              </h2>
              <p>
                <span className="text-md font-bold text-blue-700">Batch:</span>{" "}
                {course.batch}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">Class:</span>{" "}
                {course.grade}
              </p>
              <p>
                <span className="text-md font-bold text-blue-700">Year:</span>{" "}
                {course.year}
              </p>
              {course.days && (
                <p>
                  <span className="text-md font-bold text-blue-700">Days:</span>{" "}
                  {course.days.join(", ")}
                </p>
              )}
              <p>
                <span className="text-md font-bold text-blue-700">
                  Teacher Name:
                </span>{" "}
                {course.teacherName}
              </p>{" "}
              
              <p>
                <span className="text-md font-bold text-blue-700">
                  Teacher Email:
                </span>{" "}
                {course.teacherEmail}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCourse;
