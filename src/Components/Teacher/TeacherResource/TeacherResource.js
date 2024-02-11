import React, { useState, useEffect } from "react";
import "../../Home/Landing.css";

const TeacherResource = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/teacher/resource");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/teacher/resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url }),
      });
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
      const data = await response.json();
      setPosts([...posts, data]);
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div>
      <div className="text-center p-4">
        <p>No previous posts.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mb-2 p-2 w-full border border-gray-300 rounded"
          />

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
              SUBMIT
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
        </form>
      </div>
      <div className="flex flex-wrap p-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 px-4"
          >
            <div className="border border-gray-300 rounded p-4">
              <h3 className="mb-2">{post.title}</h3>
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
        ))}
      </div>
    </div>
  );
};

export default TeacherResource;
