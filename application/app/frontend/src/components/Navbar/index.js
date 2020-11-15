import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/Actions/actions";
import { Link, withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import StringLogo from "../../assets/StringLogo.png";

const Navbar = props => {
  const dispatch = useDispatch();

  const userObj = useSelector(state => state.userObj);

  const [loginModal, setLoginModal] = useState(false);
  const toggleLoginModal = () => setLoginModal(!loginModal);

  const sendlogin = () => {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    dispatch(login({ email, password }));
    toggleLoginModal();
  };

  const triggerLogout = () => {
    dispatch(logout());
  };

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
        // height: screenWidth > 450 ? 70 : 40,
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
        <Link to="/">
          <img
            src={StringLogo}
            alt="logo"
            style={{ height: screenWidth > 450 ? 70 : 40 }}
          />
        </Link>
        {screenWidth > 450 ? (
          <div style={{ marginLeft: 20 }}>
            <a href="/#explore" className="navLink">
              Explore
            </a>
          </div>
        ) : null}
      </div>

      {!userObj ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 20 }}>
            <Link
              className="navLink"
              onClick={() => {
                toggleLoginModal();
              }}
            >
              Log in
            </Link>
          </div>
          <Button
            className="navButton"
            onClick={() => {
              props.history.push("/register");
            }}
          >
            Sign up
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/profile"
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
              justifyContent: "center",
              marginRight: 20
            }}
          >
            <FontAwesomeIcon icon={faUser} style={{ fontSize: 25 }} />
          </Link>
          <Button
            className="navButton"
            onClick={() => {
              triggerLogout();
            }}
          >
            Logout
          </Button>
        </div>
      )}

      <Modal isOpen={loginModal} toggle={toggleLoginModal} backdrop="static">
        <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: 20 }}>
            <Input
              type="email"
              id="loginEmail"
              placeholder="email"
              style={{ borderRadius: 20 }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Input
              type="password"
              id="loginPassword"
              placeholder="password"
              style={{ borderRadius: 20 }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                fontSize: 18,
                backgroundColor: "#000000",
                borderRadius: 10
              }}
              onClick={() => {
                sendlogin();
              }}
            >
              Login
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(Navbar);
