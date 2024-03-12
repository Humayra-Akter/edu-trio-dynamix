import React, { useEffect, useState } from "react";

const TeacherProfile = () => {
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedTeacher, setLoggedTeacher] = useState({});
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    subject: "",
    batchName: "",
    yearOfStudy: "",
    teacherEmail: userEmail,
  });
  useEffect(() => {
    // console.log(userEmail, userRole);
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
  }, []);

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleCreateProject = () => {
    fetch(`http://localhost:5000/teacher/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNewProject({
          title: "",
          description: "",
          subject: "",
          batchName: "",
          yearOfStudy: "",
          teacherEmail: userEmail,
        });
      })
      .catch((error) => console.error("Error creating project:", error));
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-neutral font-bold">
              {loggedTeacher?.name}
            </h2>
          </div>

          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex">
            <div className="card max-w-2xl flex items-center justify-center bg-gradient-to-b from-yellow-50 to-blue-300  border-gray-300 shadow-xl">
              <div className="card-body">
                <h1 className="text-center text-2xl text-neutral font-extrabold mb-4">
                  Teacher Information
                </h1>
                <div className="flex w-96">
                  <ul className="mb-4">
                    <li className="mb-2">
                      <span className="text-md font-bold text-blue-700">
                        Email:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedTeacher?.email}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-bold text-blue-700">
                        Gender:
                      </span>
                      <span className="ml-4 capitalize font-bold ">
                        {loggedTeacher.gender}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-bold text-blue-700">
                        Date of Birth:
                      </span>
                      <span className="ml-4 font-bold">
                        {loggedTeacher.dob}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-bold text-blue-700">
                        Subjects:
                      </span>
                      <span className="ml-4 capitalize font-bold">
                        {loggedTeacher.subjects?.join(", ")}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-bold text-blue-700">
                        Education Level:
                      </span>
                      <span className="ml-4 capitalize font-bold">
                        {loggedTeacher.educationLevel}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-md font-bold text-blue-700">
                        Professional Title:
                      </span>
                      <span className="ml-4 capitalize font-bold">
                        {loggedTeacher.professionalTitle}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card rounded-full w-64 h-64 p-3 bg-accent shadow-xl">
              <img
                src={loggedTeacher?.img}
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

export default TeacherProfile;
