import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        padding: 5,
        backgroundColor: "#000000"
      }}
    >
      <img
        src={require("../../assets/StringLogo.png")}
        style={{ height: 45 }}
      />
    </div>
  );
};

export default Navbar;
