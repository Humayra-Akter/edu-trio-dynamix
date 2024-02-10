import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
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

      {/* Navigation links */}
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
                {/* Navigation links */}
                <li>
                  <Link
                    to="/"
                    className="text-primary font-bold hover:text-black"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="text-primary font-bold hover:text-black"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className="text-primary font-bold hover:text-black"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-primary font-bold hover:text-black"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-primary font-bold hover:text-black"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="text-primary font-bold hover:text-black"
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
                  EdiTrio-Dynamos
                </Link>
              </li>
              <li>
                <Link
                  className="text-black text-lg font-bold hover:text-neutral"
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  className="text-black text-lg font-bold hover:text-neutral"
                  to="/resources"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  className="text-black text-lg font-bold hover:text-neutral"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-black text-lg font-bold hover:text-neutral"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-black text-lg font-bold hover:text-neutral"
                >
                  <div class="indicator">Logout</div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
