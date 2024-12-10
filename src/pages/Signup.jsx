import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Signup = () => {
  const [formdata, setformdata] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    skills: "",
    ProfileImage: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setformdata({
      ...formdata,
      role: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Create a FormData object
    const formData = new FormData();
  
    // Append user data as a JSON string
    const user = {
      username: formdata.username,
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
      role: formdata.role,
      skills: formdata.skills,
    };
    formData.append("user", JSON.stringify(user));
  
    // Append the profile image if it exists
    if (formdata.ProfileImage) {
      formData.append("imageFile", formdata.ProfileImage);
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        body: formData, // Send the FormData object
      });
  
      if (response.ok) {
        toast.success("User created successfully");
        setformdata({
          username: "",
          name: "",
          email: "",
          password: "",
          role: "",
          skills: "",
          ProfileImage: null,
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Error creating user.");
      }
    } catch (error) {
      toast.error("Failed to create user. Please try again later.");
      console.error("Error is: ", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "1em",
          marginTop: "70px", // Adjust height to account for the fixed header
        }}
      >
        <h2
          style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}
        >
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} style={{ fontSize: "0.9rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formdata.username}
              required
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Full Names:
            </label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Role:
            </label>
            <select
              name="role"
              value={formdata.role}
              onChange={handleRoleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select a Role</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Skills:
            </label>
            <input
              type="text"
              name="skills"
              value={formdata.skills}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Profile Image:
            </label>
            <input
              type="file"
              name="ProfileImage"
              onChange={(e) =>
                setformdata({ ...formdata, ProfileImage: e.target.files[0] })
              }
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: loading ? "#ccc" : "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Saving..." : "Save User"}
          </button>
        </form>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Signup;
