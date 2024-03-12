import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const StudentAnalytics = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonName, path) => {
    setSelectedButton(buttonName);
    navigate(path);
  };

  return (
    <div className=" bg-gradient-to-r from-slate-800 via-black to-slate-600">
      <div>
        <div className="flex items-center justify-center pt-3 gap-7">
          <button
            onClick={() => handleButtonClick("feedback", "/studentAnalytics")}
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
              FEEDBACK
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
            onClick={() =>
              handleButtonClick("reward", "/studentAnalytics/studentReward")
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
              REWARDS
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

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
