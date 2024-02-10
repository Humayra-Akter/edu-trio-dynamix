import React from "react";
import bg from "../../images/patternpad.png";

const Landing = () => {
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-white text-center">
        <h1 className="text-4xl text-accent font-bold mb-4">
          Welcome to EduTrio Dynamix
        </h1>
        <p className="text-lg text-accent font-bold">
          Empowering Collaboration & Innovation Across Disciplines
        </p>
      </div>
    </div>
  );
};

export default Landing;
