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

const RegisterPage = () => {
  const roleOptions = ["None", "Musician", "Band Manager", "Enthusiast"];
  const [roleDDOpen, setRoleDDOpen] = useState(false);
  const toggleRoleDDOpen = () => setRoleDDOpen(!roleDDOpen);
  const [regType, setRegType] = useState("None");

  const userObj = useSelector(state => state.userObj);

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
      {userObj ? <Redirect to="/" /> : null}
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
          alignItems: "center"
        }}
      >
        <Button color="success" style={{ fontSize: 20 }}>
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
