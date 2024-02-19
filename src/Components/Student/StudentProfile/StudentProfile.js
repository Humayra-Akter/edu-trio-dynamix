import React, { useEffect, useState } from "react";

const StudentProfile = () => {
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});

  useEffect(() => {
    if (userRole === "student" && userEmail) {
      fetch(
        `https://edu-trio-dynamix-server.onrender.com/student?email=${userEmail}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === userEmail
            );
            if (matchingUser) {
              setLoggedStudent(matchingUser);
            }
          }
        });
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-primary capitalize font-bold">
              {loggedStudent?.name}
            </h2>
          </div>

          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex">
            <div className="card max-w-2xl flex items-center justify-center bg-gradient-to-b from-yellow-50 to-blue-300 shadow-xl">
              <div className="card-body">
                <h1 className="text-center text-2xl text-primary font-extrabold mb-4">
                  Student Information
                </h1>
                <div className="flex w-96">
                  <ul className="mb-4">
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Email:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedStudent?.email}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Date of Birth:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedStudent?.dateOfBirth}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Grade Year:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedStudent?.gradeYear}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Institution:
                      </span>
                      <span className="ml-4 uppercase font-bold">
                        {loggedStudent?.institution}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Interests & Hobbies:
                      </span>
                      <span className="ml-4 capitalize font-bold">
                        {loggedStudent?.interestsHobbies}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Parent/Guardian:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedStudent?.parentGuardian?.name}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Guardian Email:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedStudent?.parentGuardian?.email}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-medium text-primary">
                        Guardian Phone Number:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedStudent?.parentGuardian?.phoneNumber}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card rounded-full w-64 h-64 p-3 bg-secondary shadow-xl">
              <img
                src={loggedStudent?.image}
                alt="user"
                className="w-60 h-60 rounded-full mb-4 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
