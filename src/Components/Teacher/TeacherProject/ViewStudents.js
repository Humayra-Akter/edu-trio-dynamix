import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ViewStudents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userEmail = localStorage.getItem("userEmail");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [loggedTeacherProjects, setLoggedTeacherProjects] = useState([]);

  // Assuming you have the teacher's email stored in localStorage
  const teacherEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch("http://localhost:5000/teacher/project")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });

    fetch("http://localhost:5000/student/collaborate")
      .then((res) => res.json())
      .then((data) => {
        setCollaborators(data);
      });
  }, []);

  useEffect(() => {
    if (teacherEmail) {
      const filteredProjects = projects.filter(
        (project) => project.teacherEmail === teacherEmail
      );
      setLoggedTeacherProjects(filteredProjects);
    }
  }, [teacherEmail, projects]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const getCollaboratorsForProject = (projectId) => {
    return collaborators.filter((collab) => collab.project._id === projectId);
  };

  // Assume you have some way to retrieve the selected course details
  const selectedCourse = {
    batch: "Batch Name",
    grade: "Grade",
    subject: "Subject",
  };

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/teacher/project?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setLoggedTeacherProjects(data);
        });
    }
  }, [userEmail]);

  const handleCreateAssignment = (data) => {
    const newAssignment = {
      ...data,
      teacherEmail: userEmail,
    };
    fetch("http://localhost:5000/teacher/assignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error creating assignment:", error));
  };

  return (
    <div className="flex bg-gradient-to-r from-neutral via-blue-100 to-neutral">
      <div className="w-1/2 px-8 py-16">
        <div className="card max-w-lg mx-auto bg-gradient-to-r from-yellow-50 to-sky-200 shadow-xl">
          <div className="card-body">
            <h1 className="text-center uppercase text-2xl text-primary font-extrabold mb-4">
              Create Assignment
            </h1>
            <form onSubmit={handleSubmit(handleCreateAssignment)}>
              <div className="mb-4">
                <input
                  type="hidden"
                  {...register("batchName")}
                  defaultValue={selectedCourse.batch}
                />
                <input
                  type="hidden"
                  {...register("grade")}
                  defaultValue={selectedCourse.grade}
                />
                <input
                  type="hidden"
                  {...register("subject")}
                  defaultValue={selectedCourse.subject}
                />
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
                    {...register("title", { required: true })}
                    placeholder="Title"
                    className="input input-bordered input-sm"
                  />
                  {errors.title && (
                    <span className="text-red-500">This field is required</span>
                  )}
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
                    {...register("description")}
                    placeholder="Description"
                    className="textarea textarea-bordered textarea-sm"
                  ></textarea>
                </div>

                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="deadline"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    {...register("deadline", { required: true })}
                    placeholder="Deadline"
                    className="input input-bordered input-sm"
                  />
                  {errors.deadline && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center mt-5">
                <button type="submit" className="custom-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-1/2 p-8">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-primary capitalize font-bold">
              Student List
            </h2>
          </div>
          <div className="lg:w-full lg:pt-12 gap-7 p-8 lg:flex flex-wrap justify-center">
            {loggedTeacherProjects.map((project) => (
              <div
                key={project._id}
                className="card max-w-2xl bg-gradient-to-b from-yellow-50 to-blue-300 shadow-xl m-4 p-4"
                onClick={() => handleOpenModal(project)}
              >
                <h2 className="text-lg font-bold">{project.project}</h2>
                <p>
                  <span className="font-semibold">Teacher Name:</span>{" "}
                  {project.teacherName}
                </p>
                <p>
                  <span className="font-semibold">Batch:</span> {project.batch}
                </p>
                <p>
                  <span className="font-semibold">Grade:</span> {project.grade}
                </p>
                <p>
                  <span className="font-semibold">Type:</span> {project.type}
                </p>
                <p>
                  <span className="font-semibold">Submit Last Date:</span>{" "}
                  {project.submitLastDate}
                </p>
              </div>
            ))}
            {loggedTeacherProjects.length === 0 && (
              <p>No projects available for the logged-in teacher.</p>
            )}
          </div>
        </div>
      </div>
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Collaborators for {selectedProject.project}
            </h2>
            <ul>
              {getCollaboratorsForProject(selectedProject._id).map(
                (collaborator) => (
                  <li key={collaborator.student._id}>
                    {collaborator.student.name}
                  </li>
                )
              )}
            </ul>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
