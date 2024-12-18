import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", // Gradient background
        zIndex: 1000,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        padding: "10px 20px",
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          <img
            src={Logo}
            alt="SkillLink"
            style={{ height: "50px", width: "auto", marginRight: "10px" }} // Adjust size as needed
          />
        </Link>

        {/* Toggler Button for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "none", color: "#fff" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "#fff" }}
          ></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={linkStyle}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={linkStyle}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                aria-current="page"
                style={linkStyle}
              >
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// CSS for Nav Links
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: "500",
  margin: "0 10px",
  padding: "8px 12px",
  borderRadius: "4px",
  transition: "all 0.3s ease-in-out",
};

// Hover Effects for Nav Links
const hoverEffect = `
  .nav-link:hover {
    color:rgb(22, 62, 131) !important; /* Text color changes */
    background-color: rgba(255, 255, 255, 0.71); /* Subtle hover background */
    transform: scale(1.1); /* Slight zoom effect */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Shadow effect */
  }
`;

// Add Styles to Head
const styleElement = document.createElement("style");
styleElement.innerHTML = hoverEffect;
document.head.appendChild(styleElement);

export default Header;
