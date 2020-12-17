import React, { useState, useEffect } from "react";

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
  DropdownItem,
  Label,
  FormText
} from "reactstrap";

import { Redirect, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faMusic,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import defaultProfileImage from "../assets/defaultProfile.jpeg";

import ReloadPage from "./BandProfile/ReloadPage";

const axios = require("axios");

const UserProfileScreen = props => {
  const userObj = useSelector(state => state.userObj);
  const [createBandModal, setCreateBandModal] = useState(false);
  const toggleCreateBandModal = () => setCreateBandModal(!createBandModal);

  const genreOptions = ["Rock", "Acoustic", "Jazz", "Pop", "Hip Hop", "Other"];
  const [createBandGenreDDOpen, setCreateBandGenreDDOpen] = useState(false);
  const toggleCreateBandGenreDDOpen = () =>
    setCreateBandGenreDDOpen(!createBandGenreDDOpen);
  const [genre, setGenre] = useState("Rock");

  const [bands, setBands] = useState(null);

  useEffect(() => {
    if (userObj) {
      setRoleType(userObj.role);
      axios
        .post("/api/user/getUserBand")
        .then(res => {
          // console.log(res.data);
          if (res.data.success) {
            setBands(res.data.result);
          }
        })
        .catch(err => {});
    }
  }, [userObj]);

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
          // console.log(res.data);
          if (res.data.success) {
            window.location.reload();
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
  const [editProfileModal, setEditProfileModal] = useState(false);

  const roleOptions = ["None", "Musician", "Band Manager", "Enthusiast"];
  const [roleDDOpen, setRoleDDOpen] = useState(false);
  const [roleType, setRoleType] = useState("None");

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
                  marginTop: -100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff"
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
              <Button
                onClick={() => {
                  // console.log("click");
                  setEditProfileModal(true);
                }}
                color="primary"
                style={{ fontSize: 18, marginTop: 15 }}
              >
                Edit Profile
              </Button>
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
                    <div style={{ marginBottom: 10 }}>
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
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={linkObj.link}
                          >
                            {linkObj.link}
                          </a>
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
              <div style={{ minHeight: "80vh" }}>
                {bands ? (
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap"
                    }}
                  >
                    {bands.map(band => (
                      <BandCard
                        key={band.name}
                        {...band}
                        loc={JSON.stringify(band.location)}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="divShadow"
                    style={{
                      margin: 20,
                      padding: 30,
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <ReloadPage value="Bands" />
                  </div>
                )}
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
                <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                        if (res.data.success) {
                          window.location.reload();
                        } else {
                          alert(
                            "Error in adding Link, Please try again later."
                          );
                        }
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
                <Button
                  onClick={() => {
                    axios
                      .post("/api/user/deleteLink", {
                        link: deleteLink
                      })
                      .then(res => {
                        if (res.data.success) {
                          window.location.reload();
                        } else {
                          alert(
                            "Error in deleting Link, Please try again later."
                          );
                        }
                      })
                      .catch(err => {});
                  }}
                  color="danger"
                >
                  Delete Link
                </Button>
              </div>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={editProfileModal}
            toggle={() => {
              setEditProfileModal(!editProfileModal);
            }}
            backdrop="static"
          >
            <ModalHeader
              toggle={() => {
                setEditProfileModal(!editProfileModal);
              }}
            >
              Edit Profile
            </ModalHeader>
            <ModalBody>
              <Label>Name</Label>
              <Input
                id="editProfileName"
                style={{ marginBottom: 20 }}
                placeholder="name"
                defaultValue={userObj.name}
              />
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
                  toggle={() => {
                    setRoleDDOpen(!roleDDOpen);
                  }}
                  style={{ marginLeft: 20 }}
                >
                  <DropdownToggle
                    caret
                    style={{ backgroundColor: "#ffffff", color: "#000000" }}
                  >
                    {roleType}
                  </DropdownToggle>
                  <DropdownMenu>
                    {roleOptions.map(genreOption => (
                      <DropdownItem
                        onClick={() => {
                          setRoleType(genreOption);
                        }}
                      >
                        {genreOption}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Label>Password</Label>
              <Input
                id="editProfilePassword"
                type="password"
                placeholder="password"
              />
              <FormText color="muted">
                If you do not wish want to change your password, Please leave
                this field blank
              </FormText>
              <FormText style={{ marginBottom: 20 }} color="muted">
                Should be 8 to 21 characters long and <br />
                contain atleast 1 number, 1 uppercase and 1 lowercase letter.
              </FormText>
              <Input
                id="editProfileImage"
                placeholder="Profile Picture (Link to an image)"
                defaultValue={userObj.profileImageUrl}
              />
              <FormText color="muted" style={{ marginBottom: 20 }}>
                Example: https://www.sfsu.edu/SFState_logo_color.jpg
                <br /> We will soon add support for uploading images and videos.
              </FormText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => {
                    setEditProfileModal(false);
                  }}
                  color="danger"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    let name = document.getElementById("editProfileName").value;
                    let password = document.getElementById(
                      "editProfilePassword"
                    ).value;
                    let imageURL = document.getElementById("editProfileImage")
                      .value;

                    if (!name || !roleType) {
                      alert("Name and Role are required fields");
                    } else if (
                      name.length > 30 ||
                      name.replace(/[^a-zA-Z ]/g, "").length < 1 ||
                      name.replace(/[^a-zA-Z ]/g, "").length > 30
                    ) {
                      alert(
                        "Name should contain atleast one and atmost 30 characters"
                      );
                    } else if (
                      (password !== "" || password) &&
                      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,21}/.test(password)
                    ) {
                      alert(
                        `Please enter a valid password containing 8 to 21 characters 
                      containing atleast 1 number, 1 uppercase and 1 lowercase letter.`
                      );
                    } else {
                      axios
                        .post("/api/user/editUserInfo", {
                          name,
                          password: password === "" ? null : password,
                          role: roleType,
                          imageURL
                        })
                        .then(res => {
                          // console.log(res.data);
                          if (res.data.success) {
                            window.location.reload();
                          } else {
                            alert("Please recheck your values and try again.");
                          }
                        })
                        .catch(err => {
                          // console.log("err", err);
                        });
                    }
                  }}
                  color="primary"
                >
                  Done
                </Button>
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

export default withRouter(UserProfileScreen);
