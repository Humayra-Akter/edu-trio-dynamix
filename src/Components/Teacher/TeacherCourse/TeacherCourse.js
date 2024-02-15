import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

  const handleAddCourse = async (data) => {
    const { name, email } = loggedTeacher;
    const courseData = {
      ...data,
      teacherName: name,
      teacherEmail: email,
    };

    const response = await fetch("http://localhost:5000/teacher/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCourses([...courses, result]); // Add newly created course to the list
      });
  };
  console.log(courses);

  return (
    <div className="flex flex-wrap bg-gradient-to-r from-neutral via-blue-100 to-neutral">
      {/* Left half of the screen */}
      <div className="w-1/2 p-4 my-10 mx-10">
        <h1 className="text-2xl font-bold text-center uppercase text-primary mb-4">
          Courses
        </h1>
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gradient-to-b from-yellow-50 to-blue-300  border-gray-300 rounded-lg p-4 m-4 w-80 shadow-md"
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
              {userEmail === course.teacherEmail && (
                <div className="flex mt-4">
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
                      <Link to="/board">TAKE CLASS</Link>
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
                      <Link to="/teacherCourseViewStudent"> VIEW STUDENTS</Link>
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
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Right half of the screen */}
      <div className="w-1/3">
        <div className="w-full p-6 bg-gradient-to-t from-yellow-500 to-yellow-100 my-20">
          <h1 className="text-2xl font-semibold text-center uppercase text-primary mb-4">
            Add Course
          </h1>
          <form onSubmit={handleSubmit(handleAddCourse)} className="space-y-4">
            <div>
              <label className="block mb-1">Course:</label>
              <input
                type="text"
                {...register("course", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              />
              {errors.course && (
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
              <label className="block mb-1">Time:</label>
              <select
                {...register("time", { required: true })}
                className="mb-2 p-2 w-full border border-gray-300 rounded"
              >
                <option value="10AM-11AM">10AM - 11AM</option>
                <option value="11AM-12PM">11AM - 12PM</option>
                <option value="12PM-1PM">12PM - 1PM</option>
              </select>
              {errors.time && (
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
                  ADD COURSE
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourse;
