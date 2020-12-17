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

import defaultProfileImage from "../assets/defaultProfile.jpeg";

const axios = require("axios");

const UserProfileScreen = () => {
  const userObj = useSelector(state => state.userObj);
  console.log(userObj);
  const [createBandModal, setCreateBandModal] = useState(false);
  const toggleCreateBandModal = () => setCreateBandModal(!createBandModal);

  const genreOptions = ["Rock", "Acoustic", "Jazz", "Pop", "Hip Hop", "Other"];
  const [createBandGenreDDOpen, setCreateBandGenreDDOpen] = useState(false);
  const toggleCreateBandGenreDDOpen = () =>
    setCreateBandGenreDDOpen(!createBandGenreDDOpen);
  const [genre, setGenre] = useState("Rock");

  const [bands, setBands] = useState([
    {
      name: "admBand 1",
      genre: "rock",
      loc: JSON.stringify({
        street: "100 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }),
      numOfMembers: 2,
      logoImageUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c0a56608-0770-4f53-9b4a-f0b30bf8f781/d8t4ar0-e7a0416b-86ac-4b86-b5dc-c9b70d97d1cd.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYzBhNTY2MDgtMDc3MC00ZjUzLTliNGEtZjBiMzBiZjhmNzgxXC9kOHQ0YXIwLWU3YTA0MTZiLTg2YWMtNGI4Ni1iNWRjLWM5YjcwZDk3ZDFjZC5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.zni4bjOaGJ7smAuVQugAxbDM4R1qtbhDHFzQJ1hH1hI"
    },
    {
      name: "admBand 2",
      genre: "rock",
      loc: JSON.stringify({
        street: "150 font blvd",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }),
      numOfMembers: 3,
      logoImageUrl:
        "https://static.tvtropes.org/pmwiki/pub/images/92962-the-beatles-1-the-bea_41.jpg"
    },
    {
      name: "admBand 3",
      genre: "rock",
      loc: JSON.stringify({
        street: "16 Holloway Ave",
        city: "San Francisco",
        state: "California",
        zip: "94132"
      }),
      numOfMembers: 1,
      logoImageUrl:
        "https://image.shutterstock.com/image-vector/rock-music-poster-old-school-260nw-742278952.jpg"
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
      formData.append(
        "location",
        JSON.stringify({
          street: createBandStreet,
          city: createBandCity,
          state: createBandState,
          zip: createBandZip
        })
      );
      formData.append("genre", genre);
      formData.append("imageFile", imagefiles.files[0]);

      axios
        .post("/api/band/createBand", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data.success) {
            toggleCreateBandModal();
          } else {
            alert("Invalid value in one or multiple fields.");
          }
        })
        .catch(err => {
          alert("Some error occured. Please try again later.");
        });
    }
  };

  const [addLinkModal, setAddLinkModal] = useState(false);
  const [deleteLinkModal, setDeleteLinkModal] = useState(false);
  const [deleteLink, setDeleteLink] = useState(null);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {userObj ? (
        <>
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
            {userObj.name}
          </div>
          <Row style={{ margin: 0, marginTop: 10, padding: 30 }}>
            <Col
              lg={4}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  height: 250,
                  borderRadius: 125,
                  borderWidth: 5,
                  borderStyle: "solid",
                  borderColor: "#ffffff",
                  overflow: "hidden",
                  marginTop: -100
                }}
              >
                {userObj.profileImageUrl ? (
                  <img
                    style={{ width: 250, maxHeight: 250 }}
                    src={userObj.profileImageUrl}
                  />
                ) : (
                  <img
                    style={{ width: 250, maxHeight: 250 }}
                    src={defaultProfileImage}
                  />
                )}
              </div>
              <div
                className="divShadow"
                style={{
                  marginTop: 30,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  backgroundColor: "#ffffff"
                }}
              >
                {userObj.links &&
                  userObj.links.map(linkObj => (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div style={{ fontWeight: 600, marginRight: 5 }}>
                          {linkObj.key}:
                        </div>
                        <div
                          style={{
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: 150
                          }}
                        >
                          <a href={linkObj.link}>{linkObj.link}</a>
                        </div>

                        <Button
                          onClick={() => {
                            setDeleteLink(linkObj);
                            setDeleteLinkModal(true);
                          }}
                          color="danger"
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 10
                          }}
                        >
                          x
                        </Button>
                      </div>
                    </div>
                  ))}
                <Button
                  onClick={() => {
                    setAddLinkModal(true);
                  }}
                  color="primary"
                  style={{ marginTop: 10, width: "100%" }}
                >
                  Add Link
                </Button>
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
                {userObj.genre && (
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
                    <FontAwesomeIcon
                      icon={faMusic}
                      style={{ marginRight: 4 }}
                    />
                    {userObj.genre}
                  </Badge>
                )}

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
                  {/* <FontAwesomeIcon icon={faUser} style={{ marginRight: 4 }} /> */}
                  Role: {userObj.role}
                </Badge>
                {userObj.location && userObj.location.city && (
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
                    {userObj.location.city}
                  </Badge>
                )}
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
                <span
                  style={{ fontSize: 35, fontWeight: 600, marginRight: 10 }}
                >
                  Bands
                </span>
                <Button
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: 25,
                    height: 50
                  }}
                  onClick={() => {
                    toggleCreateBandModal();
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 4 }} />{" "}
                  Create Band{" "}
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
            <ModalHeader toggle={toggleCreateBandModal}>
              Create band
            </ModalHeader>
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
                  accept="image/png, image/jpeg, image/jpg"
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

          <Modal
            isOpen={addLinkModal}
            toggle={() => setAddLinkModal(!addLinkModal)}
            backdrop="static"
          >
            <ModalHeader toggle={() => setAddLinkModal(!addLinkModal)}>
              Add link to your band
            </ModalHeader>
            <ModalBody>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 10
                }}
              >
                <Input
                  id="addLinkKey"
                  placeholder="key. Ex: youtube"
                  style={{ marginRight: 5 }}
                />
                {" : "}
                <Input
                  id="addLinkLink"
                  placeholder="Link. Ex: www.youtube.com/"
                  style={{ marginLeft: 5 }}
                />
              </div>

              <Button
                onClick={() => {
                  let key = document.getElementById("addLinkKey").value;
                  let link = document.getElementById("addLinkLink").value;
                  if (key && link && key.length > 0 && link.length > 0) {
                    axios
                      .post("/api/user/createLink", {
                        link: { key: key, link: link }
                      })
                      .then(res => {
                        console.log(res.data);
                      })
                      .catch(err => {});
                  } else {
                    alert("please enter a key and a valid link");
                  }
                }}
                color="primary"
                style={{ float: "right", marginTop: 10 }}
              >
                Add Link
              </Button>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={deleteLinkModal}
            toggle={() => setDeleteLinkModal(!deleteLinkModal)}
            backdrop="static"
          >
            <ModalBody
              style={{
                textAlign: "center",
                paddingTop: 40,
                paddingBottom: 40,
                fontSize: 18,
                fontWeight: 600
              }}
            >
              Are you sure you want to delete "{deleteLink && deleteLink.key}"
              link?
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  onClick={() => {
                    setDeleteLinkModal(!deleteLinkModal);
                  }}
                  color="dark"
                >
                  Cancel
                </Button>
                <Button color="danger">Delete Link</Button>
              </div>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <Redirect to="/explore" />
      )}
    </div>
  );
};

export default UserProfileScreen;
