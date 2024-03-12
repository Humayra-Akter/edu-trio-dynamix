import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});
  const [coursesTaken, setCoursesTaken] = useState([]);

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
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/student/course")
      .then((res) => res.json())
      .then((data) => {
        const filteredCourses = data.filter(
          (course) => course.student.email === userEmail
        );

        const uniqueCoursesMap = new Map();
        filteredCourses.forEach((course) => {
          uniqueCoursesMap.set(course.course._id, course);
        });
        const uniqueCourses = Array.from(uniqueCoursesMap.values());
        setCoursesTaken(uniqueCourses);
      });
  }, [userEmail]);

  console.log(coursesTaken);

  return (
    <div className="bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div className="flex justify-center items-center pt-14">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-neutral capitalize font-bold">
              Courses Taken
            </h2>
          </div>
          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex">
            <div className="card max-w-2xl flex items-center justify-center bg-gradient-to-b from-yellow-50 to-blue-300 shadow-xl">
              {coursesTaken.map((course, index) => (
                <div className="card-body" key={index}>
                  <div className="flex w-96">
                    <ul className="mb-4">
                      <li className="mb-2">
                        <span className="text-md font-medium text-neutral">
                          Course:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.course}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-neutral">
                          Batch:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.batch}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-neutral">
                          Grade:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.grade}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-neutral">
                          Time:
                        </span>
                        <span className="ml-4 uppercase font-bold">
                          {course.course.time}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-neutral">
                          Teacher Name:
                        </span>
                        <span className="ml-4 capitalize font-bold">
                          {course.course.teacherName}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-neutral">
                          Teacher Email:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.teacherEmail}
                        </span>
                      </li>

                      <div className="flex justify-center items-center gap-4 mt-3">
                        <Link
                          to={{
                            pathname: "/studentAnalytics",
                          }}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "11rem",
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
                            zIndex: 2,
                            fontFamily: "Avalors Personal Use",
                            fontSize: "12px",
                            letterSpacing: "5px",
                            color: "#FFFFFF",
                            textShadow: "0 0 4px white",
                          }}
                        >
                          <strong>FEEDBACK</strong>
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
                        </Link>{" "}
                        <Link
                          to={{
                            pathname: "/board",
                          }}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "11rem",
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
                            zIndex: 2,
                            fontFamily: "Avalors Personal Use",
                            fontSize: "12px",
                            letterSpacing: "5px",
                            color: "#FFFFFF",
                            textShadow: "0 0 4px white",
                          }}
                        >
                          <strong>ATTEND CLASS</strong>
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
                        </Link>
                      </div>
                    </ul>
                  </div>
                </div>
              ))}
              {coursesTaken.length === 0 && (
                <p>You have not enrolled in any courses.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
