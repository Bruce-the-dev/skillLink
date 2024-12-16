import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "./Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Password reset instructions sent to your email!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (e) {
      toast.error("Unable to connect to the server. Please try again later.");
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
        Forgot Password
      </h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
            Email:
          </span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
