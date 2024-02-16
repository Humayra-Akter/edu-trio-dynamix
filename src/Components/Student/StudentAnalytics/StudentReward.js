import React, { useState, useEffect } from "react";

const StudentReward = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Fetch rewards data from the backend
    fetch("/student/rewards")
      .then((response) => response.json())
      .then((data) => {
        setRewards(data);
      })
      .catch((error) => {
        console.error("Error fetching rewards:", error);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Student Rewards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.length > 0 ? (
          rewards.map((reward) => (
            <div key={reward._id} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">{reward.title}</h2>
              <p className="text-gray-600 mb-2">{reward.description}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 14a6 6 0 1 1 4-10.196V7h-2v4.804A6.013 6.013 0 0 1 9 16z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{new Date(reward.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 14a6 6 0 1 1 4-10.196V7h-2v4.804A6.013 6.013 0 0 1 9 16z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{reward.points} Points</span>
              </div>
            </div>
          ))
        ) : (
          <p>No rewards available</p>
        )}
      </div>
    </div>
  );
};

export default StudentReward;
