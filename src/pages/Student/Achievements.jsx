import React, { useState, useEffect } from "react";

function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch achievements data from API or use mock data
    const fetchAchievements = async () => {
      // Replace with actual API call
      const mockData = [
        {
          id: 1,
          type: "Badge",
          title: "React Beginner",
          description: "Completed the React for Beginners course.",
          dateAwarded: "2024-01-15",
        },
        {
          id: 2,
          type: "Certificate",
          title: "Advanced JavaScript",
          description: "Passed the Advanced JavaScript certification exam.",
          dateAwarded: "2024-03-22",
        },
        {
          id: 3,
          type: "Milestone",
          title: "100 Hours of Learning",
          description: "Achieved 100 hours of learning on the platform.",
          dateAwarded: "2024-05-10",
        },
      ];
      setAchievements(mockData);
    };

    fetchAchievements();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Achievements</h1>
      {achievements.length > 0 ? (
        <div style={styles.achievementsList}>
          {achievements.map((achievement) => (
            <div key={achievement.id} style={styles.achievementCard}>
              <h2 style={styles.achievementTitle}>{achievement.title}</h2>
              <p style={styles.achievementType}>{achievement.type}</p>
              <p style={styles.achievementDescription}>
                {achievement.description}
              </p>
              <p style={styles.achievementDate}>
                Awarded on:{" "}
                {new Date(achievement.dateAwarded).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noAchievements}>No achievements to display.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  achievementsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  achievementCard: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  achievementTitle: {
    margin: "0 0 10px 0",
  },
  achievementType: {
    fontStyle: "italic",
    color: "#555",
  },
  achievementDescription: {
    margin: "10px 0",
  },
  achievementDate: {
    color: "#888",
  },
  noAchievements: {
    textAlign: "center",
    color: "#888",
  },
};

export default AchievementsPage;
