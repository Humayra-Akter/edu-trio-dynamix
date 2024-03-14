import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
import Button from "../../Shared/Button";

const AddCourse = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedTeacher, setLoggedTeacher] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const dayOptions = [
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];

  const handleDaysChange = (selected) => {
    setSelectedDays(selected);
  };

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
      .then((data) => {
        // Filter courses where the teacher's email matches the logged user's email
        const userCourses = data.filter(
          (course) => course.teacherEmail === userEmail
        );
        setCourses(userCourses);
      });
  }, []);

  const handleAddCourse = async (data) => {
    const { name, email } = loggedTeacher;
    const currentYear = new Date().getFullYear();

    if (data.year !== currentYear.toString()) {
      toast.warning(
        "The specified year does not match the current year. Please enter the correct year."
      );
      return;
    }

    const courseData = {
      ...data,
      teacherName: name,
      teacherEmail: email,
      days: selectedDays.map((day) => day.value),
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
        setCourses([...courses, result]);
        resetFormFields();
        toast.success("Course added successfully!");
      });
  };

  const resetFormFields = () => {
    setSelectedDays([]);
    reset();
  };

  return (
    <div className="flex flex-wrap px-20 gap-20 bg-gradient-to-r from-slate-800 via-black to-slate-600">
      {/* add course form  */}
      <div className="w-1/3 p-6 bg-gradient-to-r from-neutral via-teal-50 to-slate-100 border-2 border-accent my-24">
        <h1 className="text-2xl font-bold text-center uppercase text-accent mb-4">
          Add Course
        </h1>
        <form onSubmit={handleSubmit(handleAddCourse)} className="space-y-4">
          {/* course  */}
          <div>
            <label className="label-text text-green-800 font-bold mb-2">
              Course:
            </label>
            <select
              {...register("course", { required: true })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            >
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
            </select>
            {errors.course && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* batch  */}
          <div>
            <label className="label-text text-green-800 font-bold mb-2">
              Batch:
            </label>
            <input
              type="text"
              {...register("batch", { required: true })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.batch && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* year  */}
          <div>
            <label className="label-text text-green-800 font-bold mb-2">
              Year:
            </label>
            <input
              type="text"
              {...register("year", { required: true })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.year && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* class  */}
          <div>
            <label className="label-text text-green-800 font-bold mb-2">
              Class:
            </label>
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
          {/* days */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-green-800 font-bold">Days</span>
            </label>
            <MultiSelect
              options={dayOptions}
              value={selectedDays}
              onChange={handleDaysChange}
              labelledBy="Select days"
            />{" "}
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="custom-btn">
              ADD COURSE
            </button>
          </div>
        </form>
      </div>
      {/* my courses  */}
      <div className="w-max p-6">
        <h1 className="text-2xl mt-20 font-bold text-center uppercase text-white mb-4">
          My Courses
        </h1>
        {courses.length === 0 ? (
          <p className="text-center text-gray-500">No course added yet</p>
        ) : (
          <div className="grid grid-cols-2 gap-10 justify-around">
            {courses.map((course) => (
              <li
                className="bg-gradient-to-b from-teal-50 to-slate-400  border-2 rounded-lg p-4 m-4 w-80 shadow-md"
                key={course.id}
              >
                <span>{course.name}</span> - <span>{course.teacherName}</span>{" "}
                <span className="text-lg capitalize font-semibold mb-2">
                  {course.course}
                </span>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Batch:
                  </span>{" "}
                  {course.batch}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">
                    Class:
                  </span>{" "}
                  {course.grade}
                </p>
                <p>
                  <span className="text-md font-bold text-blue-700">Year:</span>{" "}
                  {course.year}
                </p>
                {course.days && (
                  <p>
                    <span className="text-md font-bold text-blue-700">
                      Days:
                    </span>{" "}
                    {course.days.join(", ")}
                  </p>
                )}
                {userEmail === course.teacherEmail && (
                  <div className="flex flex-wrap ml-10 mt-4">
                    <Link to="/board">
                      <Button>TAKE CLASS</Button>
                    </Link>

                    <Link to="/teacherCourseViewStudent">
                      <Button> VIEW STUDENTS</Button>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
