import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
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
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1em" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formdata.username}
            required
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5em", marginTop: "0.2em" }}
          />
        </label>
        <br />

        <label>
          Full Names:
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5em", marginTop: "0.2em" }}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5em", marginTop: "0.2em" }}
          />
        </label>

        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5em", marginTop: "0.2em" }}
          />
        </label>

        <br />
        <label>
          Role:
          <select name="role" value={formdata.role} onChange={handleRoleChange}>
            <option value="">Select a Role</option>
            <option value="STUDENT">STUDENT</option>
            <option value="TEACHER">Teacher</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <br />

        <label>
          Skills:
          <input
            type="text"
            name="skills"
            value={formdata.skills}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5em", marginTop: "0.2em" }}
          />
        </label>
        <br />
        <label>
          Enter a profileImage:
          <input
            type="file"
            name="ProfileImage"
            onChange={(e) =>
              setformdata({ ...formdata, ProfileImage: e.target.files[0] })
            }
            style={{ width: "100%", padding: "0.5em", marginTop: "0.2em" }}
          />
        </label>
        <br />
        <button
          type="submit"
          disabled={loading}
          value="Submit"
          style={{
            padding: "0.5em 1em",
            backgroundColor: loading ? "#ccc" : "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save User"}
        </button>
      </form>
      {/* ToastContainer with top-center position */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Signup;
