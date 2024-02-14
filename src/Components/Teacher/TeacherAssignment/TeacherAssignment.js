import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useForm } from "react-hook-form";
import banner1 from "../../../images/createProject.png";
import banner2 from "../../../images/create2.png";
import banner3 from "../../../images/create3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const TeacherAssignment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    requiredSkills: [],
    expertise: "",
    additionalExpertise: "",
    deadline: "",
  });
  const images = [banner1, banner2, banner3];

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
    fetch(`http://localhost:5000/teacher/assignment`, {
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
          requiredSkills: [],
          expertise: "",
          additionalExpertise: "",
          deadline: "",
        });
      })
      .catch((error) => console.error("Error creating project:", error));
  };

  return (
    <div className="bg-gradient-to-r from-neutral via-blue-100 to-neutral lg:flex">
      <div className="lg:w-1/2 pt-20">
        <Slider
          className="carousel border-blue-400 rounded-3xl relative"
          autoplay={true}
          autoplaySpeed={1500}
          infinite={true}
          arrows={false}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img
                src={image}
                alt={`Banner ${index}`}
                className="w-full lg:h-auto"
              />
            </div>
          ))}
        </Slider>
        <div className="flex items-center justify-center">
          <Link to="/teacherViewAllAssignment">
            <button
              type="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "13rem",
                overflow: "hidden",
                height: "3rem",
                backgroundSize: "300% 300%",
                backdropFilter: "blur(1rem)",
                borderRadius: "5rem",
                transition: "0.5s",
                border: "double 4px transparent",
                backgroundImage:
                  "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
                animation: "gradient_301 5s ease infinite",
              }}
            >
              <strong
                style={{
                  zIndex: 2,
                  fontFamily: "Avalors Personal Use",
                  fontSize: "12px",
                  letterSpacing: "5px",
                  color: "#FFFFFF",
                  textShadow: "0 0 4px white",
                }}
              >
                VIEW ALL ASSIGNMENTS
              </strong>
              <div
                id="container-stars"
                style={{
                  position: "absolute",
                  zIndex: -1,
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  transition: "0.5s",
                  backdropFilter: "blur(1rem)",
                  borderRadius: "5rem",
                }}
              >
                <div
                  id="stars"
                  style={{
                    position: "relative",
                    background: "transparent",
                    width: "200rem",
                    height: "200rem",
                    animation: "animStarRotate 90s linear infinite",
                  }}
                ></div>
              </div>
              <div
                id="glow"
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "12rem",
                }}
              >
                <div
                  className="circle"
                  style={{
                    width: "100%",
                    height: "30px",
                    filter: "blur(2rem)",
                    animation: "pulse_3011 4s infinite",
                    zIndex: -1,
                  }}
                ></div>
                <div
                  className="circle"
                  style={{
                    width: "100%",
                    height: "30px",
                    filter: "blur(2rem)",
                    animation: "pulse_3011 4s infinite",
                    zIndex: -1,
                  }}
                ></div>
              </div>
            </button>
          </Link>
        </div>
      </div>

      <div className="lg:w-2/3 lg:pt-28 p-8">
        <div className="card max-w-2xl bg-gradient-to-r from-yellow-50 to-sky-200 shadow-xl">
          <div className="card-body">
            <h1 className="text-center uppercase text-2xl text-primary font-extrabold mb-4">
              create Assignment
            </h1>
            <form onSubmit={handleSubmit(handleCreateProject)}>
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
                    {...register("title", { required: true })}
                    value={newProject.title}
                    onChange={handleNewProjectChange}
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
                {/* Required Skills */}
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="requiredSkills"
                  >
                    Required Skills
                  </label>
                  <select
                    id="requiredSkills"
                    {...register("requiredSkills", { required: true })}
                    multiple={true}
                    onChange={(e) =>
                      handleNewProjectChange({
                        target: {
                          name: "requiredSkills",
                          value: [...e.target.selectedOptions].map(
                            (opt) => opt.value
                          ),
                        },
                      })
                    }
                    className="select select-bordered select-sm"
                  >
                    <option value="">Select Skills</option>
                    <option value="Material_idea">Material idea</option>
                    <option value="Managing_cost">Managing cost</option>
                    <option value="Team_work">Team work</option>
                  </select>
                  {errors.requiredSkills && (
                    <span className="text-red-500">
                      At least one skill is required
                    </span>
                  )}
                </div>
                {/* Expertise */}
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="expertise"
                  >
                    Expertise
                  </label>
                  <select
                    id="expertise"
                    {...register("expertise", { required: true })}
                    value={newProject.expertise}
                    onChange={handleNewProjectChange}
                    className="select select-bordered select-sm"
                  >
                    <option value="">Select Expertise</option>
                    <option value="5th Grade">5th Grade</option>
                    <option value="6th Grade">6th Grade</option>
                    <option value="7th Grade">7th Grade</option>
                    <option value="8th Grade">8th Grade</option>
                    <option value="9th Grade">9th Grade</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                    <option value="Honors">Honors</option>
                  </select>
                  {errors.expertise && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                {/* Additional Expertise */}
                <div className="flex flex-col mb-4">
                  <label
                    className="text-md font-medium text-primary mb-2"
                    htmlFor="additionalExpertise"
                  >
                    Additional Expertise
                  </label>
                  <input
                    type="text"
                    id="additionalExpertise"
                    {...register("additionalExpertise")}
                    value={newProject.additionalExpertise}
                    onChange={handleNewProjectChange}
                    placeholder="Additional Expertise"
                    className="input input-bordered input-sm"
                  />
                </div>
                {/* Deadline */}
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
                    value={newProject.deadline}
                    onChange={handleNewProjectChange}
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
    </div>
  );
};

export default TeacherAssignment;
