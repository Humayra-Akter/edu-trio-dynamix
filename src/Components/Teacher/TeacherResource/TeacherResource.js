import React, { useState, useEffect } from "react";
import "../../Home/Landing.css";
import { useForm } from "react-hook-form";

const TeacherResource = () => {
  const [posts, setPosts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchPosts();
  }, []);
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedTeacher, setLoggedTeacher] = useState({});

  useEffect(() => {
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
  console.log(loggedTeacher.name);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/teacher/resource");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handleAddResource = async (formData) => {
    const { name, email } = loggedTeacher;
    console.log(formData);
    const resourceData = {
      grade: formData.grade,
      title: formData.title,
      url: formData.url,
      subject: formData.subject,
      teacherName: name,
      teacherEmail: email,
    };

    const response = await fetch("http://localhost:5000/teacher/resource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resourceData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  // console.log(posts);

  return (
    <div className="bg-gradient-to-r from-neutral via-blue-100 to-neutral">
      <div className="flex justify-center items-center p-4">
        <form onSubmit={handleSubmit(handleAddResource)} className="mt-4 w-96">
          {/* Title field */}
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Title of content"
              {...register("title", {
                required: "Title is required",
              })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.title && (
              <span className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Grade field */}
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Grade Eg:9th, 10th"
              {...register("grade", {
                required: "Grade is required",
              })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.grade && (
              <span className="text-red-500 text-xs mt-1">
                {errors.grade.message}
              </span>
            )}
          </div>

          {/* Subject field */}
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Subject Eg: Physics, Chemistry etc"
              {...register("subject", {
                required: "Subject is required",
              })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.subject && (
              <span className="text-red-500 text-xs mt-1">
                {errors.subject.message}
              </span>
            )}
          </div>

          {/* URL field */}
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="YouTube URL"
              {...register("url", {
                required: "URL is required",
              })}
              className="mb-2 p-2 w-full border border-gray-300 rounded"
            />
            {errors.url && (
              <span className="text-red-500 text-xs mt-1">
                {errors.url.message}
              </span>
            )}
          </div>
          <div className="flex items-center justify-center">
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
                ADD RESOURCE
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
      <div className="flex flex-wrap p-4">
        {!posts ? (
          <p className="text-center font-bold text-red-600 text-2xl">
            No previous posts.
          </p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-4"
            >
              <div className="border bg-gradient-to-b from-neutral to-accent  border-gray-300 rounded p-4">
                <h3 className="mb-2 text-center font-bold text-xl text-primary">
                  {post.title}
                </h3>
                <h3 className="mb-2 text-center font-bold text-primary">
                  Teacher name : {post.teacherName}
                </h3>
                <h3 className="mb-2 text-center font-bold text-black">
                  Grade : {post.grade}
                </h3>
                <iframe
                  width="100%"
                  height="auto"
                  src={post.url}
                  frameBorder="0"
                  allowFullScreen
                  title={post.title}
                  className="border-none"
                ></iframe>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherResource;
