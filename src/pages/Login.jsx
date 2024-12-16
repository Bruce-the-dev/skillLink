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
  
    if (otpSent) {
      // If OTP is sent, verify OTP
      const response = await fetch("http://localhost:8080/api/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: formdata.username, otp: otp }),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful!");
  
        // Store the user data in cookies
        Cookies.set("id", data.userId);  // Ensure you're saving userId if necessary
        Cookies.set("username", formdata.username); // Ensure you save the username
        Cookies.set("role", data.role);  // Store the role in the cookie
  
        // Log the role and the response data to debug
        console.log("User role:", data.role);
  
        // Redirect based on the role
        if (data.role === "TEACHER") {
          navigate("/instructor");
        } else if (data.role === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/Signup");  // In case there's no valid role or unhandled role
        }
      } else {
        toast.error("Invalid OTP");
      }
    } else {
      // If OTP is not yet sent, proceed with regular login
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
      <ToastContainer />
      <Header />
      <h2 style={{ textAlign: "center", marginBottom: "1em", color: "#333", fontSize: "24px" }}>
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
            style={{ width: "100%", padding: "12px", borderRadius: "20px", border: "1px solid #ddd" }}
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
            style={{ width: "100%", padding: "12px", borderRadius: "20px", border: "1px solid #ddd" }}
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
          }}
        >
          Login
        </button>

        {otpSent && (
          <>
            <label style={{ display: "block", marginTop: "16px" }}>
              <span style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Enter OTP:</span>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                required
                style={{ width: "100%", padding: "12px", borderRadius: "20px", border: "1px solid #ddd" }}
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
              }}
            >
              Verify OTP
            </button>
          </>
        )}

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
