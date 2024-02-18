import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [selectedRoute, setSelectedRoute] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  return (
    <nav className="bg-gradient-to-r from-primary via-secondary to-accent text-black font-bold p-4">
      <div className="container mx-auto flex justify-center items-center">
        {!userRole && (
          <Link to="/" className="text-4xl">
            EduTrio Dynamix
          </Link>
        )}
      </div>

      {/* Navigation links  */}
      {userRole && (
        <div className="container mx-auto flex justify-center items-center">
          {/* Dropdown Menu for Small Screens */}
          <div className="lg:hidden relative">
            <button
              onClick={toggleDropdown}
              className="text-xl focus:outline-none"
            >
              &#9776;
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-base-100 rounded shadow-lg">
                <ul className="py-2 px-4"></ul>
              </div>
            )}
          </div>

          <div>
            {/* Create a dropdown for small and medium screens */}
            <div className="dropdown dropdown-end md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full"></div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                {/* Navigation links for small */}
                {userRole === "teacher" && (
                  <>
                    <li>
                      <Link
                        to="/teacherProfile"
                        className={`text-lg font-bold hover:text-neutral ${
                          selectedRoute === "/teacherProfile"
                            ? "text-yellow-400"
                            : "text-black"
                        }`}
                        onClick={() => handleRouteClick("/teacherProfile")}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherCourse"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Course
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherProject"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherAssignment"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Assignment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherResource"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Resource
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/teacherAnalytics"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Analytics
                      </Link>
                    </li>
                  </>
                )}
                {userRole === "student" && (
                  <>
                    <li>
                      <Link
                        to="/studentProfile"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentCourse"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Course
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentProject"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Project
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentAssignment"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Assignment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentResource"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Resource
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/studentAnalytics"
                        className="text-black text-lg font-bold hover:text-neutral"
                      >
                        Analytics
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/logout"
                    className="text-red font-bold hover:text-black"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Centered Menu for Large Screens */}
            <ul className="hidden lg:flex space-x-8">
              {/* Navigation links */}
              <li>
                <Link
                  style={{ fontFamily: "cursive" }}
                  className="text-blue-900 text-lg font-bold hover:text-neutral"
                  to="/"
                >
                  EdiTrio-Dynamix
                </Link>
              </li>
              {userRole === "teacher" && (
                <>
                  <li>
                    <Link
                      to="/teacherProfile"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/teacherProfile"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/teacherProfile")}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherCourse"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/teacherCourse"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/teacherCourse")}
                    >
                      Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherProject"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/teacherProject"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/teacherProject")}
                    >
                      Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherViewProject"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/teacherViewProject"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/teacherViewProject")}
                    >
                      View-Submission
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherResource"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/teacherResource"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/teacherResource")}
                    >
                      Resource
                    </Link>
                  </li>
                </>
              )}
              {userRole === "student" && (
                <>
                  <li>
                    <Link
                      to="/studentProfile"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentProfile"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentProfile")}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentCourse"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentCourse"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentCourse")}
                    >
                      Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentProject"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentProject"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentProject")}
                    >
                      Project
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentAssignment"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentAssignment"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentAssignment")}
                    >
                      Assignment
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      to="/studentCollaboration"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentCollaboration"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentCollaboration")}
                    >
                      Collaborate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentResource"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentResource"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentResource")}
                    >
                      Resource
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentAnalytics"
                      className={`text-lg font-bold hover:text-neutral ${
                        selectedRoute === "/studentAnalytics"
                          ? "text-yellow-900"
                          : "text-black"
                      }`}
                      onClick={() => handleRouteClick("/studentAnalytics")}
                    >
                      Analytics
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={logout}
                  className="text-red-600 text-lg font-bold hover:text-neutral"
                >
                  Logout
                </button>
              </li>{" "}
              <li className="text-black text-xs font-semibold hover:text-neutral justify-end">
                {userEmail}
                <br />
                {userRole}
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
