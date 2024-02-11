import React, { useEffect, useState } from "react";

const TeacherProfile = () => {
  const [loggedTeacher, setLoggedTeacher] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTeacher, setUpdatedTeacher] = useState({});
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    subject: "",
    batchName: "",
    yearOfStudy: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/teacher`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setLoggedTeacher(data[0]); // Assuming only one teacher is returned, modify this logic as per your requirements
          setUpdatedTeacher(data[0]);
        }
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedTeacher(loggedTeacher);
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:5000/teacher/${loggedTeacher._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTeacher),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Handle success or error
        setIsEditing(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeacher({
      ...updatedTeacher,
      [name]: value,
    });
  };

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
        console.log(data); // Handle success or error
        // Optionally, you can clear the form fields after successful creation
        setNewProject({
          title: "",
          description: "",
          subject: "",
          batchName: "",
          yearOfStudy: "",
        });
      });
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl text-primary font-bold">
          {loggedTeacher?.name}
        </h2>
      </div>

      <div className="flex">
        <div className="lg:w-1/2 lg:pt-28 p-8">
          <div className="card max-w-md bg-gradient-to-r from-neutral to-accent shadow-xl">
            <div className="card-body">
              <h1 className="text-center text-2xl text-primary font-extrabold mb-4">
                Teacher Information
              </h1>
              <ul className="mb-4">
                <li className="mb-2">
                  <span className="text-md font-medium text-primary">
                    Email:
                  </span>
                  <span className="ml-4 font-bold">{loggedTeacher?.email}</span>
                </li>
                <li className="mb-2">
                  <span className="text-md font-medium text-primary">
                    Gender:
                  </span>
                  <span className="ml-4 font-bold capitalize">
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
                  <span className="ml-4 font-bold">
                    {loggedTeacher.subjects?.join(", ")}
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-md font-medium text-primary">
                    Education Level:
                  </span>
                  <span className="ml-4 font-bold">
                    {loggedTeacher.educationLevel}
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-md font-medium text-primary">
                    Professional Title:
                  </span>
                  <span className="ml-4 font-bold">
                    {loggedTeacher.professionalTitle}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form for creating a new project */}

        <div className="lg:w-full lg:pt-28 p-8">
          <div className="card max-w-md  bg-gradient-to-r from-neutral to-accent shadow-xl">
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
                    {/* Add options for subjects */}
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
                <button
                  onClick={handleCreateProject}
                  className="bg-primary text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
