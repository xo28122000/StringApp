import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import StringLogo from "../../assets/StringLogo.png";

const Navbar = props => {
  const userObj = useSelector(state => state.userObj);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 70,
        backgroundColor: "#000000",
        paddingRight: 20
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <img src={StringLogo} alt="logo" style={{ height: 70 }} />
        <div style={{ marginLeft: 20 }}>
          <Link className="navLink">Explore</Link>
        </div>
      </div>

      {!userObj ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 20 }}>
            <Link className="navLink">Log in</Link>
          </div>
          <Button className="navButton">Sign up</Button>
        </div>
      ) : (
        <Link
          className="navLink"
          style={{
            borderColor: "#ffffff",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 25,
            height: 50,
            width: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FontAwesomeIcon icon={faUser} style={{ fontSize: 25 }} />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
