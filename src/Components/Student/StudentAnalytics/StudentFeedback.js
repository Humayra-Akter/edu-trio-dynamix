import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import login from "../../../images/feedback.png";

const StudentFeedback = () => {
  const userEmail = localStorage.getItem("userEmail");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hasAlreadyReviewed, setHasAlreadyReviewed] = useState(false);
  const [coursesTaken, setCoursesTaken] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/student/course")
      .then((res) => res.json())
      .then((data) => {
        const filteredCourses = data.filter(
          (course) => course.student.email === userEmail
        );

        const uniqueCoursesMap = new Map();
        filteredCourses.forEach((course) => {
          uniqueCoursesMap.set(course.course?._id, course);
        });
        const uniqueCourses = Array.from(uniqueCoursesMap.values());
        setCoursesTaken(uniqueCourses);
      });
  }, [userEmail]);

  useEffect(() => {
    checkIfUserHasAlreadyReviewed(userEmail);
  }, [userEmail, coursesTaken]);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const getUserReviews = async (userEmail) => {
    try {
      const response = await fetch(
        `http://localhost:5000/student/submitFeedback?userEmail=${userEmail}`
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch user reviews");
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      return [];
    }
  };

  const checkIfUserHasAlreadyReviewed = async (userEmail) => {
    const userReviews = await getUserReviews(userEmail);
    const reviewedCourses = userReviews.map((review) => review.course?._id);
    const alreadyReviewed = coursesTaken.some((course) =>
      reviewedCourses.includes(course.course?._id)
    );
    setHasAlreadyReviewed(alreadyReviewed);
  };

  const submitReview = async () => {
    if (rating > 0 && reviewText) {
      if (hasAlreadyReviewed) {
        toast.error("You have already reviewed these courses.");
      } else {
        try {
          const promises = coursesTaken.map((course) => {
            const review = {
              userEmail,
              teacherEmail: course.course.teacherEmail,
              course: course.course,
              student: course.student,
              rating,
              reviewText,
              reviewType: "course",
            };
            return fetch("http://localhost:5000/student/submitFeedback", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(review),
            });
          });
          await Promise.all(promises);
          toast.success("Thanks for your reviews.", {
            position: toast.POSITION.TOP_CENTER,
          });
          checkIfUserHasAlreadyReviewed(userEmail);
          setRating(0);
          setReviewText("");
        } catch (error) {
          console.error("Error submitting review:", error);
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 lg:flex">
      <div className="lg:w-1/2">
        <img src={login} className="w-full p-20 h-auto" alt="Login" />
      </div>
      <div className="lg:w-1/2 lg:pt-28 p-8">
        <div className="card max-w-md bg-gradient-to-r from-neutral via-yellow-50 to-blue-50 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl text-primary font-extrabold mb-4">
              Give Feedback for{" "}
              {coursesTaken.length > 0 ? "Your Courses" : "No courses taken"}
            </h2>
            {coursesTaken.map((course, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-bold text-lg text-primary">
                  Teacher: {course.course.teacherName}
                </h3>
                <p className="font-bold">Course: {course.course.course}</p>
                <p className="font-bold">Grade: {course.course.grade}</p>
                <p className="font-bold">Batch: {course.course.batch}</p>
                <span>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className="text-xl"
                      onClick={() => handleRatingClick(index + 1)}
                      style={{ cursor: "pointer", color: "brown" }}
                    >
                      {index < rating ? "★" : "☆"}
                    </span>
                  ))}
                </span>
                <textarea
                  className="input input-bordered w-full my-3"
                  placeholder="Write a review (max 100 characters)"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                {course.course.ratedBy === userEmail && (
                  <div>
                    <p>Your Rating: {course.rating}</p>
                    <p>Your Review: {course.reviewText}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-center items-center">
              <button
                onClick={submitReview}
                disabled={rating === 0 || reviewText.length === 0}
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
                  SUBMIT FEEDBACK
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
