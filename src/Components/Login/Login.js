import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import eye from "../../images/eye-svgrepo-com.svg";
import eyeClose from "../../images/eye-close-svgrepo-com.svg";
import login from "../../images/login.png";
import "./TeacherRegistrationForm.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loggedUser, setLoggedUser] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    fetch("https://edu-trio-dynamix-server.onrender.com/user")
      .then((res) => res.json())
      .then((data) => {
        setLoggedUser(data);
      });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  let from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const matchingUser = loggedUser.find(
      (sysUser) => sysUser.email === data.email && sysUser.role === data.role
    );
    if (matchingUser) {
      console.log(data);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userPassword", data.password);
      navigate("/");
      window.location.reload();
    } else {
      toast.error(
        `${data.email} or ${data.role} is invalid. Please check it again`
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 lg:flex">
      <div className="lg:w-1/2">
        <img src={login} className="w-full p-20 h-auto" alt="Login" />
      </div>
      <div className="lg:w-1/2 lg:pt-28 p-8">
        <div className="card max-w-md bg-gradient-to-r from-neutral via-yellow-50 to-blue-50 shadow-xl">
          <div className="card-body">
            <h1 className="text-center text-2xl text-primary font-extrabold mb-4">
              LOGIN
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* email field */}
              <div className="form-control">
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
              {/* role  */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Select your Role
                  </span>
                </label>
                <select
                  name="role"
                  className="input input-sm input-bordered w-full"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Role is required",
                    },
                  })}
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
                <label>
                  {errors.role?.type === "required" && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.role.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Password field */}
              <div className="form-control pb-4">
                <label className="label">
                  <span className="label-text text-blue-700 font-bold text-md">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
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
                  <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <img
                        className="fa fa-eye w-4 text-gray-500"
                        src={eye}
                        alt=""
                      />
                    ) : (
                      <img
                        className="fa fa-eye w-4 text-gray-500"
                        src={eyeClose}
                        alt=""
                      />
                    )}
                  </button>
                </div>
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
              <p className="text-left">
                <small className="font-semibold">
                  <Link className="text-blue-700" to="/register">
                    Forgot password?
                  </Link>
                </small>
              </p>
              <div className="flex items-center justify-center mt-7">
                <input className="custom-btn" value="LOGIN" type="submit" />
              </div>
              <p className="text-center">
                <small className="font-semibold">
                  New to elite-dwell-assist?Create new account
                  <br />
                  <Link className="text-blue-700" to="/teacherRegistrationForm">
                    As Teacher
                  </Link>
                  or
                  <Link className="text-blue-700" to="/studentRegistrationForm">
                    As Student
                  </Link>
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
