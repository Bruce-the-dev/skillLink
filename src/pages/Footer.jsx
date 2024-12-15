import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.leftSection}>
          <p>
            &copy; {new Date().getFullYear()} Skillink. All Rights Reserved.
          </p>
        </div>

        <div style={styles.rightSection}>
          <a href="/terms" style={styles.link}>
            Terms of Service
          </a>
          <a href="/privacy" style={styles.link}>
            Privacy Policy
          </a>
          <a href="/contact" style={styles.link}>
            Contact Us
          </a>
        </div>

        <div style={styles.socialLinks}>
          <a href="https://facebook.com" style={styles.socialLink}>
            Facebook
          </a>
          <a href="https://twitter.com" style={styles.socialLink}>
            Twitter
          </a>
          <a href="https://linkedin.com" style={styles.socialLink}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

// Inline styles for the footer
const styles = {
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
    fontFamily: "'Arial', sans-serif",
    marginTop: "20px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  leftSection: {
    textAlign: "center",
    marginBottom: "10px",
  },
  rightSection: {
    display: "flex",
    gap: "15px",
    marginBottom: "10px",
  },
  socialLinks: {
    marginTop: "10px",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "normal",
  },
  socialLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Footer;
