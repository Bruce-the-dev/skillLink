import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
    skills: "",
    ProfileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const timeout = 2000; // Specify the delay time in milliseconds (e.g., 2000ms = 2 seconds)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRoleChange = (e) => {
    setFormdata({
      ...formdata,
      role: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otpSent) {
      // First submission: Sign up the user
      const formData = new FormData();
      const user = {
        username: formdata.username,
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
        role: formdata.role,
        skills: formdata.skills,
      };
      formData.append("user", JSON.stringify(user));

      if (formdata.ProfileImage) {
        formData.append("imageFile", formdata.ProfileImage);
      }

      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast.success(
            "User created successfully. Please check your email for the OTP."
          );
          setOtpSent(true); // Show the OTP input field
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Error creating user.");
        }
      } catch (error) {
        toast.error("Failed to create user. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      // Second submission: Verify OTP
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/verify-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: formdata.username, otp }),
          }
        );

        if (response.ok) {
          toast.success("OTP verified successfully. Account is now active.");
          setTimeout(() => {
            navigate("/login");
          }, timeout);
          setFormdata({
            username: "",
            name: "",
            email: "",
            password: "",
            role: "",
            skills: "",
            ProfileImage: null,
          });
          setOtp("");
          setOtpSent(false); // Reset the form and OTP process
        } else {
          const data = await response.json();
          toast.error(data.message || "Invalid OTP.");
        }
      } catch (error) {
        toast.error("Failed to verify OTP. Please try again later.");
      } finally {
        setLoading(false);
      }
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
              placeholder="Full Name"
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
              <option value="" disabled>
                Select a Role
              </option>
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
              setFormdata({ ...formdata, ProfileImage: e.target.files[0] })
            }
            style={formStyles.input}
          />
          <span>Profile Image</span>
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
            boxShadow: loading ? "none" : "0 4px 15px rgba(73, 10, 117, 0.35)",
          }}
        >
          {loading ? "Loading..." : otpSent ? "Verify OTP" : "Sign Up"}
        </button>

        <ToastContainer position="top-center" />
      </form>
    </>
  );
};

const formStyles = {
  form: {
    margin: "0 auto",
    padding: "32px",
    width: "700px",
    backgroundColor: "#EBECF0",
    borderRadius: "16px",
  },
  segment: { padding: "32px 0", textAlign: "center" },
  label: { display: "block", marginBottom: "24px", width: "100%" },
  input: {
    padding: "8px",
    width: "100%",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  fileInput: { display: "flex", justifyContent: "space-between" },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
  },
};

export default Signup;
