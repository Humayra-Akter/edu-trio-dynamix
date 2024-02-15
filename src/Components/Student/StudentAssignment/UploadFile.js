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
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadFile;
