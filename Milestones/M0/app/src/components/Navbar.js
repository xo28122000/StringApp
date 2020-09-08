import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30,
        position: "fixed",
        top: 0,
        width: "100%",
        height: 80
      }}
    >
      <div>
        {props.img ? (
          <img
            src={require("../assets/team5_logo.png")}
            style={{ width: "auto", height: 70 }}
          />
        ) : null}
      </div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: 400
        }}
      >
        <div className="navLinks-div navLinks-text">
          <Link
            to="/"
            style={{ color: props.textColor ? props.textColor : "#FFFFFF" }}
          >
            HOME
          </Link>
        </div>
        <div className="navLinks-div navLinks-text">
          <Link
            to="/about"
            style={{
              color: props.textColor ? props.textColor : "#FFFFFF"
            }}
          >
            ABOUT
          </Link>
        </div>
        <div className="navLinks-div navLinks-text">
          <Link
            to="/contact"
            style={{ color: props.textColor ? props.textColor : "#FFFFFF" }}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
