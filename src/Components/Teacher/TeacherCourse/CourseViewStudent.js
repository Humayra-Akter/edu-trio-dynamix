import React, { useEffect, useState } from "react";
import { filterSettings } from "react-slick/lib/utils/innerSliderUtils";
import { toast } from "react-toastify";

const CourseViewStudent = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [coursesTaken, setCoursesTaken] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    teacherEmail: "",
    rewardTitle: "",
    description: "",
    points: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/teacher/course")
      .then((res) => res.json())
      .then((data) => {
        const filteredCourses = data.filter(
          (course) => course.teacherEmail === userEmail
        );
        setCoursesTaken(filteredCourses);
      });
  }, [userEmail]);

  useEffect(() => {
    fetch("http://localhost:5000/student/course")
      .then((res) => res.json())
      .then((data) => {
        setEnrolledStudents(data);
      });
  }, [userEmail]);
  console.log(coursesTaken);

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      ...formData,
      studentName: student.name,
      studentEmail: student.email,
      teacherEmail: userEmail,
      rewardTitle: "", // Reset other reward fields
      description: "",
      points: 0,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (formData.points < 0 || formData.points > 5) {
        toast.error("Points must be between 0 and 5.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/student/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage("Reward added successfully.");
      } else {
        setError("Failed to add reward. Please try again.");
      }
    } catch (error) {
      console.error("Error adding reward:", error);
      setError("Failed to add reward. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div className="flex justify-center items-center pt-14">
        <div className="bg-white px-24 p-7">
          <div className="text-center">
            <h2 className="text-3xl text-accent capitalize font-bold">
              Student List
            </h2>
          </div>
          {coursesTaken.length > 0 && (
            <div className="lg:w-full lg:pt-12 gap-7 p-8 ">
              {coursesTaken.map((course) => (
                <div
                  key={course._id}
                  className="card max-w-2xl bg-gradient-to-b from-teal-100 to-slate-400 shadow-xl m-4 p-4"
                >
                  <h2 className="text-lg font-bold">{course.course}</h2>
                  <p>
                    <span className="text-md font-bold text-green-800">
                      Teacher Name:
                    </span>{" "}
                    {course.teacherName}
                  </p>
                  <div className="mt-2">
                    <h3 className="text-md text-md font-bold text-green-800">
                      Enrolled Students:
                    </h3>

                    <ul className="lg:flex flex-wrap justify-center">
                      {enrolledStudents
                        .filter(
                          (student) =>
                            student.course.course === course.course &&
                            student.course.teacherEmail === course.teacherEmail
                        )
                        .map((student) => (
                          <div key={student._id}>
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Name:
                              </span>{" "}
                              {student.student.name}
                            </p>
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Email:
                              </span>{" "}
                              {student.student.email}
                            </p>
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Grade:
                              </span>{" "}
                              {student.student.gradeYear}
                            </p>{" "}
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Batch:
                              </span>{" "}
                              {student.course.batch}
                            </p>{" "}
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Time:
                              </span>{" "}
                              {student.course.time}
                            </p>
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Institution:
                              </span>{" "}
                              {student.student.institution}
                            </p>
                            <p>
                              <span className="text-md font-bold text-green-800">
                                Preferred Communication Channel:
                              </span>{" "}
                              {student.student.communicationChannel}
                            </p>
                            <div className="flex items-center justify-center mt-5">
                              <button
                                onClick={() => handleOpenModal(student.student)}
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
                                  GIVE REWARDS
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
                                      animation:
                                        "animStarRotate 90s linear infinite",
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
                            </div>
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
              {coursesTaken.length === 0 && <p>No courses taken yet.</p>}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Give Reward to {selectedStudent?.name}
            </h2>
            {successMessage && (
              <div className="text-green-600 mb-4">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="rewardTitle" className="block font-medium mb-1">
                  Reward Title
                </label>
                <input
                  type="text"
                  id="rewardTitle"
                  name="rewardTitle"
                  value={formData.rewardTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="points" className="block font-medium mb-1">
                  Points
                </label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-center gap-5">
                <button
                  type="submit"
                  disabled={loading}
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
                    {loading ? "ADDING REWARD..." : "ADD REWARD"}
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
                <button
                  onClick={handleCloseModal}
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
                    CLOSE
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseViewStudent;
