import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

const UpdateProfile = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const navigate = useNavigate(); // For potential navigation actions
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    profileImage: "",
  });

  // Fetch User Information
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setFormData(data); // Populate form data for editing
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]);

  // Handle Profile Update
  const handleUpdate = () => {
    fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // Update user state with the new data
        setIsEditing(false); // Exit editing mode
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show loading state if user data is not fetched yet
  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-info">
        {isEditing ? (
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
            />
            <input
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              placeholder="Profile Image URL"
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <img src={user.profileImage} alt={`${user.name}'s profile`} />
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
