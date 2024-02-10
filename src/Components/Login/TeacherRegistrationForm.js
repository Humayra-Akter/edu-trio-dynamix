import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import "./TeacherRegistrationForm.css";

const TeacherRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let signInError;

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState([]);
  const [selectedProfessionalTitle, setSelectedProfessionalTitle] = useState(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const openSuccessModal = () => {
    setIsModalOpen(true);
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const subjectOptions = [
    { label: "Mathematics", value: "mathematics" },
    { label: "Science", value: "science" },
    { label: "English", value: "english" },
    // Add more subjects as needed
  ];

  const educationLevelOptions = [
    { label: "High School", value: "high_school" },
    { label: "Bachelor's Degree", value: "bachelors_degree" },
    { label: "Master's Degree", value: "masters_degree" },
    // Add more education levels as needed
  ];

  const professionalTitleOptions = [
    { label: "Teacher", value: "teacher" },
    { label: "Professor", value: "professor" },
    { label: "Instructor", value: "instructor" },
    // Add more professional titles as needed
  ];

  // Function to close the success modal
  const closeSuccessModal = () => {
    setIsModalOpen(false);
  };

  const handleSubjectsChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions);
  };

  const handleGenderChange = (selectedOption) => {
    setSelectedGender(selectedOption);
  };

  const handleEducationLevelChange = (selectedOption) => {
    setSelectedEducationLevel(selectedOption);
  };

  const handleProfessionalTitleChange = (selectedOption) => {
    setSelectedProfessionalTitle(selectedOption);
  };

  const handleSubmitForm = async (data) => {
    // Add your form submission logic here
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center bg-gradient-to-r from-neutral to-secondary">
          <div className="w-1/2 bg-white mt-16 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl text-center text-primary font-bold mb-4">
              Teacher Registration
            </h2>

            <form onSubmit={handleSubmit(handleSubmitForm)}>
              {/* Name field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  className="input input-sm input-bordered w-full"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <label>
                  {errors.name?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Email field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  className="input input-sm input-bordered w-full"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid email",
                    },
                  })}
                />
                <label>
                  {errors.email?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Other fields similar to the MaidRegistrationForm */}
              {/* Subjects */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Subjects
                  </span>
                </label>
                <MultiSelect
                  options={subjectOptions}
                  value={selectedSubjects}
                  onChange={handleSubjectsChange}
                  labelledBy="Select subjects"
                />
              </div>

              {/* Gender */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Gender
                  </span>
                </label>
                <Select
                  value={selectedGender}
                  options={genderOptions}
                  onChange={handleGenderChange}
                  isSearchable={false}
                  placeholder="Select Gender"
                />
              </div>

              {/* Education Level */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Education Level
                  </span>
                </label>
                <Select
                  value={selectedEducationLevel}
                  options={educationLevelOptions}
                  onChange={handleEducationLevelChange}
                  isSearchable={false}
                  placeholder="Select Education Level"
                />
              </div>

              {/* Professional Title */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Professional Title
                  </span>
                </label>
                <Select
                  value={selectedProfessionalTitle}
                  options={professionalTitleOptions}
                  onChange={handleProfessionalTitleChange}
                  isSearchable={false}
                  placeholder="Select Professional Title"
                />
              </div>

              {/* Date of Birth */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Date of Birth
                  </span>
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="input input-sm input-bordered w-full"
                  placeholderText="yyyy-MM-dd"
                />
              </div>

              {/* Image upload */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Photo
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="Your image"
                  name="image"
                  className="input input-sm input-bordered w-full"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Image is required",
                    },
                  })}
                />
                <label>
                  {errors.image?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.image.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-sm input-bordered w-full"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 characters or longer",
                    },
                  })}
                />
                <label>
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>

              {/* Confirm Password */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="input input-sm input-bordered w-full"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Password confirmation is required",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match", // Check if it matches the "password" field
                  })}
                />
                <label>
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                  {errors.confirmPassword?.type === "validate" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </label>
              </div>

              {signInError}

              <div className="flex justify-center items-center mt-7">
                <input
                  class="custom-btn text-black"
                  value="REGISTER"
                  type="submit"
                />
              </div>
            </form>
            <p className="text-center">
              <small className="font-semibold">
                Already have an account?{" "}
                <Link className="text-blue-700" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherRegistrationForm;
