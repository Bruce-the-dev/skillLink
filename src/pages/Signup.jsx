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
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <div style={formStyles.segment}>
          <h1>Sign Up</h1>
        </div>

        <div style={formStyles.flexContainer}>
          <label style={formStyles.label}>
            <input
              type="text"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              placeholder="Username"
              required
              style={formStyles.input}
            />
          </label>

          <label style={formStyles.label}>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              placeholder="Full Names"
              required
              style={formStyles.input}
            />
          </label>
        </div>

        <div style={formStyles.flexContainer}>
          <label style={formStyles.label}>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Email"
              required
              style={formStyles.input}
            />
          </label>

          <label style={formStyles.label}>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Password"
              required
              style={formStyles.input}
            />
          </label>
        </div>

        <div style={formStyles.flexContainer}>
          <label style={formStyles.label}>
            <input
              type="text"
              name="skills"
              value={formdata.skills}
              onChange={handleChange}
              placeholder="Skills"
              style={formStyles.input}
            />
          </label>

          <label style={formStyles.label}>
            <select
              name="role"
              value={formdata.role}
              onChange={handleRoleChange}
              style={formStyles.input}
            >
              <option value="">Select a Role</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
        </div>

        <label style={formStyles.fileInput}>
          <input
            type="file"
            name="ProfileImage"
            onChange={(e) =>
              setformdata({ ...formdata, ProfileImage: e.target.files[0] })
            }
            style={formStyles.input}
          />
          <span>Profile Image</span>
        </label>

        <button type="submit" className="red" disabled={loading} 
         style={{
          marginTop: "30px",
          width: "97%",
          height: "40px",
          padding: "12px",
          backgroundColor: "rgba(99, 21, 233, 0.7)", // Deep purple
          color: "#FFF",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          textTransform: "uppercase",
          transition: "background-color 0.3s, transform 0.4s, box-shadow 0.4s",
          boxShadow: "0 4px 15px rgba(73, 10, 117, 0.35)", // Initial soft shadow
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "linear-gradient(90deg, #8247E5, #B15CFF)"; // Gradient
          e.target.style.boxShadow = "0 10px 30px rgba(130, 71, 229, 0.7)"; // Stronger glow
          e.target.style.transform = "scale(1.1) translateY(-5px)"; // Slight enlargement and lift
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#6A0DAD"; // Reset to original purple
          e.target.style.boxShadow = "0 4px 15px rgba(106, 13, 173, 0.3)"; // Reset shadow
          e.target.style.transform = "scale(1) translateY(0)"; // Reset size and position
        }}
        onMouseDown={(e) => {
          e.target.style.transform = "scale(0.95)"; // Slight shrink on click
          e.target.style.boxShadow = "0 2px 10px rgba(106, 13, 173, 0.5)"; // Dim glow on press
        }}
        onMouseUp={(e) => {
          e.target.style.transform = "scale(1.1) translateY(-5px)"; // Return to hover state
          e.target.style.boxShadow = "0 10px 30px rgba(130, 71, 229, 0.7)";
        }}
      >
          {loading ? "Saving..." : "Create account"}
        </button>

        <ToastContainer position="top-center" />
      </form>
    </>
  );
};

// Inline CSS in JS
const formStyles = {
  form: { 
    marginLeft: "360px",
    padding: "32px", // Increased padding for a bigger form
    width: "700px", // Increased width for a larger form
    margin: "0 auto",
    backgroundColor: "#EBECF0",
    borderRadius: "16px",
  },
  segment: {
    padding: "32px 0",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: "24px",
    width: "100%",
  },
  input: {
    marginRight: "8px",
    padding: "8px",
    boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease-in-out",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  fileInput: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",  // Space between elements
  },
};

export default Signup;
