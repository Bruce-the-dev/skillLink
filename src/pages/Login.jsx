import React, { useState } from "react";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [LoggedIn, setLoggedIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Invalid password");
        } else if (response.status === 404) {
          toast.error("User not found");
        } else {
          toast.error("An unexpected error occurred");
        }
        return;
      }
      const data = await response.json();
      toast.success("User Logged in successfully");

      setFormData({
        username: "",
        password: "",
      });
      setLoggedIn(true);
      const userId = data.userId; // Extract the user ID from the response data
      navigate(`/profile/${userId}`); // Redirect to /profile/{userId}
      console.log(response.data);
    } catch (e) {
      toast.error("An error occurred while connecting to the server.");
    }
    // console.log("Form Submitted:", formdata);
    // alert("Login form submitted (data not sent to backend).");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "1em",
        marginTop: "70px", // Ensure it doesn't overlap with a fixed header
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <ToastContainer />
      <Header />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5em",
              marginTop: "0.2em",
              marginBottom: "1em",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
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
            required
            style={{
              width: "100%",
              padding: "0.5em",
              marginTop: "0.2em",
              marginBottom: "1em",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </label>
        <br />

        <button
          type="submit"
          style={{
            padding: "0.5em 1em",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
