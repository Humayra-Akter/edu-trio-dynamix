import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "./TeacherRegistrationForm.css";
import student from "../../images/student.png";
import { toast } from "react-toastify";

const StudentRegistrationForm = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageStorageKey = "81a2b36646ff008b714220192e61707d";
  const navigate = useNavigate();
  const [selectedCommunicationChannel, setSelectedCommunicationChannel] =
    useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const communicationChannelOptions = [
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Other", value: "other" },
  ];

  const handleCommunicationChannelChange = (selectedOption) => {
    setSelectedCommunicationChannel(selectedOption);
  };

  const handleAddStudent = async (data) => {
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

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const student = {
            name: data.name,
            email: data.email,
            role: "student",
            password: data.password,
            dateOfBirth: formattedDob,
            gender: data.gender,
            institution: data.institution,
            gradeYear: data.gradeYear,
            city: data.city,
            country: data.country,
            phoneNumber: data.phoneNumber,
            image: imgData.data.url,
            termsConditions: data.termsConditions,
            privacyPolicy: data.privacyPolicy,
          };
          console.log(student);
          fetch("http://localhost:5000/student", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(student),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} thanks for your registration`);
            });
          fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(student),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} welcome to EdiTrio Dynamos`);
            });
        }
      });
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 via-black to-slate-600 lg:flex">
      <div className="lg:w-2/3">
        <img src={student} className="w-full p-20 h-auto" alt="Login" />
      </div>
      <div className="lg:w-2/3 lg:pt-28 p-8">
        <div className="card max-w-2xl bg-gradient-to-r from-neutral via-yellow-50 to-blue-50 shadow-xl">
          <div className="card-body">
            <h1 className="text-center text-2xl text-accent font-extrabold mb-4">
              Student Registration
            </h1>

            <form onSubmit={handleSubmit(handleAddStudent)}>
              <div className="flex gap-7">
                {/* Full Name field */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name, Last Name"
                    name="name"
                    className="input input-sm input-bordered w-full"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Full Name is required",
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
                      Email Address
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

              <div className="flex gap-7">
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

                {/* Gender */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      Gender
                    </span>
                  </label>
                  <select
                    name="gender"
                    className="input input-sm input-bordered w-full"
                    {...register("gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-7">
                {/* School/University */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      School/College
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="School/College"
                    name="institution"
                    className="input input-sm input-bordered w-full"
                    {...register("institution")}
                  />
                </div>

                {/* Grade Level */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      Grade Level
                    </span>
                  </label>
                  <select
                    name="gradeYear"
                    className="input input-sm input-bordered w-full"
                    {...register("gradeYear")}
                  >
                    <option value="">Select Grade Level</option>
                    <option value="1">9th</option>
                    <option value="2">10th</option>
                    <option value="3">11th</option>
                    <option value="4">12th</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-7">
                {/* City */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      City
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="input input-sm input-bordered w-full"
                    {...register("city")}
                  />
                </div>

                {/* Country */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      Country
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    className="input input-sm input-bordered w-full"
                    {...register("country")}
                  />
                </div>
              </div>

              <div className="flex gap-7">
                {/* Phone Number */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    className="input input-sm input-bordered w-full"
                    {...register("phoneNumber")}
                  />
                </div>

                {/* Profile Picture */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-green-800 font-bold text-md">
                      Profile Picture
                    </span>
                  </label>
                  <input
                    type="file"
                    placeholder="Profile Picture"
                    name="image"
                    className="input input-sm input-bordered w-full"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "Profile Picture is required",
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
              </div>

              <div className="flex gap-7">
                {/* Terms and Conditions */}
                <div className="form-control w-full">
                  <label className="label flex items-center">
                    <input
                      type="checkbox"
                      name="termsConditions"
                      className="checkbox checkbox-sm"
                      {...register("termsConditions", {
                        required: true,
                      })}
                    />
                    <span className="ml-2">
                      I accept the{" "}
                      <Link to="/terms" className="text-accent">
                        Terms and Conditions
                      </Link>
                    </span>
                  </label>
                  {errors.termsConditions && (
                    <p className="text-red-500 text-xs mt-1">
                      You must accept the Terms and Conditions
                    </p>
                  )}
                </div>

                {/* Privacy Policy */}
                <div className="form-control w-full">
                  <label className="label flex items-center">
                    <input
                      type="checkbox"
                      name="privacyPolicy"
                      className="checkbox checkbox-sm"
                      {...register("privacyPolicy", {
                        required: true,
                      })}
                    />
                    <span className="ml-2">
                      I accept the{" "}
                      <Link to="/privacy" className="text-accent">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.privacyPolicy && (
                    <p className="text-red-500 text-xs mt-1">
                      You must accept the Privacy Policy
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center mt-7">
                <input
                  className="custom-btn text-white"
                  value="REGISTER"
                  type="submit"
                />
              </div>
            </form>
            <p className="text-center">
              <small className="font-semibold">
                Already have an account?{" "}
                <Link className="text-accent" to="/login">
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

export default StudentRegistrationForm;
