import React, { useState, useEffect } from "react";

const StudentReward = () => {
  const [rewards, setRewards] = useState([]);
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [loggedStudent, setLoggedStudent] = useState({});

  useEffect(() => {
    if (userRole === "student" && userEmail) {
      fetch(`http://localhost:5000/student?email=${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const matchingUser = data.find(
              (userData) => userData.email === userEmail
            );
            if (matchingUser) {
              setLoggedStudent(matchingUser);
              fetch(
                `http://localhost:5000/student/rewards?studentEmail=${userEmail}`
              )
                .then((response) => response.json())
                .then((data) => {
                  const studentRewards = data.filter(
                    (reward) => reward.studentEmail === matchingUser.email
                  );
                  setRewards(studentRewards);
                })
                .catch((error) => {
                  console.error("Error fetching rewards:", error);
                });
            }
          }
        });
    }
  }, [userRole, userEmail]);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-2/3">
        {rewards.map((reward) => (
          <div
            key={reward._id}
            className="bg-white shadow-md p-4 rounded-md mb-4 relative"
          >
            <h2 className="text-lg font-semibold">{reward.rewardTitle}</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Student:</span>{" "}
              {reward.studentName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Teacher:</span>{" "}
              {reward.teacherEmail}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Description:</span>{" "}
              {reward.description}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Points:</span> {reward.points}
            </p>
            {parseInt(reward.points) > 3 ? (
              <div className="absolute top-0 right-0 bg-green-600 text-white p-2 rounded-md">
                Good job!
              </div>
            ) : (
              <div className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-md">
                Need Improvement
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentReward;
