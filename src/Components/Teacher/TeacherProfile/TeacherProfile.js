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
    <div className="bg-white px-24 p-7 shadow rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl text-primary font-bold">
          {loggedTeacher?.name}
        </h2>
      </div>

      <div className="flex gap-10">
        <div className="lg:w-full lg:pt-20 p-8">
          <div className="card max-w-lg bg-gradient-to-r from-purple-200 to-blue-100 shadow-xl">
            <div className="card-body">
              <h1 className="text-center text-2xl text-primary font-extrabold mb-4">
                Teacher Information
              </h1>
              <div className="flex">
                <ul className="mb-4">
                  <li className="mb-2">
                    <span className="text-md font-medium text-primary">
                      Email:
                    </span>
                    <span className="ml-4 font-bold">
                      {loggedTeacher?.email}
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-md font-medium text-primary">
                      Gender:
                    </span>
                    <span className="ml-4 capitalize font-bold ">
                      {loggedTeacher.gender}
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-md font-medium text-primary">
                      Date of Birth:
                    </span>
                    <span className="ml-4 font-bold">{loggedTeacher.dob}</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-md font-medium text-primary">
                      Subjects:
                    </span>
                    <span className="ml-4 capitalize font-bold">
                      {loggedTeacher.subjects?.join(", ")}
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-md font-medium text-primary">
                      Education Level:
                    </span>
                    <span className="ml-4 capitalize font-bold">
                      {loggedTeacher.educationLevel}
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-md font-medium text-primary">
                      Professional Title:
                    </span>
                    <span className="ml-4 capitalize font-bold">
                      {loggedTeacher.professionalTitle}
                    </span>
                  </li>
                </ul>
                <img
                  src={loggedTeacher?.img}
                  alt="user"
                  className="w-32 h-32 rounded-full mb-4 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form for creating a new project */}
        <div className="lg:w-full lg:pt-20 p-8">
          <div className="card max-w bg-gradient-to-r from-purple-200 to-blue-100 shadow-xl">
            <div className="card-body">
              <h1 className="text-center text-2xl text-primary font-extrabold mb-4">
                Create Project
              </h1>
              <div className="mb-4">
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newProject.title}
                    onChange={handleNewProjectChange}
                    placeholder="Title"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleNewProjectChange}
                    placeholder="Description"
                    className="textarea textarea-bordered textarea-sm"
                  ></textarea>
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={newProject.subject}
                    onChange={handleNewProjectChange}
                    className="select select-bordered select-sm"
                  >
                    <option value="">Select Subject</option>
                    <option value="">Select Subject</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="math">Math</option>
                  </select>
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="batchName"
                  >
                    Batch Name
                  </label>
                  <input
                    type="text"
                    id="batchName"
                    name="batchName"
                    value={newProject.batchName}
                    onChange={handleNewProjectChange}
                    placeholder="Batch Name"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="yearOfStudy"
                  >
                    Year of Study
                  </label>
                  <input
                    type="text"
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={newProject.yearOfStudy}
                    onChange={handleNewProjectChange}
                    placeholder="Year of Study"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <button onClick={handleCreateProject} className="custom-btn">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
