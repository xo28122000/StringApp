import React, { useState } from "react";

import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CustomInput
} from "reactstrap";

import { Link, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/Actions/actions";

const axios = require("axios");

const RegisterPage = () => {
  const dispatch = useDispatch();

  const roleOptions = ["None", "Musician", "Band Manager", "Enthusiast"];
  const [roleDDOpen, setRoleDDOpen] = useState(false);
  const toggleRoleDDOpen = () => setRoleDDOpen(!roleDDOpen);
  const [regType, setRegType] = useState("None");

  const userObj = useSelector(state => state.userObj);

  const registerAccount = () => {
    let registerName = document.getElementById("registerName").value;
    let registerEmail = document.getElementById("registerEmail").value;
    let registerPassword = document.getElementById("registerPassword").value;
    let registerPhoneNumber = document.getElementById("registerPhoneNumber")
      .value;
    let registerStreetAddress = document.getElementById("registerStreetAddress")
      .value;
    let registerCity = document.getElementById("registerCity").value;
    let registerState = document.getElementById("registerState").value;
    let registerZip = document.getElementById("registerZip").value;
    // regType

    if (!registerName || !registerEmail || !registerPassword) {
      alert("Name, Email and Password are required fields");
    } else if (
      registerName.length > 30 ||
      registerName.replace(/[^a-zA-Z ]/g, "").length < 1 ||
      registerName.replace(/[^a-zA-Z ]/g, "").length > 30
    ) {
      alert("Name should contain atleast one and atmost 30 characters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      alert("Please enter a valid email");
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,21}/.test(registerPassword)
    ) {
      alert(
        `Please enter a valid password containing 8 to 21 characters 
        containing atleast 1 number, 1 uppercase and 1 lowercase letter.`
      );
    } else {
      axios
        .post("/api/auth/register", {
          email: registerEmail,
          password: registerPassword,
          name: registerName,
          phoneNumber: registerPhoneNumber,
          location: {
            street: registerStreetAddress,
            city: registerCity,
            state: registerState,
            zip: registerZip
          },
          role: regType
        })
        .then(res => {
          if (res.data.success) {
            dispatch(login(res.data.user));
          } else {
            alert("some error occured! Please try again later.");
          }
        })
        .catch(err => {
          alert("some error occured! Please try again later.");
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
      }}
    >
      {userObj && <Redirect to="/profile" />}
      <div style={{ fontSize: 25, fontWeight: 600 }}>Sign Up</div>
      <div
        style={{
          marginTop: 40,
          marginBottom: 40,
          textAlign: "center"
        }}
      >
        <div style={{ margin: 10, width: "50vw", minWidth: 300 }}>
          <Input
            style={{ borderRadius: 25 }}
            id="registerName"
            placeholder="Name"
          />
        </div>
        <div style={{ margin: 10, width: "50vw", minWidth: 300 }}>
          <Input
            style={{ borderRadius: 25 }}
            type="email"
            id="registerEmail"
            placeholder="Email"
          />
        </div>
        <div style={{ margin: 10, width: "50vw", minWidth: 300 }}>
          <Input
            style={{ borderRadius: 25 }}
            type="password"
            id="registerPassword"
            placeholder="Password"
          />
          <FormText color="muted">
            Should be 8 to 21 characters long and <br />
            contain atleast 1 number, 1 uppercase and 1 lowercase letter.
          </FormText>
        </div>
        <div style={{ margin: 10, width: "50vw", minWidth: 300 }}>
          <Input
            style={{ borderRadius: 25 }}
            type="tel"
            id="registerPhoneNumber"
            placeholder="Phone Number"
          />
        </div>
        <div style={{ margin: 10, width: "50vw", minWidth: 300 }}>
          <Input
            style={{ borderRadius: 25 }}
            id="registerStreetAddress"
            placeholder="Street Address"
          />
        </div>
        <div style={{ margin: 10, width: "50vw", minWidth: 300 }}>
          <div style={{ display: "flex" }}>
            <Input
              id="registerCity"
              placeholder="city"
              style={{
                borderRadius: 25,
                marginRight: 10
              }}
            />

            <Input
              id="registerState"
              placeholder="state"
              style={{
                borderRadius: 25,
                marginRight: 10
              }}
            />

            <Input
              id="registerZip"
              placeholder="zip"
              style={{
                borderRadius: 25
              }}
            />
          </div>
        </div>
        <div style={{ margin: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Role:
            <Dropdown
              isOpen={roleDDOpen}
              toggle={toggleRoleDDOpen}
              style={{ marginLeft: 20 }}
            >
              <DropdownToggle
                caret
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                {regType ? regType : "All"}
              </DropdownToggle>
              <DropdownMenu>
                {roleOptions.map(genreOption => (
                  <DropdownItem
                    onClick={() => {
                      setRegType(genreOption === "All" ? null : genreOption);
                    }}
                  >
                    {genreOption}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <FormText color="muted">
              All roles have same access on String platform.
            </FormText>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 50
        }}
      >
        <Button
          color="success"
          style={{ fontSize: 20, marginBottom: 10 }}
          onClick={() => {
            registerAccount();
          }}
        >
          Sign Up!
        </Button>
        <FormText color="muted">
          By clicking Sign Up, you agree to our <Link>Terms</Link>,{" "}
          <Link>Data Policy</Link> and <Link>Cookies Policy</Link>.
        </FormText>
      </div>
    </div>
  );
};

export default RegisterPage;
