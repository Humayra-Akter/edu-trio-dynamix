import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../Shared/Button";
import { MultiSelect } from "react-multi-select-component";

const AddCourse = () => {
  const {
    register,
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
      .then((data) => setCourses(data));
  }, []);

  const handleAddCourse = async (data) => {
    const { name, email } = loggedTeacher;
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
        console.log(result);
        setCourses([...courses, result]);
      });
    console.log(courseData);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div className="w-1/3 p-6 bg-gradient-to-r from-neutral via-teal-50 to-slate-100 border-2 border-accent my-24">
        <h1 className="text-2xl font-semibold text-center uppercase text-accent mb-4">
          Add Course
        </h1>
        <form onSubmit={handleSubmit(handleAddCourse)} className="space-y-4">
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
          {/* Subjects */}
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
    </div>
  );
};

export default AddCourse;
