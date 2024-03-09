import React, { useState, useEffect } from "react";

const StudentLeaderboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch all students
        const studentsResponse = await fetch("http://localhost:5000/student");
        const studentsData = await studentsResponse.json();

        // Fetch rewards for each student
        const studentsWithRewards = await Promise.all(
          studentsData.map(async (student) => {
            const rewardsResponse = await fetch(
              `http://localhost:5000/student/rewards?studentEmail=${student.email}`
            );
            const rewardsData = await rewardsResponse.json();

            return { ...student, rewards: rewardsData };
          })
        );

        // Sort students by total points in descending order
        const sortedStudents = studentsWithRewards.sort(
          (a, b) => b.totalPoints - a.totalPoints
        );

        // Set students with rewards
        setStudents(sortedStudents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-100 via-blue-200 to-yellow-50 mt-20 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-primary mb-8">
          Student Leaderboard
        </h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Rewards</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 capitalize">{student.name}</td>
                  <td className="py-2 px-4">
                    {student.rewards.some(
                      (reward) => reward.studentEmail === student.email
                    ) ? (
                      <ul>
                        {student.rewards.reduce((totalPoints, reward) => {
                          if (reward.studentEmail === student.email) {
                            return totalPoints + parseInt(reward.points);
                          } else {
                            return totalPoints;
                          }
                        }, 0)}
                      </ul>
                    ) : (
                      <span>No rewards</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentLeaderboard;
