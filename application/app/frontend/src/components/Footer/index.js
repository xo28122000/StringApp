import React, { useState, useEffect } from "react";

import { Link, withRouter } from "react-router-dom";

import "./footer.css";

const Footer = props => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        backgroundColor: "#000000",
        paddingRight: 20
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ marginLeft: 20 }}>
          <Link to="/about" className="navLink">
            About
          </Link>
        </div>

        <div style={{ marginLeft: 20 }}>
          <Link to="/explore#explore" className="navLink">
            Explore
          </Link>
        </div>

        <div style={{ marginLeft: 20 }}>
          <Link to="/contact" className="navLink">
            Contact Us
          </Link>
        </div>

        <div style={{ marginLeft: 20 }}>
          <Link to="/data_policy" className="navLink">
            Data Policy
          </Link>
        </div>

        <div style={{ marginLeft: 20 }}>
          <Link to="/terms_and_conditions" className="navLink">
            Terms and Conditions
          </Link>
        </div>

        <div style={{ marginLeft: 20 }}>
          <Link to="/FAQ" className="navLink">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Footer);
