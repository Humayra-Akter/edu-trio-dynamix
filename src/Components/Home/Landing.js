import React from "react";
import "./Landing.css";
import bg from "../../images/landing2.jpg";
import student from "../../images/student.png";
import teacher from "../../images/teacher.png";
import landing from "../../images/landing.png";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Landing = () => {
  const handleSignup = () => {
    const modal = document.getElementById("my_modal_5");
    modal.showModal();
  };

  return (
    <div
      className="h-screen flex flex-col md:flex-row justify-center items-center relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center">
        <div className="text-center md:w mx-auto md:mx-0 md:mr-8">
          <h1
            style={{ fontFamily: "cursive" }}
            className="lg:text-4xl text-blue-900 font-bold mb-4"
          >
            Welcome to EduTrio Dynamix
          </h1>
          <h2 className="text-lg text-yellow-700 font-bold mb-8">
            <TypeAnimation
              sequence={[
                "Empowering Collaboration & Innovation Across Disciplines",
                2000,
                "Transforming Education with Technology and Creativity",
                2000,
                "Fostering Lifelong Learning and Global Connectivity",
                2000,
              ]}
              speed={50}
              wrapper="span"
              repeat={Infinity}
            />
          </h2>
          <div className="flex space-x-6 px-16">
            <button
              onClick={handleSignup}
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
                SIGNUP
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

            <Link to="/login">
              <button
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
                  LOGIN
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
      </div>
      <img
        src={landing}
        className="w-full md:w-1/2 h-auto"
        alt="landing image"
      />
      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-accent text-center text-lg">
            Choose Your Role
          </h3>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center justify-center gap-11">
                <Link to="/studentRegistrationForm">
                  <img src={student} />
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
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
                      STUDENT
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

                <Link to="/teacherRegistrationForm">
                  <img src={teacher} />
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
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
                      TEACHER
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
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Landing;
