import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formdata);
    alert("Login form submitted (data not sent to backend).");
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
