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
  const [otp, setOtp] = useState(""); // State for OTP
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value); // Handle OTP input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions

    setLoading(true); // Set loading to true
    try {
      if (otpSent) {
        // Verify OTP
        const response = await fetch(
          "http://localhost:8080/api/users/verify-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: formdata.username, otp: otp }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("User Found!");
          console.log("API Response:", data);

          // Store the user data in cookies
          Cookies.set("id", data.userId);
          Cookies.set("username", formdata.username);
          Cookies.set("role", data.role);

          // Redirect based on the role
          if (data.role === "TEACHER") {
            navigate("/instructor");
          } else if (data.role === "STUDENT") {
            navigate("/student");
          } else {
            navigate("/Signup");
          }
        } else {
          toast.error("Invalid OTP");
        }
      } else {
        // Regular login
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
        toast.success("Login successful, please check your email for OTP.");
        setOtpSent(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
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
      {/* <ToastContainer /> */}
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
        {otpSent && (
          <label style={{ display: "block", marginTop: "16px" }}>
            <span
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Enter OTP:
            </span>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "20px",
                border: "1px solid #ddd",
              }}
            />
          </label>
        )}
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          style={{
            marginTop: "30px",
            width: "97%",
            height: "40px",
            padding: "12px",
            backgroundColor: loading ? "#B0B0B0" : "rgba(99, 21, 233, 0.7)", // Gray when loading
            color: "#FFF",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "20px",
            cursor: loading ? "not-allowed" : "pointer", // Prevent clicking when loading
            textTransform: "uppercase",
            transition:
              "background-color 0.3s, transform 0.4s, box-shadow 0.4s",
            boxShadow: loading ? "none" : "0 4px 15px rgba(73, 10, 117, 0.35)", // Remove shadow when loading
          }}
        >
          {loading ? "Loading..." : otpSent ? "Verify OTP" : "Login"}
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
