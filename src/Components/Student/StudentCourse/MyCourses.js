import React, { useEffect, useState } from "react";

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

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <div className="flex justify-center items-center pt-14">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-primary capitalize font-bold">
              Courses Taken
            </h2>
          </div>
          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex">
            <div className="card max-w-2xl flex items-center justify-center bg-gradient-to-b from-yellow-50 to-blue-300 shadow-xl">
              {coursesTaken.map((course, index) => (
                <div className="card-body">
                  <div className="flex w-96">
                    <ul className="mb-4">
                      <li className="mb-2">
                        <span className="text-md font-medium text-primary">
                          Course:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.course}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-primary">
                          Batch:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.batch}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-primary">
                          Grade:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.grade}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-primary">
                          Time:
                        </span>
                        <span className="ml-4 uppercase font-bold">
                          {course.course.time}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-primary">
                          Teacher Name:
                        </span>
                        <span className="ml-4 capitalize font-bold">
                          {course.course.teacherName}
                        </span>
                      </li>
                      <li className="mb-2">
                        <span className="text-md font-medium text-primary">
                          Teacher Email:
                        </span>
                        <span className="ml-4 font-bold">
                          {course.course.teacherEmail}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}{" "}
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
