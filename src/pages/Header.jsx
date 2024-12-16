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
        backgroundColor: "#f8f9fa", // Bootstrap light gray
        zIndex: 1000,
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img
             src={Logo}
             alt="SkillLink"
             style={{ height: "40px", width: "auto" }} // Adjust size as needed
          />

        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" aria-current="page">
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
