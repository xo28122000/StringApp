import React, { useState, useEffect } from "react";

import { Link, withRouter } from "react-router-dom";

import "./footer.css";

const Footer = (props) => {
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: screenWidth > 450 ? 70 : 40,
        backgroundColor: "#000000",
        paddingRight: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/explore"></Link>
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/about" className="navLink">
              About
            </a>
          </div>
        ) : null}
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/explore#explore" className="navLink">
              Explore
            </a>
          </div>
        ) : null}
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/contact" className="navLink">
              Contact Us
            </a>
          </div>
        ) : null}
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/data_policy" className="navLink">
              Data Policy
            </a>
          </div>
        ) : null}
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/terms_and_conditions" className="navLink">
              Terms and Conditions
            </a>
          </div>
        ) : null}
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/FAQ" className="navLink">
              FAQ
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(Footer);
