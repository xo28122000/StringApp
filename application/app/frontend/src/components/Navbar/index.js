import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignContent: "center",
        height: "10vh"
      }}
    >
      <Link to="/someroute" className="linkButtons">
        someroute
      </Link>
      <Link to="/" className="linkButtons">
        home
      </Link>
    </div>
  );
};

export default Navbar;
