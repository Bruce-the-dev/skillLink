import React from "react";

const Sidebar = () => {
  return <div>Sidebar</div>;
};

const styles = {
  /* Base sidebar styling */
  sidebar: {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    backgroundColor: "#333",
    color: "white",
    transition: "width 0.3s ease-in-out",
    overflowX: "hidden",
    zIndex: "1000",
  },

  /* Collapsed sidebar */
  sidebarCollapsed: {
    width: "60px",
  },

  /* Expanded sidebar */
  sidebarExpanded: {
    width: "250px",
  },

  /* Hamburger button */
  hamburger: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    margin: "10px",
  },

  /* Menu items */
  menuItems: {
    listStyle: "none",
    padding: "0",
    margin: "20px 0 0 10px",
  },

  menuItem: {
    margin: "15px 0",
    fontSize: "18px",
    cursor: "pointer",
  },

  menuItemHover: {
    color: "#ddd",
  },
};

export default Sidebar;
