import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Login = () => {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // Perform login API call
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        toast.success("Login successful!");

        // Save user details in cookies
        Cookies.set("id", data.userId);
        Cookies.set("username", formdata.username);
        Cookies.set("role", data.role);

        // Redirect user based on role
        switch (data.role) {
          case "TEACHER":
            navigate("/instructor");
            break;
          case "STUDENT":
            navigate("/student");
            break;
          case "ADMIN":
            navigate("/Admindashboard");
            break;
          default:
            toast.error("Invalid user role. Contact support.");
        }
      } else {
        // Handle errors from server
        switch (response.status) {
          case 401:
            toast.error(data.message || "Invalid password");
            break;
          case 404:
            toast.error(data.message || "User not found");
            break;
          default:
            toast.error(data.message || "An unexpected error occurred");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        width: "400px",
        margin: "70px auto",
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
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
          <span
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Username:
          </span>
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
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "16px" }}>
          <span
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Password:
          </span>
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
            }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "30px",
            width: "97%",
            height: "40px",
            padding: "12px",
            backgroundColor: loading ? "#B0B0B0" : "rgba(99, 21, 233, 0.7)",
            color: "#FFF",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "20px",
            cursor: loading ? "not-allowed" : "pointer",
            textTransform: "uppercase",
            transition:
              "background-color 0.3s, transform 0.4s, box-shadow 0.4s",
            boxShadow: loading ? "none" : "0 4px 15px rgba(73, 10, 117, 0.35)",
          }}
        >
          {loading ? "Loading..." : "Login"}
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
