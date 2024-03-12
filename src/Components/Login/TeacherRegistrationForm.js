import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import "./TeacherRegistrationForm.css";
import teacher from "../../images/teacher.png";

const TeacherRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let signInError;

  const imageStorageKey = "81a2b36646ff008b714220192e61707d";
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

  const handleAddTeacher = async (data) => {
    const formattedDob = selectedDate
      ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${selectedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`
      : "";

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

    try {
      const imgResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (imgResponse.ok) {
        const imgData = await imgResponse.json();

        if (imgData.success) {
          const teacher = {
            name: data.name,
            role: "teacher",
            email: data.email,
            img: imgData.data.url,
            gender: selectedGender ? selectedGender.value : null,
            dob: formattedDob,
            subjects: selectedSubjects.map((subject) => subject.value),
            educationLevel: selectedEducationLevel.value,
            professionalTitle: selectedProfessionalTitle.value,
            password: data.password,
          };

          const user = {
            name: data.name,
            email: data.email,
            role: "teacher",
            img: imgData.data.url,
            password: data.password,
          };

          // Save teacher information to the database
          const teacherResponse = await fetch("http://localhost:5000/teacher", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(teacher),
          });

          if (teacherResponse.ok) {
            toast.success(`${data.name} thanks for your registration`);
          } else {
            console.error("Failed to register teacher");
          }

          // Save user information to the database
          const userResponse = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          if (userResponse.ok) {
            toast.success(`${data.name} welcome to EduTrio Dynamos`);
          } else {
            console.error("Failed to create user account");
          }

          navigate("/");
        } else {
          toast.error("Failed to upload image");
        }
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error registering teacher:", error);
      // toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 via-black to-slate-600 lg:flex">
      <div className="lg:w-2/3">
        <img src={teacher} className="w-full p-20 h-auto" alt="Login" />
      </div>
      <div className="lg:w-2/3 lg:pt-28 p-8">
        <div className="card max-w-2xl bg-gradient-to-r from-neutral via-yellow-50 to-blue-50 shadow-xl">
          <div className="card-body">
            <h1 className="text-center text-2xl text-accent font-extrabold mb-4">
              Teacher Registration
            </h1>

            <form onSubmit={handleSubmit(handleAddTeacher)}>
              {/* Name field */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-green-800 font-bold text-md">
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
                  <span className="label-text text-green-800 font-bold text-md">
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

              {/* Subjects */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-green-800 font-bold text-md">
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
                  <span className="label-text text-green-800 font-bold text-md">
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
                  <span className="label-text text-green-800 font-bold text-md">
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
                  <span className="label-text text-green-800 font-bold text-md">
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
                  <span className="label-text text-green-800 font-bold text-md">
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
                  <span className="label-text text-green-800 font-bold text-md">
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

              <div className="flex gap-7">
                {/* Password */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
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
                    <span className="label-text text-green-800 font-bold text-md">
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
              </div>

              <div className="flex justify-center items-center mt-7">
                <input
                  class="custom-btn text-white"
                  value="REGISTER"
                  type="submit"
                />
              </div>
            </form>
            <p className="text-center">
              <small className="font-semibold">
                Already have an account?{" "}
                <Link className="text-green-800" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistrationForm;
