import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from "./Header";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    profileImage: "",
  });

  // CSS Styles (Inline)
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
    },
    profileCard: {
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "500px",
      padding: "30px",
      textAlign: "center",
    },
    profileImage: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #6a11cb",
      marginBottom: "20px",
    },
    profileName: {
      fontSize: "24px",
      color: "#333",
      marginBottom: "10px",
      fontWeight: "600",
    },
    profileEmail: {
      color: "#666",
      marginBottom: "15px",
    },
    inputField: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    },
    button: {
      background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      margin: "10px 5px",
    },
    cancelButton: {
      background: "#f44336",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      margin: "10px 5px",
    },
  };

  // Retrieve userId from cookies
  useEffect(() => {
    const id = Cookies.get("id");
    setUserId(id);
  }, []);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setFormData(data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId]);

  const handleUpdate = () => {
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Failed to update profile");
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.profileCard}>
          {isEditing ? (
            <div>
              <input
                style={styles.inputField}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                style={styles.inputField}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                style={styles.inputField}
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
              />
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => console.log(e.target.files[0])}
                  style={{ display: "block" }}
                />
              </div>
              <button style={styles.button} onClick={handleUpdate}>
                Save Changes
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <img
                style={styles.profileImage}
                src={user.profileImage}
                alt={`${user.name}'s profile`}
              />
              <h2 style={styles.profileName}>{user.name}</h2>
              <p style={styles.profileEmail}>{user.email}</p>
              <p>{user.role}</p>
              <button style={styles.button} onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
