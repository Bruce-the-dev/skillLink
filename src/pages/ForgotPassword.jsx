import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

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
        maxWidth: "400px",
        margin: "auto",
        padding: "1em",
        marginTop: "70px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <ToastContainer />
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
