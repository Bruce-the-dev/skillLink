import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "./Header";

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
      toast.success("User logged in successfully");

      // Save login details to cookies
      Cookies.set("id", data.userId);
      Cookies.set("username", data.username);
      Cookies.set("role", data.role);

      setFormData({
        username: "",
        password: "",
      });
      setLoggedIn(true);

      // Redirect based on role
      const role = data.role;
      if (role === "TEACHER") {
        navigate(`/instructor`);
      } else if (role === "STUDENT") {
        navigate(`/student`);
      } else {
        navigate("/Signup");
      }
    } catch (e) {
      toast.error("An error occurred while connecting to the server.");
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        width: "400px",
        margin: "70px auto", // Centered and spaced from the top
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
      }}
    >
      <ToastContainer />
      <Header />
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1em",
          color: "#333",
          fontSize: "24px",
        }}
      >
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Username:</span>
          <input
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              outline: "none",
              fontSize: "16px",
              boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Password:</span>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              outline: "none",
              fontSize: "16px",
              boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#AE1100",
            color: "#FFF",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s ease-in-out",
          }
        }
        >
          Login
        </button>
        <p style={{ marginTop: "1em", textAlign: "center" }}>
          <Link
            to="/forgot-password"
            style={{
              color: "#007BFF",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
