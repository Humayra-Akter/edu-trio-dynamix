import React, { useEffect, useState } from "react";

const CourseViewStudent = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [coursesTaken, setCoursesTaken] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/teacher/course")
      .then((res) => res.json())
      .then((data) => {
        const filteredCourses = data.filter(
          (course) => course.teacherEmail === userEmail
        );
        setCoursesTaken(filteredCourses);
      });
  }, [userEmail]);

  useEffect(() => {
    fetch("http://localhost:5000/student/course")
      .then((res) => res.json())
      .then((data) => {
        setEnrolledStudents(data);
      });
  }, [userEmail]);
  console.log(enrolledStudents);

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <div className="flex justify-center items-center pt-14">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-primary capitalize font-bold">
              Student List
            </h2>
          </div>
          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex flex-wrap justify-center">
            {coursesTaken.map((course) => (
              <div
                key={course._id}
                className="card max-w-2xl bg-gradient-to-b from-yellow-50 to-blue-300 shadow-xl m-4 p-4"
              >
                <h2 className="text-lg font-bold">{course.course}</h2>
                <p>
                  <span className="font-semibold">Teacher Name:</span>{" "}
                  {course.teacherName}
                </p>
                <div className="mt-2">
                  <h3 className="text-md font-semibold">Enrolled Students:</h3>
                  <ul>
                    {enrolledStudents
                      .filter(
                        (student) => student.course.course === course.course
                      )
                      .map((student) => (
                        <li key={student._id}>
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {student.student.name}
                          </p>
                          <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {student.student.email}
                          </p>
                          <p>
                            <span className="font-semibold">Grade:</span>{" "}
                            {student.student.gradeYear}
                          </p>{" "}
                          <p>
                            <span className="font-semibold">Batch:</span>{" "}
                            {student.course.batch}
                          </p>{" "}
                          <p>
                            <span className="font-semibold">Time:</span>{" "}
                            {student.course.time}
                          </p>
                          <p>
                            <span className="font-semibold">Institution:</span>{" "}
                            {student.student.institution}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Preferred Communication Channel:
                            </span>{" "}
                            {student.student.communicationChannel}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
            {coursesTaken.length === 0 && <p>No courses taken yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewStudent;
