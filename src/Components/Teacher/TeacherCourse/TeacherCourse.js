import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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

  return (
    <div className="flex flex-wrap">
      {/* Left half of the screen */}
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-semibold mb-4">Courses</h1>
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 m-4 w-80 shadow-md"
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
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                  Take Class
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                  View Student List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right half of the screen */}
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-semibold mb-4">Add Course</h1>
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
          <button type="submit" className="btn">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherCourse;
