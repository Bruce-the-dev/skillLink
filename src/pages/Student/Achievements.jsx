import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";

function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["id"]); // Getting user ID from cookies

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const userId = cookies.id; // Get user ID from cookies

        if (!userId) {
          toast.error("User ID is not available in cookies.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/achievements/user/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch achievements");
        }

        const data = await response.json(); // Parse the response as JSON
        setAchievements(data);
        setLoading(false);
      } catch (err) {
        toast.error("Error fetching achievements: " + err.message);
        setError(err);
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [cookies.id]); // Dependency on cookies.id to refetch if it changes

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h1 style={styles.header}>Achievements</h1>
      {loading ? (
        <p style={styles.noAchievements}>Loading achievements...</p>
      ) : error ? (
        <p style={styles.noAchievements}>Error: {error.message}</p>
      ) : achievements.length > 0 ? (
        <div style={styles.achievementsList}>
          {achievements.map((achievement) => (
            <div key={achievement.id} style={styles.achievementCard}>
              <h2 style={styles.achievementTitle}>{achievement.badge}</h2>
              <p style={styles.achievementPoints}>
                Points: {achievement.points}
              </p>
              <p style={styles.achievementDate}>
                Awarded on:{" "}
                {new Date(achievement.dateEarned).toLocaleDateString()}
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
  achievementPoints: {
    fontStyle: "italic",
    color: "#555",
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
