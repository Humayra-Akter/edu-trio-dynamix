import React, { useState } from "react";

function UploadFile() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const response = await fetch("/uploadFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("PDF file uploaded successfully.");
      } else {
        console.error("Failed to upload PDF file.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1>Upload PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2px",
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
          UPLOAD
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
  );
}

export default UploadFile;
