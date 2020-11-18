import React, { useState } from "react";

import BandCard from "../components/Cards/BandCard";
import {
  Row,
  Col,
  Container,
  Badge,
  NavLink,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faMusic,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

const axios = require("axios");

const UserProfileScreen = () => {
  const userObj = useSelector(state => state.userObj);

  const [createBandModal, setCreateBandModal] = useState(false);
  const toggleCreateBandModal = () => setCreateBandModal(!createBandModal);

  const genreOptions = ["Rock", "Acoustic", "Jazz", "Pop", "Hip Hop", "Other"];
  const [createBandGenreDDOpen, setCreateBandGenreDDOpen] = useState(false);
  const toggleCreateBandGenreDDOpen = () =>
    setCreateBandGenreDDOpen(!createBandGenreDDOpen);
  const [genre, setGenre] = useState("Rock");

  const [bands, setBands] = useState([
    {
      name: "admBand",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    },
    {
      name: "admBand",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    },
    {
      name: "admBand",
      genre: "rock",
      loc: {
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      },
      numOfMembers: 2,
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    }
  ]);

  const createBand = () => {
    // createBandName;
    // createBandDescription;
    // createBandGenre;
    // createBandStreet;
    // createBandCity;
    // createBandState;
    // createBandZip;
    // createBandLogoImg;
    let createBandName = document.getElementById("createBandName").value;
    let createBandDescription = document.getElementById("createBandDescription")
      .value;
    let createBandStreet = document.getElementById("createBandStreet").value;
    let createBandCity = document.getElementById("createBandCity").value;
    let createBandState = document.getElementById("createBandState").value;
    let createBandZip = document.getElementById("createBandZip").value;
    let imagefiles = document.getElementById("createBandLogoImg");

    if (
      !createBandName ||
      !createBandDescription ||
      !createBandStreet ||
      !createBandCity ||
      !createBandState ||
      !createBandZip ||
      imagefiles.files.length !== 1
    ) {
      alert("Please fill all fields");
    } else {
      let formData = new FormData();
      formData.append("name", createBandName);
      formData.append("description", createBandDescription);
      formData.append("location", {
        street: createBandStreet,
        city: createBandCity,
        state: createBandState,
        zip: createBandZip
      });
      formData.append("genre", genre);
      formData.append("imageFile", imagefiles.files[0]);

      axios
        .post("/api/band/createBand", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
    }
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {!userObj && <Redirect to="/" />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",

          padding: 50,
          paddingRight: 20,
          paddingLeft: 20,

          fontSize: 45,
          fontWeight: 700,
          color: "#ffffff"
        }}
      >
        John Lennon
      </div>
      <Row style={{ margin: 0 }}>
        <Col
          lg={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div>
            <img style={{ height: 200 }} src="../logo512.png" />
          </div>
          <div
            className="divShadow"
            style={{
              marginTop: 10,
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "#ffffff"
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                paddingLeft: 40,
                paddingRight: 40
              }}
            >
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Instagram:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Twitter:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Youtube:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Spotify:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
              <div style={{ marginBottom: 10, overflowx: "hidden" }}>
                Apple music:
                <a href="#" style={{ marginLeft: 5 }}>
                  http://www.link.com
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={8} style={{ paddingRight: 20, paddingLeft: 20 }}>
          <Row
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: 20,
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
            <Badge
              className="divShadow"
              style={{
                margin: 10,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                color: "#FFFFFF",
                backgroundColor: "#CB0086",
                borderRadius: 20
              }}
            >
              <FontAwesomeIcon icon={faMusic} style={{ marginRight: 4 }} />
              Rock
            </Badge>

            <Badge
              className="divShadow"
              style={{
                margin: 10,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                color: "#0B0B0B",
                backgroundColor: "#FF9900"
              }}
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: 4 }} />
              Band Manager
            </Badge>
            <Badge
              className="divShadow"
              style={{
                margin: 10,
                padding: 10,
                paddingLeft: 30,
                paddingRight: 30,
                color: "#8A8A8A",
                backgroundColor: "#FFFFFF"
              }}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginRight: 4 }}
              />
              San Francisco
            </Badge>
          </Row>

          <div
            style={{
              marginTop: 50,
              display: "flex",
              alignItems: "center",
              paddingRight: 20,
              paddingLeft: 20
            }}
          >
            <span style={{ fontSize: 35, fontWeight: 600, marginRight: 10 }}>
              Bands
            </span>
            <Button
              style={{
                backgroundColor: "#000000",
                borderRadius: 25,
                height: 50,
                width: 50
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />
            </Button>
          </div>
          <div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap"
              }}
            >
              {bands.map(band => (
                <BandCard key={band.name} {...band} />
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        isOpen={createBandModal}
        toggle={toggleCreateBandModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleCreateBandModal}>Create band</ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: 20 }}>
            <Input
              id="createBandName"
              placeholder="Name of your Band"
              style={{ borderRadius: 20 }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Input
              type="textarea"
              id="createBandDescription"
              placeholder="some description about your band"
              style={{ borderRadius: 20 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            Band's Genre:
            <Dropdown
              isOpen={createBandGenreDDOpen}
              toggle={toggleCreateBandGenreDDOpen}
              style={{ marginLeft: 20 }}
            >
              <DropdownToggle caret style={{ backgroundColor: "#000000" }}>
                {genre ? genre : "All"}
              </DropdownToggle>
              <DropdownMenu>
                {genreOptions.map(genreOption => (
                  <DropdownItem
                    key={genreOption}
                    onClick={() => {
                      setGenre(genreOption === "All" ? null : genreOption);
                    }}
                  >
                    {genreOption}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div style={{ display: "flex" }}>Band's Location:</div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <Input
              id="createBandStreet"
              placeholder="street"
              style={{
                borderRadius: 25,
                margin: 5
              }}
            />
            <div style={{ display: "flex" }}>
              <Input
                id="createBandCity"
                placeholder="city"
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />

              <Input
                id="createBandState"
                placeholder="state"
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />

              <Input
                id="createBandZip"
                placeholder="zip"
                style={{
                  borderRadius: 25,
                  margin: 5
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <div style={{ marginBottom: 5 }}>Band's Logo:</div>
            <Input
              id="createBandLogoImg"
              type="file"
              accept="image/png, image/jpeg"
              placeholder="zip"
              style={{
                marginLeft: 10
              }}
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
                createBand();
              }}
            >
              Create Band!
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserProfileScreen;
